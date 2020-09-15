<template>
  <div v-if="currentUser" class="container">
    <header class="jumbotron">
      <div>
        <div v-if="isRideInProgress">
          <div v-if="isRideInProgress && !hasTripStarted">
            <div>Cab is waiting for you</div>
            <button class="btn-primary" @click="startTrip">
              Start Trip
            </button>
          </div>

          <div v-if="isRideInProgress && hasTripStarted">
            <div>Your ride is in progress</div>
            <button class="btn-primary" @click="endTrip">
              End Trip
            </button>
          </div>
        </div>

        <div v-else>
          <div class="mb-3">
            <span class="font-weight-light description">Enter distance to be travelled in kms</span>
            <b-form-input v-model="kms" type="number"></b-form-input>
          </div>
          <button class="btn-primary" :disabled="isRideInProgress" @click="getEstimate">
            Book A Cab
          </button>
        </div>
      </div>
    </header>
    <b-modal v-model="showModal">
      <div class="mb-5 d-flex">
        Total Estimated Fare: {{estimate}}
      </div>
      <div class="d-flex justify-content-center">
        <button class="btn-primary mr-5 w-25" :disabled="bookRideButtonDisabled" @click="bookRide">
          Book Cab
        </button>
      </div>
      <template #modal-footer>
        <div></div>
      </template>
    </b-modal>
    <b-modal v-model="showRatingModal">
      <div class="d-flex justify-content-center">
        <b-form-rating v-model="uRating" id="rating-inline" inline variant="warning"/>
        <button class="btn-primary mr-5 w-25" :disabled="isRatingUpdating" @click="updateRating">
          Submit
        </button>
      </div>
      <template #modal-footer>
        <div></div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import RideService from '../services/ride.service';
import UserService from '../services/user.service';
import DriverService from '../services/driver.service';

export default {
  name: 'Home',
  data() {
    return {
      currentUser: null,
      userId: null,
      isRideInProgress: false,
      hasTripStarted: false,
      content: null,
      showModal: false,
      estimate: 0,
      bookRideButtonDisabled: false,
      ride: null,
      kms: null,
      uRating: 0,
      showRatingModal: false,
      isRatingUpdating: false
    };
  },
  methods: {
    async updateRating() {
      this.isRatingUpdating = true;
      await RideService.updateRating(this.ride.id, this.uRating);
      this.ride.rating = this.uRating;
      this.showRatingModal = false;
      this.isRatingUpdating = false;
      this.$toastr.s('Thank you');
    },
    async updateCurrentUser() {
      const response = await UserService.getUserBoard();
      this.currentUser = response.data;
      this.userId = this.currentUser.id;
      this.isRideInProgress = this.currentUser.is_riding;
    },
    async initialise() {
      await this.updateCurrentUser();
      if (this.isRideInProgress) {
        this.ride = await RideService.getCurrentRide(this.userId);
        this.hasTripStarted = this.ride.ride_start_time !== null;
      }
    },
    async getEstimate() {
      this.kms = parseInt(this.kms, 10);
      if (!Number.isInteger(this.kms)) {
        this.$toastr.e("Please enter valid kilometers");
        return
      }
      const drivers = await DriverService.getAvailableDrivers();
      if (drivers.data.length === 0) {
        this.$toastr.e("No Cabs available right now");
      } else {
        this.estimate = await RideService.getEstimate(this.userId, this.kms);
        this.showModal = true;
      }
    },
    async bookRide() {
      this.$toastr.i("Your ride booking is in progress");
      this.bookRideButtonDisabled = true;
      this.ride = await RideService.bookRide(this.userId);
      this.showModal = false;
      await this.initialise()
      this.$toastr.i("Your cab has arrived");
    },
    async startTrip() {
      this.$toastr.i("Journey has started");
      this.ride = await RideService.startTrip(this.userId);
      await this.initialise();
      await this.$store.dispatch('auth/update');
    },
    async endTrip() {
      const ride = await RideService.endTrip(this.userId);
      await this.initialise();
      this.$toastr.i(`Total amount to be paid: ${parseInt(ride.data.fare, 10)}`);
      this.showRatingModal = true;
    }
  },
  mounted() {
    this.initialise();
  }
};
</script>

<style scoped>
    .form-control {
      width: 40%
    }

    .description {
      font-size: 0.7rem;
    }

</style>
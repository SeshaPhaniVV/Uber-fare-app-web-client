<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">Ride completed on {{ride_completed_time}}</h5>
      <p class="card-text">Driver Id: {{ride.driver_id}}</p>

      <div v-if="rating !== -1">
        <span class="mr-2 mb-2"> Given ratings: </span>
        <b-form-rating id="rating-inline" inline readonly variant="warning" :value="rating"/>
      </div>
      <div v-else class="btn btn-primary" @click="showModal">Give rating</div>
    </div>
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
import moment from 'moment';
import RideService from "@/services/ride.service";

export default {
  name: 'RideDetailCard',
  props: {
    ride: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ride_completed_time() {
      return moment(this.ride.ride_end_time).format('MMMM Do YYYY, h:mm::ss a')
    },
    rating() {
      return this.ride.rating
    }
  },
  data() {
    return {
      uRating: 0,
      showRatingModal: false,
      isRatingUpdating: false
    }
  },
  methods: {
    showModal() {
      this.showRatingModal = true;
    },
    async updateRating() {
      this.isRatingUpdating = true;
      await RideService.updateRating(this.ride.id, this.uRating);
      this.ride.rating = this.uRating;
      this.showRatingModal = false;
      this.isRatingUpdating = false;
      this.$toastr.s('Thank you');
    }
  }
};
</script>

<style scoped>
   #rating-inline >>> .form-control {
      width: 40%
    }

</style>
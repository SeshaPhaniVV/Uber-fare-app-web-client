<template>
  <div class="container">
    <header class="jumbotron">
      <div class="row">
        <div class="col-sm-8">
          <div class="mb-3" v-for="ride in content" :key="ride.id">
            <RideDetailCard :ride="ride"></RideDetailCard>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import RideService from "@/services/ride.service";
import RideDetailCard from "@/components/RideDetailCard";

export default {
  name: 'RideDetails',
  components: {RideDetailCard},
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    userId() {
      return this.currentUser.id;
    },
  },
  data() {
    return {
      content: ''
    };
  },
  methods: {
    initialise() {
      if (this.userId) {
        RideService.getRidesDetails(this.userId).then(
            response => {
              this.content = response.data;
            },
            error => {
              this.content =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString();
            }
        );
      }
      }
  },
  mounted() {
    this.initialise()
  },
  watch: {
    userId() {
      this.initialise();
    },
  }
};
</script>

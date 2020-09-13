<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{content}}</h3>
    </header>
    <button class="btn-primary" :disabled="isInValidState" @click="requestCab">
      Book A Cab
    </button>
  </div>
</template>

<script>
import UserService from '../services/user.service';
import DriverService from '../services/driver.service';

export default {
  name: 'Home',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isInValidState() {
      return this.currentUser.user.is_riding === true;
    }
  },
  data() {
    return {
      content: ''
    };
  },
  methods: {
    async requestCab() {
      const drivers = await DriverService.getAvailableDrivers();
      console.log('requested', drivers);

      if (drivers.data.length === 0) {
        this.$toastr.e("No Cabs available right now");
        return;
      } else {
        return await DriverService.requestCab();
      }
    }
  },
  mounted() {
    UserService.getRidesDetails().then(
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
};
</script>

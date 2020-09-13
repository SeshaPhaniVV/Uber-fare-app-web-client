<template>
  <div v-if="currentUser" class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Status:</strong>
      {{currentUser.user.user_type}}
    </p>
    <p>
      <strong>Rides Completed:</strong>
      {{currentUser.user.rides_count}}
    </p>
    <p>
      <strong>Name:</strong>
      {{currentUser.user.username}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script>
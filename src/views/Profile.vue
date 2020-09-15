<template>
  <div v-if="currentUser" class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Status:</strong>
      {{currentUser.user_type}}
    </p>
    <p>
      <strong>Rides Completed:</strong>
      {{currentUser.rides_count}}
    </p>
    <p>
      <strong>Name:</strong>
      {{currentUser.username}}
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
};
</script>
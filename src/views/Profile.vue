<template>
  <b-container fluid="md" id="profile">
    <b-card>
      <b-card-title>Edit Profile</b-card-title>
      <b-row>
        <b-col lg="2">
          <b-list-group>
            <router-link
              v-for="navItem in navItems"
              :key="navItem.name"
              :to="navItem.route"
            >
              <b-list-group-item>{{ navItem.name }}</b-list-group-item>
            </router-link>
          </b-list-group>
        </b-col>
        <b-col lg="9">
          <h3>Welcome Back, {{ name }}!</h3>
          <transition name="component-fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      navItems: [
        { name: 'My Products', route: 'products' },
        { name: 'Update Profile', route: 'settings' }
      ]
    };
  },
  computed: {
    name() {
      return this.$store.state.user.name;
    }
  }
};
</script>

<template>
  <div id="header">
    <b-navbar toggleable="sm" :type="navColor" sticky class="mb-3">
      <router-link to="/">
        <b-navbar-brand class="font-weight-bold">TrackWiggle</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-for="item in navItems" :key="item.name">
            <router-link :to="item.route">
              <b-button pill variant="outline-primary" class="btn-block">{{ item.name }}</b-button>
            </router-link>
          </b-nav-item>
          <!-- HAS A SLIGHTLY DIFFERENT FUNCTIONALITY THAT'S WHY NOT INCLUDED IN THE V-FOR -->
          <b-nav-item>
            <b-button
              pill
              variant="outline-primary"
              class="btn-block"
              v-if="isUserLoggedIn"
              @click="logout"
            >Logout</b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from 'axios';
import toaster from '../mixins/toaster';

export default {
  name: 'Header',
  mixins: [toaster],
  data() {
    return {
      darkNavPages: [
        '/',
        '/signup',
        '/login',
        '/forgot-password',
        '/reset-password/'
      ],
      baseNavItems: [
        { name: 'Search', route: '/' },
        { name: 'Products', route: '/products' }
      ],
      authenticatedNavItems: [{ name: 'Profile', route: '/profile' }],
      notAuthenticatedNavitems: [
        { name: 'Login', route: '/login' },
        { name: 'Sign Up', route: '/signup' }
      ]
    };
  },
  computed: {
    navColor() {
      return this.darkNavPages.includes(this.$route.path) ? 'dark' : 'light';
    },
    isUserLoggedIn() {
      return !!this.$store.getters.isLoggedIn;
    },
    navItems() {
      // Returns the base nav items + appropriate other nav items
      return this.baseNavItems.concat(
        this.isUserLoggedIn
          ? this.authenticatedNavItems
          : this.notAuthenticatedNavitems
      );
    }
  },
  methods: {
    async logout() {
      await axios.get('/auth/logout');
      await this.$store.dispatch('logout');
      this.successToast('Successfully logged out. See you later!');
      // Navigate to the main page if necessary
      if (this.$route.path !== '/') this.$router.push('/');
    }
  }
};
</script>

<style scoped></style>

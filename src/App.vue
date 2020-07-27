<template>
  <div id="app">
    <div style="min-height: 96vh">
      <vue-progress-bar></vue-progress-bar>
      <Header />
      <transition name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import Header from './components/Header';
import Footer from './components/Footer';

export default {
  components: {
    Header,
    Footer
  },
  created() {
    // Configure vue-progress-bar with axios
    axios.interceptors.request.use(
      config => {
        this.$Progress.start();
        return config;
      },
      error => {
        this.$Progress.fail();
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      response => {
        this.$Progress.finish();
        return response;
      },
      error => {
        this.$Progress.fail();
        return Promise.reject(error);
      }
    );
  }
};
</script>

<style>
/* COMPONENT TRANSITIONS */
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.15s ease-out;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>

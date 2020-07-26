<template>
  <div id="footer" :class="color">
    2020 &copy; Created by
    <a href="https://kdaniel21.netlify.app" target="_blank">Daniel Kiss</a>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      darkPages: [
        '/',
        '/signup',
        '/login',
        '/forgot-password',
        '/reset-password/'
      ]
    };
  },
  computed: {
    color() {
      return this.darkPages.includes(this.$route.path)
        ? 'text-light'
        : 'text-dark';
    }
  }
};
</script>

<style scoped>
#footer {
  position: absolute;
  right: 0;
  bottom: 0;
  margin-top: clamp(0.5rem, 1.2vw, 1.5rem);
  font-size: 2vw;
  font-size: clamp(15px, 2vw, 20px);
}
</style>

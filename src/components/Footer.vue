<template>
  <div id="footer" :class="color">
    2020 &copy; Created by
    <a href="https://danielkiss.me" target="_blank">Daniel Kiss</a>
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
  font-size: 2vw;
  font-size: clamp(15px, 2vw, 20px);
  text-align: right;
  margin-right: 15px;
}
</style>

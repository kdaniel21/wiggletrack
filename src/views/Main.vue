<template>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Main'
};
</script>

<style scoped>
#main::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('~@/assets/background.jpg') repeat center center fixed;
  background-size: cover;
  z-index: -2;
  overflow: hidden;
}
#main::after {
  content: '';
  background-color: rgb(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>

<template>
  <div id="main">
    <!-- <transition name="component-fast-fade" mode="out-in"> -->
    <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>

<script>
export default {
  name: 'Main'
};
</script>

<style scoped>
/* TRANSITION */
/* .component-fast-fade-enter-active,
.component-fast-fade-leave-active {
  transition: all 1s ease-out;
}
.component-fast-fade-enter,
.component-fast-fade-leave-to {
  
} */

div.container-md::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('~@/assets/background.jpg') no-repeat center center fixed;
  background-size: cover;
  z-index: -2;
}
div.container-md::after {
  content: '';
  background-color: rgb(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>

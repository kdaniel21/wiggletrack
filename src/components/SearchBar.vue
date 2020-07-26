<template>
  <b-container id="search-bar" fluid="md">
    <h1 class="display-4 mb-3">Find The Greatest Deals</h1>
    <h3 class="mb-5">Price Tracker & History for Wiggle.com</h3>
    <b-form inline @submit.prevent="search()">
      <b-form-input
        placeholder="Search Castelli jersey"
        size="lg"
        v-model="searchText"
      ></b-form-input>
      <b-button type="submit" pill variant="primary ml-3 btn-lg"
        >Search</b-button
      >
    </b-form>
  </b-container>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchText: null
    };
  },
  methods: {
    search() {
      if (this.searchText)
        this.$router.push(`/products?search=${this.searchText}`);
      // Show all products
      else this.$router.push('/products');
    }
  }
};
</script>

<style scoped>
div.container-md {
  margin-top: clamp(3rem, 20vh, 16rem) !important;
  color: #fff;
  font-weight: 500;
}
input {
  width: min(23rem, 90vw) !important;
}

@media only screen and (max-width: 508px) {
  div.container-md {
    margin-top: clamp(3rem, 10vh, 16rem) !important;
  }
  button {
    margin-left: auto !important ;
    margin-top: 10px;
  }
}
</style>

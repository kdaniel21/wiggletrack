<template>
  <div id="search-result">
    <b-container>
      <h1 class="display-5">{{ title }}</h1>
      <div class="mb-5">
        <h5 style="display: inline">Couldn't find what you're looking for?</h5>
        <router-link :to="isAuthenticated ? '/products/new' : '/signup'">
          <b-button
            pill
            variant="primary"
            class="ml-3"
            v-b-tooltip.hover.top="
              isAuthenticated
                ? 'Register Product'
                : 'You need to register to be able to add products.'
            "
            ><i class="fas fa-plus-circle"></i> Register Product</b-button
          >
        </router-link>
      </div>
      <div class="results">
        <!-- NO RESULTS MESSAGE -->
        <p class="text-center" v-if="showNoResults">
          It looks empty... 🙄 You might want to register the product you're
          looking for.
        </p>
        <!-- RESULTS -->
        <product-list :products="products" v-if="products.length > 0">
          <template v-slot:details="product">
            <p class="font-weight-bold mt-2">
              {{ parseLatestPrice(product.product.latestPriceRange) }}
            </p>
          </template>
        </product-list>
        <!-- PAGINATION -->
        <Pagination
          :numOfResults="numOfResults"
          :resultsPerPage="resultsPerPage"
          @page-change="this.fetchProducts"
        />
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';

export default {
  name: 'SearchResult',
  components: {
    ProductList,
    Pagination
  },
  data() {
    return {
      products: [],
      resultsPerPage: 4,
      numOfResults: 0,
      showNoResults: false
    };
  },
  created() {
    this.fetchProducts();
  },
  computed: {
    title() {
      return this.$route.query && this.$route.query.search
        ? `Results for '${this.$route.query.search}'`
        : 'All Products';
    },
    isAuthenticated() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    parseLatestPrice(range) {
      return range.min === range.max
        ? `€${range.min / 100}`
        : `€${range.min / 100} - €${range.max / 100}`;
    },
    fetchProducts(currentPage = 1) {
      const defaultParams = {
        page: currentPage,
        limit: this.resultsPerPage
      };
      // Add search string if necessary
      const { search } = this.$route.query;
      if (search) defaultParams['search'] = search.toLowerCase();

      axios.get(`/products`, { params: defaultParams }).then(res => {
        this.products = res.data.data;
        this.numOfResults = res.data.length;
        if (this.products.length === 0) this.showNoResults = true;
      });
    }
  }
};
</script>

<style scoped>
.card {
  width: 20rem;
  align-items: center;
}
img {
  padding-top: 10px;
  display: block;
  max-width: 150px;
  max-height: 100px;
  height: auto;
  widows: auto;
}
</style>

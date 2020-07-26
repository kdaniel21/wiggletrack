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
        <p class="text-center">
          It looks empty... 🙄 You might want to register the prodict you're
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
        <div class="overflow-auto" v-if="numOfPages > 1">
          <b-pagination-nav
            :link-gen="linkGen"
            :number-of-pages="numOfPages"
            use-router
            class="mt-3"
            align="center"
          ></b-pagination-nav>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
import ProductList from '../components/ProductList';

export default {
  name: 'SearchResult',
  components: {
    ProductList
  },
  data() {
    return {
      products: [],
      resultsPerPage: 8,
      numOfResults: 0
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
    currentPage() {
      return this.$route.query.page || 1;
    },
    numOfPages() {
      return Math.ceil(this.numOfResults / this.resultsPerPage);
    },
    isAuthenticated() {
      return this.$store.getters.isLoggedIn;
    }
  },
  watch: {
    currentPage() {
      this.fetchProducts();
    }
  },
  methods: {
    parseLatestPrice(range) {
      return range.min === range.max
        ? `€${range.min / 100}`
        : `€${range.min / 100} - €${range.max / 100}`;
    },
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`;
    },
    fetchProducts() {
      const defaultParams = {
        page: this.currentPage,
        limit: this.resultsPerPage
      };
      // Add search string if necessary
      const { search } = this.$route.query;
      if (search) defaultParams['search'] = search.toLowerCase();

      axios.get(`/products`, { params: defaultParams }).then(res => {
        this.products = res.data.data;
        this.numOfResults = res.data.length;
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
.pagination.b-pagination {
  justify-content: center;
}
</style>

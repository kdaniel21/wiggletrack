<template>
  <div id="my-products">
    <product-list :products="products">
      <template v-slot:img-btn="slotData">
        <b-button
          class="delete-btn"
          @click="showConfirmationModal(slotData.product._id)"
        >
          <i class="fas fa-trash"></i>
        </b-button>
      </template>

      <template v-slot:details="slotData">
        <b-badge
          pill
          :variant="slotData.product.notifications ? 'primary' : 'danger'"
        >
          Notifications
          {{ slotData.product.notifications ? 'enabled' : 'disabled' }}
        </b-badge>
      </template>
    </product-list>
    <!-- PAGINATION -->
    <Pagination
      :numOfResults="numOfBookmarkedProducts"
      :resultsPerPage="resultsPerPage"
      @page-change="getUserProducts"
    />
    <!-- CONFIRMATION MODAL -->
    <b-modal
      id="confirmation-modal"
      title="Are you sure?"
      @ok="unbookmarkProduct()"
    >
      <p>
        Are you sure that you want to unbookmark this product? This will disable
        any notifications.
      </p>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import toaster from '../mixins/toaster';
import ProductList from './ProductList';
import Pagination from '../components/Pagination';

export default {
  name: 'MyProducts',
  mixins: [toaster],
  components: {
    ProductList,
    Pagination
  },
  data() {
    return {
      selectedProduct: null,
      products: [],
      resultsPerPage: 3
    };
  },
  computed: {
    numOfBookmarkedProducts() {
      return this.$store.state.user.products.length;
    }
  },
  methods: {
    // Request own products from the server
    getUserProducts(page = 1) {
      const params = {
        page,
        limit: this.resultsPerPage
      };

      return axios
        .get(`/users/me/products`, { params })
        .then(res => this.setProducts(res.data.data));
    },
    // Parse and set products
    setProducts(products) {
      this.products = products.map(product => {
        return {
          ...product.product,
          notifications: product.notifications
        };
      });
    },
    showConfirmationModal(id) {
      this.selectedProduct = id;
      this.$bvModal.show('confirmation-modal');
    },
    removeProduct(id) {
      const index = this.products.findIndex(product => product._id === id);
      this.products.splice(index, 1);
    },
    async unbookmarkProduct() {
      // Send remove request
      await axios.delete(`/products/${this.selectedProduct}`);

      // Remove from the UI
      this.removeProduct(this.selectedProduct);

      // Remove from the store
      await this.$store.dispatch('unbookmarkProduct', this.selectedProduct._id);

      this.selectedProduct = null;

      // Success message
      this.successToast(
        'The selected product has been successfully unbookmarked!'
      );
    }
  },
  // Fetch first page
  async created() {
    await this.getUserProducts();
  }
};
</script>

<style scoped>
.delete-btn {
  top: 0;
  right: 0;
  position: absolute;
  opacity: 0.5;
  transition: all 0.3s;
}
button:hover {
  opacity: 1;
}
</style>

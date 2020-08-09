<template>
  <div id="my-products">
    <product-list :products="products">
      <template v-slot:img-btn="slotData">
        <b-button class="delete-btn" @click="showConfirmationModal(slotData.product._id)">
          <i class="fas fa-trash"></i>
        </b-button>
      </template>

      <template v-slot:details="slotData">
        <b-badge pill :variant="slotData.product.notifications ? 'primary' : 'danger'">
          Notifications
          {{ slotData.product.notifications ? 'enabled' : 'disabled' }}
        </b-badge>
      </template>
    </product-list>
    <!-- CONFIRMATION MODAL -->
    <b-modal id="confirmation-modal" title="Are you sure?" @ok="unbookmarkProduct()">
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

export default {
  name: 'MyProducts',
  mixins: [toaster],
  components: {
    ProductList
  },
  data() {
    return {
      selectedProduct: null,
      products: []
    };
  },
  methods: {
    getUserProducts() {
      return axios.get('/users/me/products').then(res => res.data.data);
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
  async created() {
    const products = await this.getUserProducts();

    // Transform response object
    this.products = products.map(product => {
      return {
        ...product.product,
        notifications: product.notifications
      };
    });
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

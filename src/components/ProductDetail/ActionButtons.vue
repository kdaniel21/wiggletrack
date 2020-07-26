<template>
  <div id="actions-buttons">
    <b-collapse v-model="showCollapse" id="pricebelow-collapse" class="mt-2">
      <p class="font-weight-bold text-primary">
        Under what price should we send you a notification?
      </p>
      <b-form inline @submit.prevent="toggleNotifications">
        <b-input
          id="price-below-input"
          type="number"
          required
          min="0"
          :value="product.latestPriceRange.min / 100"
          step="0.1"
          v-model="priceBelow"
        ></b-input>
        <span v-b-toggle.notification-collapse
          ><b-button
            pill
            variant="danger"
            class="mx-2"
            @click="showCollapse = false"
            >Cancel</b-button
          ></span
        >
        <b-button
          pill
          variant="primary"
          type="submit"
          v-model.number="priceBelow"
          >Enable</b-button
        >
      </b-form>
    </b-collapse>

    <b-row v-if="!showCollapse">
      <b-col cols="12" lg="4">
        <b-button
          pill
          variant="secondary"
          v-if="isBookmarked && isAuthenticated"
          @click="showPriceBelowCollapse"
          ><i
            :class="`fas fa-bell${areNotificationsEnabled ? '-slash' : ''}`"
          ></i>
          {{ notificationsBtnText }}
        </b-button>
      </b-col>
      <b-col cols="12" lg="4" class="mt-1 mt-lg-0">
        <b-button
          v-if="isAuthenticated"
          pill
          variant="secondary"
          @click="toggleBookmark"
          ><i class="fas fa-bookmark mr-1"></i>{{ bookmarkBtnText }}
        </b-button>
      </b-col>
      <b-col cols="12" lg="4" class="mt-1 mt-lg-0 mb-3 mb-lg-0">
        <a :href="product.url" target="_blank">
          <b-button pill variant="primary"
            ><i class="fas fa-shopping-cart mr-1"></i>Buy on Wiggle</b-button
          >
        </a>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import toaster from '../../mixins/toaster';

export default {
  name: 'ActionsButtons',
  mixins: [toaster],
  props: ['product'],
  data() {
    return {
      showCollapse: false,
      priceBelow: null
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    isBookmarked() {
      if (!this.isAuthenticated) return;

      const productIndex = this.$store.state.user.products.findIndex(
        prod => prod.product === this.product._id
      );
      return productIndex !== -1;
    },
    areNotificationsEnabled() {
      if (!this.isAuthenticated) return;

      const productIndex = this.$store.state.user.products.findIndex(
        prod => prod.product === this.product._id
      );
      return this.$store.state.user.products[productIndex].notifications;
    },
    bookmarkBtnText() {
      return this.isBookmarked ? 'Unbookmark' : 'Bookmark';
    },
    notificationsBtnText() {
      return this.areNotificationsEnabled
        ? 'Disable Notifications'
        : 'Enable Notifications';
    }
  },
  methods: {
    toggleBookmark() {
      let request;
      let message;
      let action;
      if (this.isBookmarked) {
        request = axios.delete(`/products/${this.product._id}`);
        message = 'Product successfully unbookmarked!';
        action = 'unbookmarkProduct';
      } else {
        request = axios.post(`/products/${this.product._id}`);
        message = 'Product successfully bookmarked!';
        action = 'bookmarkProduct';
      }

      request
        .then(() => {
          this.$store.dispatch(action, this.product._id);
          this.successToast(message);
        })
        .catch(() => this.errorToast(message));
    },
    showPriceBelowCollapse() {
      console.log(this.areNotificationsEnabled);
      if (this.areNotificationsEnabled) this.toggleNotifications();
      else this.showCollapse = true;
    },
    toggleNotifications() {
      let request;
      let message;
      let action;
      if (this.areNotificationsEnabled) {
        request = axios.delete(`/products/${this.product._id}/notifications`);
        message = 'Product notifications successfully disabled!';
        action = 'disableNotifications';
      } else {
        const isFormValid = this.validateForm();
        if (!isFormValid) return;

        request = axios.post(`/products/${this.product._id}/notifications`, {
          priceBelow: this.priceBelow
        });
        message = 'Product notifications successfully enabled!';
        action = 'enableNotifications';
      }

      // Hide collapse
      this.showCollapse = false;

      request
        .then(() => {
          this.$store.dispatch(action, this.product._id);
          this.successToast(message);
        })
        .catch(() =>
          this.errorToast('Something went wrong! Please try again.')
        );
    },
    validateForm() {
      if (isNaN(this.priceBelow)) {
        this.errorToast('A valid number is required!');
        return false;
      }

      return true;
    }
  }
};
</script>

<style scoped>
button {
  width: 100%;
}
</style>

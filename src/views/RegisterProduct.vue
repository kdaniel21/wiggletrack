<template>
  <b-container id="register-product">
    <!-- URL INPUT FORM -->
    <h2 class="display-5">Enter the product URL</h2>
    <b-form @submit.prevent="checkProduct">
      <b-form-input
        id="url-input"
        class="mr-3"
        placeholder="It should start with https://wiggle.com/"
        v-model="productUrl"
        required
      ></b-form-input>
      <b-button
        pill
        variant="primary"
        type="submit"
        class="float-right btn-block-xs-only"
        >Preview</b-button
      >
    </b-form>

    <!-- PRODUCT PREVIEW -->
    <div class="preview">
      <b-card
        :img-src="`${productPreview.img}?w=250`"
        img-top
        v-if="productPreview"
        class="mt-5"
      >
        <div>{{ productPreview.name }}</div>

        <b-button
          pill
          variant="primary"
          class="float-right"
          @click="registerProduct"
          >Register</b-button
        >
      </b-card>
    </div>
  </b-container>
</template>

<script>
import axios from 'axios';
import toaster from '../mixins/toaster';

export default {
  name: 'RegisterProduct',
  mixins: [toaster],
  data() {
    return {
      productUrl: null,
      productPreview: null
    };
  },
  methods: {
    checkProduct() {
      const isValid = this.validateUrl(this.productUrl);
      if (!isValid) return;

      // Clean url
      this.productUrl = this.cleanUrl(this.productUrl);

      axios
        .post('/products/check', { url: this.productUrl })
        .then(res => (this.productPreview = res.data.data))
        .catch(() => this.errorToast('Invalid product URL!'));
    },
    registerProduct() {
      axios
        .post('/products', { url: this.productUrl })
        .then(() => {
          // Add to store
          this.$store.dispatch('bookmarkProduct', this.productPreview);
          // Success message
          this.successToast(
            'Product registered! We will start tracking it in a few minutes.'
          );
        })
        .catch(err => {
          console.log(err);
          this.errorToast('Product already registered!');
        });
    },
    validateUrl(url) {
      if (!url) {
        this.errorToast('You must provide a valid URL!');
        return false;
      }
      if (!url.match(/^https:\/\/www.wiggle.com\//)) {
        this.errorToast('Product URL must start with https://wwww.wiggle.com/');
        return false;
      }

      return true;
    },
    cleanUrl(url) {
      return url.split('?')[0];
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 250px;
}
img {
  max-height: 248px;
  max-width: 248px;
}
div.container-md {
  margin-top: clamp(3rem, 20vh, 20rem) !important;
  color: #fff;
  font-weight: 500;
  text-align: center;
}
form {
  width: min(100%, 60rem);
}
input {
  width: 100%;
  margin-bottom: 0.5rem;
}
</style>

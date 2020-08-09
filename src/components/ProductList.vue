<template>
  <div id="product-list">
    <b-card-group deck v-if="products.length > 0">
      <b-card
        v-for="product in products"
        :key="product._id"
        :img-src="`${product.images[0]}?w=250`"
        img-top
      >
        <slot name="img-btn" :product="product"></slot>

        <div class="text-truncate">{{ product.name }}</div>

        <slot name="details" :product="product"></slot>
        <router-link :to="`/products/${product._id}`">
          <b-button pill variant="primary" class="float-right mt-1">View Product</b-button>
        </router-link>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: ['products']
};
</script>

<style scoped>
.card {
  min-width: 230px;
  max-width: 250px;
  margin-bottom: 1rem;
}
.img {
  max-height: 248px;
  max-width: 248px;
}
.card-deck {
  max-width: 100%;
  flex-flow: wrap;
}
b-card-subtitle {
  line-height: 24px;
  max-width: 250px;
}
@media only screen and (max-width: 600px) {
  .card {
    margin: auto;
    margin-bottom: 20px;
  }
}
</style>

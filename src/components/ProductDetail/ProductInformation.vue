<template>
  <div id="product-information">
    <h2>{{ product.name }}</h2>
    <!-- RATINGS -->
    <div class="rating">
      <i
        class="fas fa-star"
        v-for="index in 5"
        :key="index"
        :style="
          `color: ${index <= product.rating.average ? 'orange' : 'black'}`
        "
      >
      </i>
      <span> ({{ product.rating.quantity }} ratings)</span>
      <b-badge
        class="ml-2"
        variant="danger"
        v-if="!this.product.active"
        v-b-tooltip.hover
        title="This product is not tracked anymore."
        >Not Active</b-badge
      >
    </div>
    <!-- PRODUCT DESCRIPTION -->
    <p class="product-description mt-3">{{ product.summary }}</p>
  </div>
</template>

<script>
export default {
  name: 'ProductInformation',
  props: ['product']
};
</script>

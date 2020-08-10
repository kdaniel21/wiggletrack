<template>
  <b-container id="product-detail" v-if="product">
    <b-row>
      <b-col class="img-container">
        <!-- PRICE CHART OR IMAGE -->
        <price-history-chart
          :color="selectedColor"
          :size="selectedSize"
          v-if="showChart && selectedSize && selectedColor"
          style="height: 400px"
        />
        <img
          :src="product.images[0]"
          :alt="`Image of ${product.name}`"
          v-else
          style="height: 400px"
        />
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="8">
        <!-- PRODUCT INFORMATION -->
        <product-information :product="product" />
        <!-- BUY & BOOKMARK BUTTONS -->
        <action-buttons :product="product" />
      </b-col>
      <b-col>
        <!-- TOGGLE CHART/IMAGE -->
        <b-row class="justify-content-end">
          <b-button
            pill
            class="float-right"
            @click="showChart = !showChart"
            :disabled="!selectedColor || !selectedSize"
          >
            <font-awesome-icon
              icon="image"
              v-if="showChart && selectedSize && selectedColor"
            ></font-awesome-icon>
            <font-awesome-icon icon="chart-line" v-else></font-awesome-icon>
            {{
              showChart && selectedSize && selectedColor
                ? 'Show Image'
                : 'Show Chart'
            }}
          </b-button>
        </b-row>
        <!-- SIZE & COLOR SELECT -->
        <h4>Latest Price: {{ latestPrice }}</h4>
        <b-form-select v-model="selectedColor" :options="colors" class="mb-2">
          <template v-slot:first>
            <b-form-select-option :value="null" disabled
              >Please select a variant</b-form-select-option
            >
          </template>
        </b-form-select>
        <b-form-select
          v-model="selectedSize"
          :options="sizes"
          :disabled="!selectedColor"
          class="mb-4"
        >
          <template v-slot:first>
            <b-form-select-option :value="null" disabled
              >Please select a size</b-form-select-option
            >
          </template>
        </b-form-select>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from 'axios';
import PriceHistoryChart from '../components/PriceHistoryChart';
import ActionButtons from '../components/ProductDetail/ActionButtons';
import ProductInformation from '../components/ProductDetail/ProductInformation';

export default {
  name: 'ProductDetail',
  data() {
    return {
      product: null,
      colors: [],
      selectedColor: null,
      selectedSize: null,
      showChart: true
    };
  },
  components: {
    PriceHistoryChart,
    ActionButtons,
    ProductInformation
  },
  computed: {
    sizes() {
      if (!this.product || !this.product.variants) return [];
      const colorIndex = this.product.variants.findIndex(
        variant => variant.color === this.selectedColor
      );

      return colorIndex !== -1
        ? this.product.variants[colorIndex].sizes.map(sizeObj => sizeObj.size)
        : [];
    },
    latestPrice() {
      const matchingColors = this.product.latestPrice.filter(colorObj =>
        this.selectedColor ? colorObj.color === this.selectedColor : true
      );

      const pricesObj = matchingColors.map(sizeObj => {
        return sizeObj.sizes.filter(priceObj =>
          this.selectedSize ? priceObj.size === this.selectedSize : true
        );
      });

      let minPrice;
      let maxPrice;
      for (const sizeObj of pricesObj) {
        for (const priceObj of sizeObj) {
          const normalizedPrice = priceObj.price / 100;
          if (normalizedPrice > maxPrice || !maxPrice)
            maxPrice = normalizedPrice;
          if (normalizedPrice < minPrice || !minPrice)
            minPrice = normalizedPrice;
        }
      }

      return minPrice === maxPrice
        ? `€${minPrice}`
        : `€${minPrice} -  €${maxPrice}`;
    }
  },
  created() {
    axios.get(`/products/${this.$route.params.id}`).then(res => {
      this.product = res.data.data;

      this.colors = this.product.variants.map(variant => variant.color);
    });
  },
  methods: {
    toggleNotifications() {}
  }
};
</script>

<style scoped>
img {
  max-width: 100vw;
  max-height: 400px;
}
.img-container {
  text-align: center;
  height: auto;
}
.product-description {
  text-align: justify;
}
.btn-container {
  text-align: right;
}
</style>

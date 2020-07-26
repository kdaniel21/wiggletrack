<template>
  <div id="price-history-chart">
    <area-chart
      v-if="chartConfig.labels.length"
      :data="chartConfig"
      :options="options"
    ></area-chart>
  </div>
</template>

<script>
import axios from 'axios';
import AreaChart from './AreaChart';

export default {
  name: 'PriceHistoryChart',
  props: ['color', 'size'],
  components: { AreaChart },
  data() {
    return {
      productId: '',
      data: [],
      labels: [],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Date'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Price in EUR'
              }
            }
          ]
        }
      }
    };
  },
  computed: {
    // Computed for change detection on nested properties
    chartConfig() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            borderColor: '#efa00b',
            backgroundColor: '#efa00b',
            label: this.$parent.product.name,
            fill: false
          }
        ]
      };
    }
  },
  watch: {
    color() {
      this.fetchPriceHistory();
    },
    size() {
      this.fetchPriceHistory();
    }
  },
  methods: {
    fetchPriceHistory() {
      if (!this.size || !this.color) return;

      const color = this.color.replace(/\s/g, '_');
      const size = this.size.replace(/\s/g, '_');

      axios
        .get(`/products/${this.productId}/history`, { params: { color, size } })
        .then(res => {
          const parsedHistory = this.parsePriceHistory(res.data.data);
          this.labels = parsedHistory.labels;
          this.data = parsedHistory.data;
        });
    },
    parsePriceHistory(priceHistory) {
      const labels = [];
      const data = [];
      priceHistory.prices.forEach(priceObj => {
        const formattedTime = new Date(priceObj.timeAt).toLocaleDateString(
          'en-GB'
        );
        labels.push(formattedTime);
        data.push(priceObj.price / 100);
      });
      return { labels, data };
    }
  },
  mounted() {
    this.productId = this.$route.params.id;
    this.fetchPriceHistory();
  }
};
</script>

<script>
import { Line } from 'vue-chartjs';

export default {
  extends: Line,
  props: ['data', 'options'],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData() {
      return this.data;
    }
  },
  methods: {
    renderLineChart() {
      this.renderChart(this.chartData, this.options);
    }
  },
  watch: {
    data() {
      this.$data._chart.destroy();
      this.renderLineChart();
    }
  }
};
</script>

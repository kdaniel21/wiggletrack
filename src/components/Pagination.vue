<template>
  <div id="pagination">
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
</template>

<script>
export default {
  name: 'Pagination',
  props: ['numOfResults', 'resultsPerPage'],
  computed: {
    currentPage() {
      return this.$route.query.page || 1;
    },
    numOfPages() {
      return Math.ceil(+this.numOfResults / +this.resultsPerPage);
    }
  },
  watch: {
    currentPage() {
      this.$emit('page-change', this.currentPage);
    }
  },
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? '?' : `?page=${pageNum}`;
    }
  }
};
</script>

<style scoped>
.pagination.b-pagination {
  justify-content: center;
}
</style>
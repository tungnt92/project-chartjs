<template>
  <div class="container">
    <ChartTable />
  </div>
</template>

<script>
  import ChartTable from './components/Table.vue'

  export default {
    components: {
      ChartTable
    }
  };
</script>

<style lang="scss">
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>

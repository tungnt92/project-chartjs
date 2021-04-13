<template>
  <div id="my-chart">
    <div class="container">
      <Search/>
      <ChartTable/>
    </div>
  </div>
</template>

<script>
  import ChartTable from './components/Table.vue'
  import Search from './components/Search.vue'

  export default {
    components: {
      ChartTable,
      Search
    }
  };
</script>

<style lang="scss">
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>

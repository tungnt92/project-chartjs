<template>
  <div class="search">
    Search
  </div>
</template>

<script>
  export default {
    name: "Search",

    data () {
      return {
        form: {
          period_start: '',
          period_end: '',
          project_name: ''
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search {
    background: cornflowerblue;
    padding: 15px;
    margin-bottom: 20px;
  }
</style>

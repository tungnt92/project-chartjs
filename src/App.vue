<template>
  <div id="my-chart">
    {{ message }}
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'Hello World',
      };
    },
  };
</script>

<style>
  #my-chart {
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    color: blue;
  }
</style>

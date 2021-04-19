<template>
  <div class="chart-container" :class="{ 'full-width': options.full_width, 'dark-mode': options.dark_mode }">
    <ChartTable />

    <PopUp v-if="showPopup" :data="popupData"/>
  </div>
</template>

<script>
  import ChartTable from './components/Table.vue'
  import PopUp from './components/PopUp.vue'
  import isEmpty from './helpers';
  import {mapGetters} from 'vuex'

  export default {
    components: {
      ChartTable,
      PopUp
    },

    data () {
      return {
        options: {
          full_width: false,
          dark_mode: false
        }
      }
    },

    mounted() {
      window.projectChart.$on('chartOptions', (options) => {
        if (!isEmpty(options)) {
          this.options = {...this.options, ...options}
        }
      })
    },

    computed: {
      ...mapGetters(['showPopup', 'popupData', 'popupPosition'])
    }
  };
</script>

<style lang="scss">
  @import "scss/variable.scss";

  .chart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;
    --main-bg: #ffffff;
    --main-color: rgba(0, 0, 0, 0.65);
    --main-color-dim: #e3e3e3;

    &.full-width {
      max-width: 100%;
    }

    &.dark-mode {
      --main-bg: #263741;
      --main-color: #ffffff;
      --main-color-dim: #142634;
      color: $main-color;
    }
  }
</style>

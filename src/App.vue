<template>
  <div class="chart-container" :class="{ 'full-width': options.full_width }">
    <ChartTable />
    <transition name="fade">
      <PopUp v-if="showPopup" :data="popupData"/>
    </transition>
  </div>
</template>

<script>
  import ChartTable from './components/Table.vue'
  import PopUp from './components/PopUp.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      ChartTable,
      PopUp
    },

    data () {
      return {
        // use for build
        // options: {},
        // use for dev
        options: {
          scroll: false,
          collapse: true,
          date_format: 'YYYY-MM-DD',
          full_width: false
        }
      }
    },

    mounted() {
      // use for build
      // window.projectChart.$on('chartOptions', (options) => {
      //   this.options = options
      // })
      //
    },

    computed: {
      ...mapGetters(['showPopup', 'popupData', 'popupPosition'])
    }
  };
</script>

<style lang="scss">
  .chart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;

    &.full-width {
      max-width: 100%;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div class="chart-container"
       :class="{ 'full-width': options.full_width  }">
    <ChartTable :options="options" @changeMode="options = $event"/>

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
          scroll: false,
          date_format: 'YYYY-MM-DD',
          show_name_project: true,
          collapse: false,
          full_width: false,
          background_color: '#263741',
          text_color: '#555555'
        }
      }
    },

    mounted() {
      let chartStyle = document.querySelector('.chart-container').style
      chartStyle.setProperty('--main-color', this.options.text_color)
      chartStyle.setProperty('--main-line-color', this.darkenColor(this.options.text_color, -50))

      window.projectChart.$on('chartOptions', (options) => {
        if (!isEmpty(options)) {
          this.options = {...this.options, ...options}
        }

        chartStyle.setProperty('--main-bg', this.options.background_color)
        chartStyle.setProperty('--main-color-dim', this.darkenColor(this.options.background_color, 20))
        chartStyle.setProperty('--main-line-color', this.darkenColor(this.options.text_color, -50))
        chartStyle.setProperty('--main-color', this.options.text_color)
      })
    },

    computed: {
      ...mapGetters(['showPopup', 'popupData', 'popupPosition'])
    },

    methods: {
      darkenColor(col, amt) {
        let usePound = false;

        if (col[0] === "#") {
          col = col.slice(1);
          usePound = true;
        }

        let num = parseInt(col,16);

        let r = (num >> 16) - amt;

        if (r > 255) r = 255;
        else if  (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) - amt;

        if (b > 255) b = 255;
        else if  (b < 0) b = 0;

        let g = (num & 0x0000FF) - amt;

        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
      }
    }
  };
</script>

<style lang="scss">
  @import "scss/variable.scss";

  .chart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0;
    color: $main-color;

    &.full-width {
      max-width: 100%;
    }
  }
</style>

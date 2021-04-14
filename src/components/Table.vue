<template>
  <div class="table-container">
    <div class="table-wrap" :style="{'max-height': options.scroll ? '400px' : 'unset'}">
    <div class="project-col">
      <h4 class="project__title" v-text="'Project'" />

      <div class="project-wrap">
        <Project :data="data"
                 :options="options"
                 @handleCollapse="handleCollapse($event)"/>
      </div>
    </div>

    <div class="chart-col">
      <div class="chart__timeline">
        <Duration :start-date="data.start_time" :type-format="options.date_format"/>
      </div>

      <div class="chart__wrap">
        <Chart :data="data" :start-date="data.start_time" :type-format="options.date_format"/>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import Projects from '../projects.json'
import Duration from './Duration.vue';
import Project from './Project.vue';
import Chart from './Chart.vue';

export default {
  name: 'ChartTable',

  components: {
    Duration,
    Project,
    Chart
  },

  data () {
    return {
      data: Projects,
      options: {
        scroll: false,
        collapse: false,
        date_format: 'YYYY-MM-DD'
      }
    }
  },

  mounted() {
    // window.projectChart.$on('chartOptions', (data) => {
    //   this.options = data
    // })
    //
    // window.projectChart.$on('chartData', (data) => {
    //   this.data = data
    //   this.data.projects.forEach(obj => {
    //     obj.open = true;
    //   })
    // })

    this.data.projects.forEach(obj => {
      obj.open = true;
    })
  },

  methods: {
    handleCollapse(e) {
      if (this.options.collapse) {
        let index = this.data.projects.findIndex(obj => obj.name === e)

        if (index !== -1) {
          this.data.projects[index].open = !this.data.projects[index].open
          // ASSIGN DATA
          this.data = {...this.data}
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .table-container {
    -webkit-box-shadow: 0 0 4px 0 rgba(0,0,0,.5);
    -moz-box-shadow:    0 0 4px 0 rgba(0,0,0,.5);
    box-shadow:         0 0 4px 0 rgba(0,0,0,.5);
    padding: 20px;
    border-radius: 20px;
  }

  .table-wrap {
    display: flex;
    overflow: scroll;

    border-radius: 20px;

    .project-col {
      position: sticky;
      display: flex;
      flex-flow: column;
      left: 0;
      background-color: #ffffff;
      z-index: 4;
      width: 180px;
      flex-shrink: 0;
    }

    .project__title {
      margin: 0;
      padding: 15px;
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
    }

    .project-wrap {
      border-right: 1px solid #000;
      padding-bottom: 20px;
      background-color: #ffffff;
      z-index: 2;
    }

    .chart__timeline, .project__title {
      position: sticky;
      top: 0;
      background-color: #ffffff;
      z-index: 3;
    }

    .chart__wrap {
      padding-bottom: 10px;
    }

    .chart-col {
      max-width: 100%;
    }
  }
</style>

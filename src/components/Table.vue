<template>
    <div class="table-container">
      <a-spin :spinning="loading" size="large">
        <div class="table-wrap" :style="{'max-height': options.scroll ? '400px' : 'unset', 'overflow': loading ? 'unset' : 'scroll'}">

        <div class="project-col">
          <h3 class="project__title" v-text="'Project'" />

          <div class="project-wrap" :style="{'min-height': (!project.projects) ? '400px' : 'unset'}">
            <Project :data="project"
                     :options="options"
                     @handleCollapse="handleCollapse($event)"/>
          </div>
        </div>

        <div class="chart-col">
          <div class="chart__timeline">
            <Duration :start-date="project.start_time" :type-format="options.date_format"/>
          </div>

          <div class="chart__wrap">
            <Chart :data="project" :start-date="project.start_time" :type-format="options.date_format"/>
          </div>
        </div>
      </div>
      </a-spin>
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
      loading: false,
      // use for dev
      project: Projects,
      options: {
        scroll: true,
        collapse: true,
        date_format: 'YYYY-MM-DD',
        full_width: false
      },
      // use for build
      // project: {},
      // options: {}
    }
  },

  mounted() {
    // use for build
    // window.projectChart.$on('chartOptions', (options) => {
    //   this.options = options
    // })
    //
    // window.projectChart.$on('chartData', (data) => {
    //   this.project = data
    //   this.project.projects.forEach(obj => {
    //     obj.open = true;
    //   })
    // })
    //
    // window.projectChart.$on('loading', (loading) => {
    //   this.loading = loading
    // })

    // use for dev
    this.project.projects.forEach(obj => {
      obj.open = true;
    })
  },

  methods: {
    handleCollapse(e) {
      if (this.options.collapse) {
        let index = this.project.projects.findIndex(obj => obj.name === e)

        if (index !== -1) {
          this.project.projects[index].open = !this.project.projects[index].open
          // ASSIGN DATA
          this.project = {...this.project}
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .table-container {
    box-shadow: 0 0 4px 0 rgba(0,0,0,.5);
    padding: 20px;
    border-radius: 20px;
  }

  .table-wrap {
    display: flex;
    border-radius: 20px;

    .project-col {
      position: sticky;
      display: flex;
      flex-flow: column;
      left: 0;
      background-color: #ffffff;
      z-index: 4;
      height: fit-content;
      width: 180px;
      flex-shrink: 0;
    }

    .project__title {
      margin: 0;
      padding: 15px;
      font-size: 16px !important;
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
      margin-left: 50px;
    }

    .chart-col {
      max-width: 100%;
      height: fit-content;
    }
  }
</style>

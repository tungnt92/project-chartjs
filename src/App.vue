<template>
  <div id="chart">
    <!--Search-->
    <Search/>

    <!--Chart-->
    <div class="chart__container">
      <!--Duration-->
      <Duration/>

      <!--Project-->
      <Project/>
      <Project/>
    </div>
  </div>
</template>

<script>
  import Search from "./components/Search.vue";
  import Duration from "./components/Duration.vue";
  import Project from "./components/Project.vue";

  export default {
    components: {
      Project,
      Duration,
      Search
    },

    data() {
      return {
        chart: {
          period_start: '03/01/2021',
          period_end: '03/02/2021',
          projects: [
            {
              id: 1,
              name: 'Newphoria',
              members: [
                {
                  id: 1,
                  name: 'Hugh',
                  work: [
                    {
                      join_date: '',
                      leave_date: '',
                      number: true
                    },
                    {
                      join_date: '',
                      leave_date: '',
                      number: false
                    }
                  ]
                },
                {
                  id: 2,
                  name: 'Kuro',
                  work: [
                    {
                      join_date: '',
                      leave_date: '',
                      number: false
                    },
                    {
                      join_date: '',
                      leave_date: '',
                      number: true
                    }
                  ]
                }
              ]
            },
            {
              id: 2,
              name: 'Asura',
              members: [
                {
                  id: 1,
                  name: 'Leon',
                  work: [
                    {
                      join_date: '',
                      leave_date: '',
                      number: false
                    },
                    {
                      join_date: '',
                      leave_date: '',
                      number: true
                    }
                  ]
                },
                {
                  id: 2,
                  name: 'Chain',
                  work: [
                    {
                      join_date: '',
                      leave_date: '',
                      number: true
                    },
                    {
                      join_date: '',
                      leave_date: '',
                      number: false
                    }
                  ]
                }
              ]
            }
          ]
        }
      };
    },
  };
</script>

<style>
</style>

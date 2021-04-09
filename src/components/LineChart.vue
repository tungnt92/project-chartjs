<template>
  <div class="line">
    <div v-for="(project, index) in projects"
         :key="index"
         class="line__project">
      <div v-for="(position, index1) in project.position"
           :key="index1"
           class="line__position">
        <div v-for="(member, index2) in position.members"
             :key="index2"
             class="line__member">
          <div v-for="(work, index3) in member.work"
               :key="index3"
               :style="{
              'backgroundColor': member.color,
              'height': work.number * 18 + 'px',
              'width': (5 * handleDistance(work.join_date, work.leave_date)) + 'px',
              'left': (5 * handleDistance(periodStart, work.join_date)) + 'px'
            }"
               class="line__work">
            {{'width :' + handleDistance(work.join_date, work.leave_date)}}
            {{'left :' + handleDistance(periodStart, work.join_date)}}
          </div>
        </div>
      </div>
    </div>

    <p>start : {{ periodStart }} -----
      end : {{ periodStart }}</p>
  </div>
</template>

<script>
  export default {
    name: "LineChart",

    props: {
      projects: {
        type: Array,
        default: () => []
      },
      periodStart: {
        type: String,
        default: ''
      },
      periodEnd: {
        type: String,
        default: ''
      }
    },

    methods: {
      handleDistance (d1, d2) {
        const date1 = new Date(d1);
        const date2 = new Date(d2);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays
      }
    }
  }
</script>

<style lang="scss" scoped>
  .line {
    margin-top: 63px;
    &__project {
      margin-bottom: 83px;
    }
    &__position {
      margin-bottom: 36px;
    }
    &__member {
      position: relative;
      display: flex;
      margin-bottom: 9px;
      height: 18px;
    }
    &__work {
      position: absolute;
    }
  }
</style>

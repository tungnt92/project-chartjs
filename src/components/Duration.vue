<template>
  <div class="duration">
    <ul>
      <li v-for="(item, index) in dateRange"
          :key="index" :style="{'width': `${5 * item.daysInMonth}px`}">
        {{item.date | moment}}
      </li>
    </ul>
  </div>
</template>

<script>
  import moment from 'moment';

  export default {
    name: "Duration",

    props: {
      dateRange: {
        type: Array,
        default: () => []
      }
    },

    filters: {
      moment (date) {
        return moment(date).format('DD/MM/YYYY');
      }
    }
  }
</script>

<style lang="scss" scoped>
  .duration {
    ul {
      display: flex;
      li {
        position: relative;
        list-style: none;
        font-size: 14px;
        padding: 15px 0;
        border-bottom: 1px solid #bbbbbb;
        display: block;
        flex-shrink: 0;
        text-align: center;
        &:first-child {
          &:after {
            content: '';
            width: 1px;
            height: 4px;
            position: absolute;
            left: 0;
            bottom: 0;
            background: #000000;
          }
        }
        &:before {
          content: '';
          width: 1px;
          height: 4px;
          position: absolute;
          right: -0.5px;
          bottom: 0;
          background: #000000;
        }
      }
    }
  }
</style>

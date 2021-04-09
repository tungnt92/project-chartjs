<template>
  <div class="bar-wrap" :style="{'padding-left': diff*5 + 'px'}">
    <span class="bar" :style="{
    'background-color': bgColor,
    'height': status*30 + 'px',
    'width': days*5 + 'px',
  }"/>
  </div>
</template>

<script>
export default {
  name: 'Bar',

  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    days: {
      type: Number,
      default: 1
    },
    status: {
      type: Number,
      default: 1
    },
    bgColor: {
      type: String,
      default: '#000'
    },
    diff: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
  span {
    display: block;
  }
</style>

<template>
  <div class="popup-wrap" :style="{'left': pageX + 'px', 'top': pageY + 10 + 'px'}">
    <h3>
      <strong>Project: </strong> {{data.project_name}}
    </h3>
    <p>
      <strong>Join Date: </strong> {{data.join_date}}
    </p>
    <p>
      <strong>Leave Date: </strong> {{data.leave_date}}
    </p>
    <p>
      <strong>Work Status: </strong> {{data.work_status}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Popup',

  props: {
    data: {
      type: Object,
      default: () => {}
    },

    pageX: {
      type: Number,
      default: 0
    },

    pageY: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
  .popup-wrap {
    min-width: 100px;
    border-radius: 10px;
    border: 1px solid #ccc;
    position: fixed;
    background-color: #ffffff;
    padding: 15px;

    h3 {
      border-bottom: 1px solid #cccccc;
      padding-bottom: 10px;
    }

    p {
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>

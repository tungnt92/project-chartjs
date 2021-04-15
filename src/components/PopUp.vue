<template>
  <div ref="popup" class="popup-wrap" :style="direction()">
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
import {mapGetters} from 'vuex'

export default {
  name: 'Popup',

  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },

  data () {
    return {
      width: 0,
      height: 0
    }
  },

  computed: {
    ...mapGetters(['popupPosition', 'popupDirection']),
  },

  mounted() {
    this.width = this.$refs.popup.clientWidth
    this.height = this.$refs.popup.clientHeight
  },

  methods: {
    direction () {
      let xDirection = {}
      let yDirection = {}
      if (window.innerWidth < this.popupDirection.clientX + this.width) {
        xDirection = { 'left': this.popupPosition.pageX - this.width + 'px' }
      } else {
        xDirection = { 'left': this.popupPosition.pageX + 'px' }
      }
      if (window.innerHeight < this.popupDirection.clientY + this.height) {
        yDirection = { 'top': this.popupPosition.pageY - this.height - window.pageYOffset  - 10 + 'px' }
      } else {
        yDirection = { 'top': this.popupPosition.pageY + 10 - window.pageYOffset + 'px' }
      }

      return {...xDirection, ...yDirection}
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
    white-space: nowrap;

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

<template>
  <div class="data-popup" v-if="showPopup">
    <h3 class="popup-header">
      {{ currentDay }}
      <button @click="$emit('close')" class="btn-close">&#215;</button>
    </h3>
    <h3 v-if="isEmpty(data)" class="infor-warning">Không có dữ liệu</h3>
    <div class="project-wrap" v-for="(value, key) in data" :key="key">
      <h3>Project: {{ key }}</h3>

      <ul class="project__list" >
        <li class="list__item"
            v-for="(item, index) in value"
            :key="index">
          <p v-text="`Member: ${item.member}`" />
          <p v-text="`Position: ${item.position}`" />
          <p v-text="`Work Status: ${item.work_status}`" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideBar',

  props: {
    showPopup: {
      type: Boolean,
      default: false
    },

    data: {
      type: Object,
      default: () => {}
    },

    currentDay: {
      type: String,
      default: ''
    }
  },

  methods: {
    isEmpty(obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true
    }
  }
};
</script>

<style lang="scss" scoped>
.data-popup {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  width: 250px;
  background-color: #ffffff;
  border: 1px solid #cccccc;
  max-height: 100%;
  overflow-y: scroll;
  min-height: 100%;
  animation: slide .3s ease-in-out;

  .project-wrap {
    padding: 15px;
    border-right: 0;

    &:not(:last-child) {
      padding-bottom: 10px;
      margin-bottom: 10px;
      border-bottom: 1px solid #ccc;
    }
  }

  .popup-header {
    padding: 15px;
    position: sticky;
    top: 0;
    background-color: #e3e3e3;
    border-bottom: 1px solid rgba(0,0,0,.125);
  }
  .infor-warning {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
  .btn-close {
    content: "\00D7";
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 50%;
    border: 0;
    cursor: pointer;
    font-size: 16px;
    padding: 4px 10px;
    &:hover {
      background: #ddd;
      color: #ffffff;
    }
    &:focus {
      outline: none;
    }
  }
  ul {
    list-style: none;
    padding: 0 10px;

    li {
      border-bottom: 1px solid rgba(0,0,0,.125);
      white-space: nowrap;
      margin-bottom: 10px;
      &:last-child {
        border-bottom: 0;
      }
    }
  }
}

@keyframes slide {
  from {
    width: 0;
  }
  to {
    width: 250px;
  }
}
</style>

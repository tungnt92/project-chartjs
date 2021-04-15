<template>
  <div class="container">
    <ChartTable />
    <transition name="fade">
      <PopUp v-if="showPopup" :data="popupData"/>
    </transition>
  </div>
</template>

<script>
  import ChartTable from './components/Table.vue'
  import PopUp from './components/PopUp.vue'
  import {mapGetters} from 'vuex'

  export default {
    components: {
      ChartTable,
      PopUp
    },

    computed: {
      ...mapGetters(['showPopup', 'popupData', 'popupPosition'])
    }
  };
</script>

<style lang="scss">
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 50px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>

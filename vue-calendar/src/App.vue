
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 20px;
}
</style>

<template>
  <div id='app'>
    <calendar style='width: 30%;' 
              :month-full-names='monthFullNames' :month-names='monthNames' :day-names="dayNames" />
  </div>
</template>

<script>
  import Calendar from './components/Calendar.vue';

  export default {
    name: 'app',
    components: {
      Calendar 
    },
    data() {
      return {
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthFullNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        dayNames: ['日', '一', '二', '三', '四', '五', '六']
      };
    }
  };
</script>

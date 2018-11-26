<style lang="less">
  .r-calendar .r-weekdays {
    flex-grow: 1;
    flex-basis: 0;
    .r-cell{
      font-weight: bold;
    }
  }
</style>

<template>
  <div class="r-row r-weekdays">
    <div class="r-cell" v-for="day in weekDays" :key="day">
      {{dayNames[(startDay + day) % 7]}}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WeekDays',
    props: ['startDay', 'dayNames'],
    data() {
      return {
        weekDays: Array.apply(null, {length: 7}).map(Number.call, Number)
      };
    }
  };
</script>
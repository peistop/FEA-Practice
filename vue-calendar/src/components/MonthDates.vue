<style lang="less">
  .r-calendar {
    .r-dates, .r-month {
      display: flex;
      flex-flow: column nowrap;
      flex-grow: 6;
      flex-basis: 0;
      .r-row {
        flex-grow: 1;
      }
    }

    .r-dates .r-cell{
      border: solid 1px #ffffff;
      outline: none;
    }

    .r-cell.r-date:not(.r-outdate) {
      cursor: pointer;
      outline: none;
      &.r-selected, &:not(.r-outdate):hover {
        background-color: #db3d44;
        border-radius: 50%;
        color: #fff;
      }
    }

    .r-cell.r-date {
      margin: 0px 3px;
      &.r-today {
        color:#db3d44;
      }
      &.r-outdate {
        color: #eeeeee;
      }
    }
  }
</style>

<template>
  <div class="r-dates">
    <div class="r-row" v-for="i in rowStack" :key="i">
      <div :class="{
        'r-cell': true,
        'r-date': true,
        'r-outdate': getDay(i, index).outMonth
      }" v-for="index in weekStack" :key="index">{{getDay(i, index).label}}</div>
    </div>
  </div>
</template>

<script>

  const rows = 6;
  export default {
    props: ['year', 'month', 'startDay'],
    data() {
      return {
        today: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
        daysPreMonth: new Date(this.year, this.month, 0).getDate(),
        rowStack: Array.apply(null, {length: rows}).map(Number.call, Number),
        weekStack: Array.apply(null, {length: 7}).map(Number.call, Number),
      };
    },
    computed: {
      daysInMonth() {
        return new Date(this.year, this.month + 1, 0).getDate();
      },
      firstDay() { // "first day" in this calendar
        let day = this.startDay + 1 - new Date(this.year, this.month, 1).getDay();
        while (day > 1) {
          day -= 7;
        }
        day -= 1; 
        return day;
      }
    },
    methods: {
      getDay: function(i, index) {
        let day = { label: this.firstDay + i * 7 + index + 1, outMonth: false };
        if (day.label <= 0) {
          day.label += this.daysPreMonth;
          day.outMonth = true;
        } 
        else if (day.label > this.daysInMonth) {
          day.label -= this.daysInMonth;
          day.outMonth = true;
        }
        return day;
      }
    }
  };
</script>
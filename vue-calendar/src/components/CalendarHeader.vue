<style lang="less">
.r-calendar {

 .r-head {
    flex-grow: 1;
    flex-basis: 0;
    padding-top: 20px;

    .r-title {
      flex-grow: 5;
      flex-basis: max-content;
      outline:none;
      font-weight: bold;

      &:not(.r-yeartitle) {
        cursor: pointer;
        &:hover {
          background-color: #eeeeee; 
          border-radius: 5px;
        }
      }
    }

    .r-prev, .r-next {
      cursor: pointer;
      outline: none;
      &:before {
        position: relative;
        top: 0;
        content: "";
        display: inline-block;
        width: 0.6em;
        height: 0.6em;
        border-top: 0.2em solid #222222;
        transform: rotate(-45deg);
      }
    }

    .r-prev:before {
      border-left: 0.2em solid #222222;
      transform: rotate(-45deg);
      margin-left: 0.3em;
      &:hover {
        border-left-color: #4CBBBF;
        border-top-color: #4CBBBF;
      }
    }

    .r-next:before {
      border-right: 0.2em solid #222222;
      transform: rotate(45deg);
      margin-right: 0.3em;
      &:hover {
        border-right-color: #4CBBBF;
        border-top-color: #4CBBBF;
      }
    }
  }
}

</style>

<template>
  <div class="r-row r-head">
    <div class="r-cell r-prev" @click="onPrev"></div>
    <div class="r-cell r-title" @click="onSelectView">{{title}}</div>
    <div class="r-cell r-next" @click="onNext"></div>
  </div>
</template>

<script>
  export default {
    name: 'CalendarHeader',
    props: ['title', 'onPrev', 'onNext', 'onSelectView']
  };
</script>
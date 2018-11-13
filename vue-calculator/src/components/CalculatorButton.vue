<style scoped lang="less">
  button.btn {
    background-color: #49B4B8;
    border:0px solid transparent !important;
    border-radius: 0 !important;
    
    color: #FFF;
    min-width: rem(100px);
    font-size: rem(14px);
    height: rem(30px);
    line-height: 30px;

    &:hover {
      background-color: #4CBBBF;
    }
    &:active:focus {
      background-color: #4CBBBF;
    }
    &:focus, &:active, &.focus {
      outline: none !important;
      box-shadow: none !important;
    }
    
    &.operate-btn, &.equal-btn {
      background-color: #ff9900;
      &:hover {
        background-color: #ffb84d;
      }
    }

    &.operate-btn:focus, &.operate-btn:active {
      background-color: #fff;
      color: #ff9900;
    }

    &.functional-btn {
      color: #262626;
      background-color: #cccccc;
      &:hover {
        background-color: #e6e6e6;
      }
    }

  }
</style>

<template>
    <b-button class="col-md-3"
          @click="$emit('click', $event)"><slot></slot></b-button>
</template>

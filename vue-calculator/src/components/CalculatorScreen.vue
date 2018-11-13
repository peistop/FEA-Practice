<style scoped lang="less">
  .screen {
    background-color: #fff;
    border:0px solid transparent !important;
    border-radius: 0 !important;
    overflow: hidden;

    &:focus, &:active {
      outline: none !important;
      box-shadow: none !important;
    }

    &.history {
      font-size: 14px;
      letter-spacing: 3px;
      color: #8c8c8c;
    }
  }
</style>

<template>
    <b-form-textarea class="screen text-right h1" :value="value" :no-resize="true" :rows="rows" plaintext></b-form-textarea>
</template>

<script>
  export default {
    props: {
      rows: {
        type: Number
      },
      value: {
        type: String,
        required: true
      }
    }
  };
</script>

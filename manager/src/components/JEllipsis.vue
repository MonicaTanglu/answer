<template>
  <a-tooltip placement='topLeft'>
    <template #title>
      <span>{{value}}</span>
    </template>
    {{ value }}
  </a-tooltip>
</template>

<script>
export default {
  name: 'JEllipsis',
  props: {
    value: {
      type: String,
      required: false,
    },
    length: {
      type: Number,
      required: false,
      default: 25,
    },
  },
}
</script>

<style scoped>
</style>

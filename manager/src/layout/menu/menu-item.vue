<template>
  <template v-if='!menuInfo.hidden'>
    <a-sub-menu v-if='menuInfo.children?.length' :key='menuInfo.name' v-bind='$attrs'>
      <template v-slot:title>
        <span>
          <icon-font :type='menuInfo.meta.icon' style='color: aliceblue' />
          <span>{{ menuInfo.meta.title }}</span>
        </span>
      </template>
      <template v-for='item in menuInfo.children' :key='item.name'>
        <template v-if='!item.children'>
          <a-menu-item v-if='!item.hidden' :key='item.name'>
            <icon-font :type='item.meta.icon' style='color: aliceblue' />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <menu-item v-if='!item.hidden' :menu-info='item' :key='item.name' />
        </template>
      </template>
    </a-sub-menu>
    <a-menu-item v-else :key='menuInfo.name'>
      <icon-font :type='menuInfo.meta.icon' style='color: aliceblue' />
      <span>{{menuInfo.meta.title}}</span>
    </a-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import { Menu } from 'ant-design-vue'
import { IconFont } from '@/components/iconfont/index'

export default defineComponent({
  name: "menu-item",
  components: {
    IconFont
  },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  },
})
</script>

<style scoped>
</style>

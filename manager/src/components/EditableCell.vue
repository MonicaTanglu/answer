<template>
  <div class='editable-cell'>
    <div v-if='editable' class='editable-cell-input-wrapper'>
      <a-select
        v-model:value='value'
        show-search
        placeholder='请选择'
        option-filter-prop='children'
        style='width: 200px'
        :filter-option='filterOption'
      >
        <a-select-option value='孔杰'>孔杰</a-select-option>
        <a-select-option value='邓丽'>邓丽</a-select-option>
        <a-select-option value='唐伟'>唐伟</a-select-option>
      </a-select>
      <!-- <a-input v-model:value='value' @pressEnter='check' /> -->
      <check-outlined class='editable-cell-icon-check' @click='check' />
    </div>
    <div v-else class='editable-cell-text-wrapper'>
      {{value || ' '}}
      <edit-outlined class='editable-cell-icon' @click='edit' />
    </div>
  </div>
</template>

<script>
import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue'

export default {
  name: 'EditableCell',
  components: {
    CheckOutlined,
    EditOutlined,
  },
  props: {
    text: String,
    onChange: Function,
  },
  data() {
    return {
      value: this.text,
      editable: false,
    }
  },
  methods: {
    handleChange(e) {
      const value = e.target.value
      this.value = value
    },
    check() {
      this.editable = false
      this.$emit('change', this.value)
    },
    edit() {
      this.editable = true
    },
    filterOption(input, option) {
      return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
  },
}
</script>

<style>
</style>

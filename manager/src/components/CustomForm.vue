<template>
  <div ref='form'>
    <a-form :model='form' :label-col='labelCol' :wrapper-col='wrapperCol'>
      <template v-for='item of formArr' :key='item.key'>
        <a-form-item v-if='item.type === "input"' :label='item.label'>
          <a-input v-model:value='form[item.key]' />
        </a-form-item>

        <a-form-item v-else-if='item.type === "select"' :label='item.label'>
          <a-select v-model:value='form[item.key]' placeholder='please select your zone'>
            <a-select-option v-for='option of item.options' :key='option.value' :value='option.value'>{{ option.label }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-else-if='item.type === "datePicker"' :label='item.label'>
          <a-date-picker v-model:value='form[item.key]' show-time type='date' placeholder='请选择日期' style='width: 100%;' />
        </a-form-item>

        <a-form-item v-else-if='item.type === "swicth"' :label='item.label'>
          <a-switch v-model:checked='form[item.key]' />
        </a-form-item>

        <a-form-item v-else-if='item.type === "checkbox"' :label='item.label'>
          <a-checkbox-group v-model:value='form[item.key]'>
            <a-checkbox
              v-for='option of item.options'
              :key='option.value'
              :value='option.value'
              :name='option.typename'
            >{{ option.label }}</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item v-else-if='item.type === "radio"' :label='item.label'>
          <a-radio-group v-model:value='form[item.key]'>
            <a-radio v-for='option of item.options' :key='option.value' :value='option.value'>{{ option.label }}</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item v-else-if='item.type === "textarea"' :label='item.label'>
          <a-input v-model:value='form[item.key]' type='textarea' />
        </a-form-item>
      </template>

      <a-form-item :wrapper-col='{ span: 14, offset: 4 }'>
        <a-button type='primary' @click='onSubmit'>确定</a-button>
        <a-button style='margin-left: 10px;'>取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  props: {
    formArr: {
      type: Array,
      defaultValue: () => [],
    },
  },
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {},
    }
  },
  mounted() {
    this.setForm(this.formArr)
    console.log(this.form, 'form')
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form)
    },
    setForm(list) {
      for (const item of list) {
        this.form[item.key] = item.value
      }
    },
  },
}
</script>

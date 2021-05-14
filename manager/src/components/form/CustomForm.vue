<template>
  <div>
    <a-form ref="form" :form="formObj" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <div v-for="item of formArr" :key="item.key">
        <a-form-item v-if="item.type === 'input'" :label="item.label" :name="item.key">
          <a-input v-model:value="formObj[item.key]" :placeholder="'请输入' + item.label" />
        </a-form-item>

        <a-form-item v-if="item.type === 'password'" :label="item.label" :name="item.key">
          <a-input type="password" v-model:value="formObj[item.key]" :placeholder="'请输入' + item.label" />
        </a-form-item>

        <a-form-item v-if="item.type === 'number'" :label="item.label" :name="item.key">
          <a-input-number :min="1" v-model:value="formObj[item.key]" :placeholder="'请输入' + item.label" />
        </a-form-item>

        <a-form-item v-else-if="item.type === 'select'" :label="item.label" :name="item.key">
          <a-select v-model:value="formObj[item.key]" :mode="item.mode" :placeholder="'请选择' + item.label">
            <a-select-option
              v-for="option of item.options"
              :key="option.value"
              :value="option.value"
              :title="option.text"
            >{{ option.text }}</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-else-if="item.type === 'datePicker'" :label="item.label" :name="item.key">
          <a-date-picker
            :valueFormat="item.format ? item.format : 'YYYY-MM-DD hh:mm:ss'"
            v-model:value="formObj[item.key]"
            show-time
            type="date"
            :placeholder="'请选择' + item.label"
            style="width: 100%"
          />
        </a-form-item>

        <a-form-item v-else-if="item.type === 'swicth'" :label="item.label" :name="item.key">
          <a-switch v-model:value="formObj[item.key]" />
        </a-form-item>

        <a-form-item v-else-if="item.type === 'checkbox'" :label="item.label" :name="item.key">
          <a-checkbox-group v-model:value="formObj[item.key]">
            <a-checkbox v-for="option of item.options" :key="option.value" :name="option.typename">{{ option.text }}</a-checkbox>
          </a-checkbox-group>
        </a-form-item>

        <a-form-item v-else-if="item.type === 'radio'" :label="item.label" :name="item.key">
          <a-radio-group v-model:value="formObj[item.key]">
            <a-radio v-for="option of item.options" :key="option.value" :value="option.value">{{ option.text }}</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item v-else-if="item.type === 'textarea'" :label="item.label" :name="item.key">
          <a-input v-model:value="formObj[item.key]" type="textarea" :placeholder="'请输入' + item.label" />
        </a-form-item>
      </div>

      <a-form-item :wrapper-col="{ span: wrapperCol.span, offset: labelCol.span }" v-if="actionShow">
        <a-button type="primary" @click="onSubmit">确定</a-button>
        <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  components: {
    // UploadFile,
    // UploadImage,
  },
  props: {
    formArr: {
      type: Array,
      default: () => [],
    },
    actionShow: {
      type: Boolean,
      default: true,
    },
    labelCol: {
      type: Object,
      default: () => {
        return { span: 6 }
      },
    },
    wrapperCol: {
      type: Object,
      default: () => {
        return { span: 16 }
      },
    },
  },
  data() {
    return {
      formObj: {},
      rules: [],
      validatorRules: {},
      loading: false,
      state: {
        time: 60,
        smsSendBtn: false,
      },
    }
  },
  mounted() {
    // this.setForm(this.formArr);
    // this.setForm(this.formArr);
  },
  created() {
    const arr = JSON.parse(JSON.stringify(this.formArr))
    this.setValidator(arr)
  },
  methods: {
    onSubmit() {
      const that = this
      this.$refs.form.validate((err, value) => {
        if (!err) {
          if (that.formObj && that.formObj.id) value["id"] = that.formObj.id
          that.$emit("submit", value)
        } else {
          this.$emit("error", true)
        }
      })
    },
    // 规则校验
    setValidator(list) {
      for (const item of list) {
        this.formObj[item.key] = item.value
        const errMsg = this.getErrMsg(item.type)
        this.rules[item.key] = {
          required: item.required ? item.required : false,
          message: item.pattern ? item.errMsg : errMsg + item.label,
          pattern: item.pattern,
          type: item.fieldType ? item.fieldType : "string",
        }
      }
    },
    getErrMsg(type) {
      let errMsg = ""
      switch (type) {
        case "input":
        case "textarea":
          errMsg = "请输入"
          break
        case "select":
        case "radio":
        case "datePicker":
        case "checkbox":
          errMsg = "请选择"
          break
        case "uploadImage":
        case "uploadFile":
          errMsg = "请上传"
          break
        default:
          break
      }
      return errMsg
    },
    setForm(obj) {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(this.formObj, key)) {
          this.formObj[key] = obj[key]
        }
      }
    },
    resetForm() {
      for (const key in this.formObj) {
        this.formObj[key] = null
      }
    },
    cancel() {
      this.$emit("cancel")
    },
  },
}
</script>
<style scoped>
.getCaptcha {
  display: block;
  /* width: 100%; */
  /* height: 40px; */
}
</style>

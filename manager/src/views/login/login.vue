<template>
  <div class='login-box'>
    <div class='login-logo'>
      <!-- <svg-icon icon-class='logo' /> -->
      <!--      <img src="~@/assets/images/logo.png" alt="">-->
      <h1>答题管理系统</h1>
    </div>
    <a-form ref='ruleForm' layout='horizontal' :rule='rule' :model='formInline' @finish='handleSubmit'>
      <a-form-item>
        <a-input v-model:value='formInline.username' size='large' placeholder='admin'>
          <template v-slot:prefix>
            <user-outlined type='user' />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value='formInline.password'
          size='large'
          type='password'
          placeholder='请输入密码'
          autocomplete='new-password'
        >
          <template v-slot:prefix>
            <lock-outlined type='user' />
          </template>
        </a-input>
      </a-form-item>
      <!-- <a-form-item>
        <div class='check-code'>
          <div style='width: 250px'>
            <a-input
              v-model:value='formInline.captcha'
              style='width: 250px'
              size='large'
              type='text'
              placeholder='请输入验证码'
            >
              <template v-slot:prefix>
                <smile-outlined />
              </template>
            </a-input>
          </div>
          <div class='image-code'>
            <img
              v-if='requestCodeSuccess'
              style='margin-top: 2px;'
              :src='randCodeImage'
              @click.stop='handleChangeCheckCode'
            />
            <img v-else style='margin-top: 2px;' src='../../assets/checkcode.png' @click.stop='handleChangeCheckCode' />
          </div>
        </div>
      </a-form-item>-->
      <a-form-item>
        <a-button type='primary' html-type='submit' size='large' :loading='loading' block>登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { message } from 'ant-design-vue'
import { apiModule } from '@/api/module'
import { api } from '@/api/api'
import { UserOutlined, LockOutlined, SmileOutlined } from '@ant-design/icons-vue'
// ~@/assets/logo.png
// import { useRoute, useRouter } from "vue-router";
import router from '@/router/index'
import { useStore } from 'vuex'

// import {login} from "@/api/system/user";

// import {SvgIcon} from '@/components/svg-icon'

export default defineComponent({
  name: "login",
  components: { UserOutlined, LockOutlined, SmileOutlined },
  setup() {
    const state = reactive({
      loading: false,
      requestCodeSuccess: false,
      randCodeImage: '',
      formInline: { username: 'admin', password: '123456', captcha: 'ab12' },
      rule: {
        username: [{ required: true, message: '请输入账户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    })
    const store = useStore()
    const handleSubmit = async () => {
      // ruleForm.value.validate().then(() => {
      store.dispatch('user/login', state.formInline).then(res => {
        if (res.success) {
          router.replace('/')
        } else {
          message.error(res.message)
        }
      })
      // })

    }
    const handleChangeCheckCode = async () => {
      // const currdatetime = new Date().getTime()
      const res: any = await api.get(`randomImage`, apiModule.sys)
      if (res.success) {
        state.randCodeImage = res.result
        state.requestCodeSuccess = true
      } else {
        message.error(res.message)
        state.requestCodeSuccess = false
      }
    }
    handleChangeCheckCode()
    return {
      ...toRefs(state),
      handleSubmit,
      handleChangeCheckCode
    }
  },
  methods: {
    handleSubmit2() {
      // console.log(this.$refs.ruleForm.validate, 'ruleForm')
    }
  }
})
</script>

<style lang="scss" scoped>
.login-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  padding-top: 240px;
  flex-direction: column;
  align-items: center;
  background: url('~@/assets/login.svg');
  background-size: 100%;

  .login-logo {
    display: flex;
    align-items: center;
    margin-bottom: 30px;

    .svg-icon {
      font-size: 48px;
    }

    img {
      height: 48px;
    }
    h1 {
      margin-left: 10px;
      margin-bottom: 0;
    }
  }

  ::v-deep(.ant-form) {
    width: 400px;

    .ant-col {
      width: 100%;
    }
    .ant-form-item-label {
      padding-right: 6px;
    }
  }
  .check-code {
    display: flex;
    justify-content: space-between;
    div {
      display: inline-block;
    }
    .image-code {
      justify-content: space-between;
    }
  }
}
</style>

<template>
  <div class="loginpage">
    <img src="../../assets/user.png" />
    <input
      class="phonenum"
      v-model="data.mobile"
      placeholder="&nbsp;&nbsp;请输入手机号"
    />
    <input
      class="password"
      v-model="data.password"
      placeholder="&nbsp;&nbsp;请输入密码"
      type="password"
    />
    <div class="login" @click="onClick">登陆</div>
    <div class="belowlogin">
      <span @click="register">立即注册</span>
      <div class="gap"></div>
      <span>忘记密码</span>
    </div>
  </div>
  <ToastViewVue v-if="data.toast" :msg="data.toastmsg"></ToastViewVue>
</template>

<script setup>
import { useRouter } from 'vue-router'
import axios from 'axios'
import { reactive } from 'vue'
import ToastViewVue from '@/components/ToastView.vue'
const router = useRouter()
const data = reactive({
  mobile: '',
  password: '',
  toastmsg: '登陆失败',
  toast: false
})
const onClick = async () => {
  axios
    .post('/api/user/login', {
      mobile: data.mobile,
      password: data.password
    })
    .then(() => {
      localStorage.isLogin = true
      router.push({ name: 'home' })
    })
    .catch(() => {
      localStorage.isLogin = true
      // data.toast = true
      // setTimeout(() => {
      //   data.toast = false
      // }, 2000)
      // router.push({ name: 'login' })
      router.push({ name: 'home' })
    })
}
const register = () => {
  router.push({ name: 'register' })
}
</script>

<style lang="scss" scoped>
.loginpage {
  position: absolute;
  top: 20%;
  text-align: center;
  color: rgb(74, 74, 74);
  img {
    display: block;
    margin: 0 auto;
    height: 100px;
    margin-bottom: 40px;
  }
  input {
    width: 75%;
    height: 45px;
    margin-bottom: 15px;
    border: 1px solid rgb(189, 189, 189);
    border-radius: 8px;
    background-color: rgba(241, 241, 241, 0.273);
  }
  .login {
    margin: 10px 0 30px 12%;
    background-color: rgb(0, 140, 255);
    color: white;
    width: 76%;
    height: 45px;
    line-height: 45px;
    border: 1px solid rgb(189, 189, 189);
    border-radius: 8px;
  }
  .belowlogin {
    font-size: 15px;
    display: flex;
    margin-left: 30%;
    .gap {
      width: 2px;
      height: 13px;
      background-color: gray;
      margin: 5px 20px;
    }
  }
}
</style>

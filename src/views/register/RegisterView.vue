<template>
  <div class="loginpage">
    <img src="../../assets/user.png" />
    <input class="phonenum" placeholder="&nbsp;&nbsp;请输入手机号" />
    <input class="password" placeholder="&nbsp;&nbsp;请输入密码" type="password"/>
    <input class="password" placeholder="&nbsp;&nbsp;请确认密码" type="password"/>
    <div class="login" @click="onClick">注册</div>
    <span @click="tologin">去登陆</span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const onClick = () => {
  localStorage.isLogin = true
  router.push({ name: 'login' })
}
const tologin = () => {
  router.push({ name: 'login' })
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
    margin: 10px 0 15px 12%;
    background-color: rgb(0, 140, 255);
    color: white;
    width: 76%;
    height: 45px;
    line-height: 45px;
    border: 1px solid rgb(189, 189, 189);
    border-radius: 8px;
  }
  span {
    margin: 0 auto;
    font-size: 15px;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

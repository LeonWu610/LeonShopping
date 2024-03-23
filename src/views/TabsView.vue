<script setup>
import { ref } from 'vue'

const active = ref('home')
</script>

<template>
    <VanTabbar v-model="active" class="tab">
            <VanTabbarItem name="home" icon="home-o" to="/">主页</VanTabbarItem>
            <VanTabbarItem name="order" icon="bag-o" to='/orderList'>订单</VanTabbarItem>
            <VanTabbarItem name="me" icon="contact-o" to="/login">我的</VanTabbarItem>
    </VanTabbar>
</template>

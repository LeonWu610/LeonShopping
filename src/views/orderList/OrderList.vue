<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'

const active = ref('order')
const store = useStore()
const cartList1 = store.state.cartList[1]
const cartList2 = store.state.cartList[2]
const cartList = [cartList1, cartList2]
const route = useRoute()
const shopID = route.params.id

let total = 0
let count = 0
const deliver = (productList) => {
  total += productList.count * productList.price
  count += productList.count
  total.toFixed(2)
}
const showCondition = () => {
  const condition = store.state.cartList[shopID]?.condition || 'false'
  console.log(condition)
  if (condition === 'true') {
    return '已确认'
  } else {
    return '已取消'
  }
}
</script>

<template>
  <div class="wrapper" v-if="cartList">
    <div class="title">我的订单</div>
    <div class="orders" v-for="item in cartList" :key="item.shopName">
      <div class="order" v-if="item.productList">
        <div class="order__title">
          {{ item.shopName }}
          <span class="order__status">{{ showCondition() }}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <template v-for="productList in item.productList" :key="productList.shopID" >{{ deliver(productList) }}
            <img class="order__content__imgs__img" :src="productList.imgUrl">
            </template>
          </div>
          <div class="order__content__info">
            <div class="order__content__info__price">{{ total }}</div>
            <div class="order__content__info__count">{{ count }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <VanTabbar v-model="active" class="tab">
    <VanTabbarItem name="home" icon="home-o" to="/">主页</VanTabbarItem>
    <VanTabbarItem name="order" icon="bag-o" to='/orderList'>订单</VanTabbarItem>
    <VanTabbarItem name="me" icon="contact-o" to="/login">我的</VanTabbarItem>
  </VanTabbar>
</template>

<style lang="scss" scoped>
.wrapper {
  overflow-y: scroll;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgb(242, 242, 242);
}
.title {
  line-height: 44px;
  background: white;
  font-size: 16px;
  text-align: center;
}
.orders {
}
.order {
  margin: 16px 18px;
  padding: 16px;
  background: white;
  border-radius: 5px;
  &__title {
    line-height: 22px;
    font-size: 16px;
    margin-bottom: 10px;
  }
  &__status {
    float: right;
    font-size: 14px;
    color: rgb(75, 75, 75);
  }
  &__content {
    display: flex;
    &__imgs {
      &__img {
        width: 40px;
        height: 40px;
        margin-right: 12px;
      }
    }
    &__info {
      width: 70px;
      margin-left: auto;
      margin-top: 10px;
      &__price {
        margin-bottom: 10px;
        line-height: 2px;
        font-size: 14px;
        color: red;
        text-align: right;
      }
      &__count {
        line-height: 14px;
        font-size: 12px;
        text-align: right;
      }
    }
  }
}
</style>

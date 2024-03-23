<template>
  <div class="mask" v-if="showCart && total > 0" @click="handleCartShow"></div>
  <div class="cart">
    <div class="product" v-if="showCart && total > 0">
      <div class="product__header">
        <div class="product__header__all" @click="() => setCartItemsChecked(shopID)">
          <span class="product__header__icon iconfont" v-html="allChecked ? `&#xe618;` : `&#xe66c;`"></span>
          全选
        </div>
        <div class="product__header__clear" @click="() => clearCartProduct(shopID)">清空购物车</div>
      </div>
      <template v-for="item in productList" :key="item.id">
        <div class="product__item" v-if="item.count > 0">
          <div
            class="product__item__checked iconfont"
            v-html="item.check ? `&#xe618;` : `&#xe66c;`"
            @click="() => changeCartItemChecked(shopID, item.id)"
          ></div>
          <img class="product__item__img" :src="item.imgUrl" />
          <div class="product__item__detail">
            <h4 class="product__item__title">{{ item.name }}</h4>
            <p class="product__item__price">
              <span class="product__item__yen">&yen;</span>{{ item.price }}
              <span class="product__item__origin">&yen;{{ item.originalPrice }}</span>
            </p>
          </div>
          <div class="product__number">
            <span
              class="product__number__minus"
              @click="
                () => {
                  changeCartItemInfo(shopID, item.id, item, -1)
                }
              "
              >-</span>
            {{ item.count || 0 }}
            <span
              class="product__number__plus"
              @click="
                () => {
                  changeCartItemInfo(shopID, item.id, item, 1)
                }
              "
              >+</span>
          </div>
        </div>
      </template>
    </div>
    <div class="check">
      <div class="check__icon">
        <img
          src="http://www.dell-lee.com/imgs/vue3/basket.png"
          class="check__icon__img"
          @click="handleCartShow"
        />
        <div class="check__icon__tag">{{ total }}</div>
      </div>
      <div class="check__info">
        总计：<span class="check__info__price">&yen; {{ price }}</span>
      </div>
      <div class="check__btn" v-if="total > 0">
        <router-link :to="{path: `/order/${shopID}`}">去结算</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  props: ['shopName'],
  setup () {
    const store = useStore()
    const route = useRoute()
    const showCart = ref(false)
    const shopID = route.params.id
    const cartList = store.state.cartList

    const total = computed(() => {
      const productList = cartList[shopID]?.productList
      console.log(productList)
      let count = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          count += product.count
        }
      }
      return count
    })

    const allChecked = computed(() => {
      const productList = cartList[shopID]?.productList
      let result = true
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          if (product.count > 0 && !product.check) {
            result = false
          }
        }
      }
      return result
    })

    const price = computed(() => {
      const productList = cartList[shopID]?.productList
      let count = 0
      if (productList) {
        for (const i in productList) {
          const product = productList[i]
          if (product.check) {
            count += product.count * product.price
          }
        }
      }
      return count.toFixed(2)
    })

    const productList = computed(() => {
      const productList = cartList[shopID]?.productList || []
      return productList
    })

    const changeCartItemInfo = (shopID, productId, productInfo, num) => {
      store.commit('changeCartItemInfo', {
        shopID,
        productId,
        productInfo,
        num
      })
    }

    const changeCartItemChecked = (shopID, productId) => {
      store.commit('changeCartItemChecked', { shopID, productId })
    }

    const clearCartProduct = (shopID) => {
      store.commit('clearCartProduct', { shopID })
    }

    const setCartItemsChecked = (shopID) => {
      store.commit('setCartItemsChecked', { shopID })
    }

    const handleCartShow = () => {
      showCart.value = !showCart.value
    }

    return {
      total,
      price,
      showCart,
      productList,
      changeCartItemInfo,
      shopID,
      changeCartItemChecked,
      clearCartProduct,
      allChecked,
      setCartItemsChecked,
      handleCartShow
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.cart {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid rgb(208, 208, 208);
  background-color: white;
  z-index: 2;
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background-color: rgba(128, 128, 128, 0.488);
  z-index: 1;
}
.product {
  flex: 1;
  overflow-y: scroll;
  background-color: white;
  &__header {
    line-height: 50px;
    display: flex;
    &__icon {
      color: rgb(0, 149, 255);
      margin: 0 15px;
      font-size: 20px;
    }
    &__clear {
      flex: 1;
      text-align: right;
      margin-right: 16px;
      font-size: 15px;
    }
  }
  &__item {
    position: relative;
    display: flex;
    padding: 12px 0;
    margin: 0 16px;
    border-bottom: 0.5px solid gray;
    &__checked {
      line-height: 50px;
      color: rgb(0, 149, 255);
      margin-right: 20px;
      font-size: 20px;
    }
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 46px;
      height: 46px;
      margin-right: 16px;
    }
    h4 {
      margin: 0;
      line-height: 20px;
      font-size: 14px;
      color: rgb(44, 44, 44);
      @include ellipsis;
    }
    &__price {
      margin: 0;
      line-height: 20px;
      font-size: 14px;
      color: red;
    }
    &__yen {
      font-size: 12px;
    }
    &__origin {
      margin-left: 6px;
      line-height: 20px;
      font-size: 12px;
      text-decoration: line-through;
      color: rgb(78, 78, 78);
    }
    .product__number {
      position: absolute;
      right: 18px;
      bottom: 12px;
      &__minus,
      &__plus {
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 17px;
        font-size: 20px;
        border-radius: 50%;
        text-align: center;
      }
      &__minus {
        border: 1px solid black;
        margin-right: 10px;
      }
      &__plus {
        background: rgb(65, 166, 255);
        color: white;
        margin-left: 10px;
      }
    }
  }
}
.check {
  display: flex;
  line-height: 50px;
  &__icon {
    position: relative;
    width: 90px;
    &__img {
      display: block;
      margin: 10px auto;
      width: 28px;
      height: 30px;
    }
    &__tag {
      position: absolute;
      top: 8px;
      right: 10px;
      width: 15px;
      height: 15px;
      font-size: 10px;
      line-height: 15px;
      text-align: center;
      background: red;
      color: white;
      border-radius: 50%;
    }
  }
  &__info {
    flex: 1;
    font-size: 18px;
    &__price {
      color: red;
      font-size: 22px;
    }
  }
  &__btn {
    width: 98px;
    background: rgb(0, 179, 255);
    text-align: center;
    a {
      text-decoration: none;
      color: white;
    }
  }
}
</style>

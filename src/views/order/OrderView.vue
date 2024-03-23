<template>
    <div class="wrapper">
        <div class="top">
            <div class="top__header">
                <div class="top__header__back iconfont" @click="handleBackClick">&#xe6db;</div>
                确认订单
            </div>
            <div class="top__receiver">
                <div class="top__receiver__title">收货地址</div>
                <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
                <div class="top__receiver__info">
                    <div class="top__receiver__info__name">张亮 （先生）18911024662</div>
                </div>
                <div class="top__receiver__icon iconfont">&#xe6db;</div>
            </div>
        </div>
        <div class="product">
            <div class="product__wrapper">
                <div class="product__list">
                    <div class="product__title">{{shopName}}</div>
                    <template v-for="item in productList" :key="item.id">
                        <div class="product__item" v-if="item.count > 0">
                            <img class="product__item__img" :src="item.imgUrl" />
                            <div class="product__item__detail">
                                <h4 class="product__item__title">{{item.name}}</h4>
                                <p class="product__item__price">
                                    <span class="product__item__price__single">&yen; {{item.price}} × {{ item.count }}</span>
                                    <span class="product__item__price__total">&yen; {{(item.price*item.count).toFixed(2)}}</span>
                                </p>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
        <div class="order">
            <div class="order__price">实付金额 <b>¥{{ price }}</b></div>
            <div class="order__btn" @click="handleMaskShow">提交订单</div>
        </div>
        <div class="mask" v-if="showMask">
            <div class="mask__content">
                <h3 class="mask__content__title">确认要离开收银台？</h3>
                <p class="mask__content__desc">请尽快完成支付，否则将被取消</p>
                <div class="mask__content__btns">
                    <div class="mask__content__btns--first" @click="handleMaskShow">取消订单</div>
                    <div class="mask__content__btns--last" @click="handleConfirmOrder">确认支付</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const route = useRoute()
    const shopID = route.params.id
    const cartList = store.state.cartList
    const productList = computed(() => {
      const productList = cartList[shopID]?.productList || []
      return productList
    })
    const shopName = computed(() => {
      const shopName = cartList[shopID]?.shopName || []
      return shopName
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

    const router = useRouter()
    const handleBackClick = () => {
      router.back()
    }

    const handleConfirmOrder = () => {
      router.push('/')
      store.commit('handleConfirmOrder', { shopID })
    }

    const showMask = ref(false)
    const handleMaskShow = () => {
      showMask.value = !showMask.value
      store.commit('handleCancleOrder', { shopID })
    }

    return { productList, shopName, price, showMask, handleBackClick, handleConfirmOrder, handleMaskShow }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #f1f1f1b3;
    overflow-y: scroll;
}
.top {
    position: relative;
    height: 196px;
    background-size: 100% 159px;
    background-image: linear-gradient(0deg, rgba(0, 145, 255, 0.00) 4% ,#0091FF 50%);
    background-repeat: no-repeat;
    &__header {
        position: relative;
        padding-top: 40px;
        line-height: 24px;
        color: white;
        text-align: center;
        font-size: 16px;
        &__back {
            position: absolute;
            left: 18px;
            font-size: 22px;
        }
    }
    &__receiver {
        position: absolute;
        left: 18px;
        right: 18px;
        bottom: 0;
        height: 110px;
        background: white;
        border-radius: 4px;
        &__title {
            line-height: 22px;
            padding: 16px 0 14px 16px;
            font-size: 16px;
            color: rgb(20, 20, 20);
        }
        &__address {
            line-height: 20px;
            padding: 0 4px 0 16px;
            font-size: 14px;
            color: rgb(20, 20, 20);
        }
        &__info {
            padding: 6px 0 0 16px;
            &__name {
                margin-right: 6px;
                line-height: 18px;
                font-size: 12px;
                color: rgb(110, 110, 110);
            }
        }
        &__icon {
            transform: rotate(180deg);
            position: absolute;
            right: 16px;
            top: 50px;
            color: rgb(110, 110, 110);
        }
    }
}
.product {
    margin: 0 18px 55px 18px;
    &__title {
        padding: 16px 16px 0 16px;
        font-size: 16px;
    }
    &__wrapper {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 60px;
        top: 240px;
        overflow-y: scroll;
        margin: 0 16px;
        border-radius: 6px;
    }
    &__list {
        background: white;
        border-radius: 6px;
    }
    &__item {
        position: relative;
        display: flex;
        padding: 16px;
        &__img {
            width: 46px;
            height: 46px;
            margin-right: 16px;
        }
        &__detail {
            flex: 1;
        }
        h4 {
            margin: 0;
            line-height: 20px;
            font-size: 14px;
            color: rgb(44, 44, 44);
            @include ellipsis;
        }
        &__price {
            display: flex;
            margin: 6px 0 0 0;
            line-height: 20px;
            font-size: 14px;
            color: red;
            &__single {
                width: 100px;
            }
            &__total {
                flex: 1;
                text-align: right;
                color: black;
            }
        }
    }
}
.order {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 49px;
    line-height: 49px;
    background: white;
    &__price {
        flex: 1;
        text-indent: 24px;
        font-size: 14px;
    }
    &__btn {
        width: 100px;
        background: #0091FF;
        color: white;
        text-align: center;
        font-size: 15px;
    }
}
.mask {
    z-index: 1;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(128, 128, 128, 0.564);
    &__content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 300px;
        height: 156px;
        background: white;
        border-radius: 4px;
        text-align: center;
        &__title {
            font-size: 18px;
            line-height: 26px;
            margin: 24px 0 0  0;
        }
        &__desc {
            margin-top: 8px;
            font-size: 14px;
        }
        &__btns {
            display: flex;
            margin: 24px 58px;
            &--first, &--last {
                flex: 1;
                width: 180px;
                line-height: 32px;
                border-radius: 16px;
                font-size: 15px;
            }
            &--first {
                margin-right: 12px;
                border: 1px solid cornflowerblue;
                color: #0091FF;
            }
            &--last {
                margin-left: 12px;
                background-color: #0091FF;
                color: white;
            }
        }
    }
}
</style>

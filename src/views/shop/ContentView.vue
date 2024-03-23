<template>
  <div class="content">
    <div class="category">
      <div
        :class="{
          'category__item': true,
          'category__item--active': currentTab === item.tab
        }"
        v-for="item in categories"
        :key="item.tab"
        @click="() => handleCategoryClick(item.tab)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in contentList" :key="item.id">
        <img class="product__item__img" :src="item.imgUrl" />
        <div class="product__item__detail">
          <h4 class="product__item__title">{{ item.name }}</h4>
          <p class="product__item__sales">{{ item.sales }}</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{ item.price }}
            <span class="product__item__origin"
              >&yen;{{ item.originalPrice }}</span
            >
          </p>
        </div>
        <div class="product__number">
          <span
            class="product__number__minus"
            @click="
              () => {
                changeCartItemInfo(shopID, item.id, item, -1, shopName)
              }
            "
          >-</span>
          {{ cartList.cartList[shopID]?.productList?.[item.id]?.count || 0 }}
          <span
            class="product__number__plus"
            @click="
              () => {
                changeCartItemInfo(shopID, item.id, item, 1, shopName)
              }
            "
            >+</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
const categories = [
  {
    name: '全部商品',
    tab: 'all'
  },
  {
    name: '秒杀',
    tab: 'seckill'
  },
  {
    name: '新鲜水果',
    tab: 'fruit'
  }
]
const contentList = [
  {
    id: '1',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/tomato.png',
    name: '番茄250g/份',
    sales: '月售十件',
    price: 33.6,
    originalPrice: 39.6
  },
  {
    id: '2',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/cherry.png',
    name: '车厘子350g/份',
    sales: '月售三十件',
    price: 24.5,
    originalPrice: 28.6
  },
  {
    id: '3',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/orange.png',
    name: '橙子500g/份',
    sales: '月售十八件',
    price: 12.3,
    originalPrice: 18.8
  },
  {
    id: '4',
    imgUrl: 'http://www.dell-lee.com/imgs/vue3/crab.png',
    name: '帝王蟹750g/份',
    sales: '月售三十件',
    price: 74.5,
    originalPrice: 88.6
  }
]
export default {
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopID = route.params.id
    const currentTab = ref(categories[0].tab)
    const handleCategoryClick = (tab) => {
      currentTab.value = tab
    }
    const useCartEffect = () => {
      const store = useStore()
      // const cartList = toRefs(store.state)
      const changeCartItemInfo = (shopID, productId, productInfo, num, shopName) => {
        store.commit('changeCartItemInfo', { shopID, productId, productInfo, num })
        changeShopName(shopID, shopName)
      }
      const changeShopName = (shopID, shopName) => {
        store.commit('changeShopName', { shopID, shopName })
      }
      console.log(store.state.cartList)
      return { cartList: store.state, changeCartItemInfo }
    }
    const { cartList, changeCartItemInfo } = useCartEffect()
    return {
      contentList,
      categories,
      handleCategoryClick,
      currentTab,
      cartList,
      changeCartItemInfo,
      shopID
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/mixin.scss';
.content {
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  top: 186px;
  bottom: 50px;
}
.category {
  width: 90px;
  overflow-y: scroll;
  background: rgb(244, 244, 244);
  &__item {
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    &--active {
      background: white;
    }
  }
}
.product {
  flex: 1;
  overflow-y: scroll;
  &__item {
    position: relative;
    display: flex;
    padding: 12px 0;
    margin: 0 16px;
    border-bottom: 0.5px solid gray;
    &__detail {
      overflow: hidden;
    }
    &__img {
      width: 68px;
      height: 68px;
      margin-right: 16px;
    }
    h4 {
      margin: 0;
      line-height: 20px;
      font-size: 14px;
      color: rgb(44, 44, 44);
      @include ellipsis;
    }
    &__sales {
      margin: 3px 0;
      line-height: 16px;
      font-size: 10px;
      color: rgb(62, 62, 62);
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
</style>

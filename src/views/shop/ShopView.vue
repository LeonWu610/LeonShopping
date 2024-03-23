<template>
  <div class="wrapper">
    <div class="search">
      <div
        class="search__back iconfont"
        @click="handleBackClick">
        &#xe6db;
      </div>
      <div class="search__content">
        <span class="search__content__icon iconfont">&#xe6b9;</span>
        <input
          class="search__content__input"
          placeholder="请输入商品名称："
        >
      </div>
    </div>
  <ShopinfoViewVue :item="item" :hideBorder="true"></ShopinfoViewVue>
  </div>
  <ContentViewVue :shopName="item.name"></ContentViewVue>
  <CartView></CartView>
</template>

<script>
import { useRouter } from 'vue-router'
/* import { reactive } from 'vue'
import { get } from '../../utils/request' */
import ShopinfoViewVue from '@/components/ShopinfoView.vue'
import ContentViewVue from './ContentView.vue'
import CartView from './CartView.vue'

export default {
  components: { ShopinfoViewVue, ContentViewVue, CartView },
  setup () {
    const router = useRouter()
    /* const data = reactive({ item: {} })
    const getItemData = async () => {
      const result = await get('/api/shop/1')
      console.log(result)
    }
    getItemData() */
    const item = {
      name: '沃尔玛',
      tags: '月售1万+&nbsp;&nbsp;&nbsp;起送¥0&nbsp;&nbsp;&nbsp;基础运费¥5',
      desc: 'VIP尊享满89元减4元运费券 (每月3张)'
    }
    const handleBackClick = () => {
      router.back()
    }
    return { item, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
    padding: 15px;
}
.search{
  margin: 10px 0 16px 0;
  display: flex;
  line-height: 32px;
  &__back {
    font-size: 24px;
    width: 30px;
  }
  &__content {
    flex: 1;
    display: flex;
    line-height: 32px;
    background-color: #f5f5f5;
    border-radius: 16px;
    margin-right: 20px;
    &__icon {
      width: 44px;
      text-align: center;
      font-size: 20px;
    }
    &__input {
      flex: 1;
      border: none;
      background: none;
      font-size: 14px;
    }
  }
}
</style>

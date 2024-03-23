<template>
  <h1>附近店铺</h1>
  <div class="nearby">
    <router-link
      :to="`/shop/${item.id}`"
      v-for="item in nearbyList"
      :key="item.id"
    >
      <shopinfo-view :item="item"></shopinfo-view>
    </router-link>
  </div>
</template>

<script>
import ShopinfoView from '@/components/ShopinfoView.vue'

export default {
  components: { ShopinfoView },
  setup () {
    const nearbyList = [
      {
        id: '1',
        name: '沃尔玛',
        tags: '月售1万+&nbsp;&nbsp;&nbsp;起送¥0&nbsp;&nbsp;&nbsp;基础运费¥5',
        desc: 'VIP尊享满89元减4元运费券 (每月3张)'
      },
      {
        id: '2',
        name: '山姆会员店',
        tags: '月售1万+&nbsp;&nbsp;&nbsp;起送¥0&nbsp;&nbsp;&nbsp;基础运费¥5',
        desc: 'VIP尊享满89元减4元运费券 (每月3张)'
      }
    ]
    return { nearbyList }
  }
}
</script>

<style lang="scss">
h1 {
  font-size: 23px;
}

.nearby {
  display: block;
  a {
    color: black;
  }
}
</style>

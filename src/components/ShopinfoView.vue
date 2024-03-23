<template>
  <div class="item" v-if="item">
    <img src="../assets/near.png" />
    <div class="dscp">
      <h2>{{ item.name }}</h2>
      <p v-html="item.tags"></p>
      <span>{{ item.desc }}</span>
      <div :class="{'box': true, 'box--bordered': hideBorder ? false : true}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'hideBorder']
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  margin-bottom: 15px;
  img {
    width: 70px;
    height: 100%;
    margin-right: 20px;
  }
  h2 {
    font-size: 23px;
    margin: 0 0 5px 0;
  }
  p {
    margin: 0 0 3px 0;
    font-size: 15px;
    gap: 5px;
  }
  span {
    font-size: 14px;
    color: rgb(216, 0, 0);
  }
  .box {
    margin: 10px -30px 0 0;
    &--bordered{
      border: .5px solid rgb(229, 229, 229);
    }
  }
}
</style>

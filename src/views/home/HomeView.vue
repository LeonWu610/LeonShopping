<script setup>
import NearbyView from './NearbyView.vue'
import StaticPart from './StaticPart.vue'

</script>

<template>
  <div class="homepage">
    <StaticPart></StaticPart>
    <NearbyView></NearbyView>
  </div>
</template>

<style lang="scss">
.homepage{
  color: rgb(62, 62, 62);
  padding: 0 20px;
}
</style>

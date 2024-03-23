<template>
    <div class="toast">{{ msg }}</div>
</template>

<script>
export default {
  props: ['msg']
}
</script>

<style lang="scss" scoped>

.toast{
    position: fixed;
    top: 50%;
    left: 30%;
    padding: 15px 30px;
    background-color: rgb(239, 239, 239);
    color: rgb(39, 39, 39);
    border-radius: 8px;
}
</style>

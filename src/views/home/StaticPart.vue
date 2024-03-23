<script setup>
import TabsView from '../TabsView.vue'
</script>

<template>
    <div class="head">
      <VanIcon name="location-o" class="loca"></VanIcon>
      <span>北京理工大学国防科技园2号楼10层</span>
      <VanIcon name="bell" class="bell"></VanIcon>
    </div>
    <div class="searchbar">
      <input placeholder="a bc"/>
    </div>
    <div class="banner">
      <img src="../../assets/banner.jpg">
    </div>
    <div class="icons">
      <div class="icon">
        <img src="../../assets/超市.png">
        <span>超市便利</span>
      </div>
      <div class="icon">
        <img src="../../assets/医药健康.png">
        <span>医药健康</span>
      </div>
      <div class="icon">
        <img src="../../assets/大牌免运.png">
        <span>大牌免运</span>
      </div>
      <div class="icon">
        <img src="../../assets/水果店.png">
        <span>水果店</span>
      </div>
      <div class="icon">
        <img src="../../assets/家居.png">
        <span>家居时尚</span>
      </div>
      <div class="icon">
        <img src="../../assets/红包.png">
        <span>红包套餐</span>
      </div>
      <div class="icon">
        <img src="../../assets/签到.png">
        <span>签到</span>
      </div>
      <div class="icon">
        <img src="../../assets/菜市场.png">
        <span>菜市场</span>
      </div>
      <div class="icon">
        <img src="../../assets/蛋糕.png">
        <span>烘焙蛋糕</span>
      </div>
      <div class="icon">
        <img src="../../assets/鲜花.png">
        <span>鲜花绿植</span>
      </div>
    </div>
    <div class="gap"></div>
    <TabsView></TabsView>
</template>

<style lang="scss">

.head {
  margin: 20px 0;
  padding-right: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  .loca{
    margin-right: 5px;
  }
  .bell{
    position: absolute;
    margin-left: 10px;
    right: 30px;
    top: 23px;
  }
}

.searchbar{
  text-align: center;
  input{
    width: 96%;
    height: 30px;
    border-radius: 5px;
    border: 1px solid rgb(179, 179, 179);
    background-color: rgba(248, 248, 248, 0.689);
  }
}

.banner{
  text-align: center;
  height: 0;
  overflow: hidden;
  padding-bottom: 25.4%;
  margin: 12px 0 ;
  img{
    width: 98%;
  }
}

.icons{
  display: flex;
  flex-wrap: wrap;
  .icon{
    display: flex;
    flex-direction: column;
    font-size: 15px;
    align-items: center;
    width: 78px;
    margin-bottom: 10px;
  }
  img{
    width: 50px;
    margin-bottom: 5px;
  }
}

.gap{
  height: 10px;
  background-color: rgb(231, 231, 231);
  margin: 5px -20px 0 -20px;
}
</style>

<template>
  <div class="nav">
    <div class="top" @click="totop">
      <i></i>
      <p>排行榜</p>
    </div>
    <div class="top" @click="tosonger">
      <i></i>
      <p>歌手</p>
    </div>
    <div class="top">
      <i></i>
      <p>分类</p>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const data = reactive({
      totop() {
        router.push({ path: '/topsong' })
      },
      tosonger() {
        router.push({ path: '/songer' })
      }
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.nav {
  width: 1100px;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  .top {
    width: 200px;
    height: 50px;
    display: flex;
    align-items: center;
    line-height: 50px;
    font-size: 20px;
    text-align: center;
    border-radius: 10px;
    background-color: rgb(204, 144, 249);
    overflow: hidden;
    cursor: pointer;
    transition: 0.3s ease-out;
    &:hover {
      transform: translatey(-2px);
    }
    i {
      width: 80px;
      height: 80px;
      border-radius: 0 40px 40px 0;
      background-color: rgb(235, 165, 240);
    }
    p {
      margin-left: 10px;
      color: #fff;
    }
  }
}
</style>

<template>
  <div class="main-left-nav">
    <ul>
      <li :class="flag == 1 ? 'active' : ''" @click="change(1)">
        <router-link to="/album"
          ><img src="@/assets/1.svg" alt="" /> 为你推荐</router-link
        >
      </li>
      <li :class="flag == 2 ? 'active' : ''" @click="change(2)">
        <router-link to="/bank"
          ><img src="@/assets/2.svg" alt="" /> 乐库</router-link
        >
      </li>
      <li :class="flag == 3 ? 'active' : ''" @click="change(3)">
        <router-link to="/list"
          ><img src="@/assets/3.svg" alt="" /> 歌单</router-link
        >
      </li>
      <li :class="flag == 5 ? 'active' : ''" @click="change(5)">
        <router-link to="/vedio"
          ><img src="@/assets/5.svg" alt="" /> 视频</router-link
        >
      </li>
      <h3>我的音乐</h3>
      <li :class="flag == 6 ? 'active' : ''" @click="change(6)">
        <router-link to=""
          ><img src="@/assets/6.svg" alt="" /> 我的收藏</router-link
        >
      </li>
      <li :class="flag == 7 ? 'active' : ''" @click="change(7)">
        <router-link to=""
          ><img src="@/assets/4.svg" alt="" /> 我的电台</router-link
        >
      </li>
      <li :class="flag == 8 ? 'active' : ''" @click="change(8)">
        <router-link to=""
          ><img src="@/assets/7.svg" alt="" /> 本地下载</router-link
        >
      </li>
      <li :class="flag == 9 ? 'active' : ''" @click="change(9)">
        <router-link to=""
          ><img src="@/assets/8.svg" alt="" /> 最近播放</router-link
        >
      </li>
      <li :class="flag == 10 ? 'active' : ''" @click="change(10)">
        <router-link to=""
          ><img src="@/assets/9.svg" alt="" /> 默认列表</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  setup() {
    const data = reactive({
      flag: 1,
      change(x) {
        this.flag = x
      }
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.main-left-nav {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 790px;
  width: 200px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 10px;
    height: 780px;
    background-color: #e3e1e3;
    border-radius: 5px;
  }
  ul {
    li {
      height: 30px;
      width: 160px;
      margin-top: 20px;
      padding: 0 10px;
      border-radius: 5px;
      font-size: 15px;
      line-height: 30px;
      display: flex;
      align-items: center;
      overflow: hidden;
      &:hover {
        background-color: rgb(235, 235, 235);
        &[class='active'] {
          background-color: rgb(227, 227, 227);
        }
      }
      a {
        display: flex;
        align-items: center;
        width: 100%;
        img {
          margin-right: 8px;
          width: 20px;
          height: 20px;
        }
      }
    }
    .active {
      background-color: rgb(227, 227, 227);
    }
  }
  h3 {
    margin-top: 30px;
    color: rgb(194, 194, 194);
    font-weight: normal;
  }
}
</style>

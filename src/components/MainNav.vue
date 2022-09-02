<template>
  <div class="main-nav">
    <div class="main-nav-left">
      <ul>
        <li>
          <i class="el-icon-arrow-left" @click="back"></i>
        </li>
        <li>
          <i class="el-icon-arrow-right" @click="forward"></i>
        </li>
        <li>
          <i class="el-icon-refresh-right"></i>
        </li>
      </ul>
    </div>
    <div class="main-nav-right"><input type="text" /></div>
    <div class="user">
      <img src="../assets/head.jpg" alt="" class="header" /><span @click="changeflag">{{
        username
      }}</span>
    </div>
  </div>
</template>

<script>
import { Search } from '@element-plus/icons-vue'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const data = reactive({
      input: '',
      username: '点击登录',
      back() {
        router.back()
      },
      forward() {
        router.forward()
      },
      changeflag() {
        store.state.loginflag = 1
      }
    })
    return {
      Search,
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less">
@border-color:rgba (0, 0, 0, 0.3);
.main-nav {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.main-nav-left {
  width: 200px;
  ul {
    display: flex;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    li {
      margin-left: 10px;
    }
  }
  i {
    cursor: pointer;
    font-size: 20px;
    margin-right: 15px;
  }
}
.main-nav-right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  position: relative;
  input {
    padding-left: 35px;
    width: 400px;
    height: 34px;
    background-color: rgb(239, 239, 239);
    border-radius: 17px;
  }
  &::after {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    top: 19px;
    left: 308px;
    background-image: url('../assets/search.svg');
    background-size: contain;
    opacity:.4;
  }
}
.user {
  display: flex;
  align-items: center;
  width: 200px;
  .header {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 20px;
  }
  span {
    color: rgb(133, 133, 133);
    font-size: 15px;
    cursor: pointer;
    &:hover {
      color: rgb(53, 193, 255);
    }
  }
}
</style>

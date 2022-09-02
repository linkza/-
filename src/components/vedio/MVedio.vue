<template>
  <div class="vedio">
    <div class="nav">
      <div class="sort" @click.stop="changef">
        {{ sort
        }}<img src="../../assets/bottom.svg" alt="" v-show="flag == 0" /><img
          src="../../assets/top.svg"
          alt=""
          v-show="flag"
        />
      </div>
      <ul class="sorts" v-if="flag">
        <h3>
          <div :class="active == -1 ? 'active' : ''" @click="changeclass(-1)">
            全部视频
          </div>
        </h3>
        <li
          v-for="(item, index) in sorts"
          :key="index"
          :class="active == index ? 'active' : ''"
          @click="changeclass(index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>
    <ul class="vcontent">
      <li v-for="(item, index) in sorts" :key="index">
        <img :src="item.cover" alt="" />
        <div class="shade"><span></span></div>
        <div class="text">
          <p class="description">{{ item.name }}</p>
          <p class="creator">
            <span v-for="(x, y) in item.artists" :key="y"
              >{{ x.name }}<i v-if="y + 1 != item.artists.length">/</i></span
            >
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const data = reactive({
      sorts: [],
      sort: '全部视频',
      flag: 0,
      active: -1,
      async getveido() {
        const { data: ref } = await axios.get('/video/group/list')
        this.sorts = markRaw(ref.data)
        const { data } = await axios.get('/video/group?id=9104')
        console.log(ref, data)
      },
      changef() {
        this.flag = !this.flag
      },
      hide() {
        this.flag = 0
      },
      changeclass(i) {
        this.active = i
      },
      tosonglist(id) {
        router.push({ path: '/songlist', query: { id, is: 1 } })
      }
    })
    data.getveido()
    onMounted(() => {
      document.addEventListener('click', data.hide.bind(data))
    })
    return {
      ...toRefs(data),
      store
    }
  }
}
</script>

<style lang="less" scoped>
.vedio {
  margin-top: 30px;
  .nav {
    width: 1100px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .sort {
      width: 150px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;

      font-size: 15px;
      border-radius: 20px;
      border: 1px solid rgb(217, 217, 217);
      background-color: rgb(239, 239, 239);
      cursor: pointer;
      &:hover {
        background-color: rgb(226, 226, 226);
      }
      img {
        margin-left: 5px;
        width: 15px;
        height: 15px;
      }
    }
    .sorts {
      width: 950px;
      height: 400px;
      position: absolute;
      left: 0;
      top: 45px;
      display: flex;
      flex-wrap: wrap;
      padding: 0 24px 19px 24px;
      border: 1px solid rgb(214, 214, 214);
      border-radius: 10px;
      background-color: #fff;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      overflow-x: hidden;
      overflow-y: scroll;
      z-index: 9;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      h3 {
        width: 900px;
        height: 60px;
        padding-top: 20px;
        border-bottom: 1px solid rgb(217, 217, 217);
        div {
          width: 100px;
          height: 30px;
          font-size: 15px;
          line-height: 30px;
          text-align: center;
          font-weight: normal;
          border-radius: 20px;
          cursor: pointer;
          &:hover {
            color: rgb(53, 193, 255);
          }
        }
      }
      li {
        width: 100px;
        height: 30px;
        margin-top: 20px;
        text-align: center;
        color: rgb(133, 133, 133);
        font-size: 14px;
        line-height: 30px;
        border-radius: 20px;
        cursor: pointer;
        &:hover {
          color: rgb(53, 193, 255);
        }
      }
      .active {
        color: rgb(53, 193, 255);
        background-color: rgb(244, 244, 244);
      }
    }
  }
}
</style>

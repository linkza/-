<template>
  <div class="songlist" v-show="show">
    <div class="nav">
      <h3>歌单</h3>
      <ul class="tag">
        <li class="m" @click="toplaylist('精选')">精选</li>
        <li
          v-for="(item, index) in hottagdata"
          :key="index"
          class="m"
          @click="toplaylist(item.name)"
        >
          {{ item.name }}
        </li>
        <li class="all" @click.stop="change">
          全部<img
            src="../../assets/bottom.svg"
            alt=""
            v-show="flag == 0"
          /><img src="../../assets/top.svg" alt="" v-show="flag" />
        </li>
      </ul>
      <div class="tags" v-show="flag" @blur="change">
        <div v-for="(item, index) in tagall" :key="index" class="sort">
          <h4>{{ sort[index] }}</h4>
          <ul>
            <li v-for="(e, i) in item" :key="i" @click="toplaylist(e)">
              {{ e }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="rlist">
      <div class="title">
        <h3>推荐歌单</h3>
      </div>
      <ul class="lcontent">
        <li v-for="(item, index) in listdata" :key="index">
          <img :data-url="item.picUrl" alt="" v-limg />
          <p>
            {{ item.name }}
          </p>
          <span class="pc"
            ><img src="../../assets/PLplay.svg" alt="" />{{
              pl(item.playCount)
            }}</span
          >
          <div class="shade" @click="tosonglist(item.id)"><span></span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw, nextTick, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const data = reactive({
      hottagdata: [],
      flag: 0,
      show: 0,
      sort: ['语种', '风格', '场景', '情感', '主题'],
      tagall: [[], [], [], [], []],
      listdata: [],
      async getnav() {
        const { data: ref } = await axios.get('/playlist/hot')
        this.hottagdata = markRaw(ref.tags)
        const { data } = await axios.get('/playlist/catlist')
        const { data: item } = await axios.get('/personalized?limit=100')
        this.listdata = markRaw(item.result)
        data.sub.forEach((e) => {
          this.tagall[e.category].push(e.name)
        })
        nextTick(() => {
          this.show = 1
        })
      },
      change() {
        this.flag = !this.flag
      },
      hide() {
        this.flag = 0
      },
      toplaylist(cat) {
        router.push({ path: '/playlist', query: { cat } })
      },
      tosonglist(id) {
        router.push({ path: '/songlist', query: { id, is: 1 } })
      },
      pl(c) {
        if (c >= 10000) {
          return c % 10000 ? (c / 10000).toFixed(1) + '万' : c / 10000 + '万'
        } else return c
      }
    })
    data.getnav()
    onMounted(() => {
      document.addEventListener('click', data.hide.bind(data))
    })

    return { ...toRefs(data) }
  }
}
</script>

<style lang="less" scoped>
.songlist {
  width: 1100px;
  margin-top: 30px;
  .nav {
    width: 1100px;
    margin-bottom: 30px;
    position: relative;
    h3 {
      height: 35px;
      position: relative;
      line-height: 35px;
      font-size: 35px;
      &::before {
        content: 'MUSIC LIST';
        height: 20px;
        position: absolute;
        left: 0;
        bottom: -20px;
        line-height: 20px;
        font-size: 12px;
        color: rgb(193, 193, 193);
      }
    }
    .tag {
      margin-top: 15px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        height: 50px;
        width: 160px;
        margin-top: 20px;
        font-size: 15px;
        line-height: 50px;
        text-align: center;
        border-radius: 25px;
        background-color: rgb(239, 239, 239);
        cursor: pointer;
      }
      .m:hover {
        color: rgb(53, 193, 255);
        background-color: rgb(226, 226, 226);
      }
      .all {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid rgb(216, 216, 216);
        background-color: #fff;
        img {
          width: 15px;
          height: 15px;
          margin-left: 10px;
        }
        &:hover {
          color: rgb(53, 193, 255);
        }
      }
    }
    .tags {
      width: 950px;
      height: 400px;
      position: absolute;
      right: 0;
      top: 200px;
      border-radius: 5px;
      border: 1px solid rgb(214, 214, 214);
      background-color: #fff;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE 10+ */
      overflow-x: hidden;
      overflow-y: scroll;
      z-index: 9;
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .sort {
        width: fit-content;
        padding: 10px 0;
        display: flex;
        justify-content: flex-start;
        border-bottom: 1px solid rgb(245, 245, 245);
        h4 {
          width: 150px;
          height: 46px;
          line-height: 46px;
          font-size: 20px;
          text-align: center;
        }
        ul {
          width: 800px;
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          li {
            width: 100px;
            height: 40px;
            margin-left: 10px;
            font-size: 14px;
            line-height: 40px;
            text-align: center;
            border-radius: 20px;
            cursor: pointer;
            &:hover {
              color: rgb(53, 193, 255);
              background-color: rgb(244, 244, 244);
            }
          }
        }
      }
    }
  }
}
</style>

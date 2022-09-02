<template>
  <div class="mc" ref="mc" @scroll="scroll">
    <div class="list">
      <div class="title">
        <h3>{{ sortname }}</h3>
      </div>
      <ul class="lcontent" ref="ul">
        <li v-for="(item, index) in listdata" :key="index">
          <img :data-url="item.coverImgUrl" alt="" v-limg />
          <p>
            {{ item.name }}
          </p>
          <span class="pc"
            ><img src="../assets/PLplay.svg" alt="" />{{
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
import { reactive, toRefs, ref, onActivated } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'PlayList',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const ul = ref(null)
    let fl = 1
    const mc = ref(null)
    const data = reactive({
      st: 0,
      path: '',
      listdata: [],
      sortname: '',
      hot: '',
      cat: 0,
      flag: 0,
      lasttime: 0,
      async getlist(cat) {
        const { data: ref } = await axios.get(
          `/top/playlist?cat=${cat}&limit=30&offset=${this.flag * 30}`
        )
        this.listdata.push(...ref.playlists)
        this.flag++
        fl = 1
      },
      async gethotlist() {
        if (this.listdata.length === 0) {
          const { data: ref } = await axios.get(
            ' /top/playlist/highquality?limit=30'
          )
          this.lasttime = ref.lasttime
          this.listdata.push(...ref.playlists)
        } else {
          const { data: ref } = await axios.get(
            ` /top/playlist/highquality?before=${this.lasttime}&limit=30`
          )
          this.lasttime = ref.lasttime
          this.listdata.push(...ref.playlists)
        }
        this.flag++
        fl = 1
      },
      tosonglist(id) {
        router.push({ path: '/songlist', query: { id, is: 1 } })
      },
      pl(c) {
        return (c / 10000).toFixed(1) + '万'
      },
      scroll(e) {
        if (e.target.scrollHeight - 780 - e.target.scrollTop < 600 && fl) {
          fl = 0
          data.hot ? data.getlist(data.cat) : data.gethotlist()
        }
        this.st = e.target.scrollTop
      }
    })
    onActivated(() => {
      if (data.sortname !== route.query.cat) {
        data.listdata = []
        data.sortname = route.query.cat
        data.hot = route.query.cat === '精选' ? 0 : 1
        data.cat =
          route.query.cat === 'R&B/Soul' ? 'R%26B%2FSoul' : route.query.cat
        data.flag = 0
        data.hot ? data.getlist(data.cat) : data.gethotlist()
        data.st = 0
        return
      }
      mc.value.scrollTop = data.st
    })
    return {
      ...toRefs(data),
      ul,
      mc
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  width: 1100px;
  height: 574px;
  margin-top: 50px;
  .title {
    position: relative;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    h3 {
      height: 35px;
      line-height: 35px;
      font-size: 35px;
    }
    span {
      height: 20px;
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      line-height: 20px;
      font-size: 12px;
      opacity: 0.5;
      img {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>

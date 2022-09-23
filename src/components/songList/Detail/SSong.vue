<template>
  <div class="song" v-if="flag">
    <ul class="title">
      <li class="sname">歌曲名</li>
      <li class="artist">歌手</li>
      <li class="album">专辑</li>
      <li class="time">时长</li>
    </ul>
    <ul class="content">
      <li v-for="(item, index) in songdata" :key="index">
        <div class="sname">
          <span @click="updateMusiclist(item)">{{ item.name }}</span>
        </div>
        <div class="artist">
          <span v-for="(x, y) in item.ar" :key="y"
            >{{ x.name }}<i>{{ item.ar.length == y + 1 ? '' : '、' }}</i></span
          >
        </div>
        <div class="album">
          <span>{{ item.al.name }}</span>
        </div>
        <div class="time">{{ timer(item.dt) }}</div>
      </li>
    </ul>
    <div class="slist" v-if="!hot">
      <div class="title"><h3>你可能喜欢</h3></div>
      <ul class="lcontent">
        <li v-for="(item, index) in store.state.similarlist" :key="index">
          <img :data-url="item.coverImgUrl" alt="" v-limg />
          <p>
            {{ item.name }}
          </p>
          <div class="shade" @click="tosonglist(item.id)"><span></span></div>
        </li>
      </ul>
    </div>
    <div class="dish" v-if="hot">
      <div class="title">
        <h3>其他专辑</h3>
      </div>
      <ul class="dcontent">
        <li v-for="(item, index) in hotAlbums" :key="index">
          <img :src="item.picUrl" alt="" />
          <p>
            {{ item.name }}
          </p>
          <p class="artist">
            {{ item.artist.name }}
          </p>
          <div class="shade" @click="toac(item.id)"><span></span></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter, useRoute, onBeforeRouteUpdate } from 'vue-router'
import timer from '@/hook/time'
import updateMusiclist from '@/hook/updateMusiclist'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const data = reactive({
      id: route.query.id,
      is: route.query.is,
      flag: 1,
      hot: 0,
      hotAlbums: [],
      songdata: [],
      async getsong() {
        this.flag = 0
        if (this.is > 0) {
          const { data: ref } = await axios.get(
            `/playlist/track/all?id=${this.id}`
          )
          this.songdata = ref.songs
          const { data } = await axios.get(`/related/playlist?id=${this.id}`)
          store.state.similarlist = data.playlists
          this.flag = 1
        } else {
          const { data: ref } = await axios.get(`/album?id=${this.id}`)
          this.songdata = ref.songs
          const { data } = await axios.get(
            `/artist/album?id=${ref.album.artist.id}&limit=5`
          )
          this.hot = 1
          this.hotAlbums = data.hotAlbums
          this.flag = 1
        }
      },
      tosonglist(id) {
        router.push({ path: '/songlist', query: { id } })
      },
      timer,
      toac(id) {
        router.push({ path: '/albumcontent', query: { id, is: 0 } })
      }
    })
    data.getsong()
    onBeforeRouteUpdate((to, from, next) => {
      data.id = to.query.id
      data.getsong()
      next()
    })
    return {
      ...toRefs(data),
      store,
      updateMusiclist
    }
  }
}
</script>

<style lang="less" scoped>
.song {
  width: 1100px;
  margin-top: 30px;
  padding-left: 5px;
  li {
    cursor: default;
    div {
      padding-right: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        cursor: pointer;
      }
    }
  }
  .sname {
    width: 490px;
    padding-left: 10px;
    &:nth-child(n + 1):hover {
      span {
        color: rgb(53, 193, 255);
      }
    }
  }
  .artist {
    width: 200px;
  }
  .album {
    width: 300px;
  }
  .time {
    width: 100px;
    color: rgb(133, 133, 133);
  }
  .title {
    display: flex;
    justify-content: flex-start;
    li {
      font-size: 15px;
      color: rgb(133, 133, 133);
    }
  }
  .dish {
    width: 1100px;
    margin-top: 30px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 30px;
    li {
      width: 1090px;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 15px;
      border-radius: 1px;
      &:hover {
        background-color: rgb(243, 243, 243);
      }
    }
  }
  .slist {
    margin-left: -10px;
  }
}
</style>

<template>
  <div class="song">
    <ul class="title">
      <h3>新歌首发</h3>
      <li @click="click(0, 7)" :class="active == 0 ? 'active' : ''">华语</li>
      <li @click="click(1, 96)" :class="active == 1 ? 'active' : ''">欧美</li>
      <li @click="click(2, 16)" :class="active == 2 ? 'active' : ''">韩国</li>
      <li @click="click(3, 8)" :class="active == 3 ? 'active' : ''">日本</li>
    </ul>
    <ul class="scontent" v-show="flag">
      <li v-for="(item, index) in newsong[active]" :key="index">
        <img :src="item.album.blurPicUrl" alt="" />
        <div class="shade"><span @click="updateMusiclist(item)"></span></div>
        <div class="text">
          <p class="name" @click="updateMusiclist(item)">{{ item.name }}</p>
          <p class="artists">{{ item.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
import updateMusiclist from '@/hook/updateMusiclist'
export default {
  setup() {
    const data = reactive({
      newsong: [[], [], [], []],
      active: 0,
      flag: 0,
      async getnewsong(i, type) {
        const { data: ref } = await axios.get(`/top/song?type=${type}`)
        this.newsong[i] = markRaw(ref.data.slice(0, 9))
        this.flag = 1
      },
      async click(i, type) {
        this.flag = 0
        if (this.newsong[i].length === 0) {
          data.getnewsong(i, type)
        }
        this.active = i
      }
    })
    data.getnewsong(0, 7)
    return { ...toRefs(data), updateMusiclist }
  }
}
</script>

<style lang="less" scoped>
.song {
  width: 1100px;
  height: 390px;
  margin-top: 30px;
  .title {
    height: 30px;
    display: flex;
    justify-content: flex-start;
    line-height: 30px;
    text-align: center;
    li {
      margin-left: 50px;
      font-size: 15px;
      cursor: pointer;
      &:hover {
        color: rgb(53, 193, 255);
      }
    }
    .active {
      color: rgb(53, 193, 255);
    }
  }
}
</style>

<template>
  <div class="song">
    <div class="title">
      <h3>为你挑选的歌曲</h3>
      <span @click="torsong"
        >更多 <img src="../../assets/Rnext.svg" alt=""
      /></span>
    </div>
    <ul class="scontent">
      <li v-for="(item, index) in songdata" :key="index">
        <img :src="item.picUrl" alt="" />
        <div class="shade"><span @click="updateMusiclist(item)"></span></div>
        <div class="text">
          <p class="name" @click="updateMusiclist(item)">{{ item.name }}</p>
          <p class="artists">{{ item.song.artists[0].name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import updateMusiclist from '@/hook/updateMusiclist'
export default {
  setup() {
    const router = useRouter()
    const data = reactive({
      songdata: [],
      async getsong() {
        const { data: ref } = await axios.get('/personalized/newsong?limit=6')
        this.songdata = markRaw(ref.result)
      },
      torsong() {
        router.push({ path: '/rsong' })
      }
    })
    data.getsong()
    return {
      ...toRefs(data),
      updateMusiclist
    }
  }
}
</script>

<style lang="less" scoped>
.song {
  width: 1100px;
  margin-top: 30px;
}
</style>

<template>
  <div class="mc" v-show="show">
    <div class="song">
      <div class="title">
        <h3>为你挑选的歌曲</h3>
      </div>
      <ul class="scontent">
        <li v-for="(item, index) in songdata" :key="index">
          <img :data-url="item.picUrl" alt="" v-limg />
          <div class="shade"><span></span></div>
          <div class="text">
            <p class="name">{{ item.name }}</p>
            <p class="artists">{{ item.song.artists[0].name }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import axios from 'axios'
export default {
  name: 'RSong',
  setup() {
    const data = reactive({
      show: 0,
      songdata: [],
      async getsong() {
        const { data: ref } = await axios.get('/personalized/newsong?limit=100')
        this.songdata.push(...ref.result)
        this.show = 1
        console.log(ref)
      }
    })
    data.getsong()
    return {
      ...toRefs(data)
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

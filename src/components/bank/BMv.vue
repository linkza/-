<template>
  <div class="vedio">
    <div class="title">
      <h3>精选MV</h3>
      <span>更多 <img src="../../assets/Rnext.svg" alt="" /></span>
    </div>
    <ul class="vcontent">
      <li v-for="(item, index) in mvdata" :key="index">
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
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
export default {
  setup() {
    const data = reactive({
      mvdata: [],
      async getmv() {
        const { data: ref } = await axios.get('/mv/first?limit=4')
        // const { data: a } = await axios.get('/playlist/catlist')
        // const { data: b } = await axios.get('/top/playlist?cat=华语')
        this.mvdata = markRaw(ref.data)
        // console.log(ref, a, b)
      }
    })
    data.getmv()
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.vedio {
  width: 1100px;
  margin-top: 30px;
}
</style>

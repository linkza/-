<template>
  <div class="vedio">
    <div class="title">
      <h3>视频和音乐更配哦</h3>
      <span>更多 <img src="../../assets/Rnext.svg" alt="" /></span>
    </div>
    <ul class="vcontent">
      <li v-for="(item, index) in vediodata" :key="index">
        <img :src="item.data.coverUrl" alt="" />
        <div class="shade"><span></span></div>
        <div class="text">
          <p class="description">{{ item.data.title }}</p>
          <p class="creator">
            <img :src="item.data.creator.avatarUrl" alt="" />{{
              item.data.creator.nickname
            }}
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
      vediodata: [],
      async getsong() {
        const { data: ref } = await axios.get('/video/timeline/recommend')
        ref.datas.splice(3, 1)
        this.vediodata = markRaw(ref.datas.slice(0, 6))
        console.log(ref.datas)
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
.vedio {
  width: 1100px;
  margin-top: 30px;
}

</style>

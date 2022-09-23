<template>
  <div class="list">
    <div class="title">
      <h3>今日专属推荐</h3>
      <span @click="tolist">
        歌单广场 <img src="../../assets/Rnext.svg" alt=""
      /></span>
    </div>
    <ul class="lcontent">
      <li v-for="(item, index) in listdata" :key="index">
        <img :src="item.picUrl" alt="" />
        <p>
          {{ item.name }}
        </p>
        <div class="shade" @click="tosonglist(item.id)"><span></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { markRaw, reactive, toRefs } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const data = reactive({
      listdata: [],
      async getlist() {
        const { data: ref } = await axios.get('/personalized?limit=10')
        this.listdata = markRaw(ref.result)
      },
      tolist() {
        router.push({ path: '/list' })
      },
      tosonglist(id) {
        router.push({ path: '/songlist', query: { id, is: 1 } })
      }
    })
    data.getlist()
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  width: 1100px;
  height: 574px;
  margin-top: 30px;
}
</style>

<template>
  <div class="mv">
    <ul class="vcontent">
      <li v-for="(item, index) in mv" :key="index">
        <img :src="item.imgurl16v9" alt="" />
        <div class="shade"><span></span></div>
        <div class="text">
          <p class="description">{{ item.name }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const data = reactive({
      id: route.query.id,
      mv: [],
      async getmv() {
        const { data: ref } = await axios.get(`/artist/mv?id=${this.id}`)
        this.mv = markRaw(ref.mvs)
      },
      tosonglist(id) {
        router.push({ path: '/songlist', query: { id, is: 1 } })
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
.mv {
  margin-top: 20px;
}
</style>

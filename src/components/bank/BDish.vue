<template>
  <div class="dish">
    <div class="title">
      <h3>新碟上架</h3>
      <span @click="tonewalbum"
        >更多 <img src="@/assets/Rnext.svg" alt=""
      /></span>
    </div>
    <ul class="dcontent">
      <li v-for="(item, index) in dishdata" :key="index">
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
</template>

<script>
import { markRaw, reactive, toRefs } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const data = reactive({
      dishdata: [],
      async getlist() {
        const { data: ref } = await axios.get('/album/newest')
        this.dishdata = markRaw(ref.albums.slice(0, 5))
      },
      toac(id) {
        router.push({ path: '/albumcontent', query: { id, is: 0 } })
      },
      tonewalbum() {
        router.push({ path: '/newalbum' })
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
.dish {
  width: 1100px;
  margin-top: 30px;
}
</style>

<template>
  <div class="dish">
    <ul class="dcontent" ref="ul">
      <li v-for="(item, index) in album" :key="index">
        <img :src="item.picUrl" alt="" />
        <p>
          {{ item.name }}
        </p>
        <div class="shade" @click="toAD(item.id)"><span></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, ref, nextTick } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const ul = ref(null)
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        data.getalbum()
        observer.unobserve(entries[0].target)
      }
    }
    const observer = new IntersectionObserver(callback)
    const data = reactive({
      id: route.query.id,
      album: [],
      of: 0,
      async getalbum() {
        const { data: ref } = await axios.get(
          `/artist/album?id=${this.id}&limit=30&offset=${this.of}`
        )
        this.album.push(...ref.hotAlbums)
        this.of += 30
        nextTick(() => {
          if (ref.hotAlbums.length >= 30) {
            observer.observe(ul.value.children[ul.value.children.length - 5])
          }
        })
      },
      toAD(id) {
        router.push({ path: '/albumcontent', query: { id } })
      }
    })
    data.getalbum()
    return {
      ...toRefs(data),
      ul
    }
  }
}
</script>

<style lang="less" scoped>
.dcontent {
  margin-top: 20px;
}
</style>

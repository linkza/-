<template>
  <div class="similar">
    <ul class="content" v-if="flag">
      <li v-for="(item, index) in similar" :key="index">
        <img :src="item.img1v1Url" alt="" @click="tosongerc(item.id)" />
        <p @click="tosongerc(item.id)">{{ item.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const data = reactive({
      id: route.query.id,
      similar: [],
      flag: 0,
      async getdetail() {
        const { data: ref } = await axios.get(`/simi/artist?id=${this.id}`)
        this.similar = markRaw(ref.artists)
        this.flag = 1
        console.log(ref)
      },
      tosongerc(id) {
        router.push({ path: '/songerc', query: { id } })
      }
    })
    data.getdetail()
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.similar {
  margin-top: 30px;
  .content {
    display: flex;
    justify-items: flex-start;
    flex-wrap: wrap;
    li {
      margin-right: 40px;
      margin-bottom: 20px;
      &:nth-child(6n) {
        margin-right: 0;
      }
      img {
        width: 150px;
        height: 150px;
        border-radius: 75px;
        cursor: pointer;
      }
      p {
        width: 150px;
        height: 20px;
        margin-top: 10px;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          color: rgb(53, 193, 255);
        }
      }
    }
  }
}
</style>

<template>
  <div class="detail">
    <ul class="content" v-if="flag && detail.briefDesc">
      <li>
        <h3>基本资料</h3>
        <p v-for="(e, i) in toarray(detail.briefDesc)" :key="i">
          {{ e }}
        </p>
      </li>
      <li v-for="(item, index) in detail.introduction" :key="index">
        <h3>{{ item.ti }}</h3>
        <p v-for="(x, y) in toarray(item.txt)" :key="y">
          {{ x }}
        </p>
      </li>
    </ul>
    <p v-if="!detail.briefDesc" class="last">暂无介绍</p>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const data = reactive({
      id: route.query.id,
      detail: [],
      flag: 0,
      async getdetail() {
        const { data: ref } = await axios.get(`/artist/desc?id=${this.id}`)
        this.detail = markRaw(ref)
        this.flag = 1
      },
      toarray(a) {
        return a.split('\n')
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
.detail {
  min-height: 470px;
  display: flex;
  align-items: center;
  .content {
    margin-top: 10px;
    margin-bottom: 30px;
    li {
      margin-top: 20px;
      h3 {
        font-size: 15px;
      }
      p {
        text-indent: 2em;
        line-height: 30px;
        color: rgb(133, 133, 133);
        font-size: 15px;
      }
    }
  }
  .last {
    width: 1100px;
    color: rgb(133, 133, 133);
    font-size: 15px;
    text-align: center;
  }
}
</style>

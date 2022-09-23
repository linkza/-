<template>
  <div class="list">
    <ul class="lcontent">
      <li v-for="(item, index) in store.state.similarlist" :key="index">
        <img :data-url="item.coverImgUrl" alt="" v-limg />
        <p>
          {{ item.name }}
        </p>
        <div class="shade" @click="tosonglist(item.id)"><span></span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const data = reactive({
      tosonglist(id) {
        router.push({ path: '/songlist', query: { id, is: 1 } })
      }
    })
    return {
      ...toRefs(data),
      store
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  width: 1100px;
  margin-top: 10px;
}
</style>

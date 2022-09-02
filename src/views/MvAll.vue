<template>
  <div class="mc">
    <div class="title"><h3>全部MV</h3></div>
    <ul class="sort">
      <li v-for="(item, index) in sort" :key="index">
        <h3>{{ item }}</h3>
        :
        <ul class="type">
          <li v-for="(x, y) in type[index]" :key="y">
            <span
              :class="active[index] == y ? 'active' : ''"
              @click="changeclass(index, y)"
              >{{ x }}</span
            >
          </li>
        </ul>
      </li>
    </ul>
    <ul class="vcontent" ref="ul">
      <li v-for="(item, index) in mvlist" :key="index">
        <img :data-url="item.cover" alt="" v-limg />
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
import { reactive, ref, toRefs, watch, nextTick } from 'vue'
import axios from 'axios'
export default {
  name: 'MvAll',
  setup() {
    const ul = ref(null)
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        data.getmv()
        observer.unobserve(entries[0].target)
      }
    }
    const observer = new IntersectionObserver(callback)
    const data = reactive({
      sort: ['地区', '类型', '排序'],
      type: [
        ['全部', '内地', '港台', '欧美', '日本', '韩国'],
        ['全部', '官方版', '原声', '现场版', '网易出品'],
        ['上升最快', '最热', '最新']
      ],
      active: [0, 0, 0],
      mvlist: [],
      of: 0,
      async getmv() {
        const a = this.type[0][this.active[0]]
        const t = this.type[1][this.active[1]]
        const o = this.type[2][this.active[2]]
        const f = this.of * 28
        const { data: ref } = await axios.get(
          `/mv/all?area=${a}&type=${t}&order=${o}&limit=28&offset=${f}`
        )
        if (ref.data) {
          this.of++
          this.mvlist.push(...ref.data)
          nextTick(() => {
            if (ref.data.length === 28) {
              observer.observe(ul.value.children[ul.value.children.length - 5])
            }
          })
        }
        console.log(ref)
      },
      changeclass(i, y) {
        this.active[i] = y
      }
    })
    data.getmv()
    watch(
      () => data.active,
      (newvalue, oldvalue) => {
        console.log(newvalue)
        data.mvlist = []
        data.of = 0
        data.getmv()
      },
      { deep: true }
    )
    return {
      ...toRefs(data),
      ul
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  margin-top: 30px;
  h3 {
    align-items: center;
    line-height: 30px;
    font-size: 25px;
    font-weight: 800;
    cursor: default;
  }
}
.sort {
  width: 1100px;
  margin-top: 20px;
  & > li {
    height: 25px;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 30px;

    h3 {
      color: rgb(103, 103, 103);
      font-size: 15px;
      line-height: 25px;
      font-weight: normal;
    }
    .type {
      display: flex;
      li {
        width: 100px;
        display: flex;
        justify-content: center;
        span {
          height: 25px;
          padding: 0 10px;
          color: rgb(103, 103, 103);
          line-height: 25px;
          text-align: center;
          border-radius: 13px;
          cursor: pointer;
          &:hover {
            color: rgb(53, 193, 255);
            background-color: rgb(239, 239, 239);
          }
        }
        .active {
          font-weight: 600;
          background-color: rgb(239, 239, 239);
        }
      }
    }
  }
}
</style>

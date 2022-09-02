<template>
  <div class="mc" @scroll="scroll" v-show="show">
    <div class="dish">
      <ul class="title">
        <h3>新碟上架</h3>
        <li
          v-for="(item, index) in area"
          :key="index"
          :class="active == index ? 'active' : ''"
          @click="changeclass(index)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="dcontent">
        <li v-for="(item, index) in dishdata" :key="index">
          <img :data-url="item.picUrl" alt="" v-limg />
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
  </div>
</template>

<script>
import { markRaw, reactive, toRefs, nextTick } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  name: 'NewAlbum',
  setup() {
    const router = useRouter()
    const data = reactive({
      area: ['全部', '华语', '欧美', '日本', '韩国'],
      type: ['ALL', 'ZH', 'EA', 'JP', 'KR'],
      dishdata: [],
      dt: [],
      fl: 1,
      of: 0,
      show: 0,
      active: 0,
      async getdish() {
        this.dt = this.dishdata = []
        this.of = 0
        const { data: ref } = await axios.get(
          `/top/album?area=${this.type[this.active]}&type=new`
        )
        this.dt = markRaw(
          ref.monthData.length === 0 ? ref.weekData : ref.monthData
        )
        this.dishdata.push(...this.dt.slice(0, 50))
        nextTick(() => {
          data.show = 1
        })
        this.of += 50
        console.log(ref)
      },
      changeclass(i) {
        this.active = i
        this.getdish()
      },
      scroll(e) {
        if (
          e.target.scrollHeight - 780 - e.target.scrollTop < 420 &&
          this.fl &&
          this.of < this.dt.length
        ) {
          this.fl = 0
          this.dishdata.push(...this.dt.slice(this.of, this.of + 49))
          this.of += 50
          this.fl = 1
        }
      },
      toac(id) {
        router.push({ path: '/albumcontent', query: { id, is: 0 } })
      }
    })
    data.getdish()
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
  .title {
    width: 1100px;
    height: 30px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    h3 {
      display: flex;
      align-items: center;
      line-height: 30px;
      font-size: 25px;
      font-weight: 800;
      cursor: default;
    }
    li {
      height: 30px;
      margin-left: 50px;
      padding: 0 10px;
      line-height: 30px;
      font-size: 15px;
      color: rgb(51, 51, 51);
      border-radius: 15px;
      cursor: pointer;
      &:not(.active):hover {
        color: rgb(53, 193, 255);
      }
    }
    .active {
      font-weight: 800;
      background-color: rgb(239, 239, 239);
      cursor: default;
    }
  }
}
</style>

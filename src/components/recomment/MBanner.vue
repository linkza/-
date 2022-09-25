<template>
  <div class="banner">
    <ul class="img" ref="img">
      <li
        v-for="(item, index) in bannerdata"
        :key="index"
        @click="toAnyPage(item)"
      >
        <img :src="item.imageUrl" alt="" />
      </li>
      <i class="left" @click="prev" @mouseover="over" @mouseout="out"></i>
      <i class="right" @click="next" @mouseover="over" @mouseout="out"></i>
      <ul>
        <li
          v-for="(item, index) in bannerdata"
          :key="index"
          :class="active == index ? 'active' : ''"
          @click="dot(index)"
        ></li>
      </ul>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
import {
  reactive,
  toRefs,
  ref,
  nextTick,
  markRaw,
  onDeactivated,
  onActivated
} from 'vue'
import updateMusiclist from '@/hook/updateMusiclist'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const img = ref(null)
    const data = reactive({
      idArr: ['first', 'second', 'right'],
      timer: '',
      active: 0,
      bannerdata: [],
      async getbanner() {
        const { data: ref } = await axios.get('/banner?type=0')
        this.bannerdata = markRaw(ref.banners)
        let i = this.bannerdata.length - this.idArr.length - 1
        while (i--) {
          this.idArr.push('left')
        }
        this.idArr.push('last')
        await nextTick()
        this.initialize()
      },
      initialize() {
        for (let i = 0; i < this.idArr.length; i++) {
          img.value.childNodes[i + 1].id = this.idArr[i]
        }
        this.active = this.idArr.indexOf('first')
      },
      prev() {
        this.idArr.push(this.idArr.shift())
        this.initialize()
      },
      next() {
        this.idArr.unshift(this.idArr.pop())
        this.initialize()
      },
      over() {
        clearInterval(this.timer)
      },
      out() {
        this.timer = setInterval(this.next.bind(this), 3000)
      },
      dot(index) {
        clearInterval(this.timer)
        if (index > this.active) {
          let x = index - this.active
          while (x--) {
            this.next()
          }
        } else if (index < this.active) {
          let x = this.active - index
          while (x--) {
            this.prev()
          }
        }
        this.timer = setInterval(this.next.bind(this), 3000)
      },
      toAnyPage(item) {
        if (item.typeTitle === '新歌首发') {
          updateMusiclist(item.encodeId)
        }
        if (item.typeTitle === '新碟首发') {
          router.push({
            path: '/albumcontent',
            query: { id: item.encodeId, is: 0 }
          })
        }
      }
    })
    data.getbanner()
    onDeactivated(() => {
      clearInterval(data.timer)
    })
    onActivated(() => {
      data.timer = setInterval(data.next.bind(data), 3000)
    })
    return {
      ...toRefs(data),
      img
    }
  }
}
</script>
<style lang="less" scoped>
.banner {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  width: 100%;
  height: 275px;
  .img {
    width: 1075px;
    position: relative;
    .left {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 105px;
      z-index: 10;
      cursor: pointer;
      opacity: 0.8;
      background-image: url('../../assets/prev.svg');
      background-size: contain;
      &:hover {
        opacity: 1;
      }
    }
    .right {
      width: 40px;
      height: 40px;
      position: absolute;
      top: 105px;
      right: 0;
      z-index: 10;
      cursor: pointer;
      opacity: 0.8;
      background-image: url('../../assets/next.svg');
      background-size: contain;
      &:hover {
        opacity: 1;
      }
    }
    & > li {
      position: absolute;
      transition: 0.3s ease-in-out;
      cursor: pointer;
      img {
        height: 250px;
        width: 675px;
        border-radius: 10px;
      }
    }
    ul {
      width: 175px;
      position: absolute;
      left: 450px;
      bottom: 10px;
      z-index: 11;
      display: flex;
      justify-content: space-between;
      li {
        width: 8px;
        height: 8px;
        cursor: pointer;
        border-radius: 4px;
        background-color: rgb(169, 201, 211);
      }
      .active {
        background-color: #fff;
      }
    }
    #last {
      transform: translateX(0);
      z-index: 9;
      opacity: 1;
    }
    #first {
      transform: translateX(200px) scale(1.2);
      z-index: 10;
      opacity: 1;
    }
    #second {
      transform: translateX(400px);
      z-index: 9;
      opacity: 1;
    }
    #left {
      transform: translateX(-100px);
      z-index: 1;
      opacity: 0;
    }
    #right {
      transform: translateX(500px);
      z-index: 1;
      opacity: 0;
    }
  }
}
</style>

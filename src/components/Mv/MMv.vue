<template>
  <div class="mv">
    <div class="new">
      <ul class="title">
        <h3>最新MV</h3>
        <li
          :class="active == index ? 'active' : ''"
          v-for="(item, index) in area"
          :key="index"
          @click="changeclass(item, index)"
        >
          {{ item }}
        </li>
        <span @click="tomvall"
          >更多 <img src="@/assets/Rnext.svg" alt="" />
        </span>
      </ul>
      <ul class="vcontent" v-if="flag">
        <li v-for="(item, index) in areamv[active]" :key="index">
          <img :src="item.cover" alt="" />
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
    <div class="hot">
      <div class="title">
        <h3>最热MV</h3>
        <span @click="tomvall"
          >更多 <img src="@/assets/Rnext.svg" alt="" />
        </span>
      </div>
      <ul class="vcontent">
        <li v-for="(item, index) in hotmv" :key="index">
          <img :src="item.cover" alt="" />
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
    <div class="wy">
      <div class="title">
        <h3>网易出品</h3>
        <span @click="tomvall">
          更多 <img src="@/assets/Rnext.svg" alt="" />
        </span>
      </div>
      <ul class="vcontent">
        <li v-for="(item, index) in wymv" :key="index">
          <img :src="item.cover" alt="" />
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
    <div class="rank">
      <ul class="title">
        <h3>MV排行榜</h3>
        <li
          :class="ra == index ? 'active' : ''"
          v-for="(item, index) in area"
          :key="index"
          @click="changerc(item, index)"
        >
          {{ item }}
        </li>
        <span @click="totopmv"
          >更多 <img src="@/assets/Rnext.svg" alt="" />
        </span>
      </ul>
      <ul class="content" v-if="rf">
        <li v-for="(item, index) in rankmv[ra]" :key="index">
          <span class="lv">{{ index != 9 ? '0' + (index + 1) : '10' }}</span>
          <img :src="item.cover" alt="" />
          <div class="shade"><span></span></div>
          <div class="text">
            <p class="name">{{ item.name }}</p>
            <p class="artists">{{ item.artistName }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const data = reactive({
      area: ['内地', '港台', '欧美', '日本', '韩国'],
      areamv: [[], [], [], [], []],
      hotmv: [],
      wymv: [],
      rankmv: [[], [], [], [], []],
      active: 0,
      ra: 0,
      flag: 1,
      rf: 1,
      async getmv() {
        const { data: ref } = await axios.get('/mv/first?limit=8&area=内地')
        this.areamv[0] = markRaw(ref.data)
        const { data: h } = await axios.get('/mv/all?limit=8&order=最热')
        this.hotmv = markRaw(h.data)
        const { data: w } = await axios.get('/mv/exclusive/rcmd?limit=8')
        this.wymv = markRaw(w.data)
        const { data: r } = await axios.get('/top/mv?limit=10&area=内地')
        this.rankmv[0] = markRaw(r.data)
      },
      async getareamv(area, i) {
        if (this.areamv[i].length === 0) {
          const { data: ref } = await axios.get(
            `/mv/first?limit=8&area=${area}`
          )
          this.areamv[i] = markRaw(ref.data)
        }
        this.flag = 1
      },
      async getrankmv(area, i) {
        if (this.rankmv[i].length === 0) {
          const { data: ref } = await axios.get(`/top/mv?limit=10&area=${area}`)
          this.rankmv[i] = markRaw(ref.data)
          console.log(ref)
        }
        this.rf = 1
      },
      changeclass(area, i) {
        this.flag = 0
        this.getareamv(area, i)
        this.active = i
      },
      changerc(area, i) {
        this.rf = 0
        this.getrankmv(area, i)
        this.ra = i
      },
      tomvall() {
        router.push({ path: '/mvall' })
      },
      totopmv() {
        router.push({ path: '/topmv' })
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
  width: 1100px;
  .new {
    height: 466px;
    margin-top: 30px;
  }
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
      font-size: 20px;
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
    }
    span {
      height: 20px;
      position: absolute;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      line-height: 20px;
      font-size: 12px;
      opacity: 0.5;
      cursor: pointer;
      &:hover {
        color: rgb(53, 193, 255);
      }
      img {
        width: 10px;
        height: 10px;
      }
    }
    .active {
      font-weight: 800;
      background-color: rgb(239, 239, 239);
      cursor: default;
      & ~ :hover {
        color: rgb(53, 193, 255);
      }
    }
  }
  .hot,
  .wy {
    width: 1100px;
    margin-top: 30px;
    h3 {
      line-height: 30px;
      font-size: 20px;
      cursor: pointer;
    }
  }
  .rank {
    width: 1100px;
    height: 750px;
    .content {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      li {
        width: 500px;
        height: 140px;
        padding: 10px 0;
        position: relative;
        display: flex;
        justify-content: flex-start;
        border-radius: 10px;
        overflow: hidden;
        img {
          width: 200px;
          height: 120px;
          border-radius: 10px;
        }
        .lv {
          width: 50px;
          height: 120px;
          font-size: 30px;
          color: rgb(159, 159, 159);
          line-height: 120px;
          text-align: center;
        }
        .shade {
          position: absolute;
          top: 10px;
          left: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 200px;
          height: 120px;
          border-radius: 10px;
          opacity: 0;
          &:hover {
            opacity: 1;
            background-color: rgba(0, 0, 0, 0.6);
          }
          span {
            width: 45px;
            height: 45px;
            cursor: pointer;
            border-radius: 25px;
            background: #fff url('@/assets/play.svg') no-repeat center/23px;
            &:hover {
              background-color: rgb(53, 193, 255);
            }
          }
        }
        .text {
          width: 220px;
          height: 120px;
          padding: 10px;
          display: flex;
          flex-flow: column;
          p {
            max-width: 200px;
            width: fit-content;
            height: 24px;
            cursor: pointer;
            line-height: 24px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            &:hover {
              color: rgb(53, 193, 255);
            }
          }
          .name {
            font-size: 16px;
          }
          .artists {
            color: rgb(128, 128, 128);
            font-size: 10px;
          }
        }
      }
    }
  }
}
</style>

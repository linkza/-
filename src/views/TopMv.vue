<template>
  <div class="mc">
    <div class="rank">
      <ul class="title">
        <h3>MV排行榜</h3>
        <li
          :class="active == index ? 'active' : ''"
          v-for="(item, index) in area"
          :key="index"
          @click="changeclass(item, index)"
        >
          {{ item }}
        </li>
      </ul>
      <ul class="content" v-show="flag">
        <li v-for="(item, index) in rankmv[active]" :key="index">
          <span class="lv">{{
            index < 9 ? '0' + (index + 1) : index + 1
          }}</span>
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
export default {
  name: 'TopMv',
  setup() {
    const data = reactive({
      area: ['内地', '港台', '欧美', '日本', '韩国'],
      rankmv: [[], [], [], [], []],
      active: 0,
      flag: 1,
      async getrankmv(area, i) {
        if (this.rankmv[i].length === 0) {
          const { data: ref } = await axios.get(`/top/mv?limit=50&area=${area}`)
          this.rankmv[i] = markRaw(ref.data)
          console.log(ref)
        }
        this.flag = 1
      },
      changeclass(area, i) {
        this.flag = 0
        this.getrankmv(area, i)
        this.active = i
      }
    })
    data.getrankmv('内地', 0)
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.rank {
  width: 1100px;
  height: 730px;
  .title {
    width: 1100px;
    height: 30px;
    margin-top: 30px;
    margin-bottom: 20px;
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
      &:hover {
        color: rgb(53, 193, 255);
      }
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
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 20px;
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
          background: #fff url('../assets/play.svg') no-repeat center/23px;
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
</style>

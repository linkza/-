<template>
  <div class="mc">
    <div class="rank">
      <div class="title">
        <h3>官方榜</h3>
      </div>
      <ul class="content">
        <li
          v-for="(item, index) in rankdata"
          :key="index"
          @click="totoplist(item.id)"
        >
          <img :src="item.coverImgUrl" alt="" />
          <div class="text">
            <h3>{{ item.name }}</h3>
            <p>
              1 {{ songname[index * 3].name }} -
              <span v-for="(x, y) in songname[index * 3].ar" :key="y"
                >{{ x.name
                }}<i>{{
                  songname[index * 3].ar.length == y + 1 ? '' : '、'
                }}</i></span
              >
            </p>
            <p>
              2 {{ songname[index * 3 + 1].name }} -
              <span v-for="(x, y) in songname[index * 3 + 1].ar" :key="y"
                >{{ x.name
                }}<i>{{
                  songname[index * 3 + 1].ar.length == y + 1 ? '' : '、'
                }}</i></span
              >
            </p>
            <p>
              3 {{ songname[index * 3 + 2].name }} -
              <span v-for="(x, y) in songname[index * 3 + 2].ar" :key="y"
                >{{ x.name
                }}<i>{{
                  songname[index * 3 + 2].ar.length == y + 1 ? '' : '、'
                }}</i></span
              >
            </p>
            <div class="shade"><span></span></div>
          </div>
        </li>
      </ul>
      <h3 class="w">全球榜</h3>
      <ul class="wc">
        <li v-for="(item, index) in worlddata" :key="index">
          <img :src="item.coverImgUrl" alt="" />
          <div class="shade" @click="totoplist(item.id)"><span></span></div>
          <span class="pc"
            ><img src="@/assets/PLplay.svg" alt="" />{{
              pl(item.playCount)
            }}</span
          >
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
      rankdata: [],
      songname: [],
      worlddata: [],
      async getrank() {
        const { data: ref } = await axios.get('/toplist')
        for (let i = 0; i < 4; i++) {
          const { data: song } = await axios.get(
            `/playlist/detail?id=${ref.list.slice(0, 4)[i].id}`
          )
          this.songname.push(...song.playlist.tracks.slice(0, 3))
        }
        this.rankdata = markRaw(ref.list.slice(0, 4))
        this.worlddata = markRaw(ref.list.slice(4))
        console.log(this.rankdata)
      },
      pl(c) {
        if (c >= 10000) {
          return c % 10000 ? (c / 10000).toFixed(1) + '万' : c / 10000 + '万'
        } else return c
      },
      totoplist(id) {
        router.push({ path: '/toplist', query: { id } })
      }
    })
    data.getrank()
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.rank {
  width: 1100px;
  height: 470px;
  margin-top: 50px;
  .title {
    margin-bottom: 20px;
    h3 {
      height: 35px;
      position: relative;
      font-weight: 800;
      line-height: 35px;
      font-size: 35px;
      &::before {
        content: 'CHART';
        height: 20px;
        position: absolute;
        left: 0;
        bottom: -20px;
        line-height: 20px;
        font-size: 12px;
        color: rgb(193, 193, 193);
      }
    }
  }
  .shade {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 10px;
    opacity: 0;
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
  .w {
    margin: 20px 0;
    font-size: 20px;
  }
  .wc {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    li {
      position: relative;
      margin-right: 25px;
      margin-bottom: 20px;
      cursor: pointer;
      &:nth-child(5n) {
        margin-right: 0;
      }
      & > img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
    }
  }
  .content {
    width: 1100px;
    height: 440px;
    border: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;
    li {
      width: 500px;
      height: 200px;
      display: flex;
      justify-content: flex-start;
      position: relative;
      margin-top: 20px;
      border-radius: 10px;
      background-color: rgb(243, 243, 243);
      transition: 0.1s ease-in;
      &:hover .shade {
        opacity: 1;
        background-color: rgba(0, 0, 0, 0.6);
      }
      img {
        width: 200px;
        height: 200px;
        border-radius: 10px;
      }
      .text {
        width: 300px;
        height: 300px;
        padding: 20px 20px;
        h3 {
          font-size: 20px;
        }
        p {
          margin-top: 20px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          font-size: 15px;
          color: rgb(142, 142, 142);
          span {
            color: rgb(142, 142, 142);
          }
        }
      }
    }
  }
}
</style>

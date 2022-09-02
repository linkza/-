<template>
  <div class="rank">
    <div class="title">
      <h3>看看大家都在听什么</h3>
      <span @click="totopsong"
        >更多 <img src="../../assets/Rnext.svg" alt="" />
      </span>
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
        </div>
      </li>
    </ul>
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
      async getrank() {
        const { data: ref } = await axios.get('/toplist')
        for (let i = 0; i < 4; i++) {
          const { data: song } = await axios.get(
            `/playlist/detail?id=${ref.list.slice(0, 4)[i].id}`
          )
          this.songname.push(...song.playlist.tracks.slice(0, 3))
        }
        this.rankdata = markRaw(ref.list.slice(0, 4))
        console.log(this.songname)
      },
      totopsong() {
        router.push({ path: '/topsong' })
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
  margin-top: 30px;
  .content {
    width: 1100px;
    height: 440px;
    border: 0px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    cursor: pointer;
    li {
      width: 530px;
      height: 200px;
      display: flex;
      justify-content: flex-start;
      margin-top: 20px;
      border-radius: 10px;
      background-color: rgb(243, 243, 243);
      transition: 0.1s ease-in;
      &:hover {
        transform: translateY(-2px);
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

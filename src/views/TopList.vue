<template>
  <div class="mc">
    <div class="ts">
      <div class="detail">
        <img :src="playlist.coverImgUrl" alt="" />
        <div class="text">
          <h3>{{ playlist.name }}</h3>
          <p class="creator" v-if="creator">
            <img :src="playlist.creator.avatarUrl" alt="" />
            <span>{{ playlist.creator.nickname }}</span>
          </p>
          <p class="description">简介：{{ playlist.description }}</p>
          <ul class="button">
            <li class="play"><img src="../assets/Splay.png" alt="" /> 播放</li>
            <li class="collect">
              <img src="../assets/Scollect.png" alt="" />收藏
            </li>
          </ul>
          <span class="playcount">播放量：{{ pl }}</span>
        </div>
      </div>
      <div class="sc">
        <ul class="title">
          <li class="sname">歌曲名</li>
          <li class="artist">歌手</li>
          <li class="album">专辑</li>
          <li class="time">时长</li>
        </ul>
        <ul class="content">
          <li v-for="(item, index) in privileges" :key="index">
            <div class="sname">
              <span>{{ item.name }}</span>
            </div>
            <div class="artist">
              <span v-for="(x, y) in item.ar" :key="y"
                >{{ x.name
                }}<i>{{ item.ar.length == y + 1 ? '' : '、' }}</i></span
              >
            </div>
            <div class="album">
              <span>{{ item.al.name }}</span>
            </div>
            <div class="time">{{ timer(item.dt) }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, markRaw } from 'vue'
import axios from 'axios'
import timer from '../hook/time'
import { useRoute } from 'vue-router'
export default {
  name: 'TopList',
  setup() {
    const route = useRoute()
    const data = reactive({
      id: route.query.id,
      creator: 0,
      playlist: { creator: {} },
      privileges: [],
      pl: 0,
      async getrank() {
        const { data: ref } = await axios.get(`/playlist/detail?id=${this.id}`)
        this.playlist = markRaw(ref.playlist)
        this.privileges = markRaw(ref.playlist.tracks)
        this.creator = 1
        this.pl = parseInt(this.playlist.playCount / 10000) + '万'
        console.log(ref)
      }
    })
    data.getrank()
    return {
      ...toRefs(data),
      timer
    }
  }
}
</script>

<style lang="less" scoped>
.detail {
  width: 1100px;
  margin-top: 30px;
  display: flex;
  justify-content: flex-start;

  img {
    width: 250px;
    height: 250px;
    border-radius: 15px;
  }
  .text {
    width: 850px;
    height: 250px;
    padding: 5px 0 0 20px;
    position: relative;
    h3 {
      font-size: 30px;
      cursor: default;
    }
    .creator {
      margin-top: 10px;
      font-size: 15px;
      img {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        cursor: pointer;
      }
      span {
        cursor: pointer;
      }
    }
    .description {
      max-width: 800px;
      margin-top: 10px;
      font-size: 15px;
      color: rgb(133, 133, 133);
      overflow: hidden;
    }
    .button {
      display: flex;
      justify-content: flex-start;
      position: absolute;
      left: 20px;
      bottom: 0;
      li {
        width: 150px;
        height: 40px;
        margin-right: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 40px;
        text-align: center;
        font-size: 15px;
        color: white;
        border-radius: 20px;
        cursor: pointer;
        img {
          width: 20px;
          height: 20px;
          margin-right: 2px;
        }
      }
      .play {
        background-color: rgb(60, 195, 255);
        &:hover {
          background-color: rgb(47, 174, 230);
        }
      }
      .collect {
        background-color: rgb(252, 120, 117);
        &:hover {
          background-color: rgb(253, 63, 63);
        }
      }
    }
    .playcount {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 15px;
      color: rgb(133, 133, 133);
    }
  }
}
.sc {
  width: 1100px;
  margin-top: 30px;
  li {
    cursor: default;
    div {
      padding-right: 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      span {
        cursor: pointer;
      }
    }
  }
  .sname {
    padding-left:10px;
    width: 490px;
  }
  .artist {
    width: 200px;
  }
  .album {
    width: 300px;
  }
  .time {
    width: 100px;
    color: rgb(133, 133, 133);
  }
  .title {
    display: flex;
    justify-content: flex-start;
    li {
      font-size: 15px;
      color: rgb(133, 133, 133);
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 30px;
    li {
      width: 1090px;
      height: 50px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 15px;
      border-radius: 1px;
      &:hover {
        background-color: rgb(243, 243, 243);
      }
    }
  }
}
</style>

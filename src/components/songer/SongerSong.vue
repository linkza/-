<template>
  <div class="song" v-show="show">
    <ul class="title">
      <li class="sname">歌曲名</li>
      <li class="artist">歌手</li>
      <li class="album">专辑</li>
      <li class="time">时长</li>
    </ul>
    <ul class="content" ref="ul">
      <li v-for="(item, index) in songdata" :key="index">
        <div class="sname">
          <span @click="updateMusiclist(item.id)">{{ item.name }}</span>
        </div>
        <div class="artist">
          <span v-for="(x, y) in item.ar" :key="y"
            >{{ x.name }}<i>{{ item.ar.length == y + 1 ? '' : '、' }}</i></span
          >
        </div>
        <div class="album">
          <span>{{ item.al.name }}</span>
        </div>
        <div class="time">{{ timer(item.dt) }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, ref, nextTick } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
import timer from '@/hook/time'
import updateMusiclist from '@/hook/updateMusiclist'
export default {
  setup() {
    const route = useRoute()
    const ul = ref(null)
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        data.getsong()
        observer.unobserve(entries[0].target)
      }
    }
    const observer = new IntersectionObserver(callback)
    const data = reactive({
      id: route.query.id,
      show: 0,
      of: 0,
      songdata: [],
      async getsong() {
        const { data: ref } = await axios.get(
          `/artist/songs?id=${this.id}&limit=30&offset=${this.of}`
        )
        this.songdata.push(...ref.songs)
        this.of += 30
        nextTick(() => {
          this.show = 1
          if (this.of < ref.total) {
            observer.observe(ul.value.children[ul.value.children.length - 5])
          }
        })
      },
      timer
    })
    data.getsong()
    return {
      ...toRefs(data),
      ul,
      updateMusiclist
    }
  }
}
</script>

<style lang="less" scoped>
.song {
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
    width: 490px;
    padding-left: 10px;
    span:hover {
      color: rgb(53, 193, 255);
    }
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
  .dish {
    width: 1100px;
    margin-top: 30px;
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
  .slist {
    margin-left: -10px;
  }
}
</style>

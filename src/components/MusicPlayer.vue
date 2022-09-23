<template>
  <div class="player">
    <audio :src="url" ref="player" @loadstart="jia" @loadeddata="jian"></audio>
    <div class="player-img"><img :src="imgurl" alt="" /></div>
    <!-- 进度条 -->
    <div class="progress">
      <div class="songInfo">
        <span
          >{{ songName || 'music'
          }}{{ artistsName ? '——' + artistsName : '' }}</span
        >
      </div>
      <div class="progress-container">
        <div
          class="progress-content"
          ref="progress"
          :style="{ width: progressW }"
        ></div>
        <div class="pointer"></div>
      </div>
    </div>
    <div class="time">
      <span>{{ newDuration }}/</span> <span>{{ songDuration }}</span>
    </div>
    <div class="player-button">
      <a title="上一首" @click="preSong"
        ><img src="@/assets/player/prev.png" alt="" /></a
      ><a v-if="state == 0" title="播放/暂停" @click="changestate"
        ><img src="@/assets/player/play.png" alt="" /></a
      ><a v-if="state == 1" title="播放/暂停" @click="changestate"
        ><img src="@/assets/player/suspend.png" alt=""
      /></a>
      <a title="下一首" @click="nextSong"
        ><img src="@/assets/player/next.png" alt=""
      /></a>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watch, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import time from '../hook/time'
export default {
  setup() {
    const store = useStore()
    const player = ref(null)
    const progress = ref(null)
    const xisu = 0.986
    let timer = null
    // 定时器
    const opentimer = function () {
      clearInterval(timer)
      function a() {
        const offset = (player.value.currentTime / (data.duration / 1000)) * 100
        data.newDuration = time(player.value.currentTime)
        data.progressW = offset * xisu + '%'
        if (player.value.ended) {
          clearInterval(timer)
          data.changestate()
          data.nextSong()
        }
      }
      timer = setInterval(a, 1000)
    }
    const data = reactive({
      state: 0,
      songName: computed(() => store.state.m_player.activeMusic.songName),
      url: computed(() => store.state.m_player.activeMusic.musicUrl),
      imgurl: computed(() => store.state.m_player.activeMusic.picUrl),
      duration: computed(() => store.state.m_player.activeMusic.duration),
      artistsName: computed(() => store.state.m_player.activeMusic.artistsName),
      progressW: 0,
      songDuration: 0,
      newDuration: time(0),
      nextSong() {
        store.commit('m_player/nextSong')
      },
      preSong() {
        store.commit('m_player/preSong')
      },
      changestate() {
        if (this.url) {
          data.state = !data.state
          if (data.state) {
            opentimer()
          } else clearInterval(timer)
        }
      },
      // 进度条事件
      progressMount() {
        const pg = document.querySelector('.progress-container')
        const pg_Gap = pg.getBoundingClientRect()
        const movefun = (e) => {
          console.log(pg_Gap.left)
          if (e.clientX - pg_Gap.left < 0) {
            data.progressW = 0 + 'px'
            return
          }
          if (e.clientX - pg_Gap.left > 700) {
            data.progressW = 700 + 'px'
            return
          }
          data.progressW = e.clientX - pg_Gap.left + 'px'
        }
        pg.addEventListener('mousedown', (e) => {
          const Pwidth = e.layerX > 700 ? 700 : e.layerX
          data.progressW = Pwidth + 'px'
          document.body.addEventListener('mousemove', movefun)
          document.body.addEventListener('mouseup', () => {
            if (data.url) {
              player.value.currentTime = (Pwidth / 700) * (data.duration / 1000)
              data.newDuration = time(player.value.currentTime)
              clearInterval(timer)
              player.value.play()
              opentimer()
            }
            document.body.removeEventListener('mousemove', movefun)
          })
        })
      }
    })
    watch(
      () => data.url,
      (newval, oldval) => {
        if (!oldval) {
          data.progressMount()
        }
        data.state = 0
        player.value.load()
        setTimeout(() => {
          player.value.play()
          data.progressW = 0
          data.songDuration = time(data.duration)
          data.state = 1
          opentimer()
        }, 100)
      }
    )
    watch(
      () => data.state,
      () => {
        if (data.state) player.value.play()
        else player.value.pause()
      }
    )
    data.songDuration = time(data.duration)
    // 挂载进度条事件
    onMounted(() => {
      if (data.url) {
        data.progressMount()
      }
    })
    return {
      ...toRefs(data),
      player,
      progress
    }
  }
}
</script>

<style lang="less" scoped>
.player {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 60px;
  .player-img {
    width: 50px;
    height: 50px;
    margin-left: 30px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    img {
      width: 50px;
      height: 50px;
    }
  }

  .player-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 120px;
    margin-left: 30px;
    a {
      img {
        cursor: pointer;
        opacity: 0.8;
        &:hover {
          opacity: 1;
        }
      }
      .hot {
        width: 40px;
        height: 40px;
        opacity: 1;
      }
    }
  }
  .time {
    margin-left: 30px;
    margin-top: 20px;
  }
  .progress {
    height: 100%;
    position: relative;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .songInfo {
      margin-bottom: 5px;
    }
    .progress-container {
      margin-top: 5px;
      width: 710px;
      height: 5px;
      background-color: rgba(231, 231, 231);
      display: flex;
      align-items: center;
      cursor: pointer;
      .pointer {
        width: 10px;
        height: 10px;
        border-radius: 5px;
        background-color: rgb(53, 193, 255);
      }
      .progress-content {
        height: 5px;
        background-color: rgb(53, 193, 255);
        transition: width 0.05s ease-in-out;
      }
    }
  }
}
</style>

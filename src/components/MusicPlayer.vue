<template>
  <div class="player">
    <audio :src="url" ref="player" @loadstart="jia" @loadeddata="jian"></audio>
    <div class="player-img"><img :src="imgurl" alt="" /></div>
    <!-- 进度条 -->
    <div class="progress">
      <div class="songInfo">
        <span
          >{{ songName || 'music'
          }}{{ artistsName ? '—' + artistsName : '' }}</span
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
      <span>{{ currentTime }}/</span> <span>{{ songDuration }}</span>
    </div>
    <div class="player-button">
      <a title="上一首" @click="preSong"
        ><img src="@/assets/player/prev.png" alt="" /></a
      ><a v-if="state == 0" title="播放/暂停" @click="changestate(1)"
        ><img src="@/assets/player/play.png" alt="" /></a
      ><a v-if="state == 1" title="播放/暂停" @click="changestate(0)"
        ><img src="@/assets/player/suspend.png" alt=""
      /></a>
      <a title="下一首" @click="nextSong"
        ><img src="@/assets/player/next.png" alt=""
      /></a>
    </div>
    <div
      class="volume"
      @mouseenter="changeVolume_show(1)"
      @mouseleave="changeVolume_show(0)"
    >
      <!-- 有音量 -->
      <div class="volume-img" title="音量" v-show="volume">
        <img src="@/assets/player/valume.png" alt="" />
      </div>
      <!-- 静音 -->
      <div class="volume-img" title="音量 " v-show="!volume">
        <img src="@/assets/player/volume-X.png" alt="" />
      </div>

      <!-- 音量条 -->
      <div class="volume-progress" v-show="volume_show">
        <div class="volume-progress-container">
          <div class="volume-progress-point"></div>
          <div
            class="volume-progress-line"
            :style="{ height: volume_progress_H }"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watch, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import time from '@/hook/time'
export default {
  setup() {
    const store = useStore()
    const player = ref(null)
    const progress = ref(null)
    const xisu = 0.986
    let timer_c = null
    let timer_p = null
    // 定时器
    const data = reactive({
      state: 0,
      songName: computed(() => store.state.m_player.activeMusic.songName),
      url: computed(() => store.state.m_player.activeMusic.musicUrl),
      imgurl: computed(() => store.state.m_player.activeMusic.picUrl),
      duration: computed(() => store.state.m_player.activeMusic.duration),
      artistsName: computed(() => store.state.m_player.activeMusic.artistsName),
      progressW: 0,
      songDuration: 0,
      currentTime: time(0),
      volume: 1,
      volume_progress_H: '150px',
      volume_show: 0,
      nextSong() {
        store.commit('m_player/nextSong')
      },
      preSong() {
        store.commit('m_player/preSong')
      },
      changestate(state) {
        if (this.url) {
          this.state = state
        }
      },
      changeCurrentTime() {
        this.currentTime = time(player.value.currentTime)
        this.isEnded()
      },

      isEnded() {
        if (player.value.ended) {
          this.changestate(0)
          this.nextSong()
        }
      },
      changeProgressW() {
        const offset = (player.value.currentTime / (data.duration / 1000)) * 100
        this.progressW = offset * xisu + '%'
      },
      openCurrentTime_timer() {
        timer_c = setInterval(this.changeCurrentTime.bind(this), 1000)
      },
      clearCurrentTime_timer() {
        clearInterval(timer_c)
      },
      openProgressW_timer() {
        timer_p = setInterval(this.changeProgressW.bind(this), 1000)
      },
      clearProgressW_timer() {
        clearInterval(timer_p)
      },
      openAll_timer() {
        this.openCurrentTime_timer()
        this.openProgressW_timer()
      },
      clearAll_timer() {
        this.clearCurrentTime_timer()
        this.clearProgressW_timer()
      },
      changeVolume_show(state) {
        this.volume_show = state
        console.log('so')
      },
      // 进度条事件
      progressMount() {
        const pg = document.querySelector('.progress-container')
        const pg_Gap = pg.getBoundingClientRect()
        let p_width = 0
        const movefun = (e) => {
          if (e.clientX - pg_Gap.left < 0) {
            p_width = 0
            this.progressW = p_width + 'px'
            return
          }
          if (e.clientX - pg_Gap.left > 700) {
            p_width = 700
            this.progressW = p_width + 'px'
            return
          }
          p_width = e.clientX - pg_Gap.left
          this.progressW = p_width + 'px'
        }
        pg.addEventListener('mousedown', (e) => {
          this.clearProgressW_timer()
          p_width = e.layerX > 700 ? 700 : e.layerX
          this.progressW = p_width + 'px'
          document.body.addEventListener('mousemove', movefun)
          document.body.addEventListener(
            'mouseup',
            () => {
              document.body.removeEventListener('mousemove', movefun)
              if (this.url) {
                player.value.currentTime =
                  (p_width / 700) * (data.duration / 1000)
                this.changeCurrentTime()
                this.changestate(1)
                this.openProgressW_timer()
              }
            },
            { once: true }
          )
        })
      },
      // 音量事件
      volumeMount() {
        const vg = document.querySelector('.volume-progress-container ')
        let v_h = 0
        const movefun = (e) => {
          const vg_Gap = vg.getBoundingClientRect()
          if (vg_Gap.bottom - e.clientY < 0) {
            v_h = 0
            this.volume_progress_H = v_h + 'px'
            return
          }
          if (vg_Gap.bottom - e.clientY > 150) {
            v_h = 150
            this.volume_progress_H = v_h + 'px'
            return
          }
          v_h = vg_Gap.bottom - e.clientY

          this.volume_progress_H = v_h + 'px'
        }
        vg.addEventListener('mousedown', (e) => {
          v_h = e.layerY > 170 ? 0 : 170 - e.layerY

          this.volume_progress_H = v_h + 'px'
          document.body.addEventListener('mousemove', movefun)
          document.body.addEventListener(
            'mouseup',
            () => {
              document.body.removeEventListener('mousemove', movefun)
              this.volume = v_h / 150
              console.log(this.volume)
            },
            { once: true }
          )
        })
      }
    })
    watch(
      () => data.url,
      (newval, oldval) => {
        // 挂载进度条事件
        if (!oldval) {
          data.progressMount()
        }
        data.state = 0
        player.value.load()
        setTimeout(() => {
          player.value.play()
          data.progressW = 0
          data.changestate(1)
          data.songDuration = time(data.duration)
        }, 150)
      }
    )
    watch(
      () => data.state,
      () => {
        if (data.state) {
          player.value.play()
          data.openAll_timer()
        } else {
          player.value.pause()
          data.clearAll_timer()
        }
      }
    )
    // 监测音量
    watch(
      () => data.volume,
      (newval) => {
        player.value.volume = newval
      }
    )
    data.songDuration = time(data.duration)
    // 挂载进度条事件
    onMounted(() => {
      data.volumeMount()
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
    margin: 0 30px;
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
  .volume {
    position: relative;

    .volume-img {
      cursor: pointer;
      img {
        width: 28px;
        height: 28px;
      }
    }
    .volume-progress {
      position: absolute;
      left: -6px;
      bottom: 40px;
      width: 40px;
      height: 200px;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 2px 2px 2px #e5e5e5, -1px -1px 1px #e5e5e5;
      &::after {
        content: '';
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        left: 10px;
        bottom: -20px;
        border-color: rgba(231, 231, 231) transparent transparent transparent;
        border-style: solid dashed dashed dashed;
        border-width: 10px;
      }
      .volume-progress-container {
        width: 5px;
        height: 160px;
        background-color: rgba(231, 231, 231);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        cursor: pointer;
        .volume-progress-line {
          width: 5px;
          background-color: rgb(53, 193, 255);
        }
        .volume-progress-point {
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: rgb(53, 193, 255);
        }
      }
    }
  }
}
</style>

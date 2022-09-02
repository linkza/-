<template>
  <div class="player">
    <audio :src="url" ref="player" @loadstart="jia" @loadeddata="jian"></audio>
    <div class="player-img"><img :src="imgurl" alt="" /></div>
    <div class="progress">
      <div class="progress-content" ref="progress"></div>
    </div>
    <div class="time">
      <span>{{ newduration }}/</span> <span>{{ songduration }}</span>
    </div>
    <div class="player-button">
      <a title="上一首" @click="lastsong"
        ><svg
          t="1653231360945"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2718"
          width="200"
          height="200"
        >
          <path
            d="M364.302083 465.602819L687.954365 218.588294c38.416414-29.327534 93.791393-1.929039 93.791392 46.396277v494.029051c0 48.325316-55.374979 75.725617-93.791392 46.398084L364.302083 558.397181c-30.600916-23.357989-30.600916-69.436372 0-92.794362zM238.945254 780.798397V451.684117v-164.562559c0-19.628152-5.904521-60.475733 17.057907-75.841215 25.523642-17.068744 59.747828 1.210165 59.747828 31.919454v493.676839c0 19.628152 5.915358 60.473927-17.047069 75.841215-25.53448 17.068744-59.758666-1.211971-59.758666-31.919454z"
            fill="#515151"
            p-id="2719"
          ></path></svg></a
      ><a v-if="state == 0" title="播放/暂停" @click="changestate"
        ><svg
          t="1653231625653"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="6637"
          width="200"
          height="200"
        >
          <path
            d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z"
            fill="#515151"
            p-id="6638"
          ></path></svg></a
      ><a v-if="state == 1" title="播放/暂停" @click="changestate"
        ><svg
          t="1653231526813"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="5775"
          width="200"
          height="200"
        >
          <path
            d="M268.97201558 114.31784297c73.21218086 0 132.56071902 59.34853814 132.56071901 132.560719v530.24287606c0 73.21218086-59.34853814 132.56071902-132.56071901 132.560719s-132.56071902-59.34853814-132.56071901-132.560719V246.87856197c0-73.21218086 59.34853814-132.56071902 132.56071901-132.560719z m486.05596884 0c73.21218086 0 132.56071902 59.34853814 132.56071901 132.560719v530.24287606c0 73.21218086-59.34853814 132.56071902-132.56071901 132.560719s-132.56071902-59.34853814-132.56071901-132.560719V246.87856197c0-73.21218086 59.34853814-132.56071902 132.56071901-132.560719z"
            p-id="5776"
            fill="#515151"
          ></path></svg
      ></a>
      <a title="下一首" @click="nextsong"
        ><svg
          t="1653231453210"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="4905"
          width="200"
          height="200"
        >
          <path
            d="M655.706179 465.602819L332.053897 218.588294c-38.414608-29.327534-93.791393-1.929039-93.791392 46.396277v494.029051c0 48.325316 55.376785 75.725617 93.791392 46.398084l323.652282-247.014525c30.602722-23.357989 30.602722-69.436372 0-92.794362zM781.064814 780.798397V451.684117v-164.562559c0-19.628152 5.904521-60.475733-17.057907-75.841215-25.523642-17.068744-59.747828 1.210165-59.747828 31.919454v493.676839c0 19.628152-5.915358 60.473927 17.047069 75.841215 25.532673 17.068744 59.758666-1.211971 59.758666-31.919454z"
            fill="#515151"
            p-id="4906"
          ></path></svg
      ></a>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed, watch, ref } from 'vue'
import { useStore } from 'vuex'
import time from '../hook/time'
export default {
  setup() {
    const store = useStore()
    const player = ref(null)
    const progress = ref(null)
    let timer = null
    const opentimer = function () {
      clearInterval(timer)
      function a() {
        const offset = (player.value.currentTime / (data.duration / 1000)) * 100
        data.newduration = time(player.value.currentTime)
        progress.value.style.width = offset + '%'
        console.log(progress.value.style.width, offset)
        if (player.value.ended) {
          clearInterval(timer)
          data.state = 0
          store.commit('changeactive', data.nextindex)
        }
      }
      timer = setInterval(a, 1000)
    }
    const data = reactive({
      state: 0,
      url: computed(() => store.state.active.url),
      imgurl: computed(() => store.state.active.img),
      duration: computed(() => store.state.active.duration),
      nextindex: computed(() => store.state.active.index),
      lastindex: computed(() => store.state.active.index - 2),
      nextsong() {
        store.commit('changeactive', data.nextindex)
      },
      lastsong() {
        store.commit('changeactive', data.lastindex)
      },
      changestate() {
        if (store.state.activelist.length) {
          data.state = !data.state
          if (data.state) {
            opentimer()
          } else clearInterval(timer)
        }
      }
    })
    data.songduration = time(data.duration)
    data.newduration = time(0)
    watch(
      () => data.url,
      () => {
        data.state = 0
        player.value.load()
        setTimeout(() => {
          player.value.play()
          progress.value.style.width = 0
          data.songduration = time(data.duration)
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
    a {
      svg {
        cursor: pointer;
        width: 30px;
        height: 30px;
        opacity: 0.7;
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
  .progress {
    width: 400px;
    height: 5px;
    background-color: rgba(255, 255, 255, 0.5);
    .progress-content {
      height: 5px;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
}
</style>

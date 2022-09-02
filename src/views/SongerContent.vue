<template>
  <div class="mc" ref="mc">
    <div class="songlist" v-show="show">
      <div class="detail">
        <img :src="songer.img1v1Url" alt="" />
        <div class="text">
          <h3>{{ songer.name }}</h3>
          <p class="alias">
            <span v-for="(item, index) in songer.alias" :key="index"
              >{{ item + '\xa0'
              }}<i v-if="index + 1 < songer.alias.length">、</i></span
            >
          </p>
          <ul class="button">
            <li class="collect">
              <img src="../assets/Scollect.png" alt="" />收藏
            </li>
          </ul>
        </div>
      </div>
      <ul class="nav">
        <li :class="active == 0 ? 'active' : ''" @click="changeactive(0)">
          单曲{{ '\xa0' + songer.musicSize }}
        </li>
        <li :class="active == 1 ? 'active' : ''" @click="changeactive(1)">
          专辑{{ '\xa0' + songer.albumSize }}
        </li>
        <li :class="active == 2 ? 'active' : ''" @click="changeactive(2)">
          视频{{ '\xa0' + songer.mvSize }}
        </li>
        <li :class="active == 3 ? 'active' : ''" @click="changeactive(3)">
          资料
        </li>
        <li :class="active == 4 ? 'active' : ''" @click="changeactive(4)">
          相似歌手
        </li>
      </ul>
      <component :is="componentname"></component>
    </div>
  </div>
</template>

<script>
import song from '../components/songercontent/SongerSong.vue'
import album from '../components/songercontent/SongerAlbum.vue'
import mv from '../components/songercontent/SongerMv.vue'
import detail from '../components/songercontent/SongerDetail.vue'
import similar from '../components/songercontent/SimilarSonger.vue'
import { markRaw, reactive, toRefs, ref } from 'vue'
import axios from 'axios'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SongerC',
  components: { song, album, mv, detail, similar },
  setup() {
    const store = useStore()
    const route = useRoute()
    store.state.songlistid = route.query.id
    const componentname = ref('song')
    const mc = ref(null)
    const data = reactive({
      id: route.query.id,
      show: 0,
      songer: {},
      active: 0,
      cname: ['song', 'album', 'mv', 'detail', 'similar'],
      async getlist() {
        this.show = 0
        const { data: ref } = await axios.get(`/artists?id=${this.id}`)
        this.songer = markRaw(ref.artist)
        this.show = 1
        componentname.value = this.cname[0]
        this.active = 0
        console.log(ref)
      },
      changeactive(i) {
        this.active = i
        componentname.value = this.cname[i]
      }
    })
    data.getlist()
    onBeforeRouteUpdate((to, from, next) => {
      data.id = to.query.id
      data.getlist()
      next()
    })
    return {
      ...toRefs(data),
      componentname,
      mc
    }
  }
}
</script>

<style lang="less" scoped>
.songlist {
  width: 1100px;
  margin-top: 30px;
  .detail {
    width: 1100px;
    display: flex;
    justify-content: flex-start;

    img {
      width: 200px;
      height: 200px;
      border-radius: 100px;
    }
    .text {
      width: 850px;
      height: 200px;
      padding: 20px 0 0 20px;
      position: relative;
      h3 {
        font-size: 30px;
        cursor: default;
      }
      .alias {
        margin-top: 10px;
        span {
          color: rgb(133, 133, 133);
          font-size: 15px;
        }
      }
      .button {
        display: flex;
        justify-content: flex-start;
        position: absolute;
        left: 20px;
        bottom: 20px;
        li {
          width: 100px;
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
        .collect {
          background-color: rgb(252, 120, 117);
          &:hover {
            background-color: rgb(253, 63, 63);
          }
        }
      }
    }
  }
  .nav {
    margin-top: 50px;
    display: flex;
    li {
      margin-right: 70px;
      font-size: 20px;
      font-weight: normal;
      cursor: pointer;
      &:hover {
        color: rgb(53, 193, 255);
      }
    }
    .active {
      font-weight: 600;
      color: rgb(53, 193, 255);
    }
  }
}
</style>

<template>
  <div class="mc" ref="mc">
    <div class="songlist" v-show="show">
      <div class="detail">
        <img :src="list.coverImgUrl" alt="" />
        <div class="text">
          <h3>{{ list.name }}</h3>
          <p class="creator" v-if="creator">
            <img :src="list.creator.avatarUrl" alt="" />
            <span>{{ list.creator.nickname }}</span>
          </p>
          <p class="description">简介：{{ list.description }}</p>
          <ul class="tags">
            <li
              v-for="(item, index) in list.tags"
              :key="index"
              @click="toplaylist(item)"
            >
              #{{ item }}
            </li>
          </ul>
          <ul class="button">
            <li class="play"><img src="@/assets/Splay.png" alt="" /> 播放</li>
            <li class="collect">
              <img src="@/assets/Scollect.png" alt="" />收藏
            </li>
          </ul>
          <span class="playcount">播放量：{{ playcount + '万' }}</span>
        </div>
      </div>
      <ul class="nav">
        <li :class="active == 0 ? 'active' : ''" @click="changeactive(0)">
          歌曲{{ ' ' + ' ' + list.trackCount }}
        </li>
        <li :class="active == 1 ? 'active' : ''" @click="changeactive(1)">
          相似歌单
        </li>
        <li :class="active == 2 ? 'active' : ''" @click="changeactive(2)">
          评论
        </li>
      </ul>
      <component :is="componentname"></component>
    </div>
  </div>
</template>

<script>
import ssong from '@/components/songList/Detail/SSong'
import slist from '@/components/songList/Detail/SList'
import scomment from '@/components/MusicComment.vue'
import { markRaw, reactive, toRefs, ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'SongList',
  components: { ssong, slist, scomment },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    store.state.songlistid = route.query.id
    const componentname = ref('ssong')
    const mc = ref(null)
    const data = reactive({
      id: route.query.id,
      show: 1,
      list: {},
      songs: [],
      creator: 0,
      playcount: 0,
      active: 0,
      cname: ['ssong', 'slist', 'scomment'],
      async getlist() {
        this.show = 0
        const { data: ref } = await axios.get(`/playlist/detail?id=${this.id}`)
        this.list = markRaw(ref.playlist)
        this.playcount = (this.list.playCount / 10000).toFixed(1)
        this.creator = 1
        this.show = 1
        componentname.value = this.cname[0]
        this.active = 0
      },
      toplaylist(cat) {
        router.push({ path: '/playlist', query: { cat } })
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
        font-weight: normal;
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
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .tags {
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        li {
          margin-right: 5px;
          font-size: 15px;
          color: rgb(53, 193, 255);
          cursor: pointer;
        }
      }
      .button {
        display: flex;
        justify-content: flex-start;
        position: absolute;
        left: 10px;
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
  .nav {
    margin-top: 40px;
    display: flex;
    li {
      margin-right: 70px;
      font-size: 20px;
      cursor: pointer;
      &:hover {
        color: rgb(53, 193, 255);
      }
    }
    .active {
      color: rgb(53, 193, 255);
    }
  }
}
</style>

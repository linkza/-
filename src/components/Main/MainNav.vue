<template>
  <div class="main-nav">
    <div class="main-nav-left">
      <ul>
        <li>
          <i class="el-icon-arrow-left" @click="back"></i>
        </li>
        <li>
          <i class="el-icon-arrow-right" @click="forward"></i>
        </li>
        <li>
          <i class="el-icon-refresh-right"></i>
        </li>
      </ul>
    </div>
    <div class="main-nav-right">
      <div class="search">
        <input
          type="text"
          v-model="input"
          @focus.stop="onFocus"
          @blur.stop="onBlur"
        />
        <div class="searchSuggest" v-show="suggestShow">
          <div
            class="searchSuggest-item"
            v-for="(sort, index) in SearchSuggest.order"
            :key="index"
          >
            <div class="sort">{{ order[sort] }}</div>
            <div class="container">
              <ul>
                <li
                  v-for="(item, index1) in SearchSuggest[sort]"
                  :key="index1"
                  @click.stop="toAng(item, sort)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user">
      <img src="@/assets/head.jpg" alt="" class="header" /><span
        @click="changeflag"
        >{{ username }}</span
      >
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import updateMusiclist from '@/hook/updateMusiclist'
export default {
  // 第一
  setup() {
    const router = useRouter()
    const store = useStore()
    const data = reactive({
      input: '',
      username: '点击登录',
      order: {
        songs: '歌曲',
        artists: '歌手',
        albums: '专辑',
        playlists: '歌单'
      },
      SearchSuggest: {},
      suggestShow: 1,
      async getSearchSuggest(keywords) {
        const { data: res } = await axios.get(
          `/search/suggest?keywords=${keywords}`
        )
        data.SearchSuggest = res.result
        console.log(res)
      },
      back() {
        router.back()
      },
      forward() {
        router.forward()
      },
      changeflag() {
        store.state.loginflag = 1
      },
      toAng(item, sort) {
        if (sort === 'songs') {
          updateMusiclist(item)
        }
        if (sort === 'artists') {
          router.push({ path: '/songerc', query: { id: item.id } })
        }
        if (sort === 'albums') {
          router.push({ path: '/albumcontent', query: { id: item.id, is: 0 } })
        } else {
          router.push({ path: '/songlist', query: { id: item.id, is: 0 } })
        }
      },
      onFocus() {
        console.log(data.suggestShow)
        this.suggestShow = 1
      },
      onBlur() {
        setTimeout(() => {
          this.suggestShow = 0
        }, 100)
      }
    })
    watch(
      () => data.input,
      (newval) => {
        if (newval) data.getSearchSuggest(newval)
        else data.SearchSuggest = {}
      }
    )
    return {
      ...toRefs(data),
      updateMusiclist
    }
  }
}
</script>

<style lang="less">
@border-color:rgba (0, 0, 0, 0.3);
.main-nav {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.main-nav-left {
  width: 200px;
  ul {
    display: flex;
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    width: 200px;
    li {
      margin-left: 10px;
    }
  }
  i {
    cursor: pointer;
    font-size: 20px;
    margin-right: 15px;
  }
}
.main-nav-right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1000px;
  .search {
    position: relative;
    input {
      padding-left: 35px;
      width: 400px;
      height: 34px;
      background-color: rgb(239, 239, 239);
      border-radius: 17px;
    }
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      position: absolute;
      top: 7px;
      left: 10px;
      background-image: url('@/assets/search.svg');
      background-size: contain;
      opacity: 0.4;
    }
    .searchSuggest {
      width: 350px;
      position: absolute;
      background-color: #fff;
      top: 36px;
      margin-top: 5px;
      border-radius: 5px;
      box-shadow: 2px 2px 2px #e5e5e5, -1px -1px 1px #e5e5e5;
      z-index: 999;
      .searchSuggest-item {
        display: flex;
        border-top: 1px solid rgb(245, 245, 245);
        font-size: 13px;
        padding: 10px 0;
        &:first-child {
          border-top: none;
        }
        .sort {
          width: 100px;
          text-align: center;
          color: rgb(153, 153, 153);
        }
        .container {
          li {
            width: 230px;
            line-height: 30px;
            padding-left: 10px;
            cursor: default;
            &:hover {
              background-color: rgb(247, 247, 247);
            }
          }
        }
      }
    }
  }
}
.user {
  display: flex;
  align-items: center;
  width: 200px;
  .header {
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 20px;
  }
  span {
    color: rgb(133, 133, 133);
    font-size: 15px;
    cursor: pointer;
    &:hover {
      color: rgb(53, 193, 255);
    }
  }
}
</style>

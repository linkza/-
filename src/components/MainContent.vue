<template>
  <div class="main-content">
    <router-view v-slot="{ Component }">
      <keep-alive
        exclude="SongList,MvAll,TopMv,TopList,RSong,AlbumContent,NewAlbum,SongerC"
      >
        <component :is="Component"
      /></keep-alive>
    </router-view>
    <div class="music-player"><player></player></div>
  </div>
</template>

<script>
import player from '../components/MusicPlayer.vue'
import { useRoute } from 'vue-router'
export default {
  components: {
    player
  },
  setup() {
    const route = useRoute()
    return {
      route
    }
  }
}
</script>

<style lang="less" scoped>
.main-content {
  position: relative;
  width: 1270px;
  height: 840px;
  overflow: hidden;
  .music-player {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>

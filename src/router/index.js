import { createRouter, createWebHistory } from 'vue-router'
import musicrecomment from '@/views/Recomment/MusicRecomment.vue'
import musicbank from '@/views/MusicBank/MusicBank.vue'
import musiclist from '@/views/songList/SongList.vue'
import playlist from '@/views/songList/PlayList.vue'
import songlist from '@/views/songList/SongListDetail.vue'
import musicvedio from '@/views/Mv/MusicVedio.vue'
import mv from '@/views/Mv/MvAll.vue'
import topmv from '@/views/Mv/MvTop/TopMv.vue'
import topsong from '@/views/MusicBank/songTop/MusicTop.vue'
import toplist from '@/views/MusicBank/songTop/TopDetail.vue'
import recommentsong from '@/views/MusicBank/RecommentSong.vue'
import albumcontent from '@/views/Album/AlbumDetail.vue'
import newalbum from '@/views/MusicBank/NewAlbum.vue'
import musicsonger from '@/views/songer/MusicSonger.vue'
import songercontent from '@/views/songer/SongerDetail.vue'

const routes = [
  {
    path: '/',
    redirect: '/album'
  },
  {
    path: '/album',
    component: musicrecomment
  },
  {
    path: '/bank',
    component: musicbank
  },
  {
    path: '/list',
    component: musiclist
  },
  {
    path: '/playlist',
    component: playlist
  },
  {
    path: '/songlist',
    name: 'sl',
    component: songlist
  },
  {
    path: '/vedio',
    component: musicvedio
  },
  {
    path: '/mvall',
    component: mv
  },
  {
    path: '/topmv',
    component: topmv
  },
  {
    path: '/topsong',
    component: topsong
  },
  {
    path: '/toplist',
    component: toplist
  },
  {
    path: '/rsong',
    component: recommentsong
  },
  {
    path: '/albumcontent',
    component: albumcontent
  },
  {
    path: '/newalbum',
    component: newalbum
  },
  {
    path: '/songer',
    component: musicsonger
  },
  {
    path: '/songerc',
    component: songercontent
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import musicrecomment from '../views/MusicRecomment.vue'
import musicbank from '../views/MusicBank.vue'
import musiclist from '../views/MusicList.vue'
import playlist from '../views/PlayList.vue'
import songlist from '../views/SongList.vue'
import musicvedio from '../views/MusicVedio.vue'
import mv from '../views/MvAll.vue'
import topmv from '../views/TopMv.vue'
import topsong from '../views/MusicTop.vue'
import toplist from '../views/TopList.vue'
import recommentsong from '../views/RecommentSong.vue'
import albumcontent from '../views/AlbumContent.vue'
import newalbum from '../views/NewAlbum.vue'
import musicsonger from '../views/MusicSonger.vue'
import songercontent from '../views/SongerContent.vue'

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

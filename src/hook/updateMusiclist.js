import store from '@/store'
import axios from 'axios'
async function updateMusiclist(info) {
  const { data: res } = await axios.get(
    `/song/url/v1?id=${info.id}&level=standard`
  )
  // console.log(info, res)
  if (info.dt) {
    store.commit('m_player/updateMusiclist', {
      id: info.id,
      songName: info.name,
      artistsName: info.ar.map((x) => x.name).join('、'),
      musicUrl: res.data[0].url,
      picUrl: info.al.picUrl,
      duration: info.dt
    })
    return
  }
  if (info.song) {
    store.commit('m_player/updateMusiclist', {
      id: info.id,
      songName: info.name,
      artistsName: info.song.artists.map((x) => x.name).join('、'),
      musicUrl: res.data[0].url,
      picUrl: info.song.album.picUrl,
      duration: info.song.duration
    })
  } else {
    store.commit('m_player/updateMusiclist', {
      id: info.id,
      songName: info.name,
      artistsName: info.artists.map((x) => x.name).join('、'),
      musicUrl: res.data[0].url,
      picUrl: info.album.picUrl || info.artists[0].img1v1Url,
      duration: info.duration
    })
  }
}
export default updateMusiclist

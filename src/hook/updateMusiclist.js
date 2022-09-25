import store from '@/store'
import axios from 'axios'
async function updateMusiclist(id) {
  const { data: res } = await axios.get(`/song/url/v1?id=${id}&level=standard`)
  const { data: ref } = await axios.get(`/song/detail?ids=${id}`)
  const info = ref.songs[0]
  store.commit('m_player/updateMusiclist', {
    id: info.id,
    songName: info.name,
    artistsName: info.ar.map((x) => x.name).join('、'),
    musicUrl: res.data[0].url,
    picUrl: info.al.picUrl,
    duration: info.dt
  })
}
export default updateMusiclist

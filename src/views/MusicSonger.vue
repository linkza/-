<template>
  <div class="mc" v-show="show" @scroll="scroll">
    <div class="songlist" @click="hide">
      <div class="nav">
        <h3>歌手</h3>
        <ul class="tag">
          <li
            v-for="(item, index) in area"
            :key="index"
            :class="active[0] == index ? 'active' : ''"
            @click="changeclass(0, index)"
          >
            {{ item }}
          </li>
        </ul>
        <ul class="tag">
          <li
            v-for="(item, index) in type"
            :key="index"
            :class="active[1] == index ? 'active' : ''"
            @click="changeclass(1, index)"
          >
            {{ item }}
          </li>
        </ul>
        <ul class="letter">
          <li
            v-for="(item, index) in letter"
            :key="index"
            :class="active[2] == index ? 'at' : ''"
            @click="changeclass(2, index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
      <ul class="content" v-show="flag">
        <li v-for="(item, index) in songers" :key="index">
          <img
            :data-url="item.img1v1Url"
            alt=""
            v-limg
            @click="tosongerc(item.id)"
          />
          <p @click="tosongerc(item.id)">{{ item.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const data = reactive({
      songers: [],
      flag: 0,
      show: 0,
      fl: 1,
      of: 0,
      area: ['全部', '华语', '欧美', '日本', '韩国', '其他'],
      a: [-1, 7, 96, 8, 16, 0],
      type: ['全部', '男歌手', '女歌手', '乐队组合'],
      t: [-1, 1, 2, 3],
      active: [0, 0, 0],
      letter: ['最热'],
      async getsonger() {
        const a = this.a[this.active[0]]
        const t = this.t[this.active[1]]
        const l =
          this.active[2] === 0
            ? -1
            : this.active[2] === 27
            ? 0
            : this.letter[this.active[2]]
        const o = this.of * 48
        const { data: ref } = await axios.get(
          `/artist/list?type=${t}&area=${a}&initial=${l}&offset=${o}&limit=48`
        )
        this.songers.push(...ref.artists)
        this.fl = 1
        nextTick(() => {
          this.show = 1
          this.flag = 1
        })
      },
      changeclass(index, i) {
        console.log(1)
        this.active[index] = i
        this.songers = []
        this.flag = 0
        this.of = 0
        this.getsonger()
      },
      tosongerc(id) {
        router.push({ path: '/songerc', query: { id } })
      },
      scroll(e) {
        if (e.target.scrollHeight - 780 - e.target.scrollTop < 400 && this.fl) {
          this.fl = 0
          this.of += 1
          this.getsonger()
        }
      }
    })
    for (let i = 0; i < 26; i++) {
      data.letter.push(String.fromCharCode(i + 65))
    }
    data.letter.push('#')
    data.getsonger()
    return { ...toRefs(data) }
  }
}
</script>

<style lang="less" scoped>
.songlist {
  width: 1100px;
  margin-top: 30px;
  .nav {
    width: 1100px;
    margin-bottom: 30px;
    position: relative;
    h3 {
      height: 35px;
      margin-bottom: 15px;
      position: relative;
      line-height: 35px;
      font-size: 35px;
      &::before {
        content: 'SONGER';
        height: 20px;
        position: absolute;
        left: 0;
        bottom: -20px;
        line-height: 20px;
        font-size: 12px;
        color: rgb(193, 193, 193);
      }
    }
    .tag {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        height: 50px;
        width: 130px;
        margin-top: 20px;
        margin-right: 20px;
        font-size: 15px;
        line-height: 50px;
        text-align: center;
        border-radius: 25px;
        background-color: rgb(239, 239, 239);
        cursor: pointer;
        &:not(.active):hover {
          color: rgb(53, 193, 255);
          background-color: rgb(226, 226, 226);
        }
      }
      .active {
        color: white;
        background-color: rgb(63, 196, 255);
        cursor: default;
      }
    }
    .letter {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      li {
        font-size: 15px;
        cursor: pointer;
      }
      .at {
        color: rgb(63, 196, 255);
        cursor: default;
      }
    }
  }
  .content {
    display: flex;
    justify-items: flex-start;
    flex-wrap: wrap;
    li {
      margin-right: 40px;
      margin-bottom: 20px;
      &:nth-child(6n) {
        margin-right: 0;
      }
      img {
        width: 150px;
        height: 150px;
        border-radius: 75px;
        cursor: pointer;
      }
      p {
        width: 150px;
        height: 20px;
        margin-top: 10px;
        font-size: 15px;
        line-height: 20px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
        &:hover {
          color: rgb(53, 193, 255);
        }
      }
    }
  }
}
</style>

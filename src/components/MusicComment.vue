<template>
  <div class="comment">
    <div class="commentarea">
      <img src="../assets/head.jpg" alt="" />
      <div>
        <div class="text" ref="text" contenteditable="true"></div>
        <span class="button">发布</span>
      </div>
    </div>
    <ul class="hot">
      <h3>最热评论({{ hotcomment.length }})</h3>
      <li v-for="(item, index) in hotcomment" :key="index">
        <img :src="item.user.avatarUrl" alt="" />
        <div class="text">
          <p>
            <span>{{ item.user.nickname }}</span
            ><span>{{ item.timeStr }}</span>
          </p>
          <p>{{ item.content }}</p>
          <p v-if="item.beReplied.length != 0" class="beR">
            <span>{{ '@' + item.beReplied[0].user.nickname }}</span
            >:{{ item.beReplied[0].content }}
          </p>
          <p class="button">
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>
              {{ item.likedCount }}</span
            ><span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi"></use></svg
              >回复</span
            >
          </p>
        </div>
      </li>
    </ul>
    <ul class="new" ref="newcom">
      <h3>最新评论({{ total }})</h3>
      <li v-for="(item, index) in newcomment" :key="index">
        <img :src="item.user.avatarUrl" alt="" />
        <div class="text">
          <p>
            <span>{{ item.user.nickname }}</span
            ><span>{{ item.timeStr }}</span>
          </p>
          <p>{{ item.content }}</p>
          <p v-if="item.beReplied.length != 0" class="beR">
            <span>{{ '@' + item.beReplied[0].user.nickname }}</span
            ><i>:</i>{{ item.beReplied[0].content }}
          </p>
          <p class="button">
            <span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-icon"></use>
              </svg>
              {{ item.likedCount ? item.likedCount : '' }}</span
            ><span
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi"></use></svg
              >回复</span
            >
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs, nextTick, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const text = ref(null)
    const newcom = ref(null)
    const callback = (entries) => {
      if (entries[0].isIntersecting) {
        data.flag++
        data.getcomment()
        observer.unobserve(entries[0].target)
      }
    }
    const observer = new IntersectionObserver(callback)
    const data = reactive({
      id: route.query.id,
      newcomment: [],
      hotcomment: [],
      is: route.query.is,
      total: 0,
      flag: 0,
      async getcomment() {
        if (this.is > 0) {
          const { data: ref } = await axios.get(
            `/comment/playlist?id=${this.id}&offset=${this.flag * 20}&limit=20`
          )
          this.voluation(ref)
        } else {
          const { data: ref } = await axios.get(
            `/comment/album?id=${this.id}&offset=${this.flag * 20}&limit=20`
          )
          this.voluation(ref)
        }
      },
      voluation(ref) {
        this.hotcomment = ref.hotComments || this.hotcomment
        if (ref.comments) {
          this.newcomment.push(...ref.comments)
        }
        this.total = ref.total
        if (ref.comments.length > 8) {
          nextTick(() => {
            observer.observe(newcom.value.children[this.newcomment.length - 4])
          })
        }
      }
    })
    data.getcomment()
    return {
      ...toRefs(data),
      text,
      newcom
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  width: 1100px;
  margin-top: 30px;
  .commentarea {
    width: 1100px;
    height: fit-content;
    display: flex;
    position: relative;
    img {
      width: 50px;
      height: 50px;
      border-radius: 25px;
    }
    .text {
      width: 1030px;
      min-height: 80px;
      max-height: 160px;
      margin-left: 20px;
      padding: 9px 9px 40px 9px;
      outline: none;
      line-height: 20px;
      font-size: 16px;
      white-space: pre-wrap;
      border: 1px solid rgb(214, 214, 214);
      border-radius: 5px;
      overflow: hidden;
      &:focus {
        border: 1px solid rgb(53, 193, 255);
      }
    }
    .button {
      width: 60px;
      height: 30px;
      position: absolute;
      right: 20px;
      bottom: 10px;
      font-size: 15px;
      line-height: 30px;
      text-align: center;
      color: white;
      border-radius: 15px;
      background-color: rgb(53, 193, 255);
      cursor: pointer;
      &:hover {
        background-color: rgb(47, 174, 230);
      }
    }
  }
  .hot,
  .new {
    width: 1100px;
    margin-top: 30px;
    h3 {
      font-size: 15px;
      font-weight: normal;
      cursor: default;
    }
    li {
      display: flex;
      padding: 19px 0 20px 0;
      border-top: 1px solid rgb(244, 244, 244);
      &:nth-child(2) {
        padding: 20px 0;
        border: 0;
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        cursor: pointer;
      }
      .text {
        margin-left: 10px;
        p {
          min-height: 30px;
          font-size: 15px;
          &:first-child {
            width: 1050px;
            display: flex;
            justify-content: space-between;
            span {
              color: rgb(133, 133, 133);
              cursor: default;
              &:first-child {
                cursor: pointer;
              }
            }
          }
          &:nth-child(2) {
            color: rgb(51, 51, 51);
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          }
        }
        .beR {
          width: 1050px;
          min-height: 50px;
          display: flex;
          padding: 10px 0 10px 10px;
          line-height: 30px;
          font-size: 15px;
          color: rgb(128, 128, 128);
          border-radius: 5px;
          background-color: rgb(243, 243, 243);
          span {
            width: fit-content;
            white-space: nowrap;
            color: rgb(128, 128, 128);
            cursor: pointer;
            &:hover {
              color: rgb(53, 193, 255);
            }
          }
          i {
            margin-right: 5px;
            color: rgb(128, 128, 128);
          }
        }
        .button {
          margin-top: 10px;
          display: flex;
          span {
            width: 80px;
            display: flex;
            align-items: center;
            color: rgb(51, 51, 51);
            cursor: pointer;
            &:hover {
              color: rgb(53, 193, 255);
              .icon {
                fill: rgb(53, 193, 255);
              }
            }
            .icon {
              width: 20px;
              height: 20px;
              margin-right: 5px;
              vertical-align: -0.15em;
              fill: currentColor;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>

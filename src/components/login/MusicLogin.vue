<template>
  <div class="login" v-if="flag">
    <div class="content">
      <div class="top">
        登录账号<span @click="change"
          ><svg
            t="1656837701271"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2258"
            width="200"
            height="200"
          >
            <path
              d="M525.269211 510.837524 918.101111 116.227118c7.17747-7.209192 7.14984-18.871813-0.059352-26.049283-7.210215-7.176446-18.87079-7.151887-26.049283 0.059352L499.278257 484.72889 106.563014 90.236164c-7.17747-7.209192-18.84009-7.235798-26.049283-0.059352-7.209192 7.17747-7.235798 18.84009-0.059352 26.049283L473.287303 510.837524 80.45438 905.446907c-7.176446 7.209192-7.150864 18.871813 0.059352 26.049283 3.593851 3.577478 8.29492 5.365194 12.994965 5.365194 4.727675 0 9.455349-1.809205 13.054317-5.424546l392.715243-394.491703 392.715243 394.491703c3.599991 3.615341 8.326643 5.424546 13.054317 5.424546 4.700045 0 9.402137-1.787716 12.994965-5.365194 7.209192-7.17747 7.235798-18.84009 0.059352-26.049283L525.269211 510.837524z"
              p-id="2259"
              fill="#000000"
            ></path></svg
        ></span>
      </div>
      <div class="phone">
        <ul>
          <li>
            <input
              type="text"
              name="phone"
              class="input-phone"
              placeholder="请输入电话号码"
              v-model="phonenumber"
            />
          </li>
          <li>
            <input
              type="text"
              name="ma"
              class="input-ma"
              placeholder="请输入验证码"
              v-model="code"
            />
            <span @click="getcode">获取验证码</span>
          </li>
          <li>
            <input
              type="button"
              class="input-login"
              value="登录"
              @click="login"
            />
          </li>
        </ul>
      </div>
      <div class="buttom"></div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
  setup() {
    const store = useStore()
    const data = reactive({
      flag: computed(() => store.state.loginflag),
      phonenumber: '',
      code: '',
      change() {
        store.state.loginflag = !store.state.loginflag
      },
      async getcode() {
        await axios.get(`/captcha/sent?phone=${this.phonenumber}`, {
          withCredentials: true
        })
      },
      async login() {
        await axios.get(
          `/login/cellphone?phone=${this.phonenumber}&captcha=${this.code}`,
          { withCredentials: true }
        )
        store.state.loginflag = !store.state.loginflag
      }
    })
    return {
      ...toRefs(data)
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  .content {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    .top {
      height: 35px;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      text-align: center;
      line-height: 35px;
      background-color: #dde2ee;
      svg {
        width: 15px;
        height: 15px;
        cursor: pointer;
        &:hover {
          opacity: 0.5;
        }
      }
    }
    .phone {
      width: 100%;
      height: 275px;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          height: 30px;
          width: 80px;
          margin-top: 10px;
          text-align: center;
          line-height: 30px;
          border-radius: 10px;
          border: 1px solid #000;
          cursor: pointer;
        }
      }
      input {
        height: 30px;
        padding: 0 10px;
        border: 1px solid #000;
        border-radius: 10px;
      }
      .input-phone {
        width: 250px;
      }
      .input-ma {
        width: 150px;
        margin-top: 10px;
      }
      .input-login {
        margin-top: 30px;
        width: 250px;
        color: white;
        border: 0;
        background-color: rgb(0, 161, 214);
      }
    }
    .buttom {
      height: 100px;
      width: 100%;
    }
  }
}
</style>

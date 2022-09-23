<template>
  <div class="mc" ref="mc" @scroll="scroll"><songlist></songlist></div>
</template>

<script>
import songlist from '@/components/songList/LList'
import { reactive, toRefs, ref, onActivated } from 'vue'
export default {
  components: {
    songlist
  },
  setup() {
    const mc = ref(null)
    const data = reactive({
      st: 0,
      scroll(e) {
        console.log(mc)
        this.st = e.target.scrollTop
      }
    })
    onActivated(() => {
      mc.value.scrollTop = data.st
    })
    return {
      ...toRefs(data),
      mc
    }
  }
}
</script>

<style></style>

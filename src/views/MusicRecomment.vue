<template>
  <div class="mc" ref="mc" @scroll="scroll">
    <banner></banner>
    <rlist></rlist>
    <rsong></rsong>
    <rrank></rrank>
  </div>
</template>
<script>
import banner from '../components/recomment/MBanner'
import rlist from '../components/recomment/RList'
import rsong from '../components/recomment/RSong'
import rrank from '../components/recomment/RRank'
import { reactive, toRefs, ref, onActivated } from 'vue'
export default {
  name: 'MusicrRcomment',
  components: {
    banner,
    rlist,
    rsong,
    rrank
  },
  setup() {
    const mc = ref(null)
    const data = reactive({
      st: 0,
      scroll(e) {
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

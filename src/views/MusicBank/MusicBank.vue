<template>
  <div class="mc" ref="mc" @scroll="scroll">
    <bnav></bnav>
    <bsong></bsong>
    <bdish></bdish>
    <bmv></bmv>
  </div>
</template>

<script>
import bnav from '@/components/bank/BNav.vue'
import bsong from '@/components/bank/BSong.vue'
import bdish from '@/components/bank/BDish.vue'
import bmv from '@/components/bank/BMv.vue'
import { reactive, toRefs, ref, onActivated } from 'vue'
export default {
  components: {
    bnav,
    bsong,
    bdish,
    bmv
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

<template>
  <div class="mc" ref="mc" @scroll="scroll">
    <mmv></mmv>
  </div>
</template>

<script>
import mmv from '@/components/Mv/MMv.vue'
import { reactive, toRefs, ref, onActivated } from 'vue'
export default {
  components: {
    mmv
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

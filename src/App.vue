<template>
  <div class="common-layout">
    <!-- <BackGround></BackGround> -->
    <musiclogin></musiclogin>
    <MaIn></MaIn>
  </div>
</template>

<script>
// import BackGround from './components/BackGround'
import MaIn from '@/components/Main/Main'
import musiclogin from '@/components/login/MusicLogin.vue'
export default {
  components: {
    // BackGround,
    MaIn,
    musiclogin
  }
}
</script>

<style></style>

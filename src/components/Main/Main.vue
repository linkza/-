<template>
  <div class="main">
    <MainNav></MainNav>
    <MainLeftNav></MainLeftNav>
    <MainContent></MainContent>
  </div>
</template>

<script>
import MainNav from '@/components/Main/MainNav'
import MainLeftNav from '@/components/Main/MainLeftNav'
import MainContent from '@/components/Main/MainContent'

export default {
  components: {
    MainNav,
    MainLeftNav,
    MainContent
  }
}
</script>

<style lang="less" scoped>
.main {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-content: flex-start;
  position: fixed;
  top: 50%;
  left: 50%;
  overflow: hidden;
  margin-top: -450px;
  margin-left: -750px;
  padding: 0 0 0 30px;
  border-radius: 15px;
  width: 1500px;
  height: 900px;
  background-color: var(--main-bgc);
}
</style>

<template>
  <div class="mainContainer"></div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
</script>
<style scoped lang="less">
.mainContainer {
  height: calc(100vh - var(--van-nav-bar-height) - var(--van-tabbar-height));
  overflow: auto;
}
</style>

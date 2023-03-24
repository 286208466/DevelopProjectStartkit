<template>
  <div class="layoutContainer">
    <AppHeader></AppHeader>
    <AppMain></AppMain>
    <FooterBar></FooterBar>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import AppHeader from "@/layout/Header.vue";
import AppMain from "./Main";
import FooterBar from "./FooterBar"
// import Sidebar from "@/layout/Sidebar.vue";

const store = useStore();
const tagsList = computed(() => store.state.tagsList.map((item) => item.name));
const collapse = computed(() => store.state.collapse);
</script>

<style scoped lang="less">
html,
body,
#app {
  height: 100%;
  overflow: visible;
}
.layoutContainer {
  background-color: #f2f2f2;
}
</style>

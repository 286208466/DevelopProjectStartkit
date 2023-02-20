<template>
  <div class="app-basicLayout">
    <div class="app-layout hasSider fixedSider">
      <div class="app-sider">
        <Sidebar />
      </div>
      <div class="app-layoutContent app-layout">
        <div class="app-header">
          <Header />
        </div>
        <div class="app-header fixedHeader"></div>
        <div class="app-pageLayout">
          <div class="app-pageContainer">
            <router-view v-slot="{ Component }">
              <transition name="move" mode="out-in">
                <keep-alive :include="tagsList">
                  <component :is="Component" />
                </keep-alive>
              </transition>
            </router-view>
          </div>
        </div>
        <div class="app-footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from "vue";
import { useStore } from "vuex";
import Header from "@/layout/Header.vue";
import Sidebar from "@/layout/Sidebar.vue";
export default {
  components: {
    Header,
    Sidebar,
  },
  setup() {
    const store = useStore();
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    );
    const collapse = computed(() => store.state.collapse);
    return {
      tagsList,
      collapse,
    };
  },
};
</script>

<style scoped>
html,
body,
#app {
  height: 100%;
  overflow: visible;
}
.app-basicLayout {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
}
.app-basicLayout > div {
  min-height: 100%;
}
.app-layout {
  display: flex;
  flex: auto;
  flex-direction: column;
  background: #f0f2f5;
  min-height: 100vh;
}
.app-layout.hasSider {
  flex-direction: row;
}
.app-sider {
  position: relative;
  min-width: 0;
  background: #001529;
  transition: all 0.2s;
}
.hasSider .app-sider {
  position: relative;
  z-index: 999;
  min-height: 100%;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  flex: 0 0 256px;
  max-width: 256px;
  min-width: 256px;
  width: 256px;
}
.hasSider.collapsed .app-sider {
  flex: 0 0 80px;
  max-width: 80px;
  min-width: 80px;
  width: 80px;
}
.app-layoutContent {
  position: relative;
}
.app-layout.hasSider > .app-sider {
  overflow-x: hidden;
}
.app-header {
  height: 64px;
  padding: 0 50px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 64px;
  background: #001529;
  flex: 0 0 auto;
}
.hasSider .app-header {
  background: #fff;
}
.app-footer {
  flex: 0 0 auto;
}
.app-pageContainer {
  color: #1f2d3d;
  font-family: Microsoft Yahei;
  position: relative;
  margin: 24px;
  transition: all 0.2s;
  flex: auto;
  min-height: 0;
  background: #fff;
  padding: 20px;
}
/*
    固定左侧菜单
*/
.fixedSider .app-sider {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  overflow: auto;
  box-shadow: 2px 0 8px rgba(29, 35, 41, 0.05);
}
.fixedSider.collapsed .app-layoutContent {
  padding-left: 80px;
}
.fixedSider .app-layoutContent {
  padding-left: 256px;
}
/*
    固定头部
*/
.fixedHeader {
  position: fixed;
  top: 0;
  z-index: 1000;
}
.isTopMenu {
  width: 100%;
  z-index: 1000;
  right: 0;
}
.hasSider.fixedSider .fixedHeader.app-header {
  padding: 0 15px;
  width: calc(100% - 256px);
  z-index: 1000;
  right: 0;
}
.hasSider.collapsed .fixedHeader.app-header {
  padding: 0 15px;
  width: calc(100% - 80px);
  z-index: 1000;
  right: 0;
}
</style>
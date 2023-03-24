<template>
  <div class="headerContainer">
    <div class="">
      <div class="headerLeft">
        <i
          class="van-badge__wrapper van-icon van-icon-arrow-left van-nav-bar__arrow"
          ><!----><!----><!----></i
        >
        <span>返回</span>
      </div>
      <div class="headerTitle">标题</div>
      <div class="headerRight">
        <i
          class="van-badge__wrapper van-icon van-icon-search"
          style="font-size: 18px"
          ><!----><!----><!----></i
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
</script>
<style>
:root {
  --headerFontsize: 14px;
  --headerBg: #fff;
  --headerZindex: 1;
  --headerLineHeight: 22px;
  --headerHeight: 46px;
  --headerPadding: 16px;
  --headerTitleColor: #323233;
  --headerTitleFontWeight: 600;
  --headerTitleFontSize: 16px;
  --headerIconColor: #1989fa;
}
</style>
<style scoped lang="less">
.headerContainer {
  position: relative;
  z-index: var(--headerZindex);
  line-height: var(--headerLineHeight);
  text-align: center;
  background: var(--headerBg);
  user-select: none;
  > div {
    position: relative;
    display: flex;
    align-items: center;
    height: var(--headerHeight);
  }
}

.headerContainer:after {
  position: absolute;
  box-sizing: border-box;
  content: " ";
  pointer-events: none;
  top: -50%;
  right: -50%;
  bottom: -50%;
  left: -50%;
  border: 0 solid var(--van-border-color);
  transform: scale(0.5);
  border-bottom-width: 1;
}

.headerLeft,
.headerRight {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 var(--headerPadding);
  font-size: var(--headerFontsize);
  color: var(--headerIconColor);
}
.headerLeft {
  left: 0;
}
.headerRight {
  right: 0;
}
.headerTitle {
  max-width: 60%;
  margin: 0 auto;
  color: var(--headerTitleColor);
  font-weight: var(--headerTitleFontWeight);
  font-size: var(--headerTitleFontSize);
}
</style>

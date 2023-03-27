<template>
  <div class="footerContainer">
    <div>
      <div class="footerItem active">
        <div class="footerItemIcon">
          <i class="van-badge__wrapper van-icon van-icon-home-o"
            ><!----><!----><!----></i
          >
        </div>
        <div class="footerItemTitle">消息</div>
      </div>
      <div class="footerItem">
        <div class="footerItemIcon">
          <i class="van-badge__wrapper van-icon van-icon-home-o"
            ><!----><!----><!----></i
          >
        </div>
        <div class="footerItemTitle">通讯录</div>
      </div>
      <div class="footerItem">
        <div class="footerItemIcon">
          <i class="van-badge__wrapper van-icon van-icon-home-o"
            ><!----><!----><!----></i
          >
        </div>
        <div class="footerItemTitle">发现</div>
      </div>
      <div class="footerItem">
        <div class="footerItemIcon">
          <i class="van-badge__wrapper van-icon van-icon-home-o"
            ><!----><!----><!----></i
          >
        </div>
        <div class="footerItemTitle">我</div>
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
  --footerZIndex: 1;
  --footerBg: #fff;
  --footerHeight: 52px;
  --footerTextColor: #323233;
  --footerTextFontSize: 12px;
  --footerLineHeight: 1;
  --footerActiveColor: #1989fa;
  --footerActiveBg: #fff;
  --footerItemIconFontSize: 22px;
  --footerItemIconMarginBottom: 4px;
}
</style>
<style scoped lang="less">
.footerContainer {
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: var(--footerZIndex);

  box-sizing: content-box;
  width: 100%;

  background: var(--footerBg);
  > div {
    display: flex;
    height: var(--footerHeight);
  }
}
.footerItem {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--footerTextColor);
  font-size: var(--footerTextFontSize);
  line-height: var(--footerLineHeight);
  cursor: pointer;
}
.active {
  color: var(--footerActiveColor);
  background-color: var(--footerActiveBg);
}
.footerItemIcon {
  position: relative;
  display: inline-block;
  margin-bottom: var(--footerItemIconMarginBottom);
  font-size: var(--footerItemIconFontSize);
}
</style>

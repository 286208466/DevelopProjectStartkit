<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script setup>
import enUS from "@arco-design/web-vue/es/locale/lang/en-us";
import zhCN from "@arco-design/web-vue/es/locale/lang/zh-cn"
</script>

<style lang="less" scoped></style>
<style lang="scss">
#app {
  background-color: $primaryColor;
}
</style>

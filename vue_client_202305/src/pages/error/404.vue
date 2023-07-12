<template>
  <h1>404</h1>
</template>

<script setup>
import {
  defineProps,
  reactive,
  computed,
  watch,
  onBeforeMount,
  onMounted,
  nextTick,
  ref,
  unref,
} from "vue";
import { useRoute } from "vue-router";
const props = defineProps({
  msg: String,
});

const emit = defineEmits(["colChange"]);

const state = reactive({ count: 0 });

defineExpose({});

onMounted(() => {
  // 保存以前的数据
  nextTick(() => {
    heardColsString.value = JSON.stringify(props.cols);
  });
});
</script>

<style lang="less" scoped></style>

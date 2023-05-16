<template>
  <h1>404</h1>
</template>

<script setup>
import { defineProps, reactive, computed, watch } from "vue";
import { useRoute } from "vue-router";
defineProps({
  msg: String,
});

const state = reactive({ count: 0 });
</script>

<style lang="less" scoped></style>

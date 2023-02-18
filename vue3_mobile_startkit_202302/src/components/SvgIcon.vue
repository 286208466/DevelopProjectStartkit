<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :width="props.size"
    :height="props.size"
  >
    <use :xlink:href="symbolId" :fill="props.color" rel="external nofollow" />
  </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#333",
  },
  size: {
    type: String,
    default: "1em",
  },
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style lang="less">
.svg-icon {
  // width: 1em;
  // height: 1em;
  vertical-align: -0.15em;
  position: relative;
  fill: currentColor;
  overflow: hidden;
}
</style>

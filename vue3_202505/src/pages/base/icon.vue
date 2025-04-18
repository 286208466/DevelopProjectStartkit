<template>
  <div>
    <ul>
      <li v-for="(item, index) in ids" :key="index">
        <svg-icon
          :name="item.replace('icon-', '')"
          color="#333"
          size="40"
        ></svg-icon>
        <p>{{ item }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import ids from "virtual:svg-icons-names";

console.log("ids", ids);
</script>

<style></style>

<template>
    <div id="app">
        <router-view v-wechat-title="$route.meta.title"/>
    </div>
</template>

<script>
export default {
    name: "App"
};
</script>

<style>
#app {
    color: #2c3e50;
}
</style>

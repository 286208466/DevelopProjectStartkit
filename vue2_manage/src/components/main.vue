<template>
    
    <div class="app-main">
        <transition name="fade-transform" mode="out-in">
            <router-view :key="key"></router-view>
        </transition>
    </div>

</template>

<script>
export default {
    name: "AppMain",
    computed: {
        key(){
            return this.$route.fullPath
        }
    },
    data(){
        return {
            userInfo: {}
        }
    }
}
</script>

<style scoped lang="scss">

</style>
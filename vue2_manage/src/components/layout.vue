<template>
    
    <div class="app-layout">
        <app-menu/>
        <div class="app-content">
            <app-header/>
            <app-main/>    
        </div>    
    </div>

</template>

<script>
import AppHeader from './header';
import AppMenu from './menu';
import AppMain from './main'
export default {
    name: 'layout',
    components: {
        AppHeader,
        AppMenu,
        AppMain
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
.app-layout {
    width: 100%;
    height: 100%;
    position: relative;
}
</style>
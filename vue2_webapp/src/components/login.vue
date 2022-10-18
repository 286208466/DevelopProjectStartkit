<template>
    <div id="app-wrap" style="padding: 20px 0;">













    </div>
</template>

<script>
import sim from "../assets/js/sim.js"
export default {
    
    computed: {
        token: function(){
            return this.$store.state.user.token
        }
    },
    mounted(){

    }
   
}
</script>

<style>
.btn {
    margin: 15px 0
}
</style>

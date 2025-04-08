<template>
    <div class="hello">
      <h1>{{ token }}</h1>

      <button @click="toLogin">去登陆</button>

      <button @click="update">更新user</button>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed　: {
        token () {
            return this.$store.state.user.token
        },
        homeUrl() {
            if(!this.$store.state.cart.login){
                return '/login'
            } else {
                return '/user'
            }
        }
    },
    methods: {
        toLogin(){
            this.$router.push({
                path: "/login"
            })
        },
        update(){
            this.$store.commit("updateUser", "eeee")
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

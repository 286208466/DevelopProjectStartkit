import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import createPersistedState from 'vuex-persistedstate'
const state = {
    user: {
        token: "12345"
    },
}
export default new Vuex.Store({
    state,
    mutations: {
        updateUser(state, val){
            state.user.token = val;
        }
    },
    getters: {
        token(state){
            return state.user.token;
        }
    },
    //actions,
    //mutations,
    plugins: [createPersistedState()]   //会自动保存创建的状态。刷新还在
});
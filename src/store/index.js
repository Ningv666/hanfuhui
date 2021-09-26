import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin:sessionStorage.getItem('islogin'),
    uname:sessionStorage.getItem('uname'),
    uid:sessionStorage.getItem('uid'),
    picture:sessionStorage.getItem('picture')
  },
  mutations: {
    loginOK(state,form){
      state.isLogin = true;
      state.uname = form.uname;
      state.uid = form.uid;
      state.picture = form.picture;
    },
    quitLogin(state){
      state.isLogin = false;
    }

  },
  actions: {
    update(store,form){
      store.commit("loginOK",form)
    }
  },
  modules: {
  }
})

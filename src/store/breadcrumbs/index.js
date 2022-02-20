
export default {
  namespaced: true,
  state: {
    breadcrumbs:[]
  },
  getters: {
    breadcrumbs: state => {
      return state.breadcrumbs
    },
  },
  mutations: {
    setBreadcrumbs(state, val) {
      state.breadcrumbs.push(val)
    },
    resetBreadcrumbs(state){
        state.breadcrumbs = []
    }
  },
  actions: {
    setBreadcrumbs(context,val){
        context.commit("setBreadcrumbs",val)
    },
    resetBreadcrumbs(context){
        context.commit("resetBreadcrumbs")
    }
  },
}

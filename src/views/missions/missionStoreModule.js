import axios from '@axios'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    addMission(ctx, missionData) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost/lifeapp-api/api/admin/mission/add', missionData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
  },
}

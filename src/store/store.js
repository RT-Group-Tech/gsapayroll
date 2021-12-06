import states from './config/states'
import getters from './config/getters'
import setters from './config/setters'
import actions from './config/actions'


const store = {
    state: states,
    getters: getters,
    mutations: setters,
    actions: actions
}
export default store;
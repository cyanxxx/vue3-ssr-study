import { createStore as _createStore } from 'vuex'
import { fetchItem } from './api'

const store = {
    state: {
        item: {}
    },
    actions: {
        fetchItems({ commit }, id) {
            return fetchItem(id).then(item => {
                commit('setItem', item);
            })
        }
    },
    mutations: {
        setItem(state, item) {
            state.item = item
        }
    }
}
export default function createStore() {
    return _createStore(store)
}
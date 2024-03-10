import { createStore } from 'vuex';

export default createStore({
    state () {
        return {
            newColor: '',
            clicks: 0,
        }
    },
    mutations: {
        changeColor(state, newColor) {
            state.newColor = newColor
            state.clicks += 1
        },
    },
});
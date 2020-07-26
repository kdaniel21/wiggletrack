import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    accessToken: null,
    loading: false
  },
  getters: {
    isLoggedIn: state => !!state.user && Object.keys(state.user).length > 0
  },
  mutations: {
    setUser: (state, userObject) => {
      state.user = { ...userObject };
    },
    setAccessToken: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    addBookmarkedProduct: (state, id) => {
      state.user.products.push({ product: id, notifications: false });
    },
    removeBookmarkedProduct: (state, id) => {
      const index = state.user.products.findIndex(
        product => product.product === id
      );
      state.user.products.splice(index, 1);
    },
    setNotifications: (state, { id, value }) => {
      const index = state.user.products.findIndex(
        product => product.product === id
      );
      state.user.products[index].notifications = value;
    },
    disableAllNotifications: state => {
      state.user.products.forEach(product => (product.notifications = false));
    }
  },
  actions: {
    loginUser: ({ commit }, { user, accessToken }) => {
      if (user) commit('setUser', user);
      if (accessToken) commit('setAccessToken', accessToken);
    },
    logout: ({ commit }) => {
      commit('setUser', undefined);
      commit('setAccessToken', null);
    },
    bookmarkProduct: ({ commit }, productId) => {
      commit('addBookmarkedProduct', productId);
    },
    unbookmarkProduct: ({ commit }, productId) => {
      commit('removeBookmarkedProduct', productId);
    },
    enableNotifications: ({ commit }, id) => {
      commit('setNotifications', { id, value: true });
    },
    disableNotifications: ({ commit }, id) => {
      commit('setNotifications', { id, value: false });
    },
    disableAllNotifications: ({ commit }) => {
      commit('disableAllNotifications');
    }
  }
});

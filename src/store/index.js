import Vue from 'vue';
import Vuex from 'vuex';
import * as keys from './keys';
import { setSen, getSen, getLoc, setLoc, serialize } from '../utils';
import xhr from '../api/http';
import api from '../api/apiurl';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', //在非生产环境下，使用严格模式
  state: {
    data: {},
    modleId: getLoc(keys.MODEL_ID),
    lang: getLoc(keys.LANG)
  },
  getters: {
    data: state => serialize(state.data),
    modleId: state => serialize(state.modleId),
    lang: state => serialize(state.lang)
  },
  mutations: {
    [keys.DATA](state, res) {
      state.data = { ...state.data, ...res };
    },
    [keys.MODEL_ID](state, modleId) {
      setSen(keys.MODEL_ID, modleId);
      state.modleId = modleId;
    },
    [keys.LANG](state, lang) {
      setSen(keys.LANG, lang);
      state.lang = lang;
    }
  },
  actions: {
    _ajax(state, { name, ...options }) {
      return new Promise(function(resolve) {
        let data = state.state.data;

        if (api[name].cache && data[name]) {
          return resolve(serialize(data[name]));
        }

        xhr({ name, ...options }).then(res => {
          state.commit(keys.DATA, {
            [name]: serialize(res)
          });
          resolve(res);
        });
      });
    }
  }
});

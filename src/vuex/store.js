import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import { getData } from "../common/douban.js";


const state = {
  movies: JSON.parse(localStorage.movies) || []
}
const getters = {
  movies: function (state) {
    return state.movies
  },
}
const mutations = {
  _getData() {
    getData("http://localhost:8000/")
      .then(text => {
        var allMovies = text;
        for (let i = 0; i < allMovies.length; i++) {
          if (allMovies[i] == "[") {
            allMovies = allMovies.replace(allMovies[i], "");
          }
        }
        for (let j = 0; j < allMovies.length - 1; j++) {
          if (allMovies[j] == "]") {
            allMovies = allMovies.replace(allMovies[j], ",");
          }
        }
        allMovies = "[" + allMovies;
        localStorage.movies = allMovies
      })
      .catch(status => {
        console.log("ERROR: " + status);
      });
  },
}
const actions = {

}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
/* ============
 * Vuex Store
 * ============
 *
 * The store of the application
 *
 * http://vuex.vuejs.org/en/index.html
 */
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

// Load store modules dynamically.
const requireContext = require.context('./modules', false, /.*\.js$/)

const modules = requireContext.keys().map(file =>
  [file.replace(/(^.\/)|(\.js$)/g, ''), requireContext(file)],
).reduce((modules, [name, module]) => {
  if (module.namespaced === undefined) {
    module.namespaced = true
  }

  return {...modules, [name]: module}
}, {})

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  /**
   * Assign the modules to the store.
   */
  modules,

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger()] : [],
})

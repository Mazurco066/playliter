import clickOutside from '../../infra/directives/clickOutside'

const GlobalDirectives = {
  install(Vue) {
    Vue.directive('click-outside', clickOutside)
  }
}

export default GlobalDirectives

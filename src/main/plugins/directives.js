import clickOutside from '../../presentation/directives/clickOutside'

const GlobalDirectives = {
  install(Vue) {
    Vue.directive('click-outside', clickOutside)
  }
}

export default GlobalDirectives

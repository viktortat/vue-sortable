;(function () {

  var vSortable = {}
  var Sortable = typeof require === 'function'
      ? require('sortablejs')
      : window.Sortable

  if (!Sortable) {
    throw new Error('[vue-sortable] cannot locate Sortable.js.')
  }

  // exposed global options
  vSortable.config = {}

  vSortable.install = function (Vue) {
    Vue.directive('sortable', function (options) {
      options = options || {}

      if (!this.vm.sortable) {
        this.vm.sortable = {}
      }

      var instance = new Sortable(this.el, options)

      //  Throw an error if the given ID is not unique
      if (this.arg && this.vm.sortable[this.arg]) {
        console.warn('[vue-sortable] cannot set already defined sortable id: \'' + this.arg + '\'')
      } else if( this.arg ) {
        this.vm.sortable[this.arg] = instance
      }
    })
  }

  if (typeof exports == "object") {
    module.exports = vSortable
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return vSortable
    })
  } else if (window.Vue) {
    window.vSortable = vSortable
    Vue.use(vSortable)
  }

})()

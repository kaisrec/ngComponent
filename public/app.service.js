(function () {
  function fromFactory() {
      return {say:'this message From Factory'}   
  }

angular.module('app.services', [])
  .factory('fromFactory', fromFactory)
})();
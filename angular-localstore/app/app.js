angular.module('app', ['heroicVentures.localStore'])
  .controller('MasterController', [
    function() {
      var vm = this;

      vm.test = "test";
    }]);

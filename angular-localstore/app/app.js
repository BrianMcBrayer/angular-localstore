angular.module('app', ['heroicVentures.localStore'])
  .controller('MasterController', [
            '$localStorage',
    function($localStorage) {
      var vm = this;

      vm.store = add;
      vm.clearAllStorage = clearAllStorage;
      vm.retrieve = retrieve;

      function add() {
        $localStorage.setItem(vm.storeKey, vm.storeValue);
      }

      function clearAllStorage() {
        $localStorage.clear();
      }

      function retrieve() {
        vm.retrievedItem = $localStorage.getItem(vm.retrieveKey);
      }
    }]);

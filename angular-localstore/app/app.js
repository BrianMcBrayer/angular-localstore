angular.module('app', ['heroicVentures.localStore'])
  .controller('MasterController', [
            '$localStore',
    function($localStore) {
      var vm = this;

      var ls;

      vm.store = add;
      vm.clearAllStorage = clearAllStorage;
      vm.retrieve = retrieve;

      init();

      function init() {
        if ($localStore.hasAvailableService()) {
          ls = $localStore.availableService();
        }
      }

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

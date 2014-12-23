angular.module('app',
[
'hv.localStore',
'hv.localStore.cookieStorage',
'hv.localStore.localStorage'
])
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
        ls.setItem(vm.storeKey, vm.storeValue);
      }

      function clearAllStorage() {
        ls.clear();
      }

      function retrieve() {
        vm.retrievedItem = ls.getItem(vm.retrieveKey);
      }
    }]);

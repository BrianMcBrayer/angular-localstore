angular.module('app')
  .config(['$localStoreProvder',
  function($localStoreProvider) {
    $localStoreProvider.setStorageServicesByPriority('hVLocalStorage');
  }]);

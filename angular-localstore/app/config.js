angular.module('app')
  .config(['$localStoreProvider',
  function($localStoreProvider) {
    $localStoreProvider
      .setStorageServicesByPriority('hVLocalStorage', 'hVCookieStorage');
  }]);

/*
 * localStorage.service.js
 * created by: Brian McBrayer
 * created on: 12/8/2014
 * description: Wraps localStorage to fill implementation problems and provide a mockable interface
 */

(function(angular) {
'use strict';

if (angular == null) {
  throw new Error('Must load angular to use hv.localStore');
}

angular.module('hv.localStore', [])
.provider('$localStore', [function () {
    var me = this;

    me.setStorageServicesByPriority = setStorageServicesByPriority;

    //////////
    // Members
    //////////

    var storageServicePriority = [];

    function setStorageServicesByPriority () {
      storageServicePriority = [];

      // Is the first argument an array?
      if (arguments.length > 0) {
        if (Array.isArray(arguments[0])) {
          storageServicePriority = arguments[0];
        } else {
          // Convert the passed arguments to an array
          for (var curArgIndex = 0, len = arguments.length; curArgIndex < len; curArgIndex++) {
            storageServicePriority.push(arguments[curArgIndex]);
          }
        }
      }

      return storageServicePriority;
    }

    me.$get = ['$injector', function($injector) {

      var useStorageService = null;

      var service = {
        hasAvailableService: hasAvailableService,
        availableService: availableService
      };

      init();

      function init() {
        findHighestUsefulStorageService(
          populatePotentialStorageServices(storageServicePriority));
      }

      function hasAvailableService() {
        try {
          return (availableService() !== null);
        } catch (variable) {
          return false;
        }
      }

      function availableService() {
        if (useStorageService === null) {
          throw new Error('No available storage service exists');
        }

        return useStorageService;
      }

      function populatePotentialStorageServices() {
        var potentialStorageServices = [];

        for (var curStorageServiceIndex = 0, len = storageServicePriority.length;
          curStorageServiceIndex < len; curStorageServiceIndex++) {
            var curStorageServiceName = storageServicePriority[curStorageServiceIndex];

            if ($injector.has(curStorageServiceName)) {
              potentialStorageServices.push(
                $injector.get(curStorageServiceName));
            }
          }

          return populatePotentialStorageServices;
      }

      function findHighestUsefulStorageService(services) {
        useStorageService = null;

        for (var curArgIndex = 0, len = services.length;
          curArgIndex < len; curArgIndex++) {
          var curService = services[curArgIndex];

          if (curService && typeof(curService.canUse) === 'function' && curService.canUse()) {
            useStorageService = curService;
            break;
          }
        }

        return useStorageService;
      }

      return service;
    }];
}]);
})(angular || null);

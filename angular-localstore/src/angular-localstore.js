/*
 * localStorage.service.js
 * created by: Brian McBrayer
 * created on: 12/8/2014
 * description: Wraps localStorage to fill implementation problems and provide a mockable interface
 */

/*
 * TODO
 * [] Switch to make API pluggable:
 * -[] Common API centered around localStorage API
 * --[] Done by taking an object that implements current service
 * -[] Change to provider, pass in objects in order of desired use
 * -[] Fallback to each service if it cannot be used
 */

angular.module('heroicVentures.localStore', [])
.provider('$localStore',
        [
function () {
    'use strict';
    var me = this;

    me.setStorageServicesByPriority = setStorageServicesByPriority;

    //////////
    // Members
    //////////

    var storageServicePriority = [],
        useStorageService;

    function setStorageServicesByPriority () {
      storageServicePriority = [];

      // Is the first argument an array?
      if (arguments.length > 0 && Array.isArray(arguments[0])) {
        storageServicePriority = arguments[0];
      } else if (arguments.length > 1) {
        // Convert the passed arguments to an array
        for (var curArgIndex = 0, len = arguments.length; curArgIndex < len; i++) {
          storageServicePriority.push(arguments[curArgIndex]);
        }
      }

      return storageServicePriority;
    }

    me.$get = [function() {

      var service = {
        hasAvailableService: hasAvailableService,
        availableService: availableService
      };

      function hasAvailableService() {
        try {
          return (availableService() !== null);
        } catch (variable) {
          return false;
        }
      }

      function availableService() {
        if (useStorageService === null || findHighestUsefulStorageService()) {
          throw new Error('No available storage service exists');
        }

        return useStorageService;
      }

      function findHighestUsefulStorageService() {
        useStorageService = null;

        for (var curArgIndex = 0, len = storageServicePriority.length; curArgIndex < len; i++) {
          var curService = storageServicePriority[curArgIndex];

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

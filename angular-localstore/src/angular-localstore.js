/*
 * localStorage.service.js
 * created by: Brian McBrayer
 * created on: 12/8/2014
 * description: Wraps localStorage to fill implementation problems and provide a mockable interface
 */

angular.module('heroicVentures.localStore', [])
.factory('$localStorage',
        ['$window',
function ($window) {
    'use strict';

    var ls = $window.localStorage;
    var lsEx = {
        setItem: setItem,
        getItem: getItem
    };
    var service = angular.extend({}, ls, lsEx);

    ////////////
    // Functions
    ////////////

    function setItem(key, value, expiresOn) {
        var wrappedItem = new LSItemWrapper(value, expiresOn);

        if (wrappedItem.isValid()) {
            ls.setItem(key, wrappedItem.toStorageObject());

            return value;
        }

        return null;
    }

    function getItem(key) {
        var rawItem = ls.getItem(key);

        if (rawItem) {
            var parsedItem = JSON.parse(rawItem);

            if (LSItemWrapper.isLSItemWrapper(parsedItem) &&
                parsedItem.isValid()) {
                return parsedItem.value;
            }
            
        }

        return null;
    }

    LSItemWrapper.isLSItemWrapper = isLSItemWrapper;
    function LSItemWrapper(value, expiresOn) {
        var me = this;

        handleExpiresOn();

        me.value = value;
        me.$$lsi = true;
        me.toStorageObject = toStorageObject;
        me.isValid = isValid;

        function toStorageObject() {
            return JSON.stringify(me);
        }

        function handleExpiresOn() {
            // Return a null object if it's already past expiration
            if (expiresOn instanceof Date) {
                if (expiresOn >= new Date) {
                    me.expiresOn = expiresOn.toISOString();
                }
            }
        }

        function isValid() {
            if (typeof(me.expiresOn) === 'string') {
                var parsedExpiration = Date.parse(me.expiresOn);

                if (parsedExpiration) {
                    me.expiresOn = parsedExpiration;
                    return parsedExpiration >= new Date();
                }
            }

            return false;
        }
    }

    function isLSItemWrapper(obj) {
        return obj.$$lsi;
    }


    return service;
}]);
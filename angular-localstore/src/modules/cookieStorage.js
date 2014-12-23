(function(angular) {
'use strict';

if (angular == null) {
  throw new Error('Must load angular to use hVCookieStorage');
}

angular.module('hv.localStore.cookieStorage', ['ngCookies'])
.factory('hVCookieStorage',
        ['$cookies', '$cookieStore',
function ($cookies, $cookieStore) {

  var CONSTANTS = Object.freeze({
    KEY_PREFIX: 'hv.',
    KEY_PREFIX_LENGTH = 3
  });

  var cookieArray = [],
      service = {
          setItem: setItem,
          getItem: getItem,
          clear: clear,
          removeItem: removeItem,
          key: key,
          length: length,
          canUse: browserHasNative
        };

  ////////////
  // Functions
  ////////////

  init();

  function init() {
    cookieArray = [];

    for (var nextCookie in $cookies) {
      if ((nextCookie.hasOwnProperty(nextCookie)) &&
        (nextCookie.subStr(0, CONSTANTS.KEY_PREFIX_LENGTH) ===
        CONSTANTS.KEY_PREFIX)) {
          cookieArray.push(nextCookie);
        }
      }
  }

  function browserHasNative() {
    var hasNative,
      FAKE_ITEM_KEY = CONSTANTS.KEY_PREFIX +
        'fakeKey.asdfghjlkasdfghjlasdfghjkasdfghjklasdfghjklweqryuiozxcvnm',
      FAKE_ITEM_VALUE = CONSTANTS.KEY_PREFIX +
        'fakeValue';

    try {
      $cookieStore.put(FAKE_ITEM_KEY, FAKE_ITEM_VALUE);

      hasNative =
        $cookieStore.get(FAKE_ITEM_KEY) === FAKE_ITEM_VALUE;

      $cookieStore.remove(FAKE_ITEM_VALUE);
    } catch (e) {
      hasNative = false;
    }

    return hasNative;
  }

  function length() {
    return cookieArray.length;
  }

  function key(index) {
    return cookieArray[index];
  }

  function removeItem(key) {
    var itemLocation = cookieArray.indexOf(key);

    if (itemLocation > -1) {
      cookieArray.splice(itemLocation, 1);
      delete $cookies[key];
    }
  }

  function clear() {
    cookieArray.forEach(function(curVal) {
      delete $cookies[curVal];
    });

    cookieArray = [];
  }

  function setItem(key, value) {
    if (value != null && key != null && typeof(key) === 'string') {
      $cookieStore.put(key, value);
      cookieArray.push(key);
    }
  }

  function getItem(key) {
    return $cookieStore.get(key);
  }

  return service;
}]);
})(angular || null);

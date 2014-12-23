// Enumerate the list of 'objects' to an array
// That way we can treat the cookies like localStorage objects
// So $cookies.people becomes cookieStorage[0] = people
// This should be read in on init and kept in sync somehow

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

  var service = {
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
    var cookieLength = 0;

    for (var nextCookie in $cookies) {
      if ((nextCookie.hasOwnProperty(nextCookie)) &&
          (nextCookie.subStr(0, CONSTANTS.KEY_PREFIX_LENGTH) ===
            CONSTANTS.KEY_PREFIX)) {
              cookieLength++;
            }

    }

    return cookieLength;
  }

  function key(index) {
    return ls.key(index);
  }

  function removeItem(key) {
    return ls.removeItem(key);
  }

  function clear() {
    ls.clear();
  }

  function setItem(key, value) {
    if (value != null && key != null && typeof(key) === 'string') {
      ls.setItem(key, JSON.stringify(value));
    }
  }

  function getItem(key) {
    return ls.getItem(key);
  }

  return service;
}]);
})(angular || null);

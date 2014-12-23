angular.module('heroicVentures.localStore.cookieStorage', ['ngCookies'])
.factory('hVCookieStorage', ['$cookieStore', function ($cookieStore) {
  'use strict';

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
      FAKE_ITEM_KEY = 'hv.fakeKey.asdfghjlkasdfghjlasdfghjkasdfghjklasdfghjklweqryuiozxcvnm',
      FAKE_ITEM_VALUE = 'hv.fakeValue';

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
    return ls.length;
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

angular.module('heroicVentures.localStore')
.factory('hVLocalStorage', ['$window', function($window) {

  var ls;

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
    // Init
    ////////////
    init();

    ////////////
    // Functions
    ////////////

    function init() {
      if (browserHasNative()) {
        ls = $window.localStorage;
      }
    }

    function browserHasNative() {
      var hasNative,
      FAKE_ITEM_KEY = 'hv.fakeKey.asdfghjlkasdfghjlasdfghjkasdfghjklasdfghjklweqryuiozxcvnm',
      FAKE_ITEM_VALUE = 'hv.fakeValue';

      try {

        // General browser test
        hasNative = ('localStorage' in $window);

        // Can we touch the object? (Fails in Chrome when localStorage is blocked)
        var ls = $window.localStorage;
        hasNative = hasNative && (ls != null);

        // Can we store something?
        ls.setItem(FAKE_ITEM_KEY, FAKE_ITEM_VALUE);
        hasNative = ls.getItem(FAKE_ITEM_KEY) != null;

        // Clear the fake key
        ls.removeItem(FAKE_ITEM_KEY);
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

angular.module('heroicVentures.localStore')
.service('hVLocalStorage', [
function() {

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
    } else {
      // Create fallback here
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

  function setItem(key, value, expiresOn) {
    var expiryDate = (expiresOn != null ? new Date(expiresOn) : null);
    var wrappedItem = new LSItemWrapper(value, expiryDate);

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

      if (LSItemWrapper.isLSItemWrapper(parsedItem)) {
        var parsedLSItem = new LSItemWrapper(parsedItem.value, parsedItem.expiresOn);
        if (parsedLSItem.isValid()) {
          return parsedItem.value;
        } else {
          service.removeItem(key);
        }
      } else {
        return parsedItem;
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
        me.expiresOn = expiresOn.toISOString();
      }
    }

    function isValid() {
      var parsedExpiresOn = Date.parse(me.expiresOn);

      if (parsedExpiresOn) {
        return parsedExpiresOn >= new Date();
      }

      return true;
    }
  }

  function isLSItemWrapper(obj) {
    return obj.$$lsi;
  }


  return service;
}]);

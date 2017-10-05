(function () {
    angular.module('roundingModule').factory('DataStorage', function ($rootScope, CommonFunctions, StorageConstants) {
        browserCheck = function () {
            if ($rootScope.Global.Objects.DataStorage.Supports == null) {
                if (localStorage) {
                    $rootScope.Global.Objects.DataStorage.Supports = true;
                }
                
                else {
                    CommonFunctions.OpenAlertBox(CommonMessages.Alert.Alert, [{ message: Message.Alert.LocalStorageError}], null);
                    $rootScope.Global.Objects.DataStorage.Supports = false;
                }
            }
            return $rootScope.Global.Objects.DataStorage.Supports;
        };

        setItem = function (key, Item) {
            try {
                if (this.BrowserCheck()) {
                    localStorage.setItem(key, JSON.stringify(Item));
                }
            }
            catch (e) {
                HandleError(e);
            }
        };

        getStorageName = function (name, type) {
            var storageName = name;
            try {
                if (type == StorageConstants.StorageType) {
                    storageName = StorageConstants.StorageType + '.' + name;
                }
            }
            catch (e) {
                HandleError(e);
            }
            return storageName;
        };

        getItem = function (key) {
            try {
                if (this.BrowserCheck()) {
                    var value = localStorage.getItem(key);
                    if (value != null && (value != 'undefined')) {
                        return JSON.parse(value);
                    }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            }
            catch (e) {
                handleError(e);
            }
        };

        remove = function (key) {
            if (this.BrowserCheck()) {
                localStorage.removeItem(key);
            }
        };

        getAll = function () {
            var items = [];
            if (this.BrowserCheck()) {
                for (i = 0; i < localStorage.length; i++) {
                    var itemKey = localStorage.key(i);
                    var values = localStorage.getItem(itemKey);
                    items.push({ itemKey: values });
                }
            }
            return items;
        };

        clear = function () {
            if (this.BrowserCheck()) {
                localStorage.clear();
            }
        };

        handleError = function (e) {
            if ((typeof QUOTA_EXCEEDED_ERR != 'undefined') && e == QUOTA_EXCEEDED_ERR) {
                CommonFunctions.OpenAlertBox('Alert', [{ message: 'Local storage Quota exceeded!'}], null);
            }
            else {
                this.BrowserCheck();
            }
        }

        return {
            BrowserCheck: browserCheck,
            SetItem: setItem,
            GetStorageName: getStorageName,
            GetItem: getItem,
            Remove: remove,
            GetAll: getAll,
            Clear: clear,
            HandleError: handleError
        };
    });
})();
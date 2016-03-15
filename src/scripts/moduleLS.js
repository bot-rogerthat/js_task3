"use strict";
var moduleLS = (function () {
    function saveToLocalStorage(insurer) {
        var id = getLastKey();
        insurer._id = id + 1;
        localStorage.setItem(id + 1, JSON.stringify(insurer));
    }

    function getLastKey() {
        var largestKey = Object.keys(localStorage).filter(isFinite)
            .reduce(function (a, b) {
                return Math.max(a, b);
            }, 0);
        return largestKey;
    }

    function loadFromLocalStorage() {
        var arr = [];
        var i = 0;
        for (var key in localStorage) {
            arr[i] = JSON.parse(localStorage.getItem(key));
            i++;
        }
        return arr;
    }

    function deleteItem(id) {
        localStorage.removeItem(id);
    }

    function deleteAll() {
        localStorage.clear();
    }

    return {
        save: saveToLocalStorage,
        load: loadFromLocalStorage,
        delete: deleteItem,
        deleteAll: deleteAll
    };
})();
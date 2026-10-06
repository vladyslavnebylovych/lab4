(function (window) {
    var SortLibrary = {};

    function handleSparseArray(arr) {
        var validElements = [];
        var undefinedCount = 0;

        for (var i = 0; i < arr.length; i++) {
            if (i in arr && arr[i] !== undefined) {
                validElements.push(arr[i]);
            } else {
                undefinedCount++;
            }
        }

        if (undefinedCount > 0) {
            console.warn("[Sparse Array Warning] Виявлено undefined-елементів: " + undefinedCount + ". Вони переміщені в кінець масиву.");
        }

        return { validElements: validElements, undefinedCount: undefinedCount };
    }

    function compare(a, b, ascending) {
        return ascending ? a > b : a < b;
    }

    SortLibrary.bubbleSort = function (arr, ascending) {
        if (ascending === undefined) ascending = true;
        var stats = handleSparseArray(arr);
        var a = stats.validElements.slice();
        var comparisons = 0;
        var swaps = 0;

        for (var i = 0; i < a.length - 1; i++) {
            for (var j = 0; j < a.length - 1 - i; j++) {
                comparisons++;
                if (compare(a[j], a[j + 1], ascending)) {
                    var temp = a[j];
                    a[j] = a[j + 1];
                    a[j + 1] = temp;
                    swaps++;
                }
            }
        }

        var result = a.concat(new Array(stats.undefinedCount));
        console.log("[Обміну / Bubble Sort] Операнд: " + (ascending ? "зростання" : "спадання") +
                    " | Порівнянь: " + comparisons + " | Обмінів: " + swaps);
        return result;
    };

    SortLibrary.selectionSort = function (arr, ascending) {
        if (ascending === undefined) ascending = true;
        var stats = handleSparseArray(arr);
        var a = stats.validElements.slice();
        var comparisons = 0;
        var swaps = 0;

        for (var i = 0; i < a.length - 1; i++) {
            var targetIdx = i;
            for (var j = i + 1; j < a.length; j++) {
                comparisons++;
                if (compare(a[targetIdx], a[j], ascending)) {
                    targetIdx = j;
                }
            }
            if (targetIdx !== i) {
                var temp = a[i];
                a[i] = a[targetIdx];
                a[targetIdx] = temp;
                swaps++;
            }
        }

        var result = a.concat(new Array(stats.undefinedCount));
        console.log("[Мінімальних елементів / Selection Sort] Операнд: " + (ascending ? "зростання" : "спадання") +
                    " | Порівнянь: " + comparisons + " | Обмінів: " + swaps);
        return result;
    };

    SortLibrary.insertionSort = function (arr, ascending) {
        if (ascending === undefined) ascending = true;
        var stats = handleSparseArray(arr);
        var a = stats.validElements.slice();
        var comparisons = 0;
        var shifts = 0;

        for (var i = 1; i < a.length; i++) {
            var key = a[i];
            var j = i - 1;
            while (j >= 0) {
                comparisons++;
                if (compare(a[j], key, ascending)) {
                    a[j + 1] = a[j];
                    shifts++;
                    j--;
                } else {
                    break;
                }
            }
            a[j + 1] = key;
        }

        var result = a.concat(new Array(stats.undefinedCount));
        console.log("[Вставок / Insertion Sort] Операнд: " + (ascending ? "зростання" : "спадання") +
                    " | Порівнянь: " + comparisons + " | Переміщень: " + shifts);
        return result;
    };

    SortLibrary.shellSort = function (arr, ascending) {
        if (ascending === undefined) ascending = true;
        var stats = handleSparseArray(arr);
        var a = stats.validElements.slice();
        var comparisons = 0;
        var shifts = 0;

        var gap = Math.floor(a.length / 2);
        while (gap > 0) {
            for (var i = gap; i < a.length; i++) {
                var temp = a[i];
                var j = i;
                while (j >= gap) {
                    comparisons++;
                    if (compare(a[j - gap], temp, ascending)) {
                        a[j] = a[j - gap];
                        shifts++;
                        j -= gap;
                    } else {
                        break;
                    }
                }
                a[j] = temp;
            }
            gap = Math.floor(gap / 2);
        }

        var result = a.concat(new Array(stats.undefinedCount));
        console.log("[Шелла / Shell Sort] Операнд: " + (ascending ? "зростання" : "спадання") +
                    " | Порівнянь: " + comparisons + " | Переміщень: " + shifts);
        return result;
    };

    SortLibrary.quickSort = function (arr, ascending) {
        if (ascending === undefined) ascending = true;
        var stats = handleSparseArray(arr);
        var a = stats.validElements.slice();
        var comparisons = 0;
        var swaps = 0;

        function quickSortHelper(low, high) {
            if (low < high) {
                var pivotIndex = partition(low, high);
                quickSortHelper(low, pivotIndex - 1);
                quickSortHelper(pivotIndex + 1, high);
            }
        }

        function partition(low, high) {
            var pivot = a[high];
            var i = low - 1;

            for (var j = low; j < high; j++) {
                comparisons++;
                if (!compare(a[j], pivot, ascending)) {
                    i++;
                    var temp = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                    swaps++;
                }
            }

            var tempPivot = a[i + 1];
            a[i + 1] = a[high];
            a[high] = tempPivot;
            swaps++;

            return i + 1;
        }

        if (a.length > 0) {
            quickSortHelper(0, a.length - 1);
        }

        var result = a.concat(new Array(stats.undefinedCount));
        console.log("[Хоара / Quick Sort] Операнд: " + (ascending ? "зростання" : "спадання") +
                    " | Порівнянь: " + comparisons + " | Обмінів: " + swaps);
        return result;
    };

    // Експорт у глобальну область видимості
    window.SortLibrary = SortLibrary;
})(window);

(function () {
    function generateDenseArray(size) {
        var arr = [];
        for (var i = 0; i < size; i++) {
            arr.push(Math.floor(Math.random() * 500) - 250);
        }
        return arr;
    }

    function generateSparseArray(size) {
        var arr = new Array(size);
        for (var i = 0; i < size; i++) {
            if (Math.random() > 0.25) { // 25% порожніх елементів (sparse)
                arr[i] = Math.floor(Math.random() * 500) - 250;
            }
        }
        return arr;
    }

    var denseArray = generateDenseArray(100);
    var sparseArray = generateSparseArray(100);

    console.log("==========================================");
    console.log("1.2.3: ДЕМОНСТРАЦІЯ НА НЕРОЗРІДЖЕНОМУ МАСИВІ (100 елементів)");
    console.log("==========================================");
    console.log("Початковий нерозріджений масив:", denseArray);

    SortLibrary.bubbleSort(denseArray, true);
    SortLibrary.selectionSort(denseArray, true);
    SortLibrary.insertionSort(denseArray, true);
    SortLibrary.shellSort(denseArray, true);
    SortLibrary.quickSort(denseArray, true);

    console.log("\n==========================================");
    console.log("1.2.4: ДЕМОНСТРАЦІЯ НА РОЗРІДЖЕНОМУ МАСИВІ (100 елементів)");
    console.log("==========================================");
    console.log("Початковий розріджений масив:", sparseArray);

    SortLibrary.bubbleSort(sparseArray, false);
    SortLibrary.selectionSort(sparseArray, false);
    SortLibrary.insertionSort(sparseArray, false);
    SortLibrary.shellSort(sparseArray, false);
    SortLibrary.quickSort(sparseArray, false);
})();

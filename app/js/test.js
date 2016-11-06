/**
 * Created by sever on 03.11.16.
 */
function flatArray(arr) {

    var newArray = [];

    return function flat(arr) {

        for (var i = 0, arrLength = arr.length; i < arrLength; i++) {

            (Array.isArray(arr[i])) ? flat(arr[i]) : newArray.push(arr[i]);
        }

        return newArray;
    }(arr);
}

function compareArray(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i= 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}
var source = [1,2,3,[4,7]];


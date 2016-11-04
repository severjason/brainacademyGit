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

console.log(compareArray(flatArray(source),[1,2,3,4,7]));
console.assert(compareArray(flatArray(source),[1,2,3,4,7]), "Wrong");


//console.log(oneArray([0, [1, 2, [1, [3, [5, [111,[[[[[1241512]]]]], [5435, [44], 324], 55], 342], 342, 334, 11, 33]], 6, [6, 7]], 2, [2, [234, 333]], 4, 5]));
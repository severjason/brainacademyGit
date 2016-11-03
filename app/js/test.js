/**
 * Created by sever on 03.11.16.
 */

function flatArray() {

    var newArray = [];

    return function flat(arr) {

        for (var i = 0, arrLength = arr.length; i < arrLength; i++) {

            (!Array.isArray(arr[i])) ? newArray.push(arr[i]) : flat(arr[i]);
        }

        return newArray.sort(function (a,b) {
            return a-b;
        });
    };
}

var oneArray = flatArray();


console.log(oneArray([0, [1, 2, [1,[3,[5,[634,[5435,[44],324], 55],342],342,334,11,33]], 6, [6, 7]], 2, [2, [234, 333]], 4, 5]));
(function (window) {
    'use strict';

    var mate = (function () {
        
        var instance;

        function createInstance() {

            /**
             * Checks if the input parameter is an email address, consisting of three parts.
             * @param {String} input
             */
            function isEmailAddress (input) {

                var isEmail = false,
                    posAtSymbol = input.indexOf('@'),
                    posPeriod = input.indexOf('.');

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if (posAtSymbol > 0 && posAtSymbol < input.length - 1) {

                    isEmail = true;

                    if (posPeriod < posAtSymbol || posPeriod === input.length - 1 || posPeriod === posAtSymbol + 1 || input.charAt(posPeriod + 1) === '.') {
                        isEmail = false;
                    }

                }

                return isEmail;
            };

            /**
             * Returns the input parameter text with all symbols removed
             */
            function withoutSymbols(input) {
                var string = input + "";
                var result = "";

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                for (var i = 0; i < string.length; i++) {

                    if ((string.charAt(i).toLowerCase() >= "a" && string.charAt(i) <= "z") ||
                        string.charAt(i) === " " || Number(string.charAt(i))) {

                        result += string.charAt(i);

                    }

                }

                return result;
            };

            /**
             * Checks the input parameter and returns true if it is an empty string
             */
            function isEmpty(input) {

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if (typeof input === 'function' || (isObject(input) && Object.keys(input).length > 0)) {
                    return false;
                } else if (isObject(input) && Object.keys(input).length === 0) {
                    return true;
                }

                if (input) {
                    return false;
                }

                return true;
            }

            function isObject(obj) {
                return obj === Object(obj);
            }

            /**
             * Checks if the input text parameter contains one or more of the words within the words array
             */
            function contains(input, words) {

                var string = input.toLowerCase(),
                    i,
                    word = "",
                    charAfterWord,
                    charBeforeWord,
                    wordMarkers = ["'", "\"", ",", ".", ":", ";", "-", "!", "?", "(", ")", "...", " ", undefined],

                    isWordMarker = function (value) {
                        return wordMarkers.indexOf(value) >= 0;
                    };

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                for (i = 0; i < words.length; i++) {

                    word = words[i].toLowerCase();
                    charBeforeWord = string.charAt(string.indexOf(word) - 1);
                    charAfterWord = string.charAt(string.indexOf(word) + word.length);

                    if (string.indexOf(word) >= 0 &&
                        isWordMarker(charBeforeWord) &&
                        isWordMarker(charAfterWord)) {

                        return true;
                    }
                }

                return false;
            };

            /**
             * Checks if the input text parameter does not contain any of the words within the words array.
             */
            function lacks(input, words) {

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                if (this.contains(input, words)) {
                    return false;
                }

                return true;
            };

            /**
             * Checks that the input text parameter contains only strings found within the strings array.
             */
            function isComposedOf(input, strings) {

                var result = false,
                    i,
                    len,
                    start = 0,
                    end = 0,
                    string = "";

                input = input.toLowerCase();

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                for (i = 0, len = strings.length; i < len; i++) {

                    string = strings[i].toLowerCase();

                    if (input.indexOf(string) >= 0) {

                        start = input.indexOf(string);
                        end = string.length - 1;
                        input = input.slice(start, end);

                    }

                }

                return this.isEmpty(input);
            };

            /**
             * Checks if the input parameter’s character count is less than or equal to the n parameter.
             */
            function isLength(input, n) {

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                return input.length <= n;
            };

            /**
             * Checks if the input parameter’s character count is greater than or equal to the n parameter.
             */
            function isOfLength(input, n) {

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                return input.length >= n;
            };

            /**
             * Checks if the input parameter's character count is equal to the n parameter.
             */
            function equalsLength(input, n) {

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                return input.length === n;
            }

            /**
             * Counts the number of words in the input parameter.
             */
            function countWords(input) {

                var i, len,
                    word = "",
                    temp = 0,
                    words = [],

                    isWordMarker = function (value) {

                        var wordMarkers = ["'", "\"", ",", ".", ":", ";", "-", "!", "?", "(", ")", "...", " ", undefined];

                        return wordMarkers.indexOf(value) >= 0;

                    },

                    hasWordMarker = function (value) {

                        for (var i = 0; i < value.length; i++) {

                            if (isWordMarker(value[i])) {
                                return true;
                            }

                        }

                        return false;

                    };

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                input = input.trim();

                if (input.length === 0) {

                    return 0;

                } else if (hasWordMarker(input) && input.length > 0) {

                    for (i = 0, len = input.length; i < len; i++) {

                        if (isWordMarker(input[i])) {

                            word = input.slice(temp, i);
                            temp = i + 1;
                            words.push(word);

                        }
                    }

                } else {

                    return 1;

                }


                return words.length;
            };

            /**
             * Checks if the input parameter has a word count less than or equal to the n parameter.
             */
            function lessWordsThan(input, n) {

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                return this.countWords(input) <= n;
            };

            /**
             * Checks if the input parameter has a word count greater than or equal to the n parameter.
             */
            function moreWordsThan(input, n) {

                if (arguments.length < 2) {
                    throw "Function requires 2 parameters, " + arguments.length + " given";
                }

                return this.countWords(input) >= n;
            };

            /**
             * Checks that the input parameter matches all of the following:
             * 	- input is greater than or equal to the floor parameter
             *	- input is less than or equal to the ceil parameter..
             */
            function isBetween(input, floor, ceil) {

                if (arguments.length < 3) {
                    throw "Function requires 3 parameters, " + arguments.length + " given";
                }

                return this.countWords(input) >= floor && this.countWords(input) <= ceil;
            };

            /**
             * Checks that the input parameter string is only composed of the following characters: a—z, A—Z, or 0—9.
             */
            function isAlphanumeric(input) {

                var code, i, len;

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                for (i = 0, len = input.length; i < len; i++) {

                    code = input.charCodeAt(i);

                    if (!(code >= 48 && code <= 57) &&
                        !(code >= 65 && code <= 90) &&
                        !(code >= 97 && code <= 122)) {

                        return false;

                    }

                }

                return true;
            };

            /**
             * Checks that the input parameter string is only composed of alphabetic characters.
             */
            function isAlpha(input) {

                var code, i, len;

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                for (i = 0, len = input.length; i < len; i++) {

                    code = input.charCodeAt(i);

                    if (!(code >= 65 && code <= 90) && !(code >= 97 && code <= 122)) {
                        return false;
                    }

                }

                return true;
            };

            /**
             * Checks if the input parameter has leading or trailing whitespaces
             * or too many spaces between words
             */
            function isTrimmed(input) {

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if (input.charAt(0) === " " ||
                    input.charAt(input.length - 1) === " " ||
                    input.indexOf("  ") >= 0) {

                    return false;

                }

                return true;
            };

            /**
             * Checks if the input parameter is a credit card or bank card number.
             */
            function isCreditCard(input) {

                var string = input.toUpperCase();

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if ((string.length === 16 && this.isAlphanumeric(string)) ||
                    (string.length === 19 &&
                        (string.charAt(4) === "-" &&
                            string.charAt(9) === "-" &&
                            string.charAt(14) === "-"))) {

                    return true;

                }

                return false;
            };

            /**
             * Checks if the input string is a hexadecimal color, such as #3677bb.
             */
            function isHex(input) {

                var code, i, len;

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if ((input.length === 7 || input.length === 4) && input.charAt(0) === "#") {

                    for (i = 1, len = input.length; i < len; i++) {

                        code = input.charCodeAt(i);

                        if (!(code >= 48 && code <= 57) &&
                            !(code >= 65 && code <= 70) &&
                            !(code >= 97 && code <= 102)) {

                            return false;

                        }
                    }

                } else {

                    return false;

                }

                return true;
            };

            /**
             * Checks if the input string is an RGB color, such as rgb(200, 26, 131).
             */
            function isRGB(input) {

                var arr = [], i, len, num, string = "";

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if (input.indexOf("rgb(") >= 0 && input.charAt(input.length - 1) === ")") {

                    string = input.replace("rgb(", "");
                    string = string.replace(")", "");
                    arr = string.split(",");

                    if (!!arr && arr.length === 3) {

                        for (i = 0, len = arr.length; i < len; i++) {

                            num = Number(arr[i]);

                            if (!(num >= 0 && num <= 255)) {
                                return false;
                            }

                        }

                        return true;
                    }

                }

                return false;
            };

            /**
             * Checks if the input string is an HSL color, such as hsl(122, 1, 1).
             */
            function isHSL(input) {

                var arr = [], i, len, string = "";

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if (input.indexOf("hsl(") >= 0 && input.charAt(input.length - 1) === ")") {

                    string = input.replace("hsl(", "");
                    string = string.replace(")", "");
                    arr = string.split(",");

                    if (!!arr && arr.length === 3 &&
                        (Number(arr[0]) >= 0 && Number(arr[0]) <= 360) &&
                        (Number(arr[1]) >= 0 && Number(arr[1]) <= 1) &&
                        (Number(arr[2]) >= 0 && Number(arr[2]) <= 1)) {

                        return true;

                    }

                }

                return false;
            };

            /**
             * Checks if the input parameter is a hex, RGB, or HSL color type.
             */
            function isColor(input) {

                if (arguments.length === 0) {
                    throw "Function requires 1 parameter, 0 given";
                }

                if (this.isHex(input) || this.isRGB(input) || this.isHSL(input)) {
                    return true;
                }

                return false;
            };

            function toCelsius(fahrenheit) {
                return (5 * fahrenheit - 160) / 9;
            }

            function toFahrenheit(celsius) {
                return ((9 * celsius) / 5) - 32;
            }

            function isLeapYear(year) {
                if (year % 4 === 0 && year % 100 > 0) {
                    return true;
                } else {
                    if (year % 4 === 0 && year % 100 === 0 && year & 400 === 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            }

            function isArray(arr) {
                return Object.prototype.toString.call(arr) === '[object Array]';
            }

            function randomNumber(min, max) {
                return Math.random() * (max - min) + min;
            }

            function randomInt(min, max) {
                return Math.round(Math.random() * (max - min) + min);
            }

            function randomItem(arr) {
                var max = arr.length;
                var min = 0;

                if (!isArray(arr)) {
                    throw ('Expecting an array');
                }

                return arr[randomInt(min, max)];
            }

            function exists(arr, item) {

                if (!isArray(arr)) {
                    throw ('Expecting an array');
                }

                arr.forEach((element, index) => {
                    if (element === item) {
                        return true;
                    }
                });

                return false;
            }

            /**
             * Pick a number of items from an array
             *
             * @param {Array} arr
             * @param {Number} num
             */
            function pickArray(arr, num, position = 0) {
                var results = [], i, len;

                if (!isArray(arr)) {
                    throw ('Expecting an array');
                }

                if (num > 0 && position < arr.length) {
                    for (i = position; i < num; i++) {
                        results.push(arr[i]);
                    }
                } else if (num < 0 && position < arr.length) {
                    for (i = position; i > num; i--) {
                        results.push(arr[i]);
                    }
                }

                return results;
            }

            /**
             * Get the minimum value from a number array;
             *
             * @param {Array} numberArray
             */
            function min(numberArray) {
                var min = 0;

                if (!isArray(numberArray)) {
                    throw ('Expecting an array');
                }

                numberArray.forEach((value, index) => {
                    if (typeof value !== 'number') {
                        throw (value + ' is not a number');
                    }

                    if (value < min) {
                        min = value;
                    }
                });

                return min;
            }

            /**
             * Get the maximum value from a number array;
             *
             * @param {Array} numberArray
             */
            function max(numberArray) {
                var max = 0;

                if (!isArray(numberArray)) {
                    throw ('Expecting an array');
                }

                numberArray.forEach((value, index) => {
                    if (typeof value !== 'number') {
                        throw (value + ' is not a number');
                    }

                    if (value > max) {
                        max = value;
                    }
                });

                return max;
            }

            function words(str) {
                var string = str.replace(/[^\w\s]/g, '');

                if (typeof str !== 'string') {
                    throw 'Expecting a string'
                }

                return string.split(' ');
            }

            function by(arr, n, callback) {
                // An empty array that will store elements at 'n' interval
                var result = [];

                // Loop throuh arr, incrementing by n - the interval
                // i is n - 1 because index starts at 0.
                for (var i = n - 1; i < arr.length; i += n) {
                    // Push the result of callback to the result array
                    result.push(callback(arr[i]));

                }

                // Return result array containing only elements at the 'n' interval.
                return result;
            }

            function keys(obj) {

                return Object.keys(obj);

            }

            function values(obj) {
                var result = [];

                for (var item in obj) {

                    result.push(obj[item]);

                }

                return result;
            }

            function pairs(obj) {

                var result = [];

                for (var item in obj) {

                    result.push(item);
                    result.push(obj[item]);

                }

                return result;
            }

            function shuffle(array, callback) {

                var result = [],
                    counter = 0,
                    randomIndex; // Store a randomly generated index.

                while (counter < array.length) {
                    // Generate random integer between 0 and the length of the array.
                    randomIndex = Math.floor(Math.random() * (array.length));
                    /**
                     * Only increment counter and add element to result array
                     * as long as the result array does not already contain
                     * that element.
                     */
                    if (result.indexOf(array[randomIndex]) < 0) {

                        result.push(array[randomIndex]);
                        counter++;

                    }
                }

                return result;
            }

            function isCamel(string) {

                var stringArray = string.split("-"), // Split string into elements, separated by the dash symbol.
                    result = stringArray[0].toLowerCase(), // Change the first word to lowercase.
                    word;

                // Loop through each splitted string starting from the second string (i = 1)
                for (var i = 1; i < stringArray.length; i++) {

                    word = stringArray[i][0].toUpperCase(); // Convert the first character to uppercase.
                    word = word + stringArray[i].slice(1); // Add the rest of the characters back to uppercase letter
                    result += word; // Add the word to result, the would be final string.

                }
                // Return the string in camelCase.
                return result;
            }

            /**
             * Convert a camelCase string to a dashed string
             */
            function toDash(string) {

                var result = "";

                for (var i = 0; i < string.length; i++) {
                    // Find where a character is in uppercase and insert a dash symbol first.
                    if (string[i] === string[i].toUpperCase()) {

                        result += "-";

                    }

                    result += string[i];

                }

                return result.toLowerCase();
            }

            /**
             * Searches all values of the parameter obj and returns “true”
             * if any are equal to the search parameter.
             */
            function has(obj, search) {

                for (var prop in obj) {

                    if (obj[prop] === search) {

                        return true;

                    }

                }

                return false;
            }

            /**
             * Return a new object by picking all key/value pairs from the parameter obj.
             * The keys that are picked are determined by the array parameter keys.
             */
            function pick(object, props) {

                var result = {};

                for (let prop in object) {
                    // Check if the prop is in the list of 'props'
                    if (props.indexOf(prop) >= 0) {

                        result[prop] = object[prop];

                    }

                }

                return result;
            }

            /**
             * Return the plural of a word depending on the value of the n parameter
             */
            function pluralize(n, word, pluralWord) {
                // Check if it should be singular.
                if (n === 1) {

                    return word; // Singular

                } else {
                    // Check if the plural word has been specified
                    if (pluralWord !== undefined && pluralWord !== "") {

                        return pluralWord; // Use provided plural word

                    }

                    return word + "s"; // Use default pluralization.

                }
            }

            /**
             * @param {number[]} nums
             * @return {number}
             */
            function majorityElement (nums) {
                var appearances = new Map();
                var numsLength = nums.length;
                var majorityEl;

                for (let i = 0; i < numsLength; i++) {
                    let num = nums[i];

                    if (! appearances.has(num)) {
                        appearances.set(num, 1);
                    } else {
                        appearances.set(num, appearances.get(num) + 1);
                    }
                }

                appearances.forEach((appearance, index) => {
                    if (appearance > numsLength / 2) {
                        majorityEl = index;
                        return majorityEl;
                    }
                });

                return majorityEl;
            }

            /**
             * @param {number[]} nums
             * @param {number} val
             * @return {number}
             */
            function removeElement(nums, val) {
                var numsLength = nums.length,
                    count = 0;

                while (count < numsLength) {
                    let lastElement = nums.pop();

                    if (lastElement !== val) {
                        nums.unshift(lastElement);
                    }

                    count++;
                }

                return nums.length;
            }

            function reverseWords (s) {
                var string = "";
                var words = s.split(" ");

                for (let i = 0; i < words.length; i++) {

                    string += words[i].split("").reverse().join("");

                    if (i != words.length - 1) {
                        string += " ";
                    }

                }

                return string;
            }

            return {
                isEmailAddress: isEmailAddress,
                withoutSymbols: withoutSymbols,
                isEmpty: isEmpty,
                contains: contains,
                lacks: lacks,
                isLength: isLength,
                isOfLength: isOfLength,
                isComposedOf: isComposedOf,
                countWords: countWords,
                lessWordsThan: lessWordsThan,
                moreWordsThan: moreWordsThan,
                isBetween: isBetween,
                isAlphanumeric: isAlphanumeric,
                isAlpha: isAlpha,
                isTrimmed: isTrimmed,
                isCreditCard: isCreditCard,
                isHex: isHex,
                isRGB: isRGB,
                isHSL: isHSL,
                isColor: isColor,
                isLeapYear: isLeapYear,
                exists: exists,
                pickArray: pickArray,
                min: min,
                max: max,
                words: words,
                by: by,
                keys: keys,
                values: values,
                pairs: pairs,
                shuffle: shuffle,
                isCamel: isCamel,
                isObject: isObject,
                toCelsius: toCelsius,
                toFahrenheit: toFahrenheit,
                toDash: toDash,
                has: has,
                pick: pick,
                pluralize: pluralize,
                majorityElement: majorityElement,
                removeElement: removeElement,
                reverseWords: reverseWords,
            }
        }

        return {

            getInstance: function () {

                if (!instance) {
                    instance = createInstance();
                }

                return instance;
            }

        }
    }());

    window.mate = mate.getInstance();

}(window));



/**
 * TODO:
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    nums.forEach((num, index) => {
        if (num === 0) {
            nums.push(nums.splice(index, 1)[0]);
        }
    });
};


var reverseString = function (s) {
    var string = "";

    for (let i = s.length - 1; i >= 0; i--) {
        string += s[i];
    }

    return string;
};


var twoSum = function (nums, target) {
    let numsLength = nums.length;

    for (let i = 0; i < numsLength; i++) {
        for (let n = i + 1; n < numsLength; n++) {
            if (nums[i] + nums[n] === target) {
                return [i, n];
            }
        }
    }
};

var lengthOfLongestSubstring = function (s) {
    var longestString = "";

    for (let i = 0; i < s.length; i++) {
        let str = "";
        str += s[i];
        for (let c = i + 1; c < s.length; c++) {
            if (str.indexOf(s[c]) < 0) {
                str += s[c];
            } else {
                break;
            }
        }

        if (str.length > longestString.length) {
            longestString = str;
        }
    }

    return longestString;
};

var MapSum = function () {
    this.mapsums = {};
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
    if (this.mapsums.hasOwnProperty('key')) {
        delete this.mapsums[key];
    }
    this.mapsums[key] = val;
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
    var sum = 0;

    for (prop in this.mapsums) {
        if (prop.indexOf(prefix) === 0) {
            sum += this.mapsums[prop];
        }
    }

    return sum;
};

var reverseWords = function (str) {
    var result = "",
        string = str.trim().split(" ");

    for (let i = string.length - 1; i >= 0; i--) {
        if (string[i] !== "") {
            if (i !== 0) {
                result += string[i] + ' ';
            } else {
                result += string[i];
            }
        }
    }
    return result;
};

var myPow = function (x, n) {
    if (n === 0) return 1;
    var ret = Math.exp(Math.abs(n) * Math.log(Math.abs(x)));
    if (x < 0 && n % 2 == 1)
        ret *= -1;
    return n > 0 ? ret : (1 / ret);
};

var findMaxConsecutiveOnes = function (nums) {
    var ones = 0, longest = 0, numsLength = nums.length;

    for (let i = 0; i < numsLength; i++) {

        if (nums[i] === 1) {
            ones++;
            if (ones > longest) {
                longest = ones;
            }
        } else {
            ones = 0; // reset
        }
    }

    return longest;
};

var detectCapitalUse = function (word) {
    let uppercaseWord = word.toUpperCase();
    let lowercaseWord = word.toLowerCase();


    if (uppercaseWord === word || lowercaseWord === word || (word[0] === word[0].toUpperCase() && word.substr(1) === word.substr(1).toLowerCase())) {
        return true;
    }


    return false;
};

var nextGreaterElement = function (findNums, nums) {
    var result = [];

    for (let i = 0; i < findNums.length; i++) {
        let num = findNums[i],
            numIndex = nums.indexOf(num),
            found = false;

        for (let n = numIndex + 1; n < nums.length; n++) {
            if (nums[n] > num) {
                result.push(nums[n]);
                found = true;
                break;
            }
        }

        if (! found) {
            result.push(-1);
        }

    }

    return result;
};

var nextGreaterElements = function (nums) {
    var result = [];

    for (let i = 0; i < nums.length; i++) {
        let found = false,
            n = i;

        while (n++ < nums.length) {

            if (nums[n] === undefined) {
                n = -1;
            }

            if (nums[n] > nums[i]) {
                result.push(nums[n]);
                found = true;
                break;
            }

            if (n === i - 1) {
                break;
            }

        }

        if (!found) {
            result.push(-1);
            found = false;
        }

    }

    return result;
};

var countSmaller = function (nums) {
    var result = [], len = nums.length, count = 0;

    sortedNums = nums.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < len; i++) {
        count = len - 1 - sortedNums.lastIndexOf(sortedNums[i]);

        result.push(count);
    }

    return result;
};

/**
 * Reverse number
 * 
 * @param {number} x
 * @return {number}
 */
var numToReverse = 1534236469;
var reverse = function(x) {
    var reversed = 0;
    var max = 2147483647;
    var min = -2147483647;

    if (x < 0) {
        reversed = ('-' + ((x + '').substr(1)).split('').reverse().join('')) * 1
    } else {
        reversed = (x + '').split('').reverse().join('') * 1;
    }

    if (reversed < min || reversed > max) {
        return 0;
    }

    return reversed;
};

/**
 * Find duplicates
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var findDuplicates = function(nums) {
    var sortedArray = nums.sort(function(a, b) {
        return a - b;
    });

    var result = [];

    for (var i = 1, length = sortedArray.length; i < length; i++) {
        if (sortedArray[i] === sortedArray[i - 1]) {
            result.push(sortedArray[i]);
        }
    }
    
    return result;
};

/**
 * Find single non duplicate
 * 
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNonDuplicate = function(nums) {
    return nums.find(function (n) {
        return nums.indexOf(n) === nums.lastIndexOf(n);
    });
};

function findMin(nums) {
    
    if (nums.length == 0)
        return -1;

    var result = nums[0];

    for(var i = 1; i < nums.length; i++){
        if(nums[i] < result){
            result = nums[i];
            break;
        }
    }

    return result;
}

var countDigitOne = function(n) {
    var result = 0, q = n, x = 1;

    if ( n < 1 )
        return 0;

    while (q > 0) {
        var digit = q % 10;
        q /= 10;
        result += q * x;

        if ( digit === 1 )
            result += n % x + 1;

        if ( digit > 1 )
            result += x;

        x *= 10;
    }

    return result;
};

var isNumber = function (s) {
    s = s.trim();
    hasPoint = false;
    hasE = false;
    result = false;

    for(var i = 0; i < s.length; i++) {
        if('0' <= s.charAt(i) && s.charAt(i) <= '9') {
            result = true;
        } else if(s.charAt(i) === '.') {
            if(hasE || hasPoint)
                return false;
            hasPoint = true;
        } else if(s.charAt(i) === 'e') {
            if(hasE || !result)
                return false;
            result = false;
            hasE = true;
        } else if(s.charAt(i) === '-' || s.charAt(i) === '+') {
            if(i !== 0 && s.charAt(i-1) !== 'e')
                return false;
        } else
            return false;
    }

    return result;
}
"use strict";
/* -----------------------------------
 *
 * hasClass
 *
 * -------------------------------- */
Object.defineProperty(exports, "__esModule", { value: true });
function hasClass(el, str) {
    var result = false;
    var value = " " + str + " ";
    var clean = (" " + el.className + " ").replace(/[\n\t]/g, ' ');
    if (clean.indexOf(value) > -1) {
        result = true;
    }
    return result;
}
exports.hasClass = hasClass;

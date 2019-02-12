"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
/* -----------------------------------
 *
 * Delegate
 *
 * -------------------------------- */
function delegate(scope, query, cb) {
    return function (ev) {
        var $elements = new index_1.Instance(query, scope);
        var el = null;
        var hit = false;
        $elements.each(function (_el) {
            var test = ev.target;
            if (test === _el) {
                hit = true;
                el = test;
                return;
            }
            while (test && test !== scope) {
                test = test.parentNode;
                if (test === _el) {
                    hit = true;
                    el = test;
                }
            }
        });
        if (hit) {
            cb(ev, el);
        }
    };
}
exports.delegate = delegate;

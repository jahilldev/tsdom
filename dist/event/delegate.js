"use strict";function delegate(e,r,t){return function(n){var i=null,o=!1;new index_1.Dom(r,e).each(function(r){var t=n.target;if(t==r)return o=!0,void(i=t);for(;t&&t!==e;)(t=t.parentNode)==r&&(o=!0,i=t)}),o&&t(n,i)}}Object.defineProperty(exports,"__esModule",{value:!0});var index_1=require("../index");exports.delegate=delegate;
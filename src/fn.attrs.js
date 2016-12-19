(function($, window, document) {
    "use strict";
    /**
     * 获取元素(如果fn包含多个元素，只返回第一个元素的)所有属性，并转化成一个object返回
     * @param {boolean|undefined} transformCamel
     * @param {string|undefined} linkChar
     * @returns {object}
     */
    $.fn.attrs = $.fn.attrs || function(transformCamel, linkChar) {
        var fn = this;

        if (fn.length > 0) {
            var obj,
                element = fn[0],
                attrs = element.attributes,
                len = attrs.length,
                attr,
                i;
            if (len) {
                obj = {};
                for (i = 0; i < len; i++) {
                    attr = attrs[i];
                    if (transformCamel === true) {
                        obj[$.toLowerCamel(attr.name, linkChar || "-")] = attr.value;
                    } else {
                        obj[attr.name] = attr.value;
                    }
                }
                return obj;
            }
        }
    }
})(jQuery, window, document);
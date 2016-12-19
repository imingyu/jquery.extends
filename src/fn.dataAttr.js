(function($, window, document) {
    "use strict";
    /**
     * 获取或设置元素data-*属性
     * 不传递参数时，序列化第一个元素的data-*属性为一个object，object属性是元素的data-* key,object属性值是元素的data-* value，返回这个object
     * 传递一个参数且类型不是object时，获取data-attr属性的值并返回
     * 传递一个参数且类型时obejct时，设置元素的data-*属性值与object映射，返回jquery.fn
     * 传递两个个参数时，设置data-arrt=value，返回jquery.fn
     * @param {string|undefined|object} attr
     * @param {string|undefined} value
     * @returns {string|object|jquery.fn}
     */
    $.fn.dataAttr = $.fn.dataAttr || function(attr, value) {
        var len = arguments.length,
            fn = this,
            dom = fn[0],
            element = $(dom),
            obj;
        if (len === 0) {
            obj = {};
            $.each(dom.attributes, function(i, item) {
                if (item.name.indexOf("data-") === 0 && item.name.length > 5) {
                    //将属性名称从连字符“-”转化为小驼峰（user-name ===> userName）
                    obj[$.toLowerCamel(item.name.substr(5), '-')] = item.value;
                }
            });
            return obj;
        } else if (len === 1 && typeof attr === "object") {
            for (var prop in attr) {
                fn.attr("data-" + $.restoreCamel(prop, "-"), attr[prop]);
            }
            return fn;
        } else if (len === 1) {
            return element.attr("data-" + $.restoreCamel(attr, "-"));
        } else if (len > 1) {
            fn.attr("data-" + attr, value);
            return fn;
        }
    }
})(jQuery, window, document);
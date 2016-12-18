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
    $.fn.dataVal = $.fn.dataVal || function(options) {}
})(jQuery, window, document);
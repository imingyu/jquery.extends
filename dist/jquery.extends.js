/*!
 * jquery.extends
 * version: 0.1.0
 * author: mingyuhisoft@163.com
 * home: https://github.com/imingyu/jquery.extends#readme
 * description: 为jquery扩展一些额外的、常用的、便捷的、高效的方法及组件
 */
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

(function($, window, document) {
    "use strict";

    function defaultSetElementValue(subElement, value, fnElement) {
        if (subElement.is("[type='checkbox']") || subElement.is("[type='radio']")) {
            if ((value === true || value === false) && subElement.length <= 1 && typeof subElement.attr("value") === "undefined") {
                subElement.prop("checked", value);
                return;
            }
            if ($.isArray(value)) {
                $.each(value, function(index, item) {
                    subElement.filter("[value='" + item + "']").prop("checked", true);
                });
            } else if (typeof value === "undefined" || value === null) {
                subElement.prop("checked", false);
            } else {
                subElement.filter("[value='" + value + "']").prop("checked", true);
            }
        } else if (subElement.is(":input")) {
            subElement.val(value);
        }
    }

    function defaultGetElementValue(subElement, name, fnElement) {
        if (subElement.length <= 1) {
            if (subElement.is("[type='checkbox']") || subElement.is("[type='radio']")) {
                var value = subElement.attr("value"),
                    checked = subElement.prop("checked");
                if (typeof value != "undefined" && value != "" && checked) {
                    return value;
                } else {
                    return checked;
                }
            } else if (subElement.is(":input")) {
                return subElement.val();
            }
        } else {
            if (subElement.is("[type='radio']")) {
                return subElement.filter(":checked").val();
            } else if (subElement.is("[type='checkbox']")) {
                var result = [];
                subElement.filter(":checked").each(function() {
                    result.push($(this).val());
                });
                return result;
            } else {
                var result = [];
                subElement.each(function() {
                    result.push($(this).val());
                });
                return result;
            }
        }
    }
    $["formValue.setElementValue"] = defaultSetElementValue; //设置子元素的value函数
    $["formValue.getElementValue"] = defaultGetElementValue; //获取子元素的value函数

    /**
     * 获取或设置元素内的表单值
     * 不传递参数时，序列化第一个元素内的name属性不为空的子元素的值为一个object，属性是子元素的name值,属性值是子元素的value，返回这个object
     * 传递一个参数且类型不是object时，获取name=arg的第一个元素的值并返回
     * 传递一个参数且类型时obejct时，寻找元素内name=arg属性名的所有元素，设置元素值为arg对应属性的值，返回jquery.fn
     * 传递两个个参数时，设置name=arg1的元素值为arg2，返回jquery.fn
     * @param {string|undefined|object} name
     * @param {string|undefined} value                  
     * @returns {string|object|jquery.fn}
     */
    $.fn.formValue = $.fn.formValue || function(name, value) {
        var len = arguments.length,
            fn = this,
            element = $(fn[0]),
            set = $["formValue.setElementValue"],
            get = $["formValue.getElementValue"];
        if (len === 0) {
            var obj = {},
                tempObj = {},
                prop,
                radio = element.find("input[type='radio'][name]"),
                checkbox = element.find("input[type='checkbox'][name]"),
                input = element.find(":input[name]:not([type='radio']):not([type='checkbox'])");
            //radio情况的处理
            radio.each(function() {
                var child = $(this),
                    _name = child.attr("name");
                if (!tempObj[_name]) {
                    tempObj[_name] = radio.filter("[name='" + _name + "']");
                }
            });
            for (prop in tempObj) {
                obj[prop] = get(tempObj[prop], prop, element);
                delete tempObj[prop];
            }
            prop = undefined;

            //checkbox情况的处理
            checkbox.each(function() {
                var child = $(this),
                    _name = child.attr("name");
                if (!tempObj[_name]) {
                    tempObj[_name] = checkbox.filter("[name='" + _name + "']");
                }
            });
            for (prop in tempObj) {
                obj[prop] = get(tempObj[prop], prop, element);
                if ($.isArray(obj[prop]) && obj[prop].length == 0) {
                    obj[prop] = undefined;
                }
                delete tempObj[prop];
            }
            prop = undefined;

            //普通input情况的处理
            input.each(function() {
                var child = $(this),
                    _name = child.attr("name");
                obj[_name] = get(child, _name, element);
            });
            return obj;
        } else if (len === 1 && typeof name === "object") {
            for (var prop in name) {
                set(fn.find("[name='" + prop + "']"), name[prop], element);
            }
            return fn;
        } else if (len === 1 && typeof name !== "object") {
            return get(element.find("[name='" + name + "']"), name, element);
        } else if (len > 1) {
            set(fn.find("[name='" + name + "']"), value, element);
            return fn;
        }
    }
})(jQuery, window, document);

(function($, window, document) {
    "use strict";

    function baseToCamel(str, linkChar, size) {
        if (!str || typeof str !== "string" || $.trim(str) === "") {
            return str;
        }
        var result,
            reg = new RegExp("\\" + linkChar + "(\\w)", "g");
        result = str.replace(reg, function($0, $1) {
            return $1.toUpperCase();
        });
        if (size === "L") {
            result = result.charAt(0).toLowerCase() + result.substr(1);
        } else if (size === "U") {
            result = result.charAt(0).toUpperCase() + result.substr(1);
        }
        return result;
    }
    /**
     * 将字符串转换成小驼峰式
     * @param {string} str
     * @param {string|undefined} linkChar
     * @returns {string}
     */
    $.toLowerCamel = $.toLowerCamel || function(str, linkChar) {
        //首字母小写
        return baseToCamel(str, linkChar, "L");
    }

    /**
     * 将字符串转换成大驼峰式
     * @param {string} str
     * @param {string|undefined} linkChar
     * @returns {string}
     */
    $.toUpperCamel = $.toUpperCamel || function(str, linkChar) {
        //首字母大写
        return baseToCamel(str, linkChar, "U");
    }

    /**
     * 将驼峰式字符串换成成以linkChar连接的字符串
     * @param {string} camelStr
     * @param {string|undefined} linkChar
     * @returns {string}
     */
    $.restoreCamel = $.restoreCamel || function(camelStr, linkChar) {
        if (!camelStr || typeof camelStr !== "string" || $.trim(camelStr) === "" || !linkChar || typeof linkChar !== "string") {
            return camelStr;
        }
        return camelStr.replace(new RegExp("([A-Z])", "g"), linkChar + "$1").toLowerCase();
    }
})(jQuery, window, document);
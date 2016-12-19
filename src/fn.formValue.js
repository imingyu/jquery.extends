(function(fun) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var root = typeof window === "undefined" ? this : window;
        module.exports = function(jQuery, window, document) {
            jQuery = jQuery || root.jQuery;
            window = window || root;
            document = document || windo.document;
            fun(jQuery, window, document);
        }
    } else {
        fun(window.jQuery, window, document);
    }
})(function($, window, document) {
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
});
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
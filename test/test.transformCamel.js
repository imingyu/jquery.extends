(function(fun) {
    var isBrowser = typeof window === "object";
    if (isBrowser) {
        var chai = window.chai,
            $ = window.jQuery;
        fun($, chai.assert, chai.expect);
    } else {
        var $ = require("jquery"),
            chai = require("chai"),
            expect = chai.expect,
            assert = chai.assert;
        require('../src/fn.formValue.js');
        fun($, chai.assert, chai.expect);
    }
})(function($, assert, expect) {
    describe('toLowerCamel', function() {
        it('方法扩展成功', function() {
            assert.equal($.hasOwnProperty("toLowerCamel"), true);
        });

        describe("方法参数", function() {
            it('不传递参数', function() {
                assert.equal($.toLowerCamel(), undefined);
            });

            it('传递一个string参数', function() {
                assert.equal($.toLowerCamel("abc"), "abc");
            });
            it('传递一个string参数:首字母大写', function() {
                assert.equal($.toLowerCamel("Abc"), "abc");
            });
            it('传递2个string参数:-', function() {
                assert.equal($.toLowerCamel("abc-def", "-"), "abcDef");
            });
            it('传递2个string参数:+', function() {
                assert.equal($.toLowerCamel("abc+def+fg", "+"), "abcDefFg");
            });
            it('传递2个string参数:/', function() {
                assert.equal($.toLowerCamel("abc/def", "/"), "abcDef");
            });
        });
    });

    describe('toUpperCamel', function() {
        it('方法扩展成功', function() {
            assert.equal($.hasOwnProperty("toUpperCamel"), true);
        });

        describe("方法参数", function() {
            it('不传递参数', function() {
                assert.equal($.toUpperCamel(), undefined);
            });

            it('传递一个string参数', function() {
                assert.equal($.toUpperCamel("abc"), "Abc");
            });
            it('传递2个string参数:-', function() {
                assert.equal($.toUpperCamel("abc-def", "-"), "AbcDef");
            });
            it('传递2个string参数:+', function() {
                assert.equal($.toUpperCamel("abc+def+fg", "+"), "AbcDefFg");
            });
            it('传递2个string参数:/', function() {
                assert.equal($.toUpperCamel("abc/def", "/"), "AbcDef");
            });
        });
    });

    describe('restoreCamel', function() {
        it('方法扩展成功', function() {
            assert.equal($.hasOwnProperty("restoreCamel"), true);
        });

        describe("方法参数", function() {
            it('不传递参数', function() {
                assert.equal($.restoreCamel(), undefined);
            });

            it('传递一个string参数', function() {
                assert.equal($.restoreCamel("abc"), "abc");
            });
            it('传递一个string参数：含大写字母', function() {
                assert.equal($.restoreCamel("aBc"), "aBc");
            });
            it('传递2个string参数:-', function() {
                assert.equal($.restoreCamel("abcDef", "-"), "abc-def");
            });
            it('传递2个string参数:+', function() {
                assert.equal($.restoreCamel("abcDgCf", "+"), "abc+dg+cf");
            });
        });
    });
});
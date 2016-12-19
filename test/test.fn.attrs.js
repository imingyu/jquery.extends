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
        require('../src/fn.attrs.js');
        fun($, chai.assert, chai.expect);
    }
})(function($, assert, expect) {
    describe('fn.attrs', function() {
        it('方法扩展成功', function() {
            assert.equal($.fn.hasOwnProperty("attrs"), true);
        });

        var html, htmlContent;
        //获取formValue测试html代码
        beforeEach(function(done) {
            if (htmlContent) {
                html = $(htmlContent);
                done();
            } else {
                $.get("test.fn.formValue.html?id=" + (new Date).getTime()).done(function(data) {
                    htmlContent = data;
                    html = $(data);
                    done();
                });
            }
        });

        describe("方法参数", function() {
            it('不传递参数', function() {
                var s1 = html.find("#s1"),
                    attrs = s1.attrs();
                console.log(attrs);
                assert.equal(attrs.id, "s1");
                assert.equal(attrs.name, "s1");
                assert.equal(attrs.width, "40px");
                assert.equal(attrs["data-value"], "s1");
                assert.equal(attrs.style, "height:30px;");
            });

            it('传递一个boolean参数', function() {
                var s1 = html.find("#s1"),
                    attrs = s1.attrs(true);
                assert.equal(attrs.id, "s1");
                assert.equal(attrs.name, "s1");
                assert.equal(attrs.width, "40px");
                assert.equal(attrs.dataValue, "s1");
                assert.equal(attrs.style, "height:30px;");
            });
        });
    });
});
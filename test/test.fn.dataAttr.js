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
        require('../src/fn.dataAttr.js');
        fun($, chai.assert, chai.expect);
    }
})(function($, assert, expect) {
    describe('fn.dataAttr', function() {
        it('方法扩展成功', function() {
            assert.equal($.fn.hasOwnProperty("dataAttr"), true);
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
                var s2 = html.find("#s2"),
                    attrs = s2.dataAttr();
                assert.equal(attrs.id, undefined);
                assert.equal(attrs.value, "s2");
                assert.equal(attrs.width, "60px");
                assert.equal(attrs.userId, "2");
            });

            it('传递2个参数', function() {
                var s2 = html.find("#s2"),
                    attrs = s2.dataAttr("width", 50);
                assert.equal(s2.attr("data-width"), "50");
                assert.equal(s2.attr("width"), "40px");
                assert.equal(s2, attrs);
            });
            it('传递1个参数', function() {
                var s2 = html.find("#s2"),
                    attrs = s2.dataAttr("width");
                assert.equal(attrs, "60px");
            });
        });
    });
});
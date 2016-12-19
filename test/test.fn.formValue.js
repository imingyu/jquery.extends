describe("test.fn.formValue.js", function() {
    var isBrowser = typeof window === "object",
        chai, $, assert, expect, fs, jsdom;
    before(function(done) {
        if (isBrowser) {
            chai = window.chai;
            $ = window.jQuery;
            assert = chai.assert;
            expect = chai.expect;
            done();
        } else {
            fs = require("fs");
            jsdom = require("jsdom");
            jsdom.env("", function(err, window) {
                if (err) {
                    console.error(err);
                    return;
                }
                $ = require("jquery")(window);
                chai = require("chai");
                expect = chai.expect;
                assert = chai.assert;
                require('../src/fn.formValue.js')($, window, window.document);
                done();
            });
        }
    });

    describe('fn.formValue', function() {
        it('方法扩展成功', function() {
            expect($.fn.hasOwnProperty("formValue")).to.be.equal(true);
        });

        var html, htmlContent;
        //获取formValue测试html代码
        beforeEach(function(done) {
            if (htmlContent) {
                if (isBrowser) {
                    html = $(htmlContent);
                    done();
                } else {
                    html = $(jsdom.jsdom(`<html><body>${htmlContent}</body></html>`).defaultView);
                    done();
                }
            } else {
                if (isBrowser) {
                    $.get("test.fn.formValue.html?id=" + (new Date).getTime()).done(function(data) {
                        htmlContent = data;
                        html = $(data);
                        done();
                    });
                } else {
                    fs.readFile("test.fn.formValue.html", "utf-8", function(err, data) {
                        htmlContent = data + "";
                        html = $(jsdom.jsdom(`<html><body>${htmlContent}</body></html>`).defaultView);
                        done();
                    });
                }
            }
        });

        describe("方法参数", function() {
            it('不传递参数', function() {
                var f1 = html.find("#f1"),
                    value = f1.formValue();
                assert.isObject(value);
            });

            it('传递一个string参数', function() {
                var f1 = html.find("#f1"),
                    value = f1.formValue("name");
                assert.isTrue(value === "我的名字是小明爱吃瓜");
            });
            it('传递一个object参数', function() {
                var f1 = html.find("#f1"),
                    value = f1.formValue({
                        name: "小明"
                    });
                assert.isTrue(f1 === value);
                assert.equal(f1.find("[name='name']").val(), "小明");
            });
            it('传递2个参数', function() {
                var f1 = html.find("#f1"),
                    value = f1.formValue("name", "小明");
                assert.isTrue(f1 === value);
                assert.equal(f1.find("[name='name']").val(), "小明");
            });
        });

        describe("获取表单值", function() {
            //radio
            it('获取name=radio的表单值', function() {
                var f1 = html.find("#f1");
                expect(f1.formValue("radio")).to.be.equal("1");
            });

            it('获取name=otherRadio的表单值', function() {
                var f1 = html.find("#f1");
                expect(f1.formValue("otherRadio")).to.be.equal(false);
            });

            it('选中otherRadio后，获取name=otherRadio的表单值', function() {
                var f1 = html.find("#f1");
                f1.find("[name='otherRadio']").prop("checked", true);
                expect(f1.formValue("otherRadio")).to.be.equal(true);
            });


            //checkbox
            it('获取name=checkbox的表单值', function() {
                var f1 = html.find("#f1");
                var value = f1.formValue("checkbox");
                expect($.isArray(value)).to.be.equal(true);
                expect(value.join(",")).to.be.equal("1");
            });
            it('选中多个后，重新获取name=checkbox的表单值', function() {
                var f1 = html.find("#f1");
                f1.find("[name='checkbox'][value='2'],[name='checkbox'][value='3']").prop("checked", true);

                var value = f1.formValue("checkbox");

                expect($.isArray(value)).to.be.equal(true);
                expect(value.join(",")).to.be.equal("1,2,3");
            });

            it('获取name=otherCheckbox 的表单值', function() {
                var f1 = html.find("#f1");
                expect(f1.formValue("otherCheckbox")).to.be.equal(false);
            });

            it('选中otherCheckbox后，获取name=otherCheckbox 的表单值', function() {
                var f1 = html.find("#f1");
                f1.find("[name='otherCheckbox']").prop("checked", true);
                assert.equal(f1.formValue("otherCheckbox"), true);
            });

            //input
            it('获取name=name 的表单值：fn是单个dom', function() {
                var f1 = html.find("#f1");
                expect(f1.formValue("name")).to.be.equal("我的名字是小明爱吃瓜");
            });
            it('获取name=name 的表单值：fn是多个dom', function() {
                var f1 = html.find("form");
                expect(f1.formValue("name")).to.be.equal(f1.eq(0).find("[name='name']").val());
            });
            //email
            it('获取name=email 的表单值', function() {
                var f1 = html.find("#f1");
                expect(f1.formValue("email")).to.be.equal("mingyuhisoft@163.com");
            });
            //textarea
            it('获取name=desc 的表单值', function() {
                var f1 = html.find("#f1");
                expect(f1.formValue("desc")).to.be.equal("一颗小前端，二班程序员");
            });

            //form
            it('获取整个表单的值：fn是单个dom', function() {
                var f1 = html.find("#f1"),
                    value = f1.formValue();
                assert.isObject(value);
                assert.equal(value.email, "mingyuhisoft@163.com");
                assert.equal(value.otherRadio, false);
                assert.equal(value.otherCheckbox, false);
                assert.equal(value.radio, "1");
                assert.isArray(value.checkbox);
                assert.isTrue(value.checkbox.length > 0);
                assert.equal(value.checkbox.join(""), "1");
            });

            //form
            it('获取整个表单的值：fn是多个dom', function() {
                var f1 = html.find("form"),
                    value = f1.formValue();
                assert.isObject(value);
                assert.equal(value.github, "github");
            });
        });

        describe("设置表单值", function() {
            it('设置name=radio的表单值为有效值（radio列表中存在的value）：2', function() {
                var f1 = html.find("#f1");
                f1.formValue("radio", 2);
                expect(f1.find("[name='radio'][value='2']").prop("checked")).to.be.equal(true);
            });
            it('设置name=radio的表单值为无效值（radio列表中不存在的value）：999', function() {
                var f1 = html.find("#f1"),
                    oldHtml = f1.prop("outerHTML"),
                    newHtml;
                f1.formValue("radio", 999);
                newHtml = f1.prop("outerHTML");
                assert.equal(newHtml, oldHtml);
            });

            it('设置name=radio的表单值为空（传递undefined），即取消选中的radio值', function() {
                var f1 = html.find("#f1");
                f1.formValue("radio", undefined);
                f1.find("[name='radio']").each(function() {
                    if ($(this).prop("checked")) {
                        assert.isNotOk(false);
                    }
                });
                assert.isOk(true);
            });
            it('设置name=radio的表单值为空（传递null），即取消选中的radio值', function() {
                var f1 = html.find("#f1");
                f1.formValue("radio", undefined);
                f1.find("[name='radio']").each(function() {
                    if ($(this).prop("checked")) {
                        assert.isNotOk(false);
                    }
                });
                assert.isOk(true);
            });

            //form
            it('设置整个表单的值：单个dom', function() {
                var f1 = html.find("#f1");
                f1.formValue({
                    name: "小明",
                    radio: "2",
                    checkbox: null,
                    otherCheckbox: true
                });
                assert.equal(f1.find("[name='name']").val(), "小明");
                f1.find("[name='radio']").each(function() {
                    var item = $(this),
                        val = item.attr("value");
                    if (val != "2" && item.prop("checked")) {
                        assert.isNotOk(false);
                    }
                });
                f1.find("[name='checkbox']").each(function() {
                    if ($(this).prop("checked")) {
                        assert.isNotOk(false);
                    }
                });
                assert.equal(f1.find("[name='otherCheckbox']").prop("checked"), true);

                f1.formValue({
                    otherCheckbox: null
                });
                assert.equal(f1.find("[name='otherCheckbox']").prop("checked"), false);

                f1.formValue({
                    otherRadio: true
                });
                assert.equal(f1.find("[name='otherRadio']").prop("checked"), true);

                f1.formValue({
                    otherRadio: false
                });
                assert.equal(f1.find("[name='otherRadio']").prop("checked"), false);
            });

            //form
            it('设置整个表单的值：多个dom', function() {
                var from = html.find("form");
                from.formValue({
                    name: "小明",
                    github: "com",
                    radio: "2"
                });

                var f1 = html.find("#f1"),
                    f = html.find("#f");
                assert.equal(f.find("[name='name']").val(), "小明");
                assert.equal(f1.find("[name='name']").val(), "小明");
                assert.equal(f.find("[name='github']").val(), "com");
                assert.equal(f1.find("[name='radio']:checked").val(), "2");
            });
        });
    });
});
# jquery.extends
为jquery扩展一些额外的、常用的、便捷的、高效的方法及组件

[![NPM](https://nodei.co/npm/jquery.extends.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/jquery.extends/)

安装
===
下载`/dist/jquery.extends.js`，引入你的页面即可使用；

或者使用`npm`进行安装：

```
npm install jquery.extends
```


fn.formValue
===
**获取或设置元素内的表单值**

`$(element).formValue([name, value])`

- 不传递参数时，序列化第一个元素内的name属性不为空的子元素的值为一个object，属性是子元素的name值,属性值是子元素的value，返回这个object
- 传递一个参数且类型不是object时，获取name=arg的第一个元素的值并返回
- 传递一个参数且类型时obejct时，寻找元素内name=arg属性名的所有元素，设置元素值为arg对应属性的值，返回jquery.fn
- 传递两个个参数时，设置name=arg1的元素值为arg2，返回jquery.fn

示例
---
```html
<form id="form">
    <input type="text" name="name" value="小明">
    <input type="email" name="email" value="mingyuhisoft@163.com">
    <label>
        <input type="radio" name="gender" value="1" checked> 男
    </label>
    <label>
        <input type="radio" name="gender" value="2"> 女
    </label>

    <label>
        <input type="checkbox" name="hobby" value="1" checked> 电影
    </label>
    <label>
        <input type="checkbox" name="hobby" value="2"> 美食
    </label>
    <label>
        <input type="checkbox" name="hobby" value="3"> 武侠
    </label>
    <label>
        <input type="checkbox" name="hobby" value="4"> 历史
    </label>
</form>
```

```javascript
$(function(){
    var fm = $("#form");

    //获取整个表单的值
    fm.formValue(); // { name:"小明", email:"mingyuhisoft@163.com", gender:"1" }

    //获取表单内的email值
    fm.formValue("email");// mingyuhisoft@163.com

    //获取gender
    fm.formValue("gender");// 1

    //设置姓名
    fm.formValue("name", "小红");// <input type="text" name="name" value="小红">

    //设置性别
    fm.formValue("gender", "2");// <input type="radio" name="gender" value="2" checked> 女

    //清除性别选择
    fm.formValue("gender", undefined);
    /*
        <input type="radio" name="gender" value="1"> 男
        <input type="radio" name="gender" value="2"> 女
    */

    //设置爱好
    fm.formValue("hobby","2");
    /*
        <label>
            <input type="checkbox" name="hobby" value="1" checked> 电影
        </label>
        <label>
            <input type="checkbox" name="hobby" value="2" checked> 美食
        </label>
        <label>
            <input type="checkbox" name="hobby" value="3"> 武侠
        </label>
        <label>
            <input type="checkbox" name="hobby" value="4"> 历史
        </label>
    */

    //传递多个值
    fm.formValue("hobby",["3","4"]);
    /*
        <label>
            <input type="checkbox" name="hobby" value="1" checked> 电影
        </label>
        <label>
            <input type="checkbox" name="hobby" value="2" checked> 美食
        </label>
        <label>
            <input type="checkbox" name="hobby" value="3" checked> 武侠
        </label>
        <label>
            <input type="checkbox" name="hobby" value="4" checked> 历史
        </label>
    */

    //获取爱好值
    fm.formValue("hobby");// ["1","2","3","4"]

    //重置爱好表单，并选择其中一项
    fm.formValue("hobby",undefined).formValue("hobby","3");
    /*
        <label>
            <input type="checkbox" name="hobby" value="1"> 电影
        </label>
        <label>
            <input type="checkbox" name="hobby" value="2"> 美食
        </label>
        <label>
            <input type="checkbox" name="hobby" value="3" checked> 武侠
        </label>
        <label>
            <input type="checkbox" name="hobby" value="4"> 历史
        </label>
    */
});
```

fn.dataAttr
===
**获取或设置元素data-*属性**

`$(element).dataAttr([attr, value])`

- 不传递参数时，序列化第一个元素的data-*属性为一个object，object属性是元素的data-* key,object属性值是元素的data-* value，返回这个object
- 传递一个参数且类型不是object时，获取data-attr属性的值并返回
- 传递一个参数且类型时obejct时，设置元素的data-*属性值与object映射，返回jquery.fn
- 传递两个个参数时，设置data-arrt=value，返回jquery.fn

示例
---
```html
<div id="user" data-id="1" data-name="小明" data-github-address="https://github.com/imingyu">
    小明
</div>
```

```javascript
$(function(){
    var user=$("#user");

    //获取元素的所有data-*属性值，返回的object，默认做小驼峰处理
    user.dataAttr();// {id:"1", name:"小明", githubAddress:"https://github.com/imingyu" }

    //设置元素的所有data-*属性
    user.dataAttr({
        name:"小亮",
        id:"2"
    });// <div id="user" data-id="2" data-name="小亮" 

    //设置data-name属性的值
    user.dataAttr("name","小红");//<div id="user" data-id="1" data-name="小红" ...

    //获取data-name属性的值
    user.dataAttr("name");//小红
});
```

fn.attrs
===
**获取元素(如果fn包含多个元素，只返回第一个元素的)所有属性，并转化成一个object返回**

`$(element).attrs([transformCamel, linkChar])`

- 不传递参数时，序列化第一个元素的所有属性，并转化成一个object返回
- 传递transformCamel（boolean）参数时，如果值是`true`,则转化元素属性名称为小驼峰式
- 传递linkChar参数可指定转换驼峰时以哪个链接字符为分隔进行转换，如：`-`

示例
---
```html
<input id="email" type="email" data-user-id="1" value="mingyuhisoft@163.com">
```

```javascript
$(function(){
    $("#email").attrs();// { id:"email", type:"email", "data-user-id":"1", value:"mingyuhisoft@163.com" }
    $("#email").attrs(true,'-');// { id:"email", type:"email", dataUserId:"1", value:"mingyuhisoft@163.com" }
});
```


$.toLowerCamel
===
**转化字符串为小驼峰形式**

`$.toLowerCamel(str, linkChar)`

示例
---
```javascript
$(function(){
    $.toLowerCamel("border-top", "-");//borderTop
    $.toLowerCamel("border+top", "+");//borderTop
});
```

$.toUpperCamel
===
**转化字符串为大驼峰形式**

`$.toUpperCamel(str, linkChar)`

示例
---
```javascript
$(function(){
    $.toUpperCamel("border-top", "-");//BorderTop
    $.toUpperCamel("border+top", "+");//BorderTop
});
```

$.restoreCamel
===
**转化驼峰形式的字符串为原来的形式，需要传递链接字符进行还原**

`$.restoreCamel(camelStr, linkChar)`

示例
---
```javascript
$(function(){
    $.restoreCamel("borderTop", "-");//border-top
    $.restoreCamel("borderTop", "+");//border+top
});
```



更新记录
===
v0.1.0 (2016/12/19 17:00)
- fn.formValue
- fn.dataAttr
- fn.attrs
- $.toLowerCamel
- $.toUpperCamel
- $.restoreCamel
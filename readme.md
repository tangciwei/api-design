# api-design

>前端请求设计微型框架，抽象请求生命周期和配置，力求能适用于所有业务。


## 特点
1. api调用方便：业务中使用`api.name({}).then()`形式调用，api集中配置，可针对不同环境单独配置。
2. 集中错误处理：所有种类错误都进入errorHandle钩子函数，后端错误码也可以集中处理。
3. 自带本地mock: 无需另起服务，方便早起开发，mock函数同express。本地使用express服务的话可以使用同一份mock文件。
4. 自带登录处理功能
5. 自带loading功能和超时处理


## 使用
>详见example


第一步：配置

```js
let apiDesign = require('api-design');
let {api, event} = apiDesign(
    {
        hooks,
        config
    },
    {
        config: devConfig,
        mock
    }
);
```


apiDesign入参说明
- hooks: 生命周期钩子函数
- config: 线上配置对象
- config: 开发环境配置对象
- mock: 本地mock对象

第二步：使用

```js
api.apiName({key: 'val'}).then(data=>console.log(data);
```

针对需要登录的接口: 需要在登录成功时执行`event.notify('login', true)`



## todolist

* [ ] 脚手架，针对wx.request和fetch
* [ ] 文档
* [ ] 针对form-data处理
* [ ] 请求缓存优化
* [ ] 配置项检查
* [ ] 代理功能
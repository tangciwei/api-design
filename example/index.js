let apiDesign = require('../dist/api-design');
let hooks = require('./sdk/hooks');
let config = require('./sdk/config');
let devConfig = require('./sdk/dev-config');
let mock = require('./sdk/mock');

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
// 需要登录
api.test({
    key: 'aaaa'
}).then(res => {
    console.log('test api-响应', res);
}).catch(err => {
    console.log('test api-错误:', err);
});
// 不需要登录
api.test2({
    key: 'bbbb'
}, {
    silent: true
}).then(res => {
    console.log('test2 api-响应', res);
}).catch(err => {
    console.log('test2 api-错误:', err);
});

// 登录
setTimeout(() => {
    api
        .login()
        .then((data) => {
            event.notify('login', true);
        })
        .catch(err => {
            console.log('login api-错误:', err);
        });
}, 500);



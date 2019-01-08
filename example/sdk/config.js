// 线上配置
let code = require('./code');
module.exports = {
    host: 'https://api.com', // 线上
    method: 'post', // 全局
    dataType: 'json', // 全局
    timeout: 15 * 1000,
    silent: false,
    login: true,
    api: {
        test: {
            path: '/api/test'
            // host: '',
            // method: '',
            // dataType: '',
            // timeout: '',
            // silent: '',
            // login: false, // 会挂起，等待触发
        },
        test2: {
            path: '/api/test2',
            login: false
        },
        login: {
            path: '/api/login',
            login: false
        }
    },
    code
};

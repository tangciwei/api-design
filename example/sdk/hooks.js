

// 模拟请求
function mockRequest(options) {
    let {
        success,
        fail,
        ...rest
    } = options;
    setTimeout(() => {
        let res = {
            header: {},
            statusCode: 200,
            data: {
                code: 0,
                message: '',
                data: {
                    name: 'ok'
                }
            }
        };
        success(res);
    }, 1000);
}
const ERR_FRONT = 1; // 前端出错
const ERR_STATUS = 2; // 状态码错误
const ERR_BACK = 3; // 后端错误

module.exports = {
    // 请求前钩子
    // 可以做入参处理
    requestBefore({data, config}, ctx) {
        console.log(ctx.config.host + ctx.config.path, 'requestBefore----');
        // 
        let {
            host,
            path,
            method,
            dataType,
            timeout
        } = config;

        return {
            url: host + path,
            header: {
                'content-type': 'application/json'
            },
            method: 'POST',
            dataType,
            responseType: 'text',
            data
        };
    },
    // 【真正发请求的地方】必须实现
    // 注意封装返回格式
    request(inputOptions, ctx) {
        console.log(ctx.config.host + ctx.config.path, 'start request----');
        return new Promise((resolve, reject) => {
            mockRequest({
                ...inputOptions,
                success(res) {
                    let resData = res.data;
                    let status = res.statusCode || '';
                    status = status + '';

                    let {
                        code,
                        message = '',
                        data
                    } = resData;

                    if (['200', '304'].indexOf(status) === -1) {
                        reject({
                            type: ERR_STATUS,
                            message,
                            code: status,
                            data
                        });
                    }
                    else {
                        if (code == 0) {
                            resolve(data);
                        }
                        else {
                            reject({
                                type: ERR_BACK,
                                message,
                                code,
                                data
                            });
                        }
                    }
                },
                fail(e) {
                    reject({
                        type: ERR_FRONT,
                        message: 'request failed',
                        code: -1,
                        data: e
                    });
                }
            });
        });
    },
    // 无论成功失败均走这里；
    // 这里不会对参数进行改造，同步的
    requestAfter(ctx) {
        console.log(ctx.config.host + ctx.config.path, 'requestAfter----');
    },
    // 后端响应格式有效性检查；
    // 可以使用promise
    successHandle(data, ctx) {
        console.log(ctx.config.host + ctx.config.path, 'successHandle----');
        // 比方说格式不正确，依然可以抛错
        return data;
    },
    // 所有的错误处理
    errorHandle(err, configCode, ctx) {
        console.log(ctx.config.host + ctx.config.path, 'errorHandle----');
        // 比方说格式不正确，依然可以抛错
        if (err.type === ERR_BACK &&
            err.code === 21
        ) {
            console.log('重新登录');
        }
        else {
            if (err.type === ERR_BACK &&
                configCode[err.code]) {
                configCode[err.code](err);
            }
            else {
                try {
                    console.log('错误日志: ', JSON.stringify(err));
                }
                catch (e) {}

                console.log('错误提示： ', err.message);
            }
        }
    },
    // 超时处理
    // 需要实现错误封装返回
    // 必须实现
    timeoutHandle(requestInput, ctx) {
        console.log(ctx.config.host + ctx.config.path, 'timeoutHandle----');
        console.log('超时提示');
        return {
            type: ERR_FRONT,
            message: 'timeout',
            code: -2,
            data: {}
        };
    },
    // loading处理; 开始，结束
    loadingUi(onOff, ctx) {
        if (onOff) {
            console.log('loading');
        }
        else {
            console.log('hideLoading');
        }
    }
};

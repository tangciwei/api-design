module.exports = {
    test(req, res) {
        setTimeout(() => {
            res.send(
                JSON.stringify({
                    code: 0,
                    message: '',
                    data: [
                        {
                            departmentId: '12312312321312',
                            name: '部门0'
                        },
                        {
                            departmentId: '12312312321312',
                            name: '部门1'
                        }
                    ]
                })
            );
        }, 1500);
    },
    test2(req, res) {
        setTimeout(() => {
            res.send(
                JSON.stringify({
                    code: 0,
                    message: '',
                    data: {
                        name: 'test2'
                    }
                })
            );
        }, 1500);
    },
    login(req, res) {
        setTimeout(() => {
            res.send(
                JSON.stringify({
                    code: 0,
                    message: '',
                    data: {
                        name: 'login'
                    }
                })
            );
        }, 1500);
    }

};

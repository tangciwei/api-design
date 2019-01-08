const path = require('path');
module.exports = {
    // "mode": "development",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'api-design.js',
        libraryTarget: 'commonjs2' // 否则导出空对象
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    // devtool: 'source-map' // 这样才不会有eval
};
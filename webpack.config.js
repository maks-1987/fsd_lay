const { userInfo } = require('os');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: './index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // plugins: [
    //     new HTMLWebpackPlugin({
    //         template: './index.html'
    //     }),
    //     new CleanWebpackPlugin()
    // ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
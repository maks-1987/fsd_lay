const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { allowedNodeEnvironmentFlags } = require('process')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {}
    },
    devServer: {
        port: 4200
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        // new CopyWebpackPlugin([
        //     {
        //         from: path.resolve(__dirname, 'src/favicon.ico'),
        //         to: path.resolve(__dirname, 'dist')
        //     }
        // ]),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        },
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
        ],
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all'
    //     }
    // }
}
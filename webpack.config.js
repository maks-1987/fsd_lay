const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { allowedNodeEnvironmentFlags } = require('process')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlug = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlug = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlug(),
            new TerserWebpackPlug()
        ]
    }
    return config
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './js/index.js',
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {}
    },
    devServer: {
        // host: '192.168.0.1',
        port: 8080,
    },
    optimization: optimization(),

    plugins: [
        new HtmlWebpackPlugin({
            template: './pug/pages/index.pug',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'register.[contenthash].html',
            template: './pug/pages/register.pug',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
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
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {
                    pretty: isDev,
                },
            },
            {
                test: /\.css$/,
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
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        },
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|otf|eot|svg)$/,
                use: ['file-loader']
            },
        ],
    },

}
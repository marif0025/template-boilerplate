const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const path = require('path')
const Webpack = require('webpack');

module.exports = ({ mode }) => ({
    mode: mode,
    entry: './src/ts',
    output: {
        filename: "js/script.js",
        path: path.resolve(__dirname, 'public/assets')
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devtool: mode === 'production' ? false : "source-map",
    target: mode === 'production' ? "browserslist" : "web",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: /\.(s[ac]|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-sprite-loader',
                options: {}
            }
        ]
    },
    devServer: {
        open: true,
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
        writeToDisk: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/style.css"
        }),
        new Webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new SpriteLoaderPlugin({
            plainSprite: true
        })
    ],
    performance: {
        hints: false
    }
})
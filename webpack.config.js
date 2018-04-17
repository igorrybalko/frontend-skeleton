//webpack.config.js
'use strict';

const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./src/ts/index.ts",
    output: {
        path: path.resolve(__dirname, './js'),
        filename: "app.min.js"
    },
    mode: 'production',
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    //devtool: 'source-map',
    optimization: {
        // splitChunks: {
        //     chunks: "all"
        // },
        minimize: true
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new UglifyJsPlugin({
             uglifyOptions:{
                compress: {
                    warnings: false
                },
                output: {
                    comments: false
                },
                sourceMap: true
            }
        })
    ]
}
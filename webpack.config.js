//webpack.config.js
'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: "./src/ts/index.ts",
    output: {
        path: path.resolve(__dirname, './js'),
        filename: "app.min.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    //devtool: 'source-map',
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "ts-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     },
        //     sourceMap: true
        // })
    ]
}
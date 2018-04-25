//webpack.config.js
'use strict';

const path = require('path'),
    webpack = require('webpack'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    production = ( process.env.NODE_ENV == 'production' );

module.exports = {
    entry: "./src/ts/index.ts",
    output: {
        path: path.resolve(__dirname, './build/js'),
        filename: "app.min.js"
    },
    mode: process.env.NODE_ENV,
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    //devtool: 'source-map',
    optimization: {
        minimize: production
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
                compress: production ? {warnings: false} : false,
                output: {
                    comments: !production
                },
                sourceMap: production
            }
        })
    ]
}
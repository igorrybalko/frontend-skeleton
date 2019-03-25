//webpack.config.js
'use strict';

const path = require('path'),
    webpack = require('webpack'),
    TerserPlugin = require('terser-webpack-plugin'),
    production = ( process.env.NODE_ENV == 'production' );

module.exports = {
    entry: "./src/ts/index.ts",
    output: {
        path: path.resolve(__dirname, './dist/js'),
        filename: "[name].min.js"
    },
    mode: process.env.NODE_ENV,
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    devtool: 'source-map',
    optimization: {
        minimize: production,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    ecma: 5,
                    compress: production,
                    output: {
                        comments: !production
                    },
                },
            })
        ]
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
        })
    ]
}
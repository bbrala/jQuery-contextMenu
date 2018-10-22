const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageJson = require('./package');
const banner = `
/**
jQuery contextMenu v${packageJson.version} - Plugin for simple contextMenu handling

Version: v${packageJson.version}

Authors: Björn Brala (SWIS.nl), Rodney Rehm, Addy Osmani (patches for FF)

Web: http://swisnl.github.io/jQuery-contextMenu/

Copyright (c) 2011-${(new Date()).getFullYear()} SWIS BV and contributors

Licensed under
  MIT License http://www.opensource.org/licenses/mit-license

Date: ${(new Date()).toISOString()}
**/
`;

module.exports = {
    entry: {
        'jquery.contextMenu': './src/js/jquery.contextmenu.js',
        'contextmenu': './src/js/contextmenu.js'
    },
    devtool: '#source-map',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].min.js',
        library: 'ContextMenu',
        libraryTarget: 'var'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },
                {
                    loader: 'expose-loader',
                    options: '$'
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                sourceMap: true
                            }
                        }, {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true
                            }
                        }, {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    fallback: 'style-loader'
                }),
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        // new webpack.BannerPlugin({
        //     banner: banner, // the banner as string, it will be wrapped in a comment
        //     raw: true, // if true, banner will not be wrapped in a comment
        //     entryOnly: true // if true, the banner will only be added to the entry chunks
        // }),
        new ExtractTextPlugin({
            filename: '[name].min.css'
        }),
        new OptimizeCssAssetsPlugin({
            // IMPORTANT: only minify asset ends with .min.css
            assetNameRegExp: /\.min\.css$/g
        }),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new UglifyJsPlugin({
            sourceMap: true
        }),
        new UnminifiedWebpackPlugin()
    ],
    externals: {
        'jquery': 'jQuery'
    }
};

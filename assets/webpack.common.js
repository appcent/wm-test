const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './js/app.js'
    },
    output: {
        path: path.resolve(__dirname, '../public/js'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$|\.js$/,
                exclude: /node_modules/,
                loaders: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
};

var path = require('path');
var ModuleFlavourPlugin = require('../lib/Plugin');

var basicConfig = {
    entry: './entry-point.js',
    context: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[flavour].js'
    },
    module: {
        loaders: [
            {test: /\.styl/, loaders: [
                'style',
                'css',
                'stylus'
            ]}
        ]
    },
    plugins: [
        new ModuleFlavourPlugin()
    ]
};

var ConfA = Object.assign({}, basicConfig, {
    flavour: 'mobile'
});
var ConfB = Object.assign({}, basicConfig, {
    flavour: 'desktop'
});

module.exports = [ConfA, ConfB];

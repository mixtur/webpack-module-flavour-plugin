Webpack plugin that can at compile time decide which one of multiple flavours of required modules to use.

## What is it

It is a plugin for webpack's resolver. It allows you to specify multiple flavours of same module.
Then when you require it, only flavour specified in your webpack config will be picked.

- works with loaders
- works with `node_modules` or `web_modules` or whatever
- doesn't work with contexts 

## Example

Let's say you want to require one of two flavours of popup component on mobile and desktop versions of your web application.

You'll have to do three things to achieve that.

First: name flavoured modules by the following scheme `<module-name>.<flavour>.<extension>`

```

    /root
     |-/flavoured-popup
     |  |-popup.mobile.js
     |  |-popup.desktop.js
     |-common-module.js

```

Second: configure webpack using array of configurations.

You'll have to specify different flavour for each configuration.

Also you'll be able to use `"[flavour]"` in `output.filename`


```javascript

var path = require('path');
var ModuleFlavourPlugin = require('webpack-module-flavour-plugin');

var commonConfig = {
    entry: './entry-point.js',
    context: path.join(__dirname, 'src'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[flavour].js'
    },
    plugins: [
        new ModuleFlavourPlugin()
    ]
};

var MobileConfig = Object.assign({}, commonConfig, {
    flavour: 'mobile'
});
var DesktopConfig = Object.assign({}, commonConfig, {
    flavour: 'desktop'
});

module.exports = [MobileConfig, DesktopConfig];

```

Third: require it by `<module-name>`:

```javascript

    var Popup = require('./flavoured-popup/popup');

``` 

Voila!



There is nothing else to say, really...

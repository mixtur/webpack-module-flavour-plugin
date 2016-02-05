var path = require('path');

function ModuleFlavourPlugin() {
}

ModuleFlavourPlugin.prototype.apply = function (compiler) {
    var flavour = compiler.options.flavour;

    compiler.plugin('after-compile', function (compilation, callback) {
        compilation.assets = Object
            .keys(compilation.assets)
            .reduce(function (acc, filename) {
                var newFileName = filename.replace('[flavour]', flavour);
                acc[newFileName] = compilation.assets[filename];
                return acc;
            }, {});

        callback();
    });

    compiler.resolvers.normal.plugin('file', function (request, callback) {
        var parsed = path.parse(request.request);
        var flavouredName = parsed.name + '.' + flavour + (parsed.ext || '.js');
        var fullFlavouredPath = path.resolve(request.path, parsed.dir, flavouredName);

        this.fileSystem.stat(fullFlavouredPath, function (err) {
            if (err) {
                callback();
            } else {
                callback(null, {
                    path: fullFlavouredPath,
                    query: request.query,
                    file: true,
                    resolved: true
                });
            }
        });
    });
};

module.exports = ModuleFlavourPlugin;

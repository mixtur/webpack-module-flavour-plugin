var path = require('path');

function ModuleFlavourPlugin(options) {
  this.flavour = options.flavour;
}
ModuleFlavourPlugin.prototype.apply = function(compiler) {
  var flavour = this.flavour

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

  compiler.plugin('compilation', function (compilation) {
    compilation.resolvers.normal.plugin('before-file', function (context, callback) {
      var parsed = path.parse(context.path);
      var flavouredName = parsed.name + '.' + flavour + (parsed.ext || '.js');
      var fullFlavouredPath = path.resolve(context.path, parsed.dir, flavouredName);

      this.fileSystem.stat(fullFlavouredPath, function (err) {
        if (err) {
          callback();
        } else {
          callback(null, {
            path: fullFlavouredPath,
            query: context.query,
            file: true,
            resolved: true
          });
        }
      });
    });
  });
}

module.exports = ModuleFlavourPlugin;

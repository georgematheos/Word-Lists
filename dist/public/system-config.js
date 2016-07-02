// immediatly run this function when the file is called
// code is self contained within the function to avoid namespace conflicts
(function (global) {
    // tell systemjs where to find things
    var map = {
        'app': '/app',
        '@angular': '/node_modules/@angular',
        'rxjs': '/node_modules/rxjs'
    };
    // tell systemjs the default extension and entry points for certain packages
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' }
    };
    // the list of package names used by angular (I got this list from the quickstart guide at http://angular.io)
    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'forms',
        'http',
        'platform-browser',
        'platform-browser-dynamic',
        'router',
        'router-deprecated',
        'upgrade',
    ];
    // add to each angular package to the packages list
    ngPackageNames.forEach(function (pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    });
    // create the config object
    var config = {
        map: map,
        packages: packages
    };
    System.config(config);
})(this);
// TODO: FIX THE ERRORS IN THE TYPESCRIPT COMPILER
//# sourceMappingURL=system-config.js.map
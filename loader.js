/**
 * Load all needed data here. Chain order is very important!
 */

// Verifies if has any full loading
if (appConfig.back['full']) {

    if (!appConfig.back['domainClasses']) appConfig.back['domainClasses'] = [];
    if (!appConfig.back['controllers']) appConfig.back['controllers'] = [];
    if (!appConfig.back['services']) appConfig.back['services'] = [];
    if (!appConfig.back['views']) appConfig.back['views'] = [];

    appConfig.back.full.forEach(function(conf) {
        appConfig.back.domainClasses.push(conf);
        appConfig.back.controllers.push(conf);
        appConfig.back.services.push(conf);
        appConfig.back.views.push(conf);
    });
}

// Then load all things
with (Base.autoMerge(appConfig.front, appConfig.back, appConfig.conf)) {
    // Load project dependencies
    progressiveLoad(dependencies, loadScript, function() {
        // Inject 'classLoader'
        container['classLoader'] = new container[classLoader]();

        // Inject 'database' access
        container['dataPool'] = new container[dataPool]();

        // Inject 'pages' manager
        // TODO: create a page loader
        container['pages'] = new Object();

        // Load back-end files
        progressiveLoad(domainClasses, loadDomain, function() {
            progressiveLoad(services, loadService, function() {
                progressiveLoad(controllers, loadController, function() {

                    // Map the classes to 'database'
                    progressiveLoad(['dataMappings.js'], loadScript, function() {
                        // If bootstrap data is set on
                        if (bootstrap) {
                            progressiveLoad(['bootstrap.js'], loadScript);
                        }
                    });

                    // Load front-end files
                    progressiveLoad(externalScripts, loadScript, function() {
                        progressiveLoad(scripts, loadScriptAsset, function() {
                            progressiveLoad(externalStyles, loadStyle, function() {
                                progressiveLoad(styles, loadStyleAsset, function() {
                                    progressiveLoad(views, loadView, function() {
                                        // Run main script
                                        progressiveLoad(['main.js'], loadScript);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
}

/**
 * Load all needed data here. Chain order is very important!
 */

with (appConfig) {
    // verify nullities
    if (!back['domainClasses']) back['domainClasses'] = [];
    if (!back['controllers']) back['controllers'] = [];
    if (!back['services']) back['services'] = [];
    if (!back['views']) back['views'] = [];

    if (!front['externalScripts']) front['externalScripts'] = [];
    if (!front['externalStyles']) front['externalStyles'] = [];
    if (!front['scripts']) front['scripts'] = [];
    if (!front['styles']) front['styles'] = [];

    if (!conf['dependencies']) conf['dependencies'] = [];
    

    // Verifies if has any full loading
    if (back['full']) {
        back.full.forEach(function(conf) {
            back.domainClasses.push(conf);
            back.controllers.push(conf);
            back.services.push(conf);
            back.views.push(conf);
        });
    }
    
    // if no container, it will be the window
    if (!conf.container) conf.container = window;
}

// Then load all things
with (Base.autoMerge(appConfig.front, appConfig.back, appConfig.conf)) {
    // Load bwf domain files
    if (bwfDomain) {
        progressiveLoad(bwfDomains, loadBwfDomain);
    }

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
                    // TODO: change how to make this
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

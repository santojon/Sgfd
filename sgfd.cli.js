Sgfd = {};
/**
 * Client used to create / generate files in Sgfd structure
 */
Sgfd.Cli = {
    /**
     * Templates os Files to generate
     */
    templates: {
        /**
         * Configuration file template generator
         * 
         * -- Identation is very important! Don't change it! --
         */
        conf: function(name) {
            return 'var appConfig = {\n\
    front: {},\n\
    back: {},\n\
    conf: {\n\
        appName: \'' + name + '\',\n\
        dependencies: [\n\
            // Your needed libs locations\n\
        ],\n\
        bootstrap: false\n\
    }\n\
};';
        },
        /**
         * TODO: dataMappings script template
         */
        dataMappings: '// The mappings to database goes here',
        /**
         * TODO: main script template
         */
        main: '// First script to run when app is fully loaded\n\
document.body.innerHTML = \'Hello world!\';',
        /**
         * Index page template
         * 
         * -- Identation is very important! Don't change it! --
         */
        index: function(sgfdPath) {
            return '<!DOCTYPE html>\n\
<html lang="en">\n\
    <head>\n\
        <meta charset="UTF-8">\n\
    </head>\n\
    <body>\n\
        <script type="text/javascript" src="' + sgfdPath + '"></script>\n\
        <script type="text/javascript">\n\
            // Loads all needed things to run app. It need \'sgfd.js\' loaded to work\n\
            new Sgfd(\'conf.js\').load();\n\
        </script>\n\
    </body>\n\
</html>';
        },
        /**
         * View file template generator
         * 
         * -- Identation is very important! Don't change it! --
         */
        view: function(name) {
            name = name.charAt(0).toUpperCase() + name.substring(1);
            return 'pages.' + name + ' = function(params) {\n\
    with (Sgfd.Base) {\n\
        // Put this file in \'views\' diretory\n\
    };\n\
};';
        },
        /**
         * Controller file template generator
         * 
         * -- Identation is very important! Don't change it! --
         */
        controller: function(name) {
            name = name.charAt(0).toUpperCase() + name.substring(1);
            return 'with (Sgfd.Base) {\n\
    var ' + name + 'Controller = new Sgfd.Controller({\n\
        metaName: \'' + name + 'Controller\',\n\
        index: function() {\n\
            // A function to be used in views etc\n\
            // Put it into \'controllers\' folder of your app\n\
        }\n\
    });\n\
};';
        },
        /**
         * Service file template generator
         * 
         * -- Identation is very important! Don't change it! --
         */
        service: function(name) {
            name = name.charAt(0).toUpperCase() + name.substring(1);
            return 'with (Sgfd.Base) {\n\
    var ' + name + 'Service = new Sgfd.Service({\n\
        metaName: \'' + name + 'Service\',\n\
        index: function() {\n\
            // A function to be used in controllers etc\n\
            // Put it into \'services\' folder of your app\n\
        }\n\
    });\n\
};';
        },
        /**
         * Bridge file template generator
         * 
         * -- Identation is very important! Don't change it! --
         */
        bridge: function(name) {
            name = name.charAt(0).toUpperCase() + name.substring(1);
            return 'with (Sgfd.Base) {\n\
    var ' + name + 'Bridge = new Sgfd.Bridge({\n\
        metaName: \'' + name + 'Bridge\',\n\
        index: function() {\n\
            // A function to be used in services etc\n\
            // Put it into \'data/bridges\' folder of your app\n\
        }\n\
    });\n\
};';
        }
    },
    /**
     * Util functions
     */
    utils: {
        /**
         * Load file from an url and returns a string with its content
         * @param url: the url to fetch data.
         * @param fn: function to modify the result.
         */
        requireFile: function(url, fn) {
            var xhr;
            if(window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if(window.ActiveXObject) {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } else {
                return false;
            }
            xhr.open('GET', url, false);
            if(xhr.overrideMimeType) {
                xhr.overrideMimeType('text/plain');
            }
            xhr.send(null);
            if(xhr.status == 200) {
                if (fn) {
                    return fn(xhr.responseText);
                } else {
                    return xhr.responseText;
                }
            }
            return false;
        }
    },
    /**
     * Generate view file and starts download of it
     */
    generateView: function(name) {
        var b = document.createElement('a');
        b.download = name + '.js';
        b.href = 'data:application/javascript;charset=utf-8,' +
            encodeURIComponent(Sgfd.Cli.templates.view(name));
        b.click();
    },
    /**
     * Generate controler file and starts download of it
     */
    generateController: function(name) {
        var b = document.createElement('a');
        b.download = name + 'controller.js';
        b.href = 'data:application/javascript;charset=utf-8,' +
            encodeURIComponent(Sgfd.Cli.templates.controller(name));
        b.click();
    },
    /**
     * Generate service file and starts download of it
     */
    generateService: function(name) {
        var b = document.createElement('a');
        b.download = name + 'service.js';
        b.href = 'data:application/javascript;charset=utf-8,' +
            encodeURIComponent(Sgfd.Cli.templates.service(name));
        b.click();
    },
    /**
     * Generate bridge file and starts download of it
     */
    generateBridge: function(name) {
        var b = document.createElement('a');
        b.download = name + 'bridge.js';
        b.href = 'data:application/javascript;charset=utf-8,' +
            encodeURIComponent(Sgfd.Cli.templates.bridge(name));
        b.click();
    },
    /**
     * Generate a file and starts download of it
     */
    generateFile: function(name, type, mime, templateFn, params) {
        var f = params ? templateFn(params) : templateFn;
        var b = document.createElement('a');
        b.download = name + '.' + type;
        b.href = 'data:' + mime + ';charset=utf-8,' +
            encodeURIComponent(f);
        b.click();
    },
    /**
     * Create view and add to config file of current application
     * This creates a view download and a cnew config file download
     * @param conf: conf file path
     * @param name: the view name
     */
    addView: function(conf, name) {
        // Generate files to save
        Sgfd.Cli.utils.requireFile(conf, function(v) {
            if (v.indexOf('views') != -1) {
                v = v.replace(/views: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                    return m.replace(/]/, ', \'' + name + '\']')
                        .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                });
            } else {
                v = v.replace(/back: {/, 'back: {\n\
    views: [\'' + name + '\'],\n\
').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
            }
            
            Sgfd.Cli.generateFile('conf', 'js', 'application/javascript', v);
        });
        
        Sgfd.Cli.generateView(name);
    },
    /**
     * Create controller and add to config file of current application
     * This creates a controller download and a cnew config file download
     * @param conf: conf file path
     * @param name: the controller name
     */
    addController: function(conf, name) {
        // Generate files to save
        Sgfd.Cli.utils.requireFile(conf, function(v) {
            if (v.indexOf('controllers') != -1) {
                v = v.replace(/controllers: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                    return m.replace(/]/, ', \'' + name + '\']')
                        .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                });
            } else {
                v = v.replace(/back: {/, 'back: {\n\
    controllers: [\'' + name + '\'],\n\
').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
            }
            
            Sgfd.Cli.generateFile('conf', 'js', 'application/javascript', v);
        });
        
        Sgfd.Cli.generateController(name);
    },
    /**
     * Create service and add to config file of current application
     * This creates a service download and a cnew config file download
     * @param conf: conf file path
     * @param name: the service name
     */
    addService: function(conf, name) {
        // Generate files to save
        Sgfd.Cli.utils.requireFile(conf, function(v) {
            if (v.indexOf('services') != -1) {
                v = v.replace(/services: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                    return m.replace(/]/, ', \'' + name + '\']')
                        .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                });
            } else {
                v = v.replace(/back: {/, 'back: {\n\
    services: [\'' + name + '\'],\n\
').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
            }

            Sgfd.Cli.generateFile('conf', 'js', 'application/javascript', v);
        });
        
        Sgfd.Cli.generateService(name);
    },
    /**
     * Create bridge and add to config file of current application
     * This creates a bridge download and a cnew config file download
     * @param conf: conf file path
     * @param name: the bridge name
     */
    addBridge: function(conf, name) {
        // Generate files to save
        Sgfd.Cli.utils.requireFile(conf, function(v) {
            if (v.indexOf('bridges') != -1) {
                v = v.replace(/bridges: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                    return m.replace(/]/, ', \'' + name + '\']')
                        .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                });
            } else {
                v = v.replace(/back: {/, 'back: {\n\
    bridges: [\'' + name + '\'],\n\
').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
            }

            Sgfd.Cli.generateFile('conf', 'js', 'application/javascript', v);
        });
        
        Sgfd.Cli.generateBridge(name);
    },
    /**
     * Generate a sample app with options (controllers, views etc) and download all the files
     */
    scafold: function(name, options, sgfdPath) {
        var c = Sgfd.Cli.templates.conf(name);
        if (options) {
            if (options['views']) {
                options.views.forEach(function(v) {
                    if (c.indexOf('views') != -1) {
                        c = c.replace(/views: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                            return m.replace(/]/, ', \'' + v + '\']')
                                .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                        });
                    } else {
                    c = c.replace(/back: {/, 'back: {\n\
        views: [\'' + v + '\'],\n\
    ').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                    }

                    Sgfd.Cli.generateView(v);
                });
            }
            if (options['controllers']) {
                options.controllers.forEach(function(v) {
                    if (c.indexOf('controllers') != -1) {
                        c = c.replace(/controllers: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                            return m.replace(/]/, ', \'' + v + '\']')
                                .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                        });
                    } else {
                    c = c.replace(/back: {/, 'back: {\n\
        controllers: [\'' + v + '\'],\n\
    ').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                    }
                    Sgfd.Cli.generateController(v);
                });
            }
            if (options['services']) {
                options.services.forEach(function(v) {
                    if (c.indexOf('services') != -1) {
                        c = c.replace(/services: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                            return m.replace(/]/, ', \'' + v + '\']')
                                .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                        });
                    } else {
                    c = c.replace(/back: {/, 'back: {\n\
        services: [\'' + v + '\'],\n\
    ').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                    }

                    Sgfd.Cli.generateService(v);
                });
            }
            if (options['bridges']) {
                options.bridges.forEach(function(v) {
                    if (c.indexOf('bridges') != -1) {
                        c = c.replace(/bridges: \[[\n\ \'\"\,a-zA-Z0-9_-]*\]/, function(m) {
                            return m.replace(/]/, ', \'' + v + '\']')
                                .replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                        });
                    } else {
                    c = c.replace(/back: {/, 'back: {\n\
        bridges: [\'' + v + '\'],\n\
    ').replace(/\n[\ ]*\n/, '\n').replace(/,\n[\ ]*}/, function(m) { return m.substring(1); });
                    }

                    Sgfd.Cli.generateBridge(v);
                });
            }
        }

        with (Sgfd.Cli) {
            generateFile('conf', 'js', 'application/javascript', c);
            generateFile('index', 'html', 'text/html', templates.index, sgfdPath || '{{ Sgfd location goes here! }}');
            generateFile('dataMappings', 'js', 'application/javascript', templates.dataMappings);
            generateFile('main', 'js', 'application/javascript', templates.main);
        }
    },
    /**
     * Generate a sample app and download all the files
     */
    init: function(name, sgfdPath) {
        with (Sgfd.Cli) {
            generateFile('conf', 'js', 'application/javascript', templates.conf, name);
            generateFile('index', 'html', 'text/html', templates.index, sgfdPath || '{{ Sgfd location goes here! }}');
            generateFile('dataMappings', 'js', 'application/javascript', templates.dataMappings);
            generateFile('main', 'js', 'application/javascript', templates.main);
        }
    }
};
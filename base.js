var Base = {
    /**
     * Function responsible to load an Array of files in chain
     * @param lst: the array of files
     * @param func: the load function to be used
     * @param callback: an optional callback to run in the end of the chain
     */
    progressiveLoad: function(lst, func, callback) {
        if (lst instanceof Array) {
            if (lst.length > 1) {
                func(lst[0], function(){
                    lst.shift();
                    Base.progressiveLoad(lst, func, callback);
                });
            } else if (lst.length === 1) {
                func(lst[0], callback || function(){});
            } else {
                callback();
            }
        } else {
            if (callback) {
                callback();
            }
        }
    },
    /**
     * Function responsible to fetch a custom file
     */
    loadCustomFile: function(url, type, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/x-' + type;
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },
    /**
     * Function responsible to fetch custom files
     */
    loadCustomFiles: function(urls, type, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/x-' + type;
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //script.onreadystatechange = callback;
                script.onload = callback;
            }

            // Fire the loading
            head.appendChild(script);
        });
    },
    /**
     * Function responsible to fetch scripts
     */
    loadScript: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },
    /**
     * Function responsible to fetch asset scripts
     */
    loadScriptAsset: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'assets/js/' + url + '.js';

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },
    /**
     * Function responsible to fetch asset scripts
     */
    loadScriptAssets: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'assets/js/' + url + '.js';

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //style.onreadystatechange = callback;
                script.onload = callback;
            }

            // Fire the loading
            head.appendChild(script);
        });
    },
    /**
     * Function responsible to fetch scripts
     */
    loadScripts: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //script.onreadystatechange = callback;
                script.onload = callback;
            }

            // Fire the loading
            head.appendChild(script);
        });
    },
    /**
     * Function responsible to fetch service scripts
     */
    loadService: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'services/' + url + 'service.js';

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },
    /**
     * Function responsible to fetch service scripts
     */
    loadServices: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'services/' + url + 'service.js';

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //script.onreadystatechange = callback;
                script.onload = callback;
            }

            // Fire the loading
            head.appendChild(script);
        });
    },
    /**
     * Function responsible to fetch controller scripts
     */
    loadController: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'controllers/' + url + 'controller.js';

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },
    /**
     * Function responsible to fetch controller scripts
     */
    loadControllers: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'controllers/' + url + 'controller.js';

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //script.onreadystatechange = callback;
                script.onload = callback;
            }

            // Fire the loading
            head.appendChild(script);
        });
    },
    /**
     * Function responsible to fetch view scripts
     */
    loadView: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'views/' + url + '.js';

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },
    /**
     * Function responsible to fetch view scripts
     */
    loadViews: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'views/' + url + '.js';

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //script.onreadystatechange = callback;
                script.onload = callback;
            }

            // Fire the loading
            head.appendChild(script);
        });
    },
    /**
     * Function responsible to fetch domain scripts
     */
    loadDomain: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'domain/' + url + '.js';

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //script.onreadystatechange = callback;
        script.onload = callback;

        // Fire the loading
        head.appendChild(script);
    },
    /**
     * Function responsible to fetch domain scripts
     */
    loadDomains: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'domain/' + url + '.js';

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //script.onreadystatechange = callback;
                script.onload = callback;
            }

            // Fire the loading
            head.appendChild(script);
        });
    },
    /**
     * Function responsible to fetch stylesheets
     */
    loadStyle: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = url;

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //style.onreadystatechange = callback;
        style.onload = callback;

        // Fire the loading
        head.appendChild(style);
    },
    /**
     * Function responsible to fetch stylesheets
     */
    loadStyles: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('link');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = url;

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //style.onreadystatechange = callback;
                style.onload = callback;
            }

            // Fire the loading
            head.appendChild(style);
        });
    },
    /**
     * Function responsible to fetch asset stylesheets
     */
    loadStyleAsset: function(url, callback) {
        // Adding the script tag to the head as suggested before
        var head = document.getElementsByTagName('head')[0];
        var style = document.createElement('link');
        style.rel = 'stylesheet';
        style.type = 'text/css';
        style.href = 'assets/css/' + url + '.css';

        // Then bind the event to the callback function.
        // There are several events for cross browser compatibility.
        //style.onreadystatechange = callback;
        style.onload = callback;

        // Fire the loading
        head.appendChild(style);
    },
    /**
     * Function responsible to fetch asset stylesheets
     */
    loadStyleAssets: function(urls, callback) {
        urls.forEach(function(url, i) {
            // Adding the script tag to the head as suggested before
            var head = document.getElementsByTagName('head')[0];
            var style = document.createElement('link');
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = 'assets/css/' + url + '.css';

            // Then bind the event to the callback function.
            // There are several events for cross browser compatibility.
            if (i === (urls.length - 1)) {
                //style.onreadystatechange = callback;
                style.onload = callback;
            }

            // Fire the loading
            head.appendChild(style);
        });
    },
    /**
     * Used to merge many objects into a single one
     */
    merge: function() {
        var args = Array.prototype.slice.call(arguments);
        var result = {};

        var merge_options = function(obj1, obj3){
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            return obj3;
        };

        args.forEach(function(argument) {
            result = merge_options(argument, result);
        });

        return result;
    },
    /**
     * Used to merge many objects into a single one adding self
     */
    autoMerge: function() {
        var args = Array.prototype.slice.call(arguments);
        var result = {};

        var merge_options = function(obj1, obj3){
            for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
            return obj3;
        };

        args.forEach(function(argument) {
            result = merge_options(argument, result);
        });

        return merge_options(Base, result);
    }
};

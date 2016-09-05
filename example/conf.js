/**
 * App configuration
 *
 * @param front: the front-end dependencies {
 *      @param styles: local style files (src/assets/css)
 *      @param scripts: local javascript files (src/assets/js)
 *      @param externalStyles: external style files
 *      @param externalScripts: external javascript files
 * }
 * @param back: the back-end dependencies {
 *      @param domainClasses: list of names of the domain classes to be loaded
 *      @param bwfDomains: list of names of the bwf domain classes to be loaded
 *      @param controllers: list of names of the controllers to be loaded (same as domain name)
 *      @param services: list of names of the services to be loaded (same as domain name)
 *      @param views: the name of application views (same as domain name)
 *      @param full: list of names of the domain classes, services, controllers and views to be loaded, full stack (one per domain)
 * }
 * @param conf: entire project dependencies and configuration {
 *      @param container: the app container (default is window)
 *      @param appName: the name of the application
 *      @param dependencies: project dependencies (libraries)
 *      @param dataPool: database related class name
 *      @param classLoader: classloader class name
 *      @param bwfDomain: set to 'true' to use bwf domain files
 *      @param bootstrap: set to 'true' to use 'bootstrap.js' file to setup data
 * }
 *
 *
 * PS: all list parametes have to be given in the needed order
 *     to be loaded correctly
 */
var appConfig = {
    front: {},
    back: {
        bwfDomains: []
    },
    conf: {
        appName: '',
        dependencies: [
            // libs locations
        ],
        dataPool: '',
        classLoader: '',
        bwfDomain: false,
        bootstrap: false
    }
};

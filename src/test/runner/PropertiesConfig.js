"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.PropertiesConfig = void 0;
var Optional_1 = require("../../main/globals/Optional");
var Reporter_1 = require("../../main/reporter/Reporter");
var CucumberOptions = /** @class */ (function () {
    function CucumberOptions(parent) {
        this.options = { require: [] };
        this.parent = parent;
        this.parent.withFrameWork('custom');
        this.strict(false);
    }
    CucumberOptions.prototype.strict = function (status) {
        this.options.strict = Optional_1.Optional.of(status).orElse(false);
        return this;
    };
    CucumberOptions.prototype.protractorCucumberFrameworkPath = function (path) {
        this.parent.withFrameWorkPath(path);
        return this;
    };
    CucumberOptions.prototype.tags = function (tags) {
        this.options.strict = Optional_1.Optional.of(tags).orElse("");
        return this;
    };
    CucumberOptions.prototype.features = function () {
        var features = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            features[_i] = arguments[_i];
        }
        this.parent.withFeatures.apply(this.parent, features);
        return this;
    };
    CucumberOptions.prototype.glue = function (stepsDefinitions, pageObjectPattern) {
        this.options.require.push(stepsDefinitions);
        this.options.require.push(pageObjectPattern);
        return this;
    };
    CucumberOptions.prototype.format = function (format) {
        this.options.format = format;
        return this;
    };
    CucumberOptions.prototype.config = function () { return this.parent; };
    return CucumberOptions;
}());
var PropertiesConfig = /** @class */ (function () {
    /**
     *
     */
    function PropertiesConfig(data) {
        this.data = data;
    }
    /**
     *
     */
    PropertiesConfig.prototype.get = function () {
        return this.data;
    };
    /**
     *
     */
    PropertiesConfig.options = function () {
        return new PropertiesConfig.PropertiesOptions();
    };
    /***
     *
     * @type {{new(): PropertiesOptions; prototype: PropertiesOptions}}
     */
    PropertiesConfig.PropertiesOptions = /** @class */ (function () {
        function PropertiesOptions() {
            this.options = {
                seleniumAddress: null, framework: null, frameworkPath: null, cucumberOpts: {}, specs: [], params: {},
                getPageTimeout: 60000,
                allScriptsTimeout: 500000,
                capabilities: {
                    'browserName': 'chrome'
                },
                onComplete: function () { return Reporter_1.Reporter.generateCucumberReporter(); }
            };
        }
        PropertiesOptions.prototype.withCucumberOptions = function () {
            var slf = this;
            this.options.cucumberOpts = { require: [] };
            return new /** @class */ (function (_super) {
                __extends(class_1, _super);
                function class_1() {
                    return _super.call(this, slf) || this;
                }
                // @override
                class_1.prototype.strict = function (status) {
                    slf.options.cucumberOpts.strict = Optional_1.Optional.of(status).orElse(false);
                    return this;
                };
                // @override
                class_1.prototype.format = function (format) {
                    slf.options.cucumberOpts.format = [format, "json:../../../target/results.json"];
                    return this;
                };
                // @override
                class_1.prototype.tags = function (tags) {
                    slf.options.cucumberOpts.tags = Optional_1.Optional.of(tags).orElse("");
                    return this;
                };
                // @override
                class_1.prototype.glue = function (stepsDefinitions, pageObjectPattern) {
                    slf.options.cucumberOpts.require.push(stepsDefinitions);
                    slf.options.cucumberOpts.require.push(pageObjectPattern);
                    return this;
                };
                return class_1;
            }(CucumberOptions));
        };
        PropertiesOptions.prototype.withSeleniumAddress = function (url) {
            this.options.seleniumAddress = url;
            return this;
        };
        PropertiesOptions.prototype.withFrameWork = function (framework) {
            this.options.framework = framework;
            return this;
        };
        PropertiesOptions.prototype.withFeatures = function () {
            var _this = this;
            var features = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                features[_i] = arguments[_i];
            }
            Array.from(features).map(function (feature) { return _this.options.specs.push(feature); });
            return this;
        };
        PropertiesOptions.prototype.withFrameWorkPath = function (path) {
            this.options.frameworkPath = path;
            return this;
        };
        PropertiesOptions.prototype.widthBaseUrl = function (url) {
            this.options.baseUrl = url;
            return this;
        };
        PropertiesOptions.prototype.widthAngular = function (state) {
            //@ts-ignore
            this.options.params.angular = Optional_1.Optional.of(state).orElse(false);
            return this;
        };
        PropertiesOptions.prototype.withTS = function (tsconfig) {
            /* (<MapType<string, Func<void,void>>>this.options).onPrepare = ( )=>{
                 require('ts-node').register({
                     project: tsconfig
                 });
             };*/
            this.options.onPrepare = function onPrepare() {
                tsconfig.call(null);
            };
            return this;
        };
        PropertiesOptions.prototype.build = function () {
            return new PropertiesConfig(this.options);
        };
        return PropertiesOptions;
    }());
    return PropertiesConfig;
}());
exports.PropertiesConfig = PropertiesConfig;

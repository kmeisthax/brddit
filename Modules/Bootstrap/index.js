/*jslint node:true, es5:true*/
"use strict";

var Config = require("../Config");

function run() {
    var config;

    Config.parseJSON("config.json").then(function (cfgObject) {
        var bootstrapped_modules = [], i, theModule;

        config = cfgObject;

        for (i = 0; i < config.Bootstrap.core_modules.length; i += 1) {
            theModule = require("../" + config.Bootstrap.core_modules[i]);
            bootstrapped_modules[config.Bootstrap.core_modules[i]] = theModule.run(config, bootstrapped_modules);
        }
    });
}

module.exports.run = run;

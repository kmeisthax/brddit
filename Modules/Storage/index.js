/*jslint node:true, es5:true*/
"use strict";

var postgres = require("./postgres"),
    layers = [];

function run(config, modules) {
    var i, layerModule, shutUpJSLint = "__type";

    for (i = 0; i < config.Storage.layers.length; i += 1) {
        layerModule = require("./" + config.Storage.layers[i][shutUpJSLint]);
        layers.push(layerModule.setup_layer(config.Storage.layers[i]));
    }

    return layers;
}

module.exports.postgres = postgres;
module.exports.run = run;

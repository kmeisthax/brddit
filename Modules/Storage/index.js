/*jslint node:true, es5:true*/
"use strict";

var postgres = require("./postgres");

function run(config, modules) {
    var i, layerModule, layers = [], shutUpJSLint = "__type";

    for (i = 0; i < config.Storage.layers.length; i += 1) {
        layerModule = require("./" + config.Storage.layers[i][shutUpJSLint]);
        layers.push({
            "type": config.Storage.layers[i][shutUpJSLint],
            "layer": layerModule.setup_layer(config.Storage.layers[i])
        });
    }

    return layers;
}

module.exports.postgres = postgres;
module.exports.run = run;

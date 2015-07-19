/*jslint node:true, es5:true*/
"use strict";

var postgresLayer = require("./postgres");

function run(config, modules) {
    return {};
}

module.exports.postgres = postgresLayer;
module.exports.run = run;

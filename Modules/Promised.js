/*jslint node:true*/
"use strict";

var Promise = require("bluebird"),
    fs = require("fs");

module.exports.fs = {
    statAsync: Promise.promisify(fs.stat),
    openAsync: Promise.promisify(fs.open),
    readAsync: Promise.promisify(fs.read),
    closeAsync: Promise.promisify(fs.close)
};

/*jslint node:true, es5:true*/
"use strict";

var promised = require("../Promised"),
    Promise = require("bluebird");

/* Read and parse a JSON file.
 *
 * This function returns a promise which resolves to the data object that is
 * represented in the stated file. It rejects if the file does not exist,
 * cannot be opened, or is not valid JSON.
 */
function parseJSON(filename) {
    var stats, fd, buffer, obj;

    return new Promise(function (resolve, reject) {
        return promised.fs.statAsync(filename);
    }).then(function (stat) {
        stats = stat;
        buffer = new Buffer(stats.size);

        return promised.fs.openAsync(filename, 'r');
    }).then(function (newfd) {
        fd = newfd;

        return promised.fs.readAsync(fd, buffer, 0, stats.size, 0);
    }).then(function (bytesRead) {
        promised.fs.closeAsync(fd);

        return JSON.parseJSON(buffer.toString("utf-8"));
    }).catch(function (err) {
        if (fd !== undefined) {
            promised.fs.closeAsync(fd);
        }

        throw err;
    });
}

module.exports.parseJSON = parseJSON;

/*jslint node:true, es5:true*/
"use strict";

var express = require("express"),
    Promise = require("bluebird"),
    app = express(),
    server,
    listen_promise;

function run(config, modules) {
    var resolve, reject,
        serverArgs = [];

    listen_promise = new Promise(function (rsv, rej) {
        resolve = rsv;
    });

    if (config.Router.domain_socket !== undefined) {
        serverArgs.push(config.Router.domain_socket);
    } else {
        serverArgs.push(config.Router.port);

        if (config.Router.hostname !== undefined) {
            serverArgs.push(config.Router.hostname);
        }
    }

    if (config.Router.backlog !== undefined) {
        serverArgs.push(config.Router.backlog);
    }

    serverArgs.push(resolve);

    server = app.listen.apply(app, serverArgs);

    module.exports.server = server;
    module.exports.listen_promise = listen_promise;

    return {
        app: app,
        server: server,
        listen_promise: listen_promise
    };
}

module.exports.app = app;
module.exports.run = run;

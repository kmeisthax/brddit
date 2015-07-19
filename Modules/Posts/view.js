/*jslint node:true, es5:true*/
"use strict";

function view_handler(req, res, next) {
    res.send("All!");
    next();
}

module.exports.view_handler = view_handler;

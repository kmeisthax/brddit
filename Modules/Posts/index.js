/*jslint node:true, es5:true*/
"use strict";

var view = require("./view"),
    Router = require("../Router");

function Post() {
    this.title = "";
}

Post.FIELDS = ["title"];

function run(config, modules) {
    Router.app.get("/all", view.view_handler);
}

module.exports.Post = Post;
module.exports.run = run;

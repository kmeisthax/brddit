/*jslint node:true, es5:true*/
"use strict";

var squel = require("squel"),
    pg = require("pg-promise")(),
    postgresBuilder = squel.useFlavour("postgres");

/* Sets up the Postgres storage layer.
 *
 * Returns a PG-Promise database instance.
 */
function setup_layer(layer_config) {
    return pg(layer_config.connection);
}

module.exports.builder = postgresBuilder;
module.exports.setup_layer = setup_layer;

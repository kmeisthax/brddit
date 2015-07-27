/*jslint node:true, es5:true*/
"use strict";

var Promise = require("bluebird");

function InstallStatus() {
}

function Schema(schema_name) {
    this.schema_name = schema_name;
}

Schema.FIELDS = ["schema_name", "status", "version"];
Schema.PRIMARY_KEY = ["schema_name"];
Schema.SCHEMA_NAME = "public";
Schema.TABLE_NAME = "install_status";

/* Persist the Schema record in the INSTALL table.
 *
 * Returns a promise which resolves when all queries created by this function
 * have resolved. The promise will reject if any query fails.
 *
 * We don't use Postgres 9.5's UPSERT functionality since it doesn't exist yet
 * Instead we issue a DELETE and an INSERT on the same query.
 */
Schema.prototype.persist = function (layer, tx) {
    var Class = this.constructor,
        delq = layer.builder.delete()
            .from(Class.SCHEMA_NAME + "." + Class.TABLE_NAME, "is"),
        insq = layer.builder.insert()
            .into(Class.SCHEMA_NAME + "." + Class.TABLE_NAME, "is"),
        i,
        deldat,
        insdat,
        pg_del,
        pg_ins;

    for (i = 0; i < Class.PRIMARY_KEY.length; i += 1) {
        delq = delq.where(Class.PRIMARY_KEY[i] + " = ?", this[Class.PRIMARY_KEY[i]]);
    }

    for (i = 0; i < Class.FIELDS.length; i += 1) {
        insq = insq.set(Class.FIELDS[i], this[Class.FIELDS[i]]);
    }

    deldat = delq.toParam();
    insDat = insq.toParam();

    pg_del = tx.any(deldat.text, deldat.values);
    pg_ins = tx.any(insdat.text, insdat.values);

    return Promise.all([pg_del, pg_ins]);
};

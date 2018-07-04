'use strict';
let redis = require("redis");

exports.handler = (event, context, callback) => {
    let client = redis.createClient({host: process.env.redisHost});
    client.flushall(function(err, result) {
        client.quit();
        callback(null, "Success");
    });
};
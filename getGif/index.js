'use strict';
let redis = require("redis");

exports.handler = (event, context, callback) => {

    let client = redis.createClient({host: process.env.redisHost});

    client.get(event.key, function(err, result) {

        if(err != null){
            client.quit();
            callback(null, err);
        }
        let values = (result == null)? {gifs:[]}:JSON.parse(result);
        client.quit();
        callback(null, values);

    });
};
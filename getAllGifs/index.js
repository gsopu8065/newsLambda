'use strict';
let redis = require("async-redis");

exports.handler = (event, context, callback) => {

    let client = redis.createClient({host: process.env.redisHost});
    const getValue = async (key) => {
        const value = await client.get(key);
        return { "title": key,
            "gifs": JSON.parse(value).gifs
        };
    };

    let keysPromise =  client.keys('*');
    keysPromise.then(keys => {
        Promise.all(keys.map(key => getValue(key))).then(values => {
            client.quit();
            callback(null, {"data" :values});
        }).catch(e => {
            client.quit();
            callback(null, {"data" :[]});
        });
    });
};
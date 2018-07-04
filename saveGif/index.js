'use strict';
let redis = require("redis");

exports.handler = (event, context, callback) => {

    let client = redis.createClient({host: process.env.redisHost});
    let key = event.body.key;
    let value = event.body.value;
    client.get(key, function(err, result) {

        if(err != null){
            client.quit();
            callback(null, err);
        }

        let values = (result == null)? {gifs:[]}:JSON.parse(result);
        if(values.gifs.indexOf(value) === -1){
            values.gifs.push(value);
            client.set(key, JSON.stringify(values), 'EX', 48*60*60, function (err, reply){
                client.quit();
                if(err != null){
                    callback(null, err);
                }
                callback(null, 'Sucess');
            });
        }
        else{
            client.quit();
            callback(null, 'Sucess');
        }
    });
};
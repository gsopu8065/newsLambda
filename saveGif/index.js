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
        console.log(values.gifs.length);
        if(values.gifs.indexOf(event.value) === -1){
            values.gifs.push(event.value);
            client.set(event.key, JSON.stringify(values), function (err, reply){
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
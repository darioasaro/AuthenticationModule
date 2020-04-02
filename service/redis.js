"use strict";
const redis = require("redis");
//const client = redis.createClient();

exports.get = (key, cb) => {
  let client = redis.createClient();
  client.on("error", function(err) {
    return cb(err);
  });

  client.get(key, function(err, result) {
    client.quit();
    console.log("result function",result)
    return cb(err, result);
  });
};

exports.insert = (key, value, cb) => {
  let client = redis.createClient();

  client.on("connect", function() {
    console.log("connected");
  });
  client.on("error", function(err) {
    return cb(err);
  });

  client.set(key, value, function(err, result) {
    console.log("agregado", result);
    client.quit();
    return cb(err, result);
  });
};

exports.insertTtl = (key,value,ttl,cb)=>{
    let client = redis.createClient();
    client.on("connect", function() {
        console.log("connected");
      });
      client.on("error", function(err) {
        return cb(err);
      });
    
      client.set(key, value, function(err, result) {
        console.log("agregado", result);
        client.quit();
        
      });
      client.expire(key,ttl,(err,result)=>{
        client.quit();
        return cb(err, result);
      })
}
exports.delete = (key, cb) => {
  let client = redis.createClient();

  client.on("error", function(err) {
    return cb(err);
  });

  client.del(key, function(err, result) {
    client.quit();
    return cb(err, result);
  });
};
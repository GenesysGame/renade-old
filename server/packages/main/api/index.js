// HTTP client for Renade RP

const Client = require('node-rest-client').Client;
const client = new Client();

let host = "http://localhost:8002/"

function get(url, params, callback) {
    let fullURL = host + url + getQuery(params);
    var args = {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    client.get(fullURL, args, (data, response) => {
        console.log('GET: ' + fullURL + ': ' + response.statusCode);
        if (response.statusCode >= 300) {
            callback(null, data); // error
        } else {
            callback(data, null); // success
        }
    });
}

function post(url, params, callback) {
    let fullURL = host + url;
    var args = {
        data: params,
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
    };
    client.post(fullURL, args, (data, response) => {
        console.log('POST: ' + fullURL + ': ' + response.statusCode);
        if (response.statusCode >= 300) {
            callback(null, data); // error
        } else {
            callback(data, null); // success
        }
    });

    
}

function getQuery(data) {
    let keys = Object.keys(data);
    if (keys.length == 0) { return ""; }
    let args = keys.map((key) => {
        return key.toString() + "=" + data[key].toString();
    });
    return "?" + args.join("&");
}

module.exports = {
    get: get,
    post: post
};

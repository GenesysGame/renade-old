// HTTP client for Renade RP

const Client = require('node-rest-client').Client;
const client = new Client();

let host = "http://localhost:8002/"

function get(player, url, params, callback) {
    let fullURL = host + url + getQuery(params);
    var args = {
        headers: getHeaders(player)
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

function post(player, url, params, callback) {
    let fullURL = host + url;
    var args = {
        data: params,
        headers: getHeaders(player)
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

function put(player, url, params, callback) {
    let fullURL = host + url;
    var args = {
        data: params,
        headers: getHeaders(player)
    };
    client.put(fullURL, args, (data, response) => {
        console.log('PUT: ' + fullURL + ': ' + response.statusCode);
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

function getHeaders(player) {
    var headers = {};
    headers["Content-Type"] = "application/x-www-form-urlencoded";
    if (player) {
        headers["x-forwarded-for"] = player.ip;
        let model = player.data.model;
        if (model && model["X-Token"]) {
            headers["X-Token"] = model["X-Token"];
        }
    }
    return headers;
}

module.exports = {
    get: get,
    post: post,
    put: put
};

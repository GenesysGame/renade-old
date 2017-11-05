var anim = require('./anim');
module.exports = function (app) {
    app.get('/admin/animations/get', anim.get(response, request, totalPages));
};
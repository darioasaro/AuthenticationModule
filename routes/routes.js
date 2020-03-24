/**
 * @module routes
 * @desc -Module for export all endpoint routes
 */
module.exports = routes = app => {
    app.use("/api/auth", require('./authorization.js'));
};
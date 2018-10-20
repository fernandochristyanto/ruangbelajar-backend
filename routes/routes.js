const db = require('../model/index');

//IMPORT HANDLERS
const seedHandler = require('../handlers/seedHandler');
const userHandler = require('../handlers/userHandler')

module.exports.registerRoutes = function (app) {
    /**
     * Register your routes here
     * app.use(prefix, routes_arr)
     * app.use(prefix, middlewares_arr, routes_arr)
     */
    app.use('/api/seed',
        Route.routes([
            Route.post('/seedroles', seedHandler.seedRoles)
        ]));

    app.use('/api/user',
        Route.routes([
            Route.get('/user', userHandler.get)
        ]))

    
}

class Route {
    constructor() {

    }
}

Route.post = function (endpoint, handler) {
    return function (router) {
        router.post(endpoint, handler);
    }
}

Route.get = function (endpoint, handler) {
    return function (router) {
        router.get(endpoint, handler);
    }
}

Route.put = function (endpoint, handler) {
    return function (router) {
        router.put(endpoint, handler);
    }
}

Route.patch = function (endpoint, handler) {
    return function (router) {
        router.patch(endpoint, handler);
    }
}

Route.delete = function (endpoint, handler) {
    return function (router) {
        router.delete(endpoint, handler);
    }
}

/**
 * @param {*} methodHandlers -> Array filled with callbacks to be attached to router
 * e.g : 
 * [
 *  post(endpoint, handler),
 *  get(endpoint, handler)
 * ]    
 */
Route.routes = function (methodHandlers) {
    const express = require('express')
    const router = express.Router({
        mergeParams: true
    });
    methodHandlers.forEach((callback) => {
        callback(router);
    });
    return router;
}
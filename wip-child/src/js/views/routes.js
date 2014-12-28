'use strict';

var
    Router  = require('static-router'),
    // query   = require('query'),
    router  = new Router();

module.exports = function () {


    // router.route('', function(){
    //   require('../views/home');
    //   App.Views.home.init();
    // });

    router.route('*', function(){
        require('../features/common');
        App.Features.common.init();
    });


};
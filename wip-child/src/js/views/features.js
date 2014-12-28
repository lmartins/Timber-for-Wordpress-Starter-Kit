'use strict';

var
    _            = require('lodash'),
    query        = require('query');


App.Views.AllFeatures = {
    // this is your root DOM element for your module, a module doesn't have to be connected to the DOM, but if it is,
    // then it should control one element and everything inside it
    // el: ".view-Home",

    // this is your init function, this runs when the module is first initialised by the app (app.js)
    init: function() {
        _.bindAll(this, 'render');
        this.cacheEls();
        this.bindEvents();
    },

    bindEvents: function() {
        App.on('render', this.render);
    },

    cacheEls: function() {
        // this.themesList = document.querySelector('.products');
    },

    render: function(event, params) {
        var that = this;

        $('[data-slider]').slick({
            dots: true,
            cssEase: 'linear',
            infinite: false,
            speed: 300,
            adaptiveHeight: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            responsive: [
                {
                    breakpoint: 840,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    },
                }
            ]
        });

    }
}
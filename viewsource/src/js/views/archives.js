'use strict';

var
    _            = require('lodash'),
    Masonry      = require("masonry-layout"),
    imagesLoaded = require('imagesloaded');


App.Views.archives = {
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
        // this.$bannerTop = $('.home-banner-top');
        // this.$bannerTopSlides = $('.entry', this.$bannerTop);
        this.entriesList = document.querySelector('.loop--posts');
        this.subPagesList = document.querySelector('.sub-pages-list');

    },

    render: function(event, params) {
        var self = this;

        if ( self.entriesList ) {

            var container = self.entriesList;
            var masonryOptions = {
                "itemSelector": '.entry'
            }
            var msnry;

            msnry = new Masonry( container, masonryOptions);

            imagesLoaded( container, function() {
                msnry.layout();
            });

            /**
             * Reactiva o layout masonry quando são aplicados filtros
             */
            $(".searchandfilter").on("sf:ajaxfinish",function(){
                msnry.destroy();
                msnry = new Masonry( container, masonryOptions);
            });

        };

        if ( self.subPagesList ) {

            var container = self.subPagesList;
            var masonryOptions = {
                itemSelector: '.sub-page-item'
            }
            var msnry;

            msnry = new Masonry( container, masonryOptions);

            imagesLoaded( container, function() {
                msnry.layout();
            });

        };


    }
}
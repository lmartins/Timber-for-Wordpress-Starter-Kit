'use strict';

var
    _ = require('lodash'),
    query = require('query')


App.Views.home = {
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
        this.$bannerTop = $('.home-banner-top');
        this.$bannerTopSlides = $('.entry', this.$bannerTop);

        this.$bannerText = $('.home-banner-text');
        this.$bannerTextSlides = $('.entry', this.$bannerText);

        // this.$sliders = $('.home-contents [data-slider]');
        this.$sliders = $('.loop[data-slider]');
        // this.$sliderBottomLeft = $('.home-bottom-left [data-slider]');
        // this.$sliderBottomRight = $('.home-bottom-right [data-slider]');

    },

    render: function(event, params) {
        var self = this;

        // BANNER TOP
        if ( self.$bannerTopSlides.length ) {
            $( self.$bannerTop ).owlCarousel({
                nav:true,
                nestedItemSelector: 'entry',
                loop: true,
                lazyLoad:true,
                autoplay: true,
                autoplayTimeout: 8500,
                autoplayHoverPause: true,
                autoplaySpeed: 750,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                navText: ['<i class="icon-left"></i>','<i class="icon-right"></i>'],
                responsive:{
                    0:{
                        items: 1,
                        margin: 0,
                        center: true
                    }
                }
            });
        } else {
            self.$bannerTop.addClass('is-empty');
        }

        /**
         * BANNER DE TEXTO
         */
        if ( self.$bannerTextSlides.length > 1 ) {
            $( self.$bannerText ).owlCarousel({
                nav:false,
                nestedItemSelector: 'entry',
                loop: true,
                dots: false,
                lazyLoad:false,
                autoplay: true,
                autoplayTimeout: 8000,
                autoplayHoverPause: true,
                autoplaySpeed: 750,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                navText: ['<i class="icon-left"></i>','<i class="icon-right"></i>'],
                responsive:{
                    0:{
                        items:1
                    }
                }
            })
        }


        // SLIDERS
        _.forEach( self.$sliders, function( el ) {

            var parentResponsive = el.parentNode;

            $(el).owlCarousel({
                nav: true,
                loop: false,
                lazyLoad: true,
                margin:10,
                navText: ['<i class="icon-left"></i>','<i class="icon-right"></i>'],
                responsiveBaseElement: parentResponsive,
                responsive:{
                    0:{
                        items:1
                    },
                    960:{
                        items:4,
                        slideBy: 4
                    }
                }
            });
        });


        // var layout = document.body.getAttribute("data-grid");

        // if ( layout === 'layout_1') {

        //     var slider1 = document.querySelector('.widget-1 .loop[data-slider]');
        //     if (slider1) {
        //         $(slider1).slick({
        //             dots: true,
        //             lazyLoad: 'progressive',
        //             infinite: false,
        //             fade: true,
        //             cssEase: 'linear',
        //             speed: 300,
        //             adaptiveHeight: false,
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         });
        //     };

        //     var slider2 = document.querySelector('.widget-2 .loop[data-slider]');
        //     if (slider2) {
        //         $(slider2).slick({
        //             dots: true,
        //             lazyLoad: 'progressive',
        //             infinite: false,
        //             fade: true,
        //             cssEase: 'linear',
        //             speed: 300,
        //             adaptiveHeight: false,
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         });
        //     };

        // };


        /**
         * Com outros layouts os sliders seguem apenas a escolha do utilizador
         */
        // _.forEach( self.$listSliders, function( el ) {

        //     var cols = el.dataset.cols;

        //     $(el).slick({
        //         dots: true,
        //         lazyLoad: 'progressive',
        //         infinite: false,
        //         // fade: true,
        //         cssEase: 'linear',
        //         speed: 300,
        //         adaptiveHeight: false,
        //         slidesToShow: cols,
        //         slidesToScroll: cols,
        //         responsive: [
        //             {
        //               breakpoint: 740,
        //               settings: {
        //                 slidesToShow: 2,
        //                 slidesToScroll: 2
        //               }
        //             },
        //             {
        //               breakpoint: 360,
        //               settings: {
        //                 slidesToShow: 1,
        //                 slidesToScroll: 1
        //               }
        //             }
        //         ]
        //     });
        // });


    }
}
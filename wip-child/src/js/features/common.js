'use strict';

var
    _        = require('lodash');
    // flowtype = require('flowtype');
    // query = require('query');


App.Features.common = {
  // this is your root DOM element for your module, a module doesn't have to be connected to the DOM, but if it is,
  // then it should control one element and everything inside it
  // el: ".view-Home",

  // this is your init function, this runs when the module is first initialised by the app (app.js)
  init: function() {
    _.bindAll(this);
    this.cacheEls();
    this.bindEvents();
  },

  bindEvents: function() {
    var self = this;
    App.on('render', self.render );

  },

    cacheEls: function() {
        this.headerEl = document.querySelector('.site-header');
        this.siteContainer = document.querySelector('.site-container');
        // this.loginModal = new LoginModal( query('.loginModal') );
        // this.siteNav = new SiteNav( query('.Nav--siteNav') );

        this.$sidebarSliders = $( '.loop[data-slider]', '.sidebar' );
        // this.entriesList = document.querySelector('.entry','.loop-search-results');

    },

    render: function(event, params) {
        var self = this;

        // Adiciona espaço ao container com dimensão igual ao header fixo
        // self.siteContainer.style.paddingTop = self.headerEl.offsetHeight + "px";

        // Aplica formatações ao header com scroll
        // window.onscroll = _.debounce(positionMenu, 100);
        // function positionMenu() {
        //   var scrollPos = window.scrollY;
        //   if ( scrollPos > 40 ) {
        //     self.headerEl.classList.add('is-sticky');
        //   } else {
        //     self.headerEl.classList.remove('is-sticky');
        //   }
        // }

        window.onresize = _.debounce(doArticleCover, 100);
        function doArticleCover () {
            // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            console.log(h);

                var coverImage = document.querySelector('.cover');
                // var content = document.querySelector('.content-wrapper');
                coverImage.style.height = ( h * 0.6 ) + 'px';
                // content.style.marginTop = coverImage.clientHeight + 'px';
        }
        doArticleCover();


        /**
         * Se logo maior que barra de topo então aplica caixa
         */

        // var siteLogoHeight = this.headerEl.querySelector(".site-title img").offsetHeight;

        // if ( siteLogoHeight > self.headerEl.offsetHeight ) {
        //     siteLogoHeight.classList.add('is-boxed');
        // };

        // var StickyNav = require('../components/stickynav');
        // new StickyNav( query('.site-header') );

        /**
         * Activar o menu OFFCANVAS
         */
        // $('.site-container').addClass('shifter-page').attr('id','top');
        // $.shifter({
        //     maxWidth: Infinity
        // });


        // Minibanners accionam link em qualquer ponto que se clique
        $( ".loop--minibanners" ).delegate( ".item", "click", function() {
            $(this).find('a')[0].click();
        });
  }

};

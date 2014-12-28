

var
  events   = require('./helpers/pubsub'),
  Emitter  = require('emitter'),
  routes   = require('./views/routes');
  // velocity = require('velocity-animate'),
  // isMobile = require('is-mobile')();


(function() {
"use strict";

var App = {

  // this is out top level module, the module that sets up the
  // namespace and secondary level modules
  Views: {},
  Features: {},
  // Modules: {}, // Deprecated - Passa a usar módulos CommonJS
  Helpers: {},

  Events: events,

  init: function () {

    /*
    Makes App object an event emitter
     */
    Emitter(App);

    // Run the routes function binded to the App object
    routes.call(App);

    // var pageFeatures = document.body.getAttribute('data-features').split(',');
    // for (var i = 0; i < pageFeatures.length; i += 1) {
    //   if ( App.Features[ pageFeatures[i] ]) {
    //     console.log("ping");
    //     App.Features[ pageFeatures[i] ].init();
    //   }
    // }

    var currentView = document.body.getAttribute('data-view');
    if ( currentView ) {
          var viewPath = './views/' + currentView + '.js';
          require( viewPath );
          App.Views[currentView].init();
    }

    // here we are looping round all of the modules in our app.Modules object. We could have an exclude array for modules
    // that we don't want to be immediately initialised. We could initialise them later on in our application lifecycle
    for (var x in App.Modules) {
          App.Modules[x].init();
    }
     // the most useful part of this is Events. Modules shouldn't know about each other, so they're completely decoupled. We use
    // app.Events to 'trigger' and use 'on' to send/receive messages and data around our application. The 'trigger' function
    // takes data as it's second parameter which is accessible in the 'params' object in the receiving function, i.e. look at the
    // 'render' function within the 'jesse' module
    // App.Events.trigger('render');
    // App.Events2.publish('/page/load', {
    //   url: '/some/url/path',
    // });

    // App.Events.publish('render');
    App.emit('render');

  }
}

window.App = App;

App.init();

}());




/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens.
 */
( function() {
    var container, button, menu;

    container = document.getElementById( 'site-navigation' );
    if ( ! container ) {
        return;
    }

    button = container.getElementsByTagName( 'button' )[0];
    if ( 'undefined' === typeof button ) {
        return;
    }

    menu = container.getElementsByTagName( 'ul' )[0];

    // Hide menu toggle button if menu is empty and return early.
    if ( 'undefined' === typeof menu ) {
        button.style.display = 'none';
        return;
    }

    menu.setAttribute( 'aria-expanded', 'false' );

    if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
        menu.className += ' nav-menu';
    }

    button.onclick = function() {
        if ( -1 !== container.className.indexOf( 'toggled' ) ) {
            container.className = container.className.replace( ' toggled', '' );
            button.setAttribute( 'aria-expanded', 'false' );
            menu.setAttribute( 'aria-expanded', 'false' );
        } else {
            container.className += ' toggled';
            button.setAttribute( 'aria-expanded', 'true' );
            menu.setAttribute( 'aria-expanded', 'true' );
        }
    };
} )();

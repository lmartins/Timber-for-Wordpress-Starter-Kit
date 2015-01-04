(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/app.js":[function(require,module,exports){


var
    events   = require('./helpers/pubsub'),
    component = require('./component'),
    Emitter  = component('component-emitter'),
    routes   = component('component-routes');
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

},{"./component":"/Users/luismartins/Sites/LAB/wpbeta/wp-content/themes/wip-child/src/js/component.js","./helpers/pubsub":"/Users/luismartins/Sites/LAB/wpbeta/wp-content/themes/wip-child/src/js/helpers/pubsub.js"}],"/Users/luismartins/Sites/LAB/wpbeta/wp-content/themes/wip-child/src/js/component.js":[function(require,module,exports){

/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function _require(path, parent, orig) {
  var resolved = _require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err._require = true;
    throw err;
  }

  var module = _require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, _require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

_require.modules = {};

/**
 * Registered aliases.
 */

_require.aliases = {};

/**
 * Resolve `path`.
 *
 * Lookup:
 *
 *   - PATH/index.js
 *   - PATH.js
 *   - PATH
 *
 * @param {String} path
 * @return {String} path or null
 * @api private
 */

_require.resolve = function(path) {
  if (path.charAt(0) === '/') path = path.slice(1);

  var paths = [
    path,
    path + '.js',
    path + '.json',
    path + '/index.js',
    path + '/index.json'
  ];

  for (var i = 0; i < paths.length; i++) {
    var path = paths[i];
    if (_require.modules.hasOwnProperty(path)) return path;
    if (_require.aliases.hasOwnProperty(path)) return _require.aliases[path];
  }
};

/**
 * Normalize `path` relative to the current path.
 *
 * @param {String} curr
 * @param {String} path
 * @return {String}
 * @api private
 */

_require.normalize = function(curr, path) {
  var segs = [];

  if ('.' != path.charAt(0)) return path;

  curr = curr.split('/');
  path = path.split('/');

  for (var i = 0; i < path.length; ++i) {
    if ('..' == path[i]) {
      curr.pop();
    } else if ('.' != path[i] && '' != path[i]) {
      segs.push(path[i]);
    }
  }

  return curr.concat(segs).join('/');
};

/**
 * Register module at `path` with callback `definition`.
 *
 * @param {String} path
 * @param {Function} definition
 * @api private
 */

_require.register = function(path, definition) {
  _require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

_require.alias = function(from, to) {
  if (!_require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  _require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

_require.relative = function(parent) {
  var p = _require.normalize(parent, '..');

  /**
   * lastIndexOf helper.
   */

  function lastIndexOf(arr, obj) {
    var i = arr.length;
    while (i--) {
      if (arr[i] === obj) return i;
    }
    return -1;
  }

  /**
   * The relative require() itself.
   */

  function localRequire(path) {
    var resolved = localRequire.resolve(path);
    return _require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return _require.normalize(p, path);

    // resolve deps by returning
    // the dep in the nearest "deps"
    // directory
    var segs = parent.split('/');
    var i = lastIndexOf(segs, 'deps') + 1;
    if (!i) i = 0;
    path = segs.slice(0, i + 1).join('/') + '/deps/' + path;
    return path;
  };

  /**
   * Check if module is defined at `path`.
   */

  localRequire.exists = function(path) {
    return _require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
_require.register("component-query/index.js", function(exports, _require, module){
function one(selector, el) {
  return el.querySelector(selector);
}

exports = module.exports = function(selector, el){
  el = el || document;
  return one(selector, el);
};

exports.all = function(selector, el){
  el = el || document;
  return el.querySelectorAll(selector);
};

exports.engine = function(obj){
  if (!obj.one) throw new Error('.one callback required');
  if (!obj.all) throw new Error('.all callback required');
  one = obj.one;
  exports.all = obj.all;
  return exports;
};

});
_require.register("component-emitter/index.js", function(exports, _require, module){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

});
_require.register("anthonyshort-static-router/index.js", function(exports, _require, module){
// Cached regular expressions for matching named param parts and splatted
// parts of route strings.
var optionalParam = /\((.*?)\)/g;
var namedParam    = /(\(\?)?:\w+/g;
var splatParam    = /\*/g;
var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

// Cached regex for stripping a leading hash/slash and trailing space.
var routeStripper = /^[#\/]|\s+$/g;

// Cached regex for stripping leading and trailing slashes.
var rootStripper = /^\/+|\/+$/g;

// Cached regex for removing a trailing slash.
var trailingSlash = /\/$/;

function Router(options) {
  options = options || {};
  this._handlers = [];
  this.setRoot(options.root || '/');
  this.setUrl(options.url || window.location.pathname);
}

// Convert a route as a string into a Regex object
// we can use to match the URL
Router.prototype._routeToRegExp = function(route) {
  route = route.replace(escapeRegExp, '\\$&')
               .replace(optionalParam, '(?:$1)?')
               .replace(namedParam, function(match, optional){
                 return optional ? match : '([^\/]+)';
               })
               .replace(splatParam, '(.*?)');
  return new RegExp('^' + route + '$');
};

// Set the root URL for all routes
Router.prototype.setRoot = function(url) {
  this.root = this._normalizeUrl(url);
};

Router.prototype.setUrl = function(url) {
  this.url = this._normalizeUrl(url);
};

// Given a route, and a URL fragment that it matches, return the array of
// extracted parameters.
Router.prototype._extractParameters = function(route, fragment) {
  return route.exec(fragment).slice(1);
};

// Makes sure all urls have a leading slash and no trailing slash
// Used to normalize all urls so we always know the format
Router.prototype._normalizeUrl = function(url) {
  return ('/' + url + '/').replace(rootStripper, '/');
};

Router.prototype.getFragment = function() {
  var fragment = this.url;
  var root = this.root.replace(trailingSlash, '');
  if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
  return fragment.replace(trailingSlash, '');
};

// Add a route and a callback. The callback won't
// be fired immediately but when the router is started
Router.prototype.route = function(route, callback) {
  var fragment = this.getFragment();
  var routeRegex = this._routeToRegExp(route);

  if ( routeRegex.test(fragment) ) {
    var args = this._extractParameters(routeRegex, fragment);
    callback.apply(this, args);
  }
};

module.exports = Router;
});
_require.register("component-raf/index.js", function(exports, _require, module){
/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.oCancelAnimationFrame
  || window.msCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};

});
_require.register("anthonyshort-raf-queue/index.js", function(exports, _require, module){
var raf = _require('raf');
var queue = [];
var requestId;
var id = 0;

/**
 * Add a job to the queue passing in
 * an optional context to call the function in
 *
 * @param {Function} fn
 * @param {Object} cxt
 */

function frame (fn, cxt) {
  var frameId = id++;
  var length = queue.push({
    id: frameId,
    fn: fn,
    cxt: cxt
  });
  if(!requestId) requestId = raf(flush);
  return frameId;
};

/**
 * Remove a job from the queue using the
 * frameId returned when it was added
 *
 * @param {Number} id
 */

frame.cancel = function (id) {
  for (var i = queue.length - 1; i >= 0; i--) {
    if(queue[i].id === id) {
      queue.splice(i, 1);
      break;
    }
  }
};

/**
 * Add a function to the queue, but only once
 *
 * @param {Function} fn
 * @param {Object} cxt
 */

frame.once = function (fn, cxt) {
  for (var i = queue.length - 1; i >= 0; i--) {
    if(queue[i].fn === fn) return;
  }
  frame(fn, cxt);
};

/**
 * Get the current queue length
 */

frame.queued = function () {
  return queue.length;
};

/**
 * Clear the queue and remove all pending jobs
 */

frame.clear = function () {
  queue = [];
  if(requestId) raf.cancel(requestId);
  requestId = null;
};

/**
 * Fire a function after all of the jobs in the
 * current queue have fired. This is usually used
 * in testing.
 */

frame.defer = function (fn) {
  raf(raf.bind(null, fn));
};

/**
 * Flushes the queue and runs each job
 */

function flush () {
  while(queue.length) {
    var job = queue.shift();
    job.fn.call(job.cxt);
  }
  requestId = null;
}

module.exports = frame;
});
_require.register("segmentio-raf-scroll/index.js", function(exports, _require, module){
var Emitter = _require('emitter');
var raf = _require('raf-queue');
var emitter = new Emitter();

/**
 * Get the current scroll position
 */

function scrollPosition() {
  if (window.pageYOffset) return window.pageYOffset;
  return (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

/**
 * Emit a scroll event. This will only
 * be called once per frame
 *
 * @param {Event} event
 */

function emit(event) {
  emitter.emit('scroll', event, scrollPosition());
}

/**
 * Every scroll event will emit an event once
 * per frame.
 */

window.addEventListener('scroll', function(){
  raf.once(emit);
}, false);

/**
 * Export the emitter for binding to window
 * scroll events instead of using the window
 * directly.
 */

module.exports = emitter;

});








_require.alias("component-query/index.js", "Webipack/deps/query/index.js");
_require.alias("component-query/index.js", "query/index.js");

_require.alias("component-emitter/index.js", "Webipack/deps/emitter/index.js");
_require.alias("component-emitter/index.js", "emitter/index.js");

_require.alias("anthonyshort-static-router/index.js", "Webipack/deps/static-router/index.js");
_require.alias("anthonyshort-static-router/index.js", "static-router/index.js");
_require.alias("component-emitter/index.js", "anthonyshort-static-router/deps/emitter/index.js");

_require.alias("segmentio-raf-scroll/index.js", "Webipack/deps/raf-scroll/index.js");
_require.alias("segmentio-raf-scroll/index.js", "raf-scroll/index.js");
_require.alias("component-emitter/index.js", "segmentio-raf-scroll/deps/emitter/index.js");

_require.alias("anthonyshort-raf-queue/index.js", "segmentio-raf-scroll/deps/raf-queue/index.js");
_require.alias("component-raf/index.js", "anthonyshort-raf-queue/deps/raf/index.js");
module.exports = _require;
},{}],"/Users/luismartins/Sites/LAB/wpbeta/wp-content/themes/wip-child/src/js/helpers/pubsub.js":[function(require,module,exports){
module.exports = (function() {
  "use strict";

  var topics = {};
  return {

    subscribe: function (topic, listener) {
      // Create the topic's object if not yet created
      if (!topics[topic])
        topics[topic] = { queue: [] }

      // Add the listener to the queue
      var index = topics[topic].queue.push(listener) - 1;

      // Provide handle back for removal of topic
      return (function (topic, index) {
          return {
            remove: function () {
              delete topics[topic].queue[index];
            }
          }
        })(topic, index);
    },

    publish: function (topic, info) {
      // If the topic doesn't exist, or there's no listeners in queue, just leave
      if (!topics[topic] || !topics[topic].queue.length) return;

      // Cycle through topics queue, fire!
      var items = topics[topic].queue;
      items.forEach(function (item) {
        item(info||{});
      });
    }
  }

})();

},{}]},{},["./src/js/app.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvYXBwLmpzIiwic3JjL2pzL2NvbXBvbmVudC5qcyIsInNyYy9qcy9oZWxwZXJzL3B1YnN1Yi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNocUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5cbnZhclxuICAgIGV2ZW50cyAgID0gcmVxdWlyZSgnLi9oZWxwZXJzL3B1YnN1YicpLFxuICAgIGNvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50JyksXG4gICAgRW1pdHRlciAgPSBjb21wb25lbnQoJ2NvbXBvbmVudC1lbWl0dGVyJyksXG4gICAgcm91dGVzICAgPSBjb21wb25lbnQoJ2NvbXBvbmVudC1yb3V0ZXMnKTtcbiAgICAvLyB2ZWxvY2l0eSA9IHJlcXVpcmUoJ3ZlbG9jaXR5LWFuaW1hdGUnKSxcbiAgICAvLyBpc01vYmlsZSA9IHJlcXVpcmUoJ2lzLW1vYmlsZScpKCk7XG5cblxuKGZ1bmN0aW9uKCkge1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBBcHAgPSB7XG5cbiAgLy8gdGhpcyBpcyBvdXQgdG9wIGxldmVsIG1vZHVsZSwgdGhlIG1vZHVsZSB0aGF0IHNldHMgdXAgdGhlXG4gIC8vIG5hbWVzcGFjZSBhbmQgc2Vjb25kYXJ5IGxldmVsIG1vZHVsZXNcbiAgVmlld3M6IHt9LFxuICBGZWF0dXJlczoge30sXG4gIC8vIE1vZHVsZXM6IHt9LCAvLyBEZXByZWNhdGVkIC0gUGFzc2EgYSB1c2FyIG3Ds2R1bG9zIENvbW1vbkpTXG4gIEhlbHBlcnM6IHt9LFxuXG4gIEV2ZW50czogZXZlbnRzLFxuXG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qXG4gICAgTWFrZXMgQXBwIG9iamVjdCBhbiBldmVudCBlbWl0dGVyXG4gICAgICovXG4gICAgRW1pdHRlcihBcHApO1xuXG4gICAgLy8gUnVuIHRoZSByb3V0ZXMgZnVuY3Rpb24gYmluZGVkIHRvIHRoZSBBcHAgb2JqZWN0XG4gICAgcm91dGVzLmNhbGwoQXBwKTtcblxuICAgIC8vIHZhciBwYWdlRmVhdHVyZXMgPSBkb2N1bWVudC5ib2R5LmdldEF0dHJpYnV0ZSgnZGF0YS1mZWF0dXJlcycpLnNwbGl0KCcsJyk7XG4gICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBwYWdlRmVhdHVyZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAvLyAgIGlmICggQXBwLkZlYXR1cmVzWyBwYWdlRmVhdHVyZXNbaV0gXSkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhcInBpbmdcIik7XG4gICAgLy8gICAgIEFwcC5GZWF0dXJlc1sgcGFnZUZlYXR1cmVzW2ldIF0uaW5pdCgpO1xuICAgIC8vICAgfVxuICAgIC8vIH1cblxuICAgIHZhciBjdXJyZW50VmlldyA9IGRvY3VtZW50LmJvZHkuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZXcnKTtcbiAgICBpZiAoIGN1cnJlbnRWaWV3ICkge1xuICAgICAgICAgIHZhciB2aWV3UGF0aCA9ICcuL3ZpZXdzLycgKyBjdXJyZW50VmlldyArICcuanMnO1xuICAgICAgICAgIHJlcXVpcmUoIHZpZXdQYXRoICk7XG4gICAgICAgICAgQXBwLlZpZXdzW2N1cnJlbnRWaWV3XS5pbml0KCk7XG4gICAgfVxuXG4gICAgLy8gaGVyZSB3ZSBhcmUgbG9vcGluZyByb3VuZCBhbGwgb2YgdGhlIG1vZHVsZXMgaW4gb3VyIGFwcC5Nb2R1bGVzIG9iamVjdC4gV2UgY291bGQgaGF2ZSBhbiBleGNsdWRlIGFycmF5IGZvciBtb2R1bGVzXG4gICAgLy8gdGhhdCB3ZSBkb24ndCB3YW50IHRvIGJlIGltbWVkaWF0ZWx5IGluaXRpYWxpc2VkLiBXZSBjb3VsZCBpbml0aWFsaXNlIHRoZW0gbGF0ZXIgb24gaW4gb3VyIGFwcGxpY2F0aW9uIGxpZmVjeWNsZVxuICAgIGZvciAodmFyIHggaW4gQXBwLk1vZHVsZXMpIHtcbiAgICAgICAgICBBcHAuTW9kdWxlc1t4XS5pbml0KCk7XG4gICAgfVxuICAgICAvLyB0aGUgbW9zdCB1c2VmdWwgcGFydCBvZiB0aGlzIGlzIEV2ZW50cy4gTW9kdWxlcyBzaG91bGRuJ3Qga25vdyBhYm91dCBlYWNoIG90aGVyLCBzbyB0aGV5J3JlIGNvbXBsZXRlbHkgZGVjb3VwbGVkLiBXZSB1c2VcbiAgICAvLyBhcHAuRXZlbnRzIHRvICd0cmlnZ2VyJyBhbmQgdXNlICdvbicgdG8gc2VuZC9yZWNlaXZlIG1lc3NhZ2VzIGFuZCBkYXRhIGFyb3VuZCBvdXIgYXBwbGljYXRpb24uIFRoZSAndHJpZ2dlcicgZnVuY3Rpb25cbiAgICAvLyB0YWtlcyBkYXRhIGFzIGl0J3Mgc2Vjb25kIHBhcmFtZXRlciB3aGljaCBpcyBhY2Nlc3NpYmxlIGluIHRoZSAncGFyYW1zJyBvYmplY3QgaW4gdGhlIHJlY2VpdmluZyBmdW5jdGlvbiwgaS5lLiBsb29rIGF0IHRoZVxuICAgIC8vICdyZW5kZXInIGZ1bmN0aW9uIHdpdGhpbiB0aGUgJ2plc3NlJyBtb2R1bGVcbiAgICAvLyBBcHAuRXZlbnRzLnRyaWdnZXIoJ3JlbmRlcicpO1xuICAgIC8vIEFwcC5FdmVudHMyLnB1Ymxpc2goJy9wYWdlL2xvYWQnLCB7XG4gICAgLy8gICB1cmw6ICcvc29tZS91cmwvcGF0aCcsXG4gICAgLy8gfSk7XG5cbiAgICAvLyBBcHAuRXZlbnRzLnB1Ymxpc2goJ3JlbmRlcicpO1xuICAgIEFwcC5lbWl0KCdyZW5kZXInKTtcblxuICB9XG59XG5cbndpbmRvdy5BcHAgPSBBcHA7XG5cbkFwcC5pbml0KCk7XG5cbn0oKSk7XG5cblxuXG5cbi8qKlxuICogbmF2aWdhdGlvbi5qc1xuICpcbiAqIEhhbmRsZXMgdG9nZ2xpbmcgdGhlIG5hdmlnYXRpb24gbWVudSBmb3Igc21hbGwgc2NyZWVucy5cbiAqL1xuKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29udGFpbmVyLCBidXR0b24sIG1lbnU7XG5cbiAgICBjb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggJ3NpdGUtbmF2aWdhdGlvbicgKTtcbiAgICBpZiAoICEgY29udGFpbmVyICkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYnV0dG9uID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCAnYnV0dG9uJyApWzBdO1xuICAgIGlmICggJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBidXR0b24gKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBtZW51ID0gY29udGFpbmVyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCAndWwnIClbMF07XG5cbiAgICAvLyBIaWRlIG1lbnUgdG9nZ2xlIGJ1dHRvbiBpZiBtZW51IGlzIGVtcHR5IGFuZCByZXR1cm4gZWFybHkuXG4gICAgaWYgKCAndW5kZWZpbmVkJyA9PT0gdHlwZW9mIG1lbnUgKSB7XG4gICAgICAgIGJ1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbWVudS5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyApO1xuXG4gICAgaWYgKCAtMSA9PT0gbWVudS5jbGFzc05hbWUuaW5kZXhPZiggJ25hdi1tZW51JyApICkge1xuICAgICAgICBtZW51LmNsYXNzTmFtZSArPSAnIG5hdi1tZW51JztcbiAgICB9XG5cbiAgICBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIC0xICE9PSBjb250YWluZXIuY2xhc3NOYW1lLmluZGV4T2YoICd0b2dnbGVkJyApICkge1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9IGNvbnRhaW5lci5jbGFzc05hbWUucmVwbGFjZSggJyB0b2dnbGVkJywgJycgKTtcbiAgICAgICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyApO1xuICAgICAgICAgICAgbWVudS5zZXRBdHRyaWJ1dGUoICdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSArPSAnIHRvZ2dsZWQnO1xuICAgICAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSggJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScgKTtcbiAgICAgICAgICAgIG1lbnUuc2V0QXR0cmlidXRlKCAnYXJpYS1leHBhbmRlZCcsICd0cnVlJyApO1xuICAgICAgICB9XG4gICAgfTtcbn0gKSgpO1xuIiwiXG4vKipcbiAqIFJlcXVpcmUgdGhlIGdpdmVuIHBhdGguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEByZXR1cm4ge09iamVjdH0gZXhwb3J0c1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBfcmVxdWlyZShwYXRoLCBwYXJlbnQsIG9yaWcpIHtcbiAgdmFyIHJlc29sdmVkID0gX3JlcXVpcmUucmVzb2x2ZShwYXRoKTtcblxuICAvLyBsb29rdXAgZmFpbGVkXG4gIGlmIChudWxsID09IHJlc29sdmVkKSB7XG4gICAgb3JpZyA9IG9yaWcgfHwgcGF0aDtcbiAgICBwYXJlbnQgPSBwYXJlbnQgfHwgJ3Jvb3QnO1xuICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZXF1aXJlIFwiJyArIG9yaWcgKyAnXCIgZnJvbSBcIicgKyBwYXJlbnQgKyAnXCInKTtcbiAgICBlcnIucGF0aCA9IG9yaWc7XG4gICAgZXJyLnBhcmVudCA9IHBhcmVudDtcbiAgICBlcnIuX3JlcXVpcmUgPSB0cnVlO1xuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIHZhciBtb2R1bGUgPSBfcmVxdWlyZS5tb2R1bGVzW3Jlc29sdmVkXTtcblxuICAvLyBwZXJmb3JtIHJlYWwgcmVxdWlyZSgpXG4gIC8vIGJ5IGludm9raW5nIHRoZSBtb2R1bGUnc1xuICAvLyByZWdpc3RlcmVkIGZ1bmN0aW9uXG4gIGlmICghbW9kdWxlLl9yZXNvbHZpbmcgJiYgIW1vZHVsZS5leHBvcnRzKSB7XG4gICAgdmFyIG1vZCA9IHt9O1xuICAgIG1vZC5leHBvcnRzID0ge307XG4gICAgbW9kLmNsaWVudCA9IG1vZC5jb21wb25lbnQgPSB0cnVlO1xuICAgIG1vZHVsZS5fcmVzb2x2aW5nID0gdHJ1ZTtcbiAgICBtb2R1bGUuY2FsbCh0aGlzLCBtb2QuZXhwb3J0cywgX3JlcXVpcmUucmVsYXRpdmUocmVzb2x2ZWQpLCBtb2QpO1xuICAgIGRlbGV0ZSBtb2R1bGUuX3Jlc29sdmluZztcbiAgICBtb2R1bGUuZXhwb3J0cyA9IG1vZC5leHBvcnRzO1xuICB9XG5cbiAgcmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVyZWQgbW9kdWxlcy5cbiAqL1xuXG5fcmVxdWlyZS5tb2R1bGVzID0ge307XG5cbi8qKlxuICogUmVnaXN0ZXJlZCBhbGlhc2VzLlxuICovXG5cbl9yZXF1aXJlLmFsaWFzZXMgPSB7fTtcblxuLyoqXG4gKiBSZXNvbHZlIGBwYXRoYC5cbiAqXG4gKiBMb29rdXA6XG4gKlxuICogICAtIFBBVEgvaW5kZXguanNcbiAqICAgLSBQQVRILmpzXG4gKiAgIC0gUEFUSFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHBhdGggb3IgbnVsbFxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuX3JlcXVpcmUucmVzb2x2ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgaWYgKHBhdGguY2hhckF0KDApID09PSAnLycpIHBhdGggPSBwYXRoLnNsaWNlKDEpO1xuXG4gIHZhciBwYXRocyA9IFtcbiAgICBwYXRoLFxuICAgIHBhdGggKyAnLmpzJyxcbiAgICBwYXRoICsgJy5qc29uJyxcbiAgICBwYXRoICsgJy9pbmRleC5qcycsXG4gICAgcGF0aCArICcvaW5kZXguanNvbidcbiAgXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHBhdGggPSBwYXRoc1tpXTtcbiAgICBpZiAoX3JlcXVpcmUubW9kdWxlcy5oYXNPd25Qcm9wZXJ0eShwYXRoKSkgcmV0dXJuIHBhdGg7XG4gICAgaWYgKF9yZXF1aXJlLmFsaWFzZXMuaGFzT3duUHJvcGVydHkocGF0aCkpIHJldHVybiBfcmVxdWlyZS5hbGlhc2VzW3BhdGhdO1xuICB9XG59O1xuXG4vKipcbiAqIE5vcm1hbGl6ZSBgcGF0aGAgcmVsYXRpdmUgdG8gdGhlIGN1cnJlbnQgcGF0aC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY3VyclxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbl9yZXF1aXJlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uKGN1cnIsIHBhdGgpIHtcbiAgdmFyIHNlZ3MgPSBbXTtcblxuICBpZiAoJy4nICE9IHBhdGguY2hhckF0KDApKSByZXR1cm4gcGF0aDtcblxuICBjdXJyID0gY3Vyci5zcGxpdCgnLycpO1xuICBwYXRoID0gcGF0aC5zcGxpdCgnLycpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7ICsraSkge1xuICAgIGlmICgnLi4nID09IHBhdGhbaV0pIHtcbiAgICAgIGN1cnIucG9wKCk7XG4gICAgfSBlbHNlIGlmICgnLicgIT0gcGF0aFtpXSAmJiAnJyAhPSBwYXRoW2ldKSB7XG4gICAgICBzZWdzLnB1c2gocGF0aFtpXSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGN1cnIuY29uY2F0KHNlZ3MpLmpvaW4oJy8nKTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgbW9kdWxlIGF0IGBwYXRoYCB3aXRoIGNhbGxiYWNrIGBkZWZpbml0aW9uYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGVmaW5pdGlvblxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuX3JlcXVpcmUucmVnaXN0ZXIgPSBmdW5jdGlvbihwYXRoLCBkZWZpbml0aW9uKSB7XG4gIF9yZXF1aXJlLm1vZHVsZXNbcGF0aF0gPSBkZWZpbml0aW9uO1xufTtcblxuLyoqXG4gKiBBbGlhcyBhIG1vZHVsZSBkZWZpbml0aW9uLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmcm9tXG4gKiBAcGFyYW0ge1N0cmluZ30gdG9cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbl9yZXF1aXJlLmFsaWFzID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgaWYgKCFfcmVxdWlyZS5tb2R1bGVzLmhhc093blByb3BlcnR5KGZyb20pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gYWxpYXMgXCInICsgZnJvbSArICdcIiwgaXQgZG9lcyBub3QgZXhpc3QnKTtcbiAgfVxuICBfcmVxdWlyZS5hbGlhc2VzW3RvXSA9IGZyb207XG59O1xuXG4vKipcbiAqIFJldHVybiBhIHJlcXVpcmUgZnVuY3Rpb24gcmVsYXRpdmUgdG8gdGhlIGBwYXJlbnRgIHBhdGguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhcmVudFxuICogQHJldHVybiB7RnVuY3Rpb259XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5fcmVxdWlyZS5yZWxhdGl2ZSA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICB2YXIgcCA9IF9yZXF1aXJlLm5vcm1hbGl6ZShwYXJlbnQsICcuLicpO1xuXG4gIC8qKlxuICAgKiBsYXN0SW5kZXhPZiBoZWxwZXIuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGxhc3RJbmRleE9mKGFyciwgb2JqKSB7XG4gICAgdmFyIGkgPSBhcnIubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIGlmIChhcnJbaV0gPT09IG9iaikgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgcmVsYXRpdmUgcmVxdWlyZSgpIGl0c2VsZi5cbiAgICovXG5cbiAgZnVuY3Rpb24gbG9jYWxSZXF1aXJlKHBhdGgpIHtcbiAgICB2YXIgcmVzb2x2ZWQgPSBsb2NhbFJlcXVpcmUucmVzb2x2ZShwYXRoKTtcbiAgICByZXR1cm4gX3JlcXVpcmUocmVzb2x2ZWQsIHBhcmVudCwgcGF0aCk7XG4gIH1cblxuICAvKipcbiAgICogUmVzb2x2ZSByZWxhdGl2ZSB0byB0aGUgcGFyZW50LlxuICAgKi9cblxuICBsb2NhbFJlcXVpcmUucmVzb2x2ZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICB2YXIgYyA9IHBhdGguY2hhckF0KDApO1xuICAgIGlmICgnLycgPT0gYykgcmV0dXJuIHBhdGguc2xpY2UoMSk7XG4gICAgaWYgKCcuJyA9PSBjKSByZXR1cm4gX3JlcXVpcmUubm9ybWFsaXplKHAsIHBhdGgpO1xuXG4gICAgLy8gcmVzb2x2ZSBkZXBzIGJ5IHJldHVybmluZ1xuICAgIC8vIHRoZSBkZXAgaW4gdGhlIG5lYXJlc3QgXCJkZXBzXCJcbiAgICAvLyBkaXJlY3RvcnlcbiAgICB2YXIgc2VncyA9IHBhcmVudC5zcGxpdCgnLycpO1xuICAgIHZhciBpID0gbGFzdEluZGV4T2Yoc2VncywgJ2RlcHMnKSArIDE7XG4gICAgaWYgKCFpKSBpID0gMDtcbiAgICBwYXRoID0gc2Vncy5zbGljZSgwLCBpICsgMSkuam9pbignLycpICsgJy9kZXBzLycgKyBwYXRoO1xuICAgIHJldHVybiBwYXRoO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBtb2R1bGUgaXMgZGVmaW5lZCBhdCBgcGF0aGAuXG4gICAqL1xuXG4gIGxvY2FsUmVxdWlyZS5leGlzdHMgPSBmdW5jdGlvbihwYXRoKSB7XG4gICAgcmV0dXJuIF9yZXF1aXJlLm1vZHVsZXMuaGFzT3duUHJvcGVydHkobG9jYWxSZXF1aXJlLnJlc29sdmUocGF0aCkpO1xuICB9O1xuXG4gIHJldHVybiBsb2NhbFJlcXVpcmU7XG59O1xuX3JlcXVpcmUucmVnaXN0ZXIoXCJjb21wb25lbnQtcXVlcnkvaW5kZXguanNcIiwgZnVuY3Rpb24oZXhwb3J0cywgX3JlcXVpcmUsIG1vZHVsZSl7XG5mdW5jdGlvbiBvbmUoc2VsZWN0b3IsIGVsKSB7XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc2VsZWN0b3IsIGVsKXtcbiAgZWwgPSBlbCB8fCBkb2N1bWVudDtcbiAgcmV0dXJuIG9uZShzZWxlY3RvciwgZWwpO1xufTtcblxuZXhwb3J0cy5hbGwgPSBmdW5jdGlvbihzZWxlY3RvciwgZWwpe1xuICBlbCA9IGVsIHx8IGRvY3VtZW50O1xuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5leHBvcnRzLmVuZ2luZSA9IGZ1bmN0aW9uKG9iail7XG4gIGlmICghb2JqLm9uZSkgdGhyb3cgbmV3IEVycm9yKCcub25lIGNhbGxiYWNrIHJlcXVpcmVkJyk7XG4gIGlmICghb2JqLmFsbCkgdGhyb3cgbmV3IEVycm9yKCcuYWxsIGNhbGxiYWNrIHJlcXVpcmVkJyk7XG4gIG9uZSA9IG9iai5vbmU7XG4gIGV4cG9ydHMuYWxsID0gb2JqLmFsbDtcbiAgcmV0dXJuIGV4cG9ydHM7XG59O1xuXG59KTtcbl9yZXF1aXJlLnJlZ2lzdGVyKFwiY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanNcIiwgZnVuY3Rpb24oZXhwb3J0cywgX3JlcXVpcmUsIG1vZHVsZSl7XG5cbi8qKlxuICogRXhwb3NlIGBFbWl0dGVyYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn07XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzW2V2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1tldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgLCBjYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3NbZXZlbnRdO1xuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzW2V2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG5cbn0pO1xuX3JlcXVpcmUucmVnaXN0ZXIoXCJhbnRob255c2hvcnQtc3RhdGljLXJvdXRlci9pbmRleC5qc1wiLCBmdW5jdGlvbihleHBvcnRzLCBfcmVxdWlyZSwgbW9kdWxlKXtcbi8vIENhY2hlZCByZWd1bGFyIGV4cHJlc3Npb25zIGZvciBtYXRjaGluZyBuYW1lZCBwYXJhbSBwYXJ0cyBhbmQgc3BsYXR0ZWRcbi8vIHBhcnRzIG9mIHJvdXRlIHN0cmluZ3MuXG52YXIgb3B0aW9uYWxQYXJhbSA9IC9cXCgoLio/KVxcKS9nO1xudmFyIG5hbWVkUGFyYW0gICAgPSAvKFxcKFxcPyk/OlxcdysvZztcbnZhciBzcGxhdFBhcmFtICAgID0gL1xcKi9nO1xudmFyIGVzY2FwZVJlZ0V4cCAgPSAvW1xcLXt9XFxbXFxdKz8uLFxcXFxcXF4kfCNcXHNdL2c7XG5cbi8vIENhY2hlZCByZWdleCBmb3Igc3RyaXBwaW5nIGEgbGVhZGluZyBoYXNoL3NsYXNoIGFuZCB0cmFpbGluZyBzcGFjZS5cbnZhciByb3V0ZVN0cmlwcGVyID0gL15bI1xcL118XFxzKyQvZztcblxuLy8gQ2FjaGVkIHJlZ2V4IGZvciBzdHJpcHBpbmcgbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcy5cbnZhciByb290U3RyaXBwZXIgPSAvXlxcLyt8XFwvKyQvZztcblxuLy8gQ2FjaGVkIHJlZ2V4IGZvciByZW1vdmluZyBhIHRyYWlsaW5nIHNsYXNoLlxudmFyIHRyYWlsaW5nU2xhc2ggPSAvXFwvJC87XG5cbmZ1bmN0aW9uIFJvdXRlcihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICB0aGlzLl9oYW5kbGVycyA9IFtdO1xuICB0aGlzLnNldFJvb3Qob3B0aW9ucy5yb290IHx8ICcvJyk7XG4gIHRoaXMuc2V0VXJsKG9wdGlvbnMudXJsIHx8IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG59XG5cbi8vIENvbnZlcnQgYSByb3V0ZSBhcyBhIHN0cmluZyBpbnRvIGEgUmVnZXggb2JqZWN0XG4vLyB3ZSBjYW4gdXNlIHRvIG1hdGNoIHRoZSBVUkxcblJvdXRlci5wcm90b3R5cGUuX3JvdXRlVG9SZWdFeHAgPSBmdW5jdGlvbihyb3V0ZSkge1xuICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoZXNjYXBlUmVnRXhwLCAnXFxcXCQmJylcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKG9wdGlvbmFsUGFyYW0sICcoPzokMSk/JylcbiAgICAgICAgICAgICAgIC5yZXBsYWNlKG5hbWVkUGFyYW0sIGZ1bmN0aW9uKG1hdGNoLCBvcHRpb25hbCl7XG4gICAgICAgICAgICAgICAgIHJldHVybiBvcHRpb25hbCA/IG1hdGNoIDogJyhbXlxcL10rKSc7XG4gICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgLnJlcGxhY2Uoc3BsYXRQYXJhbSwgJyguKj8pJyk7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeJyArIHJvdXRlICsgJyQnKTtcbn07XG5cbi8vIFNldCB0aGUgcm9vdCBVUkwgZm9yIGFsbCByb3V0ZXNcblJvdXRlci5wcm90b3R5cGUuc2V0Um9vdCA9IGZ1bmN0aW9uKHVybCkge1xuICB0aGlzLnJvb3QgPSB0aGlzLl9ub3JtYWxpemVVcmwodXJsKTtcbn07XG5cblJvdXRlci5wcm90b3R5cGUuc2V0VXJsID0gZnVuY3Rpb24odXJsKSB7XG4gIHRoaXMudXJsID0gdGhpcy5fbm9ybWFsaXplVXJsKHVybCk7XG59O1xuXG4vLyBHaXZlbiBhIHJvdXRlLCBhbmQgYSBVUkwgZnJhZ21lbnQgdGhhdCBpdCBtYXRjaGVzLCByZXR1cm4gdGhlIGFycmF5IG9mXG4vLyBleHRyYWN0ZWQgcGFyYW1ldGVycy5cblJvdXRlci5wcm90b3R5cGUuX2V4dHJhY3RQYXJhbWV0ZXJzID0gZnVuY3Rpb24ocm91dGUsIGZyYWdtZW50KSB7XG4gIHJldHVybiByb3V0ZS5leGVjKGZyYWdtZW50KS5zbGljZSgxKTtcbn07XG5cbi8vIE1ha2VzIHN1cmUgYWxsIHVybHMgaGF2ZSBhIGxlYWRpbmcgc2xhc2ggYW5kIG5vIHRyYWlsaW5nIHNsYXNoXG4vLyBVc2VkIHRvIG5vcm1hbGl6ZSBhbGwgdXJscyBzbyB3ZSBhbHdheXMga25vdyB0aGUgZm9ybWF0XG5Sb3V0ZXIucHJvdG90eXBlLl9ub3JtYWxpemVVcmwgPSBmdW5jdGlvbih1cmwpIHtcbiAgcmV0dXJuICgnLycgKyB1cmwgKyAnLycpLnJlcGxhY2Uocm9vdFN0cmlwcGVyLCAnLycpO1xufTtcblxuUm91dGVyLnByb3RvdHlwZS5nZXRGcmFnbWVudCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgZnJhZ21lbnQgPSB0aGlzLnVybDtcbiAgdmFyIHJvb3QgPSB0aGlzLnJvb3QucmVwbGFjZSh0cmFpbGluZ1NsYXNoLCAnJyk7XG4gIGlmICghZnJhZ21lbnQuaW5kZXhPZihyb290KSkgZnJhZ21lbnQgPSBmcmFnbWVudC5zdWJzdHIocm9vdC5sZW5ndGgpO1xuICByZXR1cm4gZnJhZ21lbnQucmVwbGFjZSh0cmFpbGluZ1NsYXNoLCAnJyk7XG59O1xuXG4vLyBBZGQgYSByb3V0ZSBhbmQgYSBjYWxsYmFjay4gVGhlIGNhbGxiYWNrIHdvbid0XG4vLyBiZSBmaXJlZCBpbW1lZGlhdGVseSBidXQgd2hlbiB0aGUgcm91dGVyIGlzIHN0YXJ0ZWRcblJvdXRlci5wcm90b3R5cGUucm91dGUgPSBmdW5jdGlvbihyb3V0ZSwgY2FsbGJhY2spIHtcbiAgdmFyIGZyYWdtZW50ID0gdGhpcy5nZXRGcmFnbWVudCgpO1xuICB2YXIgcm91dGVSZWdleCA9IHRoaXMuX3JvdXRlVG9SZWdFeHAocm91dGUpO1xuXG4gIGlmICggcm91dGVSZWdleC50ZXN0KGZyYWdtZW50KSApIHtcbiAgICB2YXIgYXJncyA9IHRoaXMuX2V4dHJhY3RQYXJhbWV0ZXJzKHJvdXRlUmVnZXgsIGZyYWdtZW50KTtcbiAgICBjYWxsYmFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSb3V0ZXI7XG59KTtcbl9yZXF1aXJlLnJlZ2lzdGVyKFwiY29tcG9uZW50LXJhZi9pbmRleC5qc1wiLCBmdW5jdGlvbihleHBvcnRzLCBfcmVxdWlyZSwgbW9kdWxlKXtcbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKWAuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IGZhbGxiYWNrO1xuXG4vKipcbiAqIEZhbGxiYWNrIGltcGxlbWVudGF0aW9uLlxuICovXG5cbnZhciBwcmV2ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5mdW5jdGlvbiBmYWxsYmFjayhmbikge1xuICB2YXIgY3VyciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB2YXIgbXMgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyIC0gcHJldikpO1xuICB2YXIgcmVxID0gc2V0VGltZW91dChmbiwgbXMpO1xuICBwcmV2ID0gY3VycjtcbiAgcmV0dXJuIHJlcTtcbn1cblxuLyoqXG4gKiBDYW5jZWwuXG4gKi9cblxudmFyIGNhbmNlbCA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LmNsZWFyVGltZW91dDtcblxuZXhwb3J0cy5jYW5jZWwgPSBmdW5jdGlvbihpZCl7XG4gIGNhbmNlbC5jYWxsKHdpbmRvdywgaWQpO1xufTtcblxufSk7XG5fcmVxdWlyZS5yZWdpc3RlcihcImFudGhvbnlzaG9ydC1yYWYtcXVldWUvaW5kZXguanNcIiwgZnVuY3Rpb24oZXhwb3J0cywgX3JlcXVpcmUsIG1vZHVsZSl7XG52YXIgcmFmID0gX3JlcXVpcmUoJ3JhZicpO1xudmFyIHF1ZXVlID0gW107XG52YXIgcmVxdWVzdElkO1xudmFyIGlkID0gMDtcblxuLyoqXG4gKiBBZGQgYSBqb2IgdG8gdGhlIHF1ZXVlIHBhc3NpbmcgaW5cbiAqIGFuIG9wdGlvbmFsIGNvbnRleHQgdG8gY2FsbCB0aGUgZnVuY3Rpb24gaW5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtPYmplY3R9IGN4dFxuICovXG5cbmZ1bmN0aW9uIGZyYW1lIChmbiwgY3h0KSB7XG4gIHZhciBmcmFtZUlkID0gaWQrKztcbiAgdmFyIGxlbmd0aCA9IHF1ZXVlLnB1c2goe1xuICAgIGlkOiBmcmFtZUlkLFxuICAgIGZuOiBmbixcbiAgICBjeHQ6IGN4dFxuICB9KTtcbiAgaWYoIXJlcXVlc3RJZCkgcmVxdWVzdElkID0gcmFmKGZsdXNoKTtcbiAgcmV0dXJuIGZyYW1lSWQ7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhIGpvYiBmcm9tIHRoZSBxdWV1ZSB1c2luZyB0aGVcbiAqIGZyYW1lSWQgcmV0dXJuZWQgd2hlbiBpdCB3YXMgYWRkZWRcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWRcbiAqL1xuXG5mcmFtZS5jYW5jZWwgPSBmdW5jdGlvbiAoaWQpIHtcbiAgZm9yICh2YXIgaSA9IHF1ZXVlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYocXVldWVbaV0uaWQgPT09IGlkKSB7XG4gICAgICBxdWV1ZS5zcGxpY2UoaSwgMSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQWRkIGEgZnVuY3Rpb24gdG8gdGhlIHF1ZXVlLCBidXQgb25seSBvbmNlXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjeHRcbiAqL1xuXG5mcmFtZS5vbmNlID0gZnVuY3Rpb24gKGZuLCBjeHQpIHtcbiAgZm9yICh2YXIgaSA9IHF1ZXVlLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYocXVldWVbaV0uZm4gPT09IGZuKSByZXR1cm47XG4gIH1cbiAgZnJhbWUoZm4sIGN4dCk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgY3VycmVudCBxdWV1ZSBsZW5ndGhcbiAqL1xuXG5mcmFtZS5xdWV1ZWQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBxdWV1ZS5sZW5ndGg7XG59O1xuXG4vKipcbiAqIENsZWFyIHRoZSBxdWV1ZSBhbmQgcmVtb3ZlIGFsbCBwZW5kaW5nIGpvYnNcbiAqL1xuXG5mcmFtZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgcXVldWUgPSBbXTtcbiAgaWYocmVxdWVzdElkKSByYWYuY2FuY2VsKHJlcXVlc3RJZCk7XG4gIHJlcXVlc3RJZCA9IG51bGw7XG59O1xuXG4vKipcbiAqIEZpcmUgYSBmdW5jdGlvbiBhZnRlciBhbGwgb2YgdGhlIGpvYnMgaW4gdGhlXG4gKiBjdXJyZW50IHF1ZXVlIGhhdmUgZmlyZWQuIFRoaXMgaXMgdXN1YWxseSB1c2VkXG4gKiBpbiB0ZXN0aW5nLlxuICovXG5cbmZyYW1lLmRlZmVyID0gZnVuY3Rpb24gKGZuKSB7XG4gIHJhZihyYWYuYmluZChudWxsLCBmbikpO1xufTtcblxuLyoqXG4gKiBGbHVzaGVzIHRoZSBxdWV1ZSBhbmQgcnVucyBlYWNoIGpvYlxuICovXG5cbmZ1bmN0aW9uIGZsdXNoICgpIHtcbiAgd2hpbGUocXVldWUubGVuZ3RoKSB7XG4gICAgdmFyIGpvYiA9IHF1ZXVlLnNoaWZ0KCk7XG4gICAgam9iLmZuLmNhbGwoam9iLmN4dCk7XG4gIH1cbiAgcmVxdWVzdElkID0gbnVsbDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmcmFtZTtcbn0pO1xuX3JlcXVpcmUucmVnaXN0ZXIoXCJzZWdtZW50aW8tcmFmLXNjcm9sbC9pbmRleC5qc1wiLCBmdW5jdGlvbihleHBvcnRzLCBfcmVxdWlyZSwgbW9kdWxlKXtcbnZhciBFbWl0dGVyID0gX3JlcXVpcmUoJ2VtaXR0ZXInKTtcbnZhciByYWYgPSBfcmVxdWlyZSgncmFmLXF1ZXVlJyk7XG52YXIgZW1pdHRlciA9IG5ldyBFbWl0dGVyKCk7XG5cbi8qKlxuICogR2V0IHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvblxuICovXG5cbmZ1bmN0aW9uIHNjcm9sbFBvc2l0aW9uKCkge1xuICBpZiAod2luZG93LnBhZ2VZT2Zmc2V0KSByZXR1cm4gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICByZXR1cm4gKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBkb2N1bWVudC5ib2R5LnBhcmVudE5vZGUgfHwgZG9jdW1lbnQuYm9keSkuc2Nyb2xsVG9wO1xufVxuXG4vKipcbiAqIEVtaXQgYSBzY3JvbGwgZXZlbnQuIFRoaXMgd2lsbCBvbmx5XG4gKiBiZSBjYWxsZWQgb25jZSBwZXIgZnJhbWVcbiAqXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICovXG5cbmZ1bmN0aW9uIGVtaXQoZXZlbnQpIHtcbiAgZW1pdHRlci5lbWl0KCdzY3JvbGwnLCBldmVudCwgc2Nyb2xsUG9zaXRpb24oKSk7XG59XG5cbi8qKlxuICogRXZlcnkgc2Nyb2xsIGV2ZW50IHdpbGwgZW1pdCBhbiBldmVudCBvbmNlXG4gKiBwZXIgZnJhbWUuXG4gKi9cblxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uKCl7XG4gIHJhZi5vbmNlKGVtaXQpO1xufSwgZmFsc2UpO1xuXG4vKipcbiAqIEV4cG9ydCB0aGUgZW1pdHRlciBmb3IgYmluZGluZyB0byB3aW5kb3dcbiAqIHNjcm9sbCBldmVudHMgaW5zdGVhZCBvZiB1c2luZyB0aGUgd2luZG93XG4gKiBkaXJlY3RseS5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtaXR0ZXI7XG5cbn0pO1xuXG5cblxuXG5cblxuXG5cbl9yZXF1aXJlLmFsaWFzKFwiY29tcG9uZW50LXF1ZXJ5L2luZGV4LmpzXCIsIFwiV2ViaXBhY2svZGVwcy9xdWVyeS9pbmRleC5qc1wiKTtcbl9yZXF1aXJlLmFsaWFzKFwiY29tcG9uZW50LXF1ZXJ5L2luZGV4LmpzXCIsIFwicXVlcnkvaW5kZXguanNcIik7XG5cbl9yZXF1aXJlLmFsaWFzKFwiY29tcG9uZW50LWVtaXR0ZXIvaW5kZXguanNcIiwgXCJXZWJpcGFjay9kZXBzL2VtaXR0ZXIvaW5kZXguanNcIik7XG5fcmVxdWlyZS5hbGlhcyhcImNvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzXCIsIFwiZW1pdHRlci9pbmRleC5qc1wiKTtcblxuX3JlcXVpcmUuYWxpYXMoXCJhbnRob255c2hvcnQtc3RhdGljLXJvdXRlci9pbmRleC5qc1wiLCBcIldlYmlwYWNrL2RlcHMvc3RhdGljLXJvdXRlci9pbmRleC5qc1wiKTtcbl9yZXF1aXJlLmFsaWFzKFwiYW50aG9ueXNob3J0LXN0YXRpYy1yb3V0ZXIvaW5kZXguanNcIiwgXCJzdGF0aWMtcm91dGVyL2luZGV4LmpzXCIpO1xuX3JlcXVpcmUuYWxpYXMoXCJjb21wb25lbnQtZW1pdHRlci9pbmRleC5qc1wiLCBcImFudGhvbnlzaG9ydC1zdGF0aWMtcm91dGVyL2RlcHMvZW1pdHRlci9pbmRleC5qc1wiKTtcblxuX3JlcXVpcmUuYWxpYXMoXCJzZWdtZW50aW8tcmFmLXNjcm9sbC9pbmRleC5qc1wiLCBcIldlYmlwYWNrL2RlcHMvcmFmLXNjcm9sbC9pbmRleC5qc1wiKTtcbl9yZXF1aXJlLmFsaWFzKFwic2VnbWVudGlvLXJhZi1zY3JvbGwvaW5kZXguanNcIiwgXCJyYWYtc2Nyb2xsL2luZGV4LmpzXCIpO1xuX3JlcXVpcmUuYWxpYXMoXCJjb21wb25lbnQtZW1pdHRlci9pbmRleC5qc1wiLCBcInNlZ21lbnRpby1yYWYtc2Nyb2xsL2RlcHMvZW1pdHRlci9pbmRleC5qc1wiKTtcblxuX3JlcXVpcmUuYWxpYXMoXCJhbnRob255c2hvcnQtcmFmLXF1ZXVlL2luZGV4LmpzXCIsIFwic2VnbWVudGlvLXJhZi1zY3JvbGwvZGVwcy9yYWYtcXVldWUvaW5kZXguanNcIik7XG5fcmVxdWlyZS5hbGlhcyhcImNvbXBvbmVudC1yYWYvaW5kZXguanNcIiwgXCJhbnRob255c2hvcnQtcmFmLXF1ZXVlL2RlcHMvcmFmL2luZGV4LmpzXCIpO1xubW9kdWxlLmV4cG9ydHMgPSBfcmVxdWlyZTsiLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIHRvcGljcyA9IHt9O1xuICByZXR1cm4ge1xuXG4gICAgc3Vic2NyaWJlOiBmdW5jdGlvbiAodG9waWMsIGxpc3RlbmVyKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHRvcGljJ3Mgb2JqZWN0IGlmIG5vdCB5ZXQgY3JlYXRlZFxuICAgICAgaWYgKCF0b3BpY3NbdG9waWNdKVxuICAgICAgICB0b3BpY3NbdG9waWNdID0geyBxdWV1ZTogW10gfVxuXG4gICAgICAvLyBBZGQgdGhlIGxpc3RlbmVyIHRvIHRoZSBxdWV1ZVxuICAgICAgdmFyIGluZGV4ID0gdG9waWNzW3RvcGljXS5xdWV1ZS5wdXNoKGxpc3RlbmVyKSAtIDE7XG5cbiAgICAgIC8vIFByb3ZpZGUgaGFuZGxlIGJhY2sgZm9yIHJlbW92YWwgb2YgdG9waWNcbiAgICAgIHJldHVybiAoZnVuY3Rpb24gKHRvcGljLCBpbmRleCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgZGVsZXRlIHRvcGljc1t0b3BpY10ucXVldWVbaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSkodG9waWMsIGluZGV4KTtcbiAgICB9LFxuXG4gICAgcHVibGlzaDogZnVuY3Rpb24gKHRvcGljLCBpbmZvKSB7XG4gICAgICAvLyBJZiB0aGUgdG9waWMgZG9lc24ndCBleGlzdCwgb3IgdGhlcmUncyBubyBsaXN0ZW5lcnMgaW4gcXVldWUsIGp1c3QgbGVhdmVcbiAgICAgIGlmICghdG9waWNzW3RvcGljXSB8fCAhdG9waWNzW3RvcGljXS5xdWV1ZS5sZW5ndGgpIHJldHVybjtcblxuICAgICAgLy8gQ3ljbGUgdGhyb3VnaCB0b3BpY3MgcXVldWUsIGZpcmUhXG4gICAgICB2YXIgaXRlbXMgPSB0b3BpY3NbdG9waWNdLnF1ZXVlO1xuICAgICAgaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtKGluZm98fHt9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59KSgpO1xuIl19

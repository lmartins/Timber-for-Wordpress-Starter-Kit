
/**
 * Require the given path.
 *
 * @param {String} path
 * @return {Object} exports
 * @api public
 */

function require(path, parent, orig) {
  var resolved = require.resolve(path);

  // lookup failed
  if (null == resolved) {
    orig = orig || path;
    parent = parent || 'root';
    var err = new Error('Failed to require "' + orig + '" from "' + parent + '"');
    err.path = orig;
    err.parent = parent;
    err.require = true;
    throw err;
  }

  var module = require.modules[resolved];

  // perform real require()
  // by invoking the module's
  // registered function
  if (!module._resolving && !module.exports) {
    var mod = {};
    mod.exports = {};
    mod.client = mod.component = true;
    module._resolving = true;
    module.call(this, mod.exports, require.relative(resolved), mod);
    delete module._resolving;
    module.exports = mod.exports;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Registered aliases.
 */

require.aliases = {};

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

require.resolve = function(path) {
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
    if (require.modules.hasOwnProperty(path)) return path;
    if (require.aliases.hasOwnProperty(path)) return require.aliases[path];
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

require.normalize = function(curr, path) {
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

require.register = function(path, definition) {
  require.modules[path] = definition;
};

/**
 * Alias a module definition.
 *
 * @param {String} from
 * @param {String} to
 * @api private
 */

require.alias = function(from, to) {
  if (!require.modules.hasOwnProperty(from)) {
    throw new Error('Failed to alias "' + from + '", it does not exist');
  }
  require.aliases[to] = from;
};

/**
 * Return a require function relative to the `parent` path.
 *
 * @param {String} parent
 * @return {Function}
 * @api private
 */

require.relative = function(parent) {
  var p = require.normalize(parent, '..');

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
    return require(resolved, parent, path);
  }

  /**
   * Resolve relative to the parent.
   */

  localRequire.resolve = function(path) {
    var c = path.charAt(0);
    if ('/' == c) return path.slice(1);
    if ('.' == c) return require.normalize(p, path);

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
    return require.modules.hasOwnProperty(localRequire.resolve(path));
  };

  return localRequire;
};
require.register("component-query/index.js", function(exports, require, module){
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
require.register("component-emitter/index.js", function(exports, require, module){

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
require.register("anthonyshort-static-router/index.js", function(exports, require, module){
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
require.register("component-raf/index.js", function(exports, require, module){
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
require.register("anthonyshort-raf-queue/index.js", function(exports, require, module){
var raf = require('raf');
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
require.register("segmentio-raf-scroll/index.js", function(exports, require, module){
var Emitter = require('emitter');
var raf = require('raf-queue');
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








require.alias("component-query/index.js", "Webipack/deps/query/index.js");
require.alias("component-query/index.js", "query/index.js");

require.alias("component-emitter/index.js", "Webipack/deps/emitter/index.js");
require.alias("component-emitter/index.js", "emitter/index.js");

require.alias("anthonyshort-static-router/index.js", "Webipack/deps/static-router/index.js");
require.alias("anthonyshort-static-router/index.js", "static-router/index.js");
require.alias("component-emitter/index.js", "anthonyshort-static-router/deps/emitter/index.js");

require.alias("segmentio-raf-scroll/index.js", "Webipack/deps/raf-scroll/index.js");
require.alias("segmentio-raf-scroll/index.js", "raf-scroll/index.js");
require.alias("component-emitter/index.js", "segmentio-raf-scroll/deps/emitter/index.js");

require.alias("anthonyshort-raf-queue/index.js", "segmentio-raf-scroll/deps/raf-queue/index.js");
require.alias("component-raf/index.js", "anthonyshort-raf-queue/deps/raf/index.js");

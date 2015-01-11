<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * ----------------------------------------------------------------------------
 * DISABLE PINGBACKS
 * ----------------------------------------------------------------------------
 *
 * See: http://wptavern.com/how-to-prevent-wordpress-from-participating-in-pingback-denial-of-service-attacks
 *
 * @since 2.2.3
 */
add_filter( 'xmlrpc_methods', 'bfg_remove_xmlrpc_pingback_ping' );
function bfg_remove_xmlrpc_pingback_ping( $methods ) {

  unset($methods['pingback.ping']);
  return $methods;

};

<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


if (!class_exists('Timber')){
	add_action( 'admin_notices', function(){
		echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . admin_url('plugins.php#timber') . '">' . admin_url('plugins.php') . '</a></p></div>';
	});
	return;
}


/**
 * @param string $function_name
 * @param array (optional) $defaults
 * @param bool (optional) $return_output_buffer Return function output instead of return value (default: false)
 * @return \TimberFunctionWrapper
 */
// TimberHelper::function_wrapper( $function_name = 'default', $defaults = array(), $return_output_buffer = false );

require_once( PARENT_DIR . '/lib/tha/tha-theme-hooks.php' );


/**
 * ----------------------------------------------------------------------------
 * SETUP
 * ----------------------------------------------------------------------------
 */

require_once( PARENT_DIR . '/mdf/setup/init.php' );
require_once( PARENT_DIR . '/mdf/setup/customizer.php' );
require_once( PARENT_DIR . '/mdf/setup/security.php' );
require_once( PARENT_DIR . '/mdf/setup/sidebars.php' );
require_once( PARENT_DIR . '/mdf/setup/taxonomies.php' );
require_once( PARENT_DIR . '/mdf/setup/users.php' );


/**
 * ----------------------------------------------------------------------------
 * DASH
 * ----------------------------------------------------------------------------
 */

require_once( PARENT_DIR . '/mdf/dash/branding.php' );
require_once( PARENT_DIR . '/mdf/dash/editor.php' );
require_once( PARENT_DIR . '/mdf/dash/lists.php' );
require_once( PARENT_DIR . '/mdf/dash/metaboxes.php' );
if ( is_woocommerce_activated() ) {
    require_once( PARENT_DIR . '/mdf/dash/woo.php' );
}

/**
 * ----------------------------------------------------------------------------
 * RENDER
 * ----------------------------------------------------------------------------
 */

require_once( PARENT_DIR . '/mdf/render/archives.php' );
require_once( PARENT_DIR . '/mdf/render/pages.php' );
require_once( PARENT_DIR . '/mdf/render/single.php' );
if ( is_woocommerce_activated() ) {
    require_once( PARENT_DIR . '/mdf/render/woo.php' );
}






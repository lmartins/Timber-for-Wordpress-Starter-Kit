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

require_once( PARENT_DIR . '/mdf/admin/branding.php' );
require_once( PARENT_DIR . '/mdf/admin/editor.php' );
require_once( PARENT_DIR . '/mdf/admin/lists.php' );
require_once( PARENT_DIR . '/mdf/admin/metaboxes.php' );
require_once( PARENT_DIR . '/mdf/admin/taxonomies.php' );
require_once( PARENT_DIR . '/mdf/admin/users.php' );
require_once( PARENT_DIR . '/mdf/admin/widgets.php' );

require_once( PARENT_DIR . '/mdf/archives.php' );
require_once( PARENT_DIR . '/mdf/pages.php' );
require_once( PARENT_DIR . '/mdf/single.php' );
require_once( PARENT_DIR . '/mdf/security.php' );
require_once( PARENT_DIR . '/mdf/woocommerce.php' );
require_once( PARENT_DIR . '/mdf/woocommerce/template-tags.php' );


// require_once( PARENT_DIR . '/mdf/front/head.php' );




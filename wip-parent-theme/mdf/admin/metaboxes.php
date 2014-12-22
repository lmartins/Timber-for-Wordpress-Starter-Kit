<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * ----------------------------------------------------------------------------
 * REMOVE METABOXES
 * Remove postboxes from post types where they not make sense
 * ----------------------------------------------------------------------------
 */

function mw_remove_postboxes() {

  // Remove metaboxes from WooCommerce screens
  remove_meta_box( 'wp-display-header', 'product', 'normal' );
  remove_meta_box( 'postcustom', 'product', 'normal' );                             // Custom fields
  remove_meta_box( 'wp-display-header', 'shop_order', 'normal' );
  remove_meta_box( 'wp-display-header', 'shop_coupon', 'normal' );
  remove_meta_box( 'wp-display-header', 'acf', 'normal' );

  // Remove metaboxes from Banners post type management
  remove_meta_box( 'wp-display-header', 'banners', 'normal' );
  remove_meta_box( 'wpseo_meta', 'banners', 'normal' );

  // Remove metaboxes from Clients post type management
  remove_meta_box( 'wpseo_meta', 'client', 'normal' );

}
add_action( 'do_meta_boxes' , 'mw_remove_postboxes' );



/**
 * ============================================================================
 * META BOXES DEFAULT ORDER
 * Defines the default order for admin metaboxes
 * ============================================================================
 */

// add_action('user_register', 'set_user_metaboxes');
add_action('admin_init', 'mw_set_user_metaboxes');
function mw_set_user_metaboxes($user_id=NULL) {

    // These are the metakeys we will need to update
    $meta_key['order'] = 'meta-box-order_post';
    $meta_key['hidden'] = 'metaboxhidden_post';

    // So this can be used without hooking into user_register
    if ( ! $user_id)
        $user_id = get_current_user_id();

    // Set the default order if it has not been set yet
    if ( ! get_user_meta( $user_id, $meta_key['order'], true) ) {
        $meta_value = array(
            'side' => 'submitdiv,formatdiv,categorydiv,postimagediv',
            'normal' => 'woocommerce-product-data,postexcerpt,tagsdiv-post_tag,postcustom,commentstatusdiv,commentsdiv,trackbacksdiv,slugdiv,authordiv,revisionsdiv',
            'advanced' => '',
        );
        update_user_meta( $user_id, $meta_key['order'], $meta_value );
    }

    // Set the default hiddens if it has not been set yet
    if ( ! get_user_meta( $user_id, $meta_key['hidden'], true) ) {
        $meta_value = array('postcustom','trackbacksdiv','commentstatusdiv','commentsdiv','slugdiv','authordiv','revisionsdiv','postlock');
        update_user_meta( $user_id, $meta_key['hidden'], $meta_value );
    }
}




/**
 * ============================================================================
 * CLOSED METABOXES BY DEFAUT
 * Forces some meta boxes to appear closed by default, unless the user has already
 * interact with them
 * ============================================================================
 */

// add_filter( 'get_user_option_closedpostboxes_post', 'mw_closed_meta_boxes' );

function mw_closed_meta_boxes( $closed ) {
    if ( false === $closed )
      $closed = array(
        'wpac_controls_meta',       // Wordpress Access Control
        'ml_box',                   // Languages
        'featureddiv',              // Featured
        'tagsdiv-post_tag',         // Tags
        'wdfb_opengraph_editor',    // Open Graph Settings
        'ninja_forms_selector',     // Ninja Forms Selector
        'sharing_meta',             // Show Sharing Buttons
        'genesis_inpost_layout_box'
        );

    return $closed;
}


// Change what's hidden by default
// add_filter('default_hidden_meta_boxes', 'child_hide_meta_boxes', 10, 2);
// function child_hide_meta_boxes($hidden, $screen) {
//   if ( 'banners' == $screen->base )
//     $hidden = array('postexcerpt','slugdiv','postcustom','trackbacksdiv', 'commentstatusdiv', 'commentsdiv', 'authordiv', 'revisionsdiv','wp-display-header','genesis_inpost_layout_box');
//     // $hidden = array('postexcerpt','slugdiv','postcustom','trackbacksdiv', 'commentstatusdiv', 'commentsdiv', 'authordiv', 'revisionsdiv','header');
//     // removed 'postexcerpt',
//   return $hidden;
// }

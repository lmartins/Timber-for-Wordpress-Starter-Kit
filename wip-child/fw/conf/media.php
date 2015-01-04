<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/**
 * ----------------------------------------------------------------------------
 * IMAGE SIZES
 * A função só corre ao mudar de tema para não pesar em termos de performance
 * ----------------------------------------------------------------------------
 */

add_action( 'switch_theme', 'wip_enforce_image_size_options' );
function wip_enforce_image_size_options() {

    // IMAGENS WOOCOMMERCE

    $shop_catalog = array(
        'width'     => '260',   // px
        'height'    => '195',   // px
        'crop'      => 1        // true
    );

    $shop_single = array(
        'width'     => '540',   // px
        'height'    => '405',   // px
        'crop'      => 1        // true
    );

    $shop_thumbnail = array(
        'width'     => '120',   // px
        'height'    => '90',   // px
        'crop'      => 1        // true
    );

    update_option( 'shop_catalog_image_size', $shop_catalog );       // Product category thumbs
    update_option( 'shop_single_image_size', $shop_single );         // Single product image
    update_option( 'shop_thumbnail_image_size', $shop_thumbnail );   // Image gallery thumbs


    /**
     * DEFAULT IMAGE SIZES
     */

    update_option('thumbnail_size_w', 220);
    update_option('thumbnail_size_h', 165);
    update_option('medium_size_w', 380);
    update_option('medium_size_h', 285);
    update_option('large_size_w', 800);
    update_option('large_size_h', 600);

    if(false === get_option("thumbnail_crop")) {
        add_option("thumbnail_crop", "1"); }
    else {
        update_option("thumbnail_crop", "1");
    }

    // Medium Size Thumbnail
    if(false === get_option("medium_crop")) {
        add_option("medium_crop", "1"); }
    else {
        update_option("medium_crop", "1");
    }

    // Large Size Thumbnail
    if(false === get_option("large_crop")) {
        add_option("large_crop", "1"); }
    else {
        update_option("large_crop", "1");
    }

}



/**
 * Add new image sizes
 *
 * See: http://wptheming.com/2014/04/features-wordpress-3-9/
 *
 * @since 2.0.0
 */
if ( function_exists( 'add_image_size' ) ) {
    add_image_size( 'home-banner-preview', 400, 248, true );
    add_image_size( 'section-list-thumbnail', 400, 220, true );
};


/**
 * REMOVE DEFAULT IMAGE SIZES
 * http://www.paulund.co.uk/remove-default-wordpress-image-sizes
 */

function mw_remove_default_image_sizes( $sizes) {
    unset( $sizes['thumbnail']);
    unset( $sizes['medium']);
    unset( $sizes['large']);

    return $sizes;
}
// add_filter('intermediate_image_sizes_advanced', 'mw_remove_default_image_sizes');




/**
 * Add new image sizes to media size selection menu
 *
 * See: http://wpdaily.co/top-10-snippets/
 *
 * @since 2.0.0
 */
function bfg_image_size_names_choose( $sizes ) {

  $sizes['section-list-thumbnail'] = 'Section List Thumbnail';
  $sizes['home-banner-preview'] = 'Home Main Banner';
  return $sizes;

}
add_filter( 'image_size_names_choose', 'bfg_image_size_names_choose' );


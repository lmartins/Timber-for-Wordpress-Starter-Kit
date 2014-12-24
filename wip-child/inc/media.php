<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/**
 * Update default image sizes
 */
update_option( 'thumbnail_size_w', 260 );
update_option( 'thumbnail_size_h', 195 );
update_option( 'medium_size_w', 420 );
update_option( 'medium_size_h', 315 );
update_option( 'large_size_w', 800 );
update_option( 'large_size_h', 600 );



/**
 * Force standard image sizes crop mode
 */
// Standard Size Thumbnail
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


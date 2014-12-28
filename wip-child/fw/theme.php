<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/**
 * ----------------------------------------------------------------------------
 * ADDS BREADCRUMBS NAVIGATION
 * Depends on the feature provided by YOAST SEO
 * ----------------------------------------------------------------------------
 */

add_action('tha_content_top','mw_add_breadcrumbs');
function mw_add_breadcrumbs(){
    if ( function_exists('yoast_breadcrumb') ) {
        yoast_breadcrumb('<p class="nav nav--breadcrumbs" id="breadcrumbs">','</p>');
    }
}
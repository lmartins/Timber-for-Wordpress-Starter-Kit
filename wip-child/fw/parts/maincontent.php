<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * ----------------------------------------------------------------------------
 * ADDS BREADCRUMBS NAVIGATION
 * Depends on the feature provided by YOAST SEO
 * ----------------------------------------------------------------------------
 */

function mw_add_breadcrumbs(){
    if ( function_exists('yoast_breadcrumb') ) {
        yoast_breadcrumb('<p am-nav="breadcrumbs" id="breadcrumbs">','</p>');
    }
}
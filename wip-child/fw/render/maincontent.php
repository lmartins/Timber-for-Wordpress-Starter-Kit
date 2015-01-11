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
        if ( !is_home() ) {
            yoast_breadcrumb('<div am-nav="breadcrumbs"><nav>','</nav></div>');
        }
    }
}
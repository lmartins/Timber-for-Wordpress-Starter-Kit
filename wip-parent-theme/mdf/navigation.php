<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


function mw_add_breadcrumbs()
{
    if ( function_exists('yoast_breadcrumb') ) {
        yoast_breadcrumb('<p id="breadcrumbs">','</p>');
    }
}
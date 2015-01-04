<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/**
 * Adds the header image to a hook position
 */
function mw_add_header_banner($context){
    $image = get_header_image();
    if ($image && ! is_front_page() )
        echo "<img src=" . get_header_image() . " >";
}
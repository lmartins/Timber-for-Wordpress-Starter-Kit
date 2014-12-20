<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * CHECK IF HAS SUBPAGES
 * Checks if the current page has subpages
 * @return boolean [description]
 */
function mw_check_for_child_pages() {
    global $post;

    $children = get_pages( array( 'child_of' => $post->ID ) );
    if( count( $children ) == 0 ) {
        return false;
    } else {
        return true;
    }
}
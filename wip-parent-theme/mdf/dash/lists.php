<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * LIST COLUMNS
 * Remove columns from posts and pages lists
 */

function mw_remove_post_columns($columns) {
    unset( $columns['author'] );
    unset( $columns['comments'] );
    // unset( $columns['wpseo-score'] );
    unset( $columns['wpseo-title'] );
    unset( $columns['wpseo-metadesc'] );
    unset( $columns['wpseo-focuskw'] );

    return $columns;
}
add_filter('manage_edit-post_columns', 'mw_remove_post_columns');
add_filter('manage_edit-product_columns', 'mw_remove_post_columns');
add_filter('manage_edit-banners_columns', 'mw_remove_post_columns');
add_filter('manage_edit-page_columns', 'mw_remove_post_columns');


<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



// Remove WooCommerce Updater Notice from the admin
remove_action('admin_notices', 'woothemes_updater_notice');

// Remove todos os estilos inseridos pelo WooCommerce
add_filter( 'woocommerce_enqueue_styles', '__return_false' );


/**
 * Configura as colunas que devem permanecer visiveis na lista de produtos
 */
function mw_remove_product_columns($columns) {
    unset( $columns['featured'] );

    return $columns;
}
add_filter('manage_edit-product_columns', 'mw_remove_product_columns', 99);



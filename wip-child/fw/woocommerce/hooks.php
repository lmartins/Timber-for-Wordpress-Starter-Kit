<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * Header
 * @see  storefront_product_search()
 * @see  storefront_header_cart()
 */
// add_action( 'storefront_header', 'storefront_product_search',   40 );
add_action( 'mw_mainMenu_options', 'storefront_header_cart', 10, 2 );

// add_filter( 'genesis_nav_items', 'mw_add_offcanvas_toggler', 10, 2 );
// add_filter( 'wp_nav_menu_items', 'mw_add_offcanvas_toggler', 10, 2 );
// add_action( 'genesis_header', 'mw_add_offcanvas_toggler' );
<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * Theme Main Configuration
 */

add_action( 'after_setup_theme',            'child_theme_setup' );
add_action( 'widgets_init',                 'mw_widgets_init' );
add_action( 'wp_enqueue_scripts',           'mw_scripts', 10 );


/**
 * ----------------------------------------------------------------------------
 * HEADER
 * ----------------------------------------------------------------------------
 */
// add_action('mwh_banner', 'mw_add_header_banner');
add_action( 'mw_mainMenu_options', 'storefront_header_cart', 10, 2 );



/**
 * ----------------------------------------------------------------------------
 * MAIN CONTENT
 * ----------------------------------------------------------------------------
 */

add_action('tha_content_top','mw_add_breadcrumbs', 1);




/**
 * ----------------------------------------------------------------------------
 * WOOCOMMERCE / ARCHIVES
 * ----------------------------------------------------------------------------
 */


remove_action('woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail');




/**
 * ----------------------------------------------------------------------------
 * WOOCOMMERCE / SINGLE
 * Ver '../../../plugins/woocommerce/includes/wc-template-hooks.php'
 * ----------------------------------------------------------------------------
 */

remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );

// remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_related_products', 20 );
// add_action( 'woocommerce_after_single_product', 'woocommerce_output_related_products', 20 );


/**
 * Sale flashes
 *
 * @see woocommerce_show_product_loop_sale_flash()
 * @see woocommerce_show_product_sale_flash()
 */
remove_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 10 );
add_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_show_product_loop_sale_flash', 9 );
remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_sale_flash', 10 );
add_action( 'woocommerce_single_product_summary', 'woocommerce_show_product_sale_flash', 1 );



/**
 * Footer
 *
 * @see woocommerce_demo_store()
 */
// remove_action( 'wp_footer', 'woocommerce_demo_store' );
// add_action( 'tha_content_top', 'woocommerce_demo_store' );
<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// add_theme_support( 'woocommerce' ); - Mudei para a activação de tema

// Remove WooCommerce Updater Notice from the admin
remove_action('admin_notices', 'woothemes_updater_notice');

// Remove todos os estilos inseridos pelo WooCommerce
add_filter( 'woocommerce_enqueue_styles', '__return_false' );



/**
 * Remove WooCommerce Breadcrumbs
 */
add_action( 'init', 'mw_remove_wc_breadcrumbs' );
function mw_remove_wc_breadcrumbs() {
    remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
}


/**
 * ----------------------------------------------------------------------------
 * Configura as colunas que devem permanecer visiveis na lista de produtos
 * ----------------------------------------------------------------------------
 */
function mw_remove_product_columns($columns) {
    unset( $columns['featured'] );

    return $columns;
}
add_filter('manage_edit-product_columns', 'mw_remove_product_columns', 99);


/**
 * ----------------------------------------------------------------------------
 * DISABLE WOOCOMMERCE WIDGETS
 * ----------------------------------------------------------------------------
 * @return [type] [description]
 */
function remove_woo_widgets() {
    // unregister_widget( 'WC_Widget_Recent_Products' );
    // unregister_widget( 'WC_Widget_Featured_Products' );
    // unregister_widget( 'WC_Widget_Product_Categories' );
    // unregister_widget( 'WC_Widget_Product_Tag_Cloud' );
    // unregister_widget( 'WC_Widget_Cart' );
    // unregister_widget( 'WC_Widget_Layered_Nav' );
    // unregister_widget( 'WC_Widget_Layered_Nav_Filters' );
    // unregister_widget( 'WC_Widget_Price_Filter' );
    // unregister_widget( 'WC_Widget_Product_Search' );
    // unregister_widget( 'WC_Widget_Top_Rated_Products' );
    // unregister_widget( 'WC_Widget_Recent_Reviews' );
    // unregister_widget( 'WC_Widget_Recently_Viewed' );
    // unregister_widget( 'WC_Widget_Best_Sellers' );
    // unregister_widget( 'WC_Widget_Onsale' );
    // unregister_widget( 'WC_Widget_Random_Products' );
    unregister_widget( 'WC_Widget_Products' );
}
add_action( 'widgets_init', 'remove_woo_widgets' );




/**
 * Customizer Shop Manager Role Permissions
 * @return [type] [description]
 */
function mw_add_shop_manager_role() {

    // delete_option('mw_add_cap_shop_manager_once');
    if ( get_option( 'mw_add_cap_shop_manager_once' ) != 'done' ) {
        // let editor manage users

        $edit_shop_manager = get_role('shop_manager'); // Get the user role

        $edit_shop_manager->add_cap('list_users');
        $edit_shop_manager->add_cap('add_users');
        $edit_shop_manager->add_cap('edit_users');
        $edit_shop_manager->add_cap('create_users');
        $edit_shop_manager->add_cap('delete_users');

        update_option( 'mw_add_cap_shop_manager_once', 'done' );
    }

}
add_action( 'init', 'mw_add_shop_manager_role' );




/**
 * ----------------------------------------------------------------------------
 * HIDES THE WOOCOMMERCE PAGES FROM NON ADMINISTRATORS
 * See: http://stackoverflow.com/questions/26744680/how-to-hide-or-block-the-woocommerce-generated-pages/26765913#26765913
 * ----------------------------------------------------------------------------
 */

add_action( 'pre_get_posts', function( $query ) {
    if ( !is_admin() || !$query->is_main_query() ) return;

    global $pagenow, $post_type;

    if ( $pagenow == 'edit.php' && $post_type == 'page' && !in_array( 'administrator', wp_get_current_user()->roles ) ) {

        $exclude = array_map(
            function( $item ) { return get_option( $item ); },
            array( 'woocommerce_shop_page_id', 'woocommerce_cart_page_id', 'woocommerce_checkout_page_id', 'woocommerce_myaccount_page_id' )
        );

        $query->set( 'post__not_in', array_filter( $exclude ) );

    }

});

function remove_ids_from_nestedpages( $args )
{
    // Checks if user is administrator
    if ( current_user_can( 'manage_options' ) ) return $args;

    // Array of IDs you want to remove
    $args['post__not_in'] = array_map(
        function( $item ) { return get_option( $item ); },
        array( 'woocommerce_shop_page_id', 'woocommerce_cart_page_id', 'woocommerce_checkout_page_id', 'woocommerce_myaccount_page_id' )
    );

    return $args;
}
add_filter('nestedpages_page_listing', 'remove_ids_from_nestedpages');

<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * Cart Link
 * Displayed a link to the cart including the number of items present and the cart total
 * @param  array $settings Settings
 * @return array           Settings
 * @since  1.0.0
 */
if ( ! function_exists( 'storefront_cart_link' ) ) {
    function storefront_cart_link() {
        if ( is_cart() ) {
            $class = 'current-menu-item';
        } else {
            $class = '';
        }
        ?>
        <li class="<?php echo esc_attr( $class ); ?>">
            <a class="cart-contents" href="<?php echo esc_url( WC()->cart->get_cart_url() ); ?>" title="<?php _e( 'View your shopping cart', 'storefront' ); ?>">
                <?php echo wp_kses_data( WC()->cart->get_cart_total() ); ?> <span class="count"><?php echo wp_kses_data( sprintf( _n( '%d item', '%d items', WC()->cart->get_cart_contents_count(), 'storefront' ), WC()->cart->get_cart_contents_count() ) );?></span>
            </a>
        </li>
        <?php
    }
}




/**
 * Display Header Cart
 * @since  1.0.0
 * @uses  is_woocommerce_activated() check if WooCommerce is activated
 * @return void
 */
function storefront_header_cart() {
    if ( is_woocommerce_activated() ) { ?>
        <li>
            <ul class="site-header-cart menu">
                <?php storefront_cart_link(); ?>
                <?php the_widget( 'WC_Widget_Cart', 'title=' ); ?>
            </ul>
        </li>
    <?php
    }
}




/**
 * Remove WooCommerce Breadcrumbs
 */
add_action( 'init', 'mw_remove_wc_breadcrumbs' );
function mw_remove_wc_breadcrumbs() {
    remove_action( 'woocommerce_before_main_content', 'woocommerce_breadcrumb', 20, 0 );
}

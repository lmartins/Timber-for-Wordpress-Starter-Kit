<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */

function mw_widgets_init() {

    register_sidebar( array(
        'name'          => __( 'Home Contents', 'wip' ),
        'id'            => 'home-widgets',
        'description'   => __( 'Display widgetized information in your website Homepage', 'wip' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Main Sidebar', 'wip' ),
        'id'            => 'sidebar-1',
        'description'   => '',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    register_sidebar( array(
        'name'          => __( 'Shop Sidebar', 'wip' ),
        'id'            => 'shop-sidebar',
        'description'   => '',
        'before_widget' => '<aside id="%1$s" class="widget %2$s">',
        'after_widget'  => '</aside>',
        'before_title'  => '<h3 class="widget-title">',
        'after_title'   => '</h3>',
    ) );

    $footer_widget_regions = apply_filters( 'storefront_footer_widget_regions', 4 );

    for ( $i = 1; $i <= intval( $footer_widget_regions ); $i++ ) {
        register_sidebar( array(
            'name'              => sprintf( __( 'Footer %d', 'wip' ), $i ),
            'id'                => sprintf( 'footer-%d', $i ),
            'description'       => sprintf( __( 'Widgetized Footer Region %d.', 'wip' ), $i ),
            'before_widget'     => '<aside id="%1$s" class="widget %2$s">',
            'after_widget'      => '</aside>',
            'before_title'      => '<h3>',
            'after_title'       => '</h3>',
            )
        );
    }

}

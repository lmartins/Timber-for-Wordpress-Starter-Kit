<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/**
 * REGISTA AS SIDEBARS
 * @return [type] [description]
 */
function mw_register_sidebars() {
    register_sidebar( array(
        'name' => __( 'Footer', 'mw-theme' ),
        'id' => 'sidebar-1',
        'description' => __( 'Widgets in this area will be shown on all posts and pages.', 'mw-theme' ),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title' => '<h3>',
        'after_title' => '</h3>',
    ) );
}
add_action( 'widgets_init', 'mw_register_sidebars' );
<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/**
 * REGISTA AS SIDEBARS
 * @return [type] [description]
 */
function mw_register_sidebars() {
    register_sidebar( array(
        'name' => __( 'Main Sidebar', 'mw-theme' ),
        'id' => 'sidebar-1',
        'description' => __( 'Widgets in this area will be shown on all posts and pages.', 'mw-theme' ),
        'before_title' => '<h1>',
        'after_title' => '</h1>',
    ) );
}
add_action( 'widgets_init', 'mw_register_sidebars' );
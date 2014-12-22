<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * ----------------------------------------------------------------------------
 * BANNER CUSTOM POST TYPE
 * ----------------------------------------------------------------------------
 */
add_action('init', 'cptui_register_my_cpt_banners');
function cptui_register_my_cpt_banners() {
    register_post_type('banners', array(
        'label' => 'Banners',
        'description' => 'Manage the banner elements displayed on the site homepage',
        'menu_icon' => 'dashicons-align-center',
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'map_meta_cap' => true,
        'hierarchical' => false,
        'rewrite' => array('slug' => 'banners', 'with_front' => true),
        'query_var' => true,
        'exclude_from_search' => true,
        'supports' => array('title'),
        'labels' => array (
            'name' => 'Banners',
            'singular_name' => 'Banner',
            'menu_name' => 'Banners',
            'add_new' => 'Add Banner',
            'add_new_item' => 'Add New Banner',
            'edit' => 'Edit',
            'edit_item' => 'Edit Banner',
            'new_item' => 'New Banner',
            'view' => 'View Banner',
            'view_item' => 'View Banner',
            'search_items' => 'Search Banners',
            'not_found' => 'No Banners Found',
            'not_found_in_trash' => 'No Banners Found in Trash',
            'parent' => 'Parent Banner',
        )
    ) );
}



/**
 * Esconder as opções de pré-visualização no front-end para Banners
 * @return [type] [description]
 */
// function posttype_admin_css() {
//     global $post_type;
//     $post_types = array(
//                         /* set post types */
//                         'banners',
//                   );
//     if(in_array($post_type, $post_types))
//     echo '<style type="text/css">span.view, #post-preview, #view-post-btn{display: none;}</style>';
// }
// add_action( 'admin_head-post-new.php', 'posttype_admin_css' );
// add_action( 'admin_head-post.php', 'posttype_admin_css' );
// add_action( 'admin_head-edit.php', 'posttype_admin_css' );


/**
 * REMOVE BANNERS METABOXES
 * Remove postboxes from post types where they not make sense
 */

// function mw_remove_banner_metaboxes() {

//   remove_meta_box( 'sharing_meta', 'banners', 'high' );

// }
// add_action( 'do_meta_boxes' , 'mw_remove_banner_metaboxes' );

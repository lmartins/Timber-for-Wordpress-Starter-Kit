<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Register Multiple Taxonomies
 *
 * @author Bill Erickson
 * @link http://www.billerickson.net/code/register-multiple-taxonomies/
 */

function mw_register_taxonomies() {

    $taxonomies = array(
        array(
            'slug'        => 'featured',
            'single_name' => 'Featured',
            'plural_name' => 'Featured',
            'show_ui'     => true,
            'show_admin_column'  => true,
            'hierarchical' => true,
            'post_type'   => array( 'post', 'page' ),
            'rewrite'     => array( 'slug' => 'featured' ),
        ),
    );

    foreach( $taxonomies as $taxonomy ) {
        $labels = array(
            'name' => $taxonomy['plural_name'],
            'singular_name' => $taxonomy['single_name'],
            'search_items' =>  'Search ' . $taxonomy['plural_name'],
            'all_items' => 'All ' . $taxonomy['plural_name'],
            'parent_item' => 'Parent ' . $taxonomy['single_name'],
            'parent_item_colon' => 'Parent ' . $taxonomy['single_name'] . ':',
            'edit_item' => 'Edit ' . $taxonomy['single_name'],
            'update_item' => 'Update ' . $taxonomy['single_name'],
            'add_new_item' => 'Add New ' . $taxonomy['single_name'],
            'new_item_name' => 'New ' . $taxonomy['single_name'] . ' Name',
            'menu_name' => $taxonomy['plural_name']
        );

        $rewrite = isset( $taxonomy['rewrite'] ) ? $taxonomy['rewrite'] : array( 'slug' => $taxonomy['slug'] );
        $hierarchical = isset( $taxonomy['hierarchical'] ) ? $taxonomy['hierarchical'] : true;
        $show_admin_column = isset( $taxonomy['show_admin_column'] ) ? $taxonomy['show_admin_column'] : false;
        $show_ui = isset( $taxonomy['show_ui'] ) ? $taxonomy['show_ui'] : true;

        register_taxonomy( $taxonomy['slug'], $taxonomy['post_type'], array(
            'hierarchical' => $hierarchical,
            'labels' => $labels,
            'show_ui' => $show_ui,
            'query_var' => true,
            'show_admin_column' => $show_admin_column,
            'rewrite' => $rewrite,
        ));
    }

}
add_action( 'init', 'mw_register_taxonomies' );

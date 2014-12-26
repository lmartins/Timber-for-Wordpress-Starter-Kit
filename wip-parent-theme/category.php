<?php
/**
 * The template for displaying Author Archive pages
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package  WordPress
 * @subpackage  Timber
 * @since    Timber 0.1
 */
global $wp_query;

$data = Timber::get_context();
$data['posts'] = Timber::get_posts();
if (isset($wp_query->query_vars['cat'])){

    $category = get_category ($cat);

    if(!$category->category_parent) {

        // if category has NO parent
        $args = array(
            'child_of' => $category->cat_ID,
            'orderby' => 'menu_order',
            'order'   => 'ASC',
            'depth' => 0,
            'hide_empty' => 0,
            'title_li'  => __('Categories','wip'),
            'echo' => 0
            );
        $children = get_categories( $args );
        // change depth to 1 if only the top level sub categories should be shown i.e., with children NOT expanded

    } else {

        // if category has parent, show children of current category's parent
        $args = array(
            'parent' => $category->cat_ID,
            // 'child_of' => $category->category_parent,
            'orderby' => 'menu_order',
            'order'   => 'ASC',
            'depth' => 0,
            'hide_empty' => 0,
            'title_li'  => __('Categories','wip'),
            'echo' => 0
            );
        $children = get_categories( $args );
        // change depth to 1 if only the top level sub categories should be shown i.e., with children NOT expanded
    }

    $data['children'] = $children;
    $data['edit_post_link'] = TimberHelper::function_wrapper( 'edit_post_link', array( __( 'Edit' ), '<span class="edit-link">', '</span>' ) );

    $data['get_image'] = TimberHelper::function_wrapper( 'get_field', array( 'category_image', 'category_8' ) );


    // $author = new TimberUser($wp_query->query_vars['author']);
    // $data['author'] = $author;
    // $data['title'] = 'Author Archives: ' . $author->name();
}
Timber::render(array('category.twig', 'archive.twig'), $data);

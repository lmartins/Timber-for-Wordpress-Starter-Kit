<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly



/**
 * CHECK IF HAS SUBPAGES
 * Checks if the current page has subpages
 * @return boolean [description]
 */
function has_children() {
    global $post;


    $args = array(
        'parent' => $post->ID
        );

    $children = get_pages( $args );

    if( count( $children ) == 0 ) {
        return false;
    } else {
        return true;
    }
}

/**
 * APPENDS SUBPAGES NAVIGATION TO A PAGE
 * Uses a custom field configured by the user to select if should
 * display or not this info
 */

add_action ( 'tha_content_bottom', 'mw_list_subpages' );
function mw_list_subpages()
{
    $show_subpages = get_field('show_sub-pages');

    if ( has_children() && $show_subpages && ! is_search() ) {

        $page_id = get_the_ID();
        $args = array(
            'post_type'      => array( 'page'),
            'post_parent'    => $page_id,
            'posts_per_page' => -1,
            'post_status'    => 'publish',
            'paged'          => get_query_var( 'paged' ),
            'order'          => 'ASC',
            'order_by'       => 'menu_order'
            );

        global $wp_query;
        $wp_query = new WP_Query( $args );

        if( have_posts() ):
            echo '<div class="list sub-pages-list">';
            while( have_posts() ): the_post();

                $classes = 'sub-page-item';
                if( 0 == $wp_query->current_post || 0 == $wp_query->current_post % 2 )
                    $classes .= ' first';
                if( has_post_thumbnail() )
                    $classes .= ' has-post-thumbnail';
                    $out = '<div id="" class="item-' . $wp_query->current_post . ' ' . $classes . '"><a href="' . get_permalink() . '">';
                    $out .= get_the_post_thumbnail( $wp_query->post->ID, 'section-list-thumbnail' );
                    $out .= '<div class="item-details"><h3 class="title">' .  the_title('','',false) . '</h3>';
                    $out .= '<p>' . get_the_excerpt() . '</p>';
                    $out .= '</div></a></div>';

                    echo $out;

            endwhile;
            echo '</div>';

        endif;

        wp_reset_query();

    }
}

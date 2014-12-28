<?php
/**
 * The main template file
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists
 *
 * Methods for TimberHelper can be found in the /functions sub-directory
 *
 * @package     WordPress
 * @subpackage  Timber
 * @since       Timber 0.1
 */

    if (!class_exists('Timber')){
        echo 'Timber not activated. Make sure you activate the plugin in <a href="/wp-admin/plugins.php#timber">/wp-admin/plugins.php</a>';
        return;
    }

    $context = Timber::get_context();


    // Banners Top
    $args = array(
        'numberposts' => 5,
        'post_type'   => 'banners',
        'meta_key'    => 'banner_type',
        'meta_value'  => 'banner_top',
        'order'       => 'ASC',
        'orderby'     => 'menu_order'
    );

    if ( is_front_page() ) {
        $context['banners_top'] = Timber::get_posts( $args );
        // $context["link"] = get_field( 'banner_link' );
        $context["link"] = get_field( 'link' ) ? get_permalink(get_field( 'link' )[0]) : false;
    }

    $context['posts'] = Timber::get_posts();
    $context['site_view'] = 'home';
    $context['layout'] = 'content-full-width';

    $templates = array('index.twig');

    if ( is_home() ){
        array_unshift($templates, 'home.twig');
    }

    Timber::render($templates, $context);



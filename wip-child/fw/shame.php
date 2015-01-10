<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


// add_action('tha_content_top','teste');
function teste()
{
    echo 'teste';
}


// add_action('tha_entry_top', 'my_function_with_args', 10, 3);

function my_function_with_args($context){
    echo 'For the post with title '.$context['post']->post_title;
}




/**
 * Envolve a lista de resultados num container
 */
function mw_add_search_loop_markup_start(){
    if ( is_search() ) {
        echo '<div class="loop-search-results">';
        add_action( 'genesis_loop', 'mw_close_div', 99 );
    }
}
add_action( 'tha_before_main_content', 'mw_add_search_loop_markup_start', 3 );




/**
 * Adicionar formulário de pesquisa por cima dos resultados
 */

// add_action( 'woocommerce_before_main_content', 'appendSearchForm', 1 );
add_action( 'tha_entry_content', 'appendSearchForm', 1 );

function appendSearchForm()
{
    if ( is_search() ) {
        echo the_widget( 'WP_Widget_Search' );
    }
}

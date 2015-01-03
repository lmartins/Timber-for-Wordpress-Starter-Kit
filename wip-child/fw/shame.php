<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


// add_action('tha_header_after','teste');
function teste()
{
    echo 'teste';
}


// add_action('tha_entry_top', 'my_function_with_args', 10, 3);

function my_function_with_args($context){
    echo 'For the post with title '.$context['post']->post_title;
}


/**
 * Adds the header image to a hook position
 */
function mw_add_header_banner($context){
    $image = get_header_image();
    if ($image && ! is_front_page() )
        echo "<img src=" . get_header_image() . " >";
}
// add_action('mwh_banner', 'mw_add_header_banner');



// TODO: Arrumar
remove_action('woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_thumbnail');
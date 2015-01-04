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



<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * CUSTOMIZE THE READ MORE ADD ADD A LINK TO IT
 */
function new_excerpt_more( $more ) {
    return ' <a class="read-more" href="'. get_permalink( get_the_ID() ) . '">' . '...' . __('Read More', 'webipack') . '</a>';
}
add_filter( 'excerpt_more', 'new_excerpt_more' );

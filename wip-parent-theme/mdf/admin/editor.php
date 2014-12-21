<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/**
 * Adicionar formatação de textos para editor mostrar com o mesmo
 * aspecto do do front-end
 */

function mw_theme_add_editor_styles() {
    add_editor_style( 'build/css/editor.css' );
}
add_action( 'after_setup_theme', 'mw_theme_add_editor_styles' );


/**
 * ADD A CLASS SELECTOR TO THE EDITOR
 */
// Callback function to insert 'styleselect' into the $buttons array
function my_mce_buttons_2( $buttons ) {
    array_unshift( $buttons, 'styleselect' );
    return $buttons;
}
// Register our callback to the appropriate filter
add_filter('mce_buttons_2', 'my_mce_buttons_2');


// Callback function to filter the MCE settings
function my_mce_before_init_insert_formats( $init_array ) {

    // Define the style_formats array
    $style_formats = array(

        // Each array child is a format with it's own settings
        array(
            'title' => 'Lead Paragraph',
            'block' => 'p',
            'classes' => 'lead',
            'wrapper' => false,
        ),
    );

// Insert the array, JSON ENCODED, into 'style_formats'
$init_array['style_formats'] = json_encode( $style_formats );
    return $init_array;
 }
// Attach callback to 'tiny_mce_before_init'
add_filter( 'tiny_mce_before_init', 'my_mce_before_init_insert_formats' );





/**
 * Add a stylesheet for TinyMCE
 *
 * @since 2.0.0
 */
// add_editor_style( 'css/editor-style.css' );

add_filter( 'tiny_mce_before_init', 'bfg_tiny_mce_before_init' );
/**
 * Modifies the TinyMCE settings array
 *
 * @since 2.0.0
 */
function bfg_tiny_mce_before_init( $options ) {

    $options['element_format'] = 'html'; // See: http://www.tinymce.com/wiki.php/Configuration:element_format
    $options['schema'] = 'html5-strict'; // Only allow the elements that are in the current HTML5 specification. See: http://www.tinymce.com/wiki.php/Configuration:schema
    $options['block_formats'] = 'Paragraph=p;Header 2=h2;Header 3=h3;Header 4=h4;Blockquote=blockquote'; // Restrict the block formats available in TinyMCE. See: http://www.tinymce.com/wiki.php/Configuration:block_formats

    return $options;

}




// add_filter( 'mce_buttons', 'bfg_tinymce_buttons' );
/**
 * Enables some commonly used formatting buttons in TinyMCE. A good resource on customizing TinyMCE: http://www.wpexplorer.com/wordpress-tinymce-tweaks/
 *
 * @since 2.0.15
 */
function bfg_tinymce_buttons( $buttons ) {

    $buttons[] = 'wp_page';                                                         // Post pagination
    return $buttons;

}
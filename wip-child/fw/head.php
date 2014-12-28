<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly




/**
 * Load scripts
 * Only load these scripts on the front-end.
 * @since 2.0.0
 */
add_action( 'wp_enqueue_scripts', 'mw_load_scripts' );
function mw_load_scripts() {

    // Override WP default self-hosted jQuery with version from Google's CDN
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), null, false );
    add_filter( 'script_loader_src', 'bfg_jquery_local_fallback', 10, 2 );

    wp_enqueue_script( 'vendor', get_stylesheet_directory_uri() . '/build/js/vendor.bundle.js', array( 'jquery' ), null, true );
    wp_enqueue_script( 'app', get_stylesheet_directory_uri() . '/build/js/app.bundle.js', array( 'jquery', 'vendor' ), null, true );


    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        wp_enqueue_script( 'comment-reply' );
    }

}



/**
 * jQuery local fallback, if Google CDN is unreachable
 * See: https://github.com/roots/roots/blob/aa59cede7fbe2b853af9cf04e52865902d2ff1a9/lib/scripts.php#L37-L52
 * @since 2.0.20
 */
// add_action( 'wp_head', 'bfg_jquery_local_fallback' );
function bfg_jquery_local_fallback( $src, $handle = null ) {

    static $add_jquery_fallback = false;

    if( $add_jquery_fallback ) {
        echo '<script>window.jQuery || document.write(\'<script src="' . includes_url() . 'js/jquery/jquery.js"><\/script>\')</script>' . "\n";
        $add_jquery_fallback = false;
    }

    if( $handle === 'jquery' ) {
        $add_jquery_fallback = true;
    }

    return $src;

}



/**
 * Load Google Webfonts
 */
add_action( 'wp_enqueue_scripts', 'mw_load_google_fonts' );
function mw_load_google_fonts() {
    // wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Lato:300,400,900,300italic,900italic|Merriweather:400,400italic,900,900italic' );
    wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Fira+Sans:300,400,700,400italic|Montserrat:400,700' );
}





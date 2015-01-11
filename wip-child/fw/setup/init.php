<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


if ( ! isset( $content_width ) )
    $content_width = 960;


/**
 * Assign the Storefront version to a var
 */
$theme         = wp_get_theme();
$theme_version = $theme['Version'];



/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */

function child_theme_setup() {

    /*
     * Load Localisation files.
     *
     * Note: the first-loaded translation file overrides any following ones if the same translation is present.
     */

    // wp-content/languages/theme-name/it_IT.mo
    load_theme_textdomain( 'wip', trailingslashit( WP_LANG_DIR ) . 'themes/' );

    // wp-content/themes/child-theme-name/languages/it_IT.mo
    load_theme_textdomain( 'wip', get_stylesheet_directory() . '/languages' );

    // wp-content/themes/theme-name/languages/it_IT.mo
    load_theme_textdomain( 'wip', get_template_directory() . '/languages' );



    /**
     * Add default posts and comments RSS feed links to head.
     */
    add_theme_support( 'automatic-feed-links' );


    /*
     * Enable support for Post Thumbnails on posts and pages.
     *
     * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
     */
    add_theme_support( 'post-thumbnails' );



    // This theme uses wp_nav_menu() in two locations.
    register_nav_menus( array(
        'main_menu' => 'Main Menu',
        'footer_menu' => 'Footer Menu',
    ) );




    /*
     * Switch default core markup for search form, comment form, and comments
     * to output valid HTML5.
     */
    add_theme_support( 'html5', array(
        'search-form', 'comment-form', 'comment-list', 'gallery', 'caption',
    ) );


    // Setup the WordPress core custom background feature.
    add_theme_support( 'custom-background', apply_filters( 'storefront_custom_background_args', array(
        'default-color' => apply_filters( 'storefront_default_background_color', 'fcfcfc' ),
        'default-image' => '',
    ) ) );


    /**
     * Setup the Wordpress core custom header feature
     * @var array
     */
    $defaults = array(
        'random-default'         => false,
        'width'                  => 1400,
        'height'                 => 300,
        'flex-height'            => true,
        'flex-width'             => true,
        'uploads'                => true,
    );
    add_theme_support( 'custom-header', $defaults );


    // Add support for the Site Logo plugin and the site logo functionality in JetPack
    // https://github.com/automattic/site-logo
    // http://jetpack.me/
    add_theme_support( 'site-logo', array( 'size' => 'full' ) );


    // Declare WooCommerce support
    add_theme_support( 'woocommerce' );

    // Declare support for title theme feature
    add_theme_support( 'title-tag' );

};







/**
 * Enqueue scripts and styles.
 * @since  1.0.0
 */
function mw_scripts() {

    global $theme_version;

    /**
     * Enqueue Google Fonts
     */
    // wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Lato:300,400,900,300italic,900italic|Merriweather:400,400italic,900,900italic' );
    wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Fira+Sans:300,400,700,400italic|Montserrat:400,700' );


    // Override WP default self-hosted jQuery with version from Google's CDN
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), null, false );
    add_filter( 'script_loader_src', 'bfg_jquery_local_fallback', 10, 2 );

    wp_enqueue_script( 'vendor', get_stylesheet_directory_uri() . '/build/js/vendor.bundle.js', array( 'jquery' ), $theme_version, true );
    wp_enqueue_script( 'app', get_stylesheet_directory_uri() . '/build/js/app.js', array( 'jquery', 'vendor' ), $theme_version, true );


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



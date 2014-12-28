<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

require_once( get_template_directory() . '/mdf/init.php' );

// TODO: Ver se isto é necessário
// require_once( CHILD_DIR . '/lib/underscores/inc/customizer.php' );

require_once( CHILD_DIR . '/fw/customizer.php' );
require_once( CHILD_DIR . '/fw/head.php' );
require_once( CHILD_DIR . '/fw/header.php' );
require_once( CHILD_DIR . '/fw/media.php' );
require_once( CHILD_DIR . '/fw/menus.php' );
require_once( CHILD_DIR . '/fw/post-types.php' );
require_once( CHILD_DIR . '/fw/sidebars.php' );
require_once( CHILD_DIR . '/fw/theme.php' );

// add_action('tha_footer_after','teste');
function teste()
{
    echo 'teste';
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



if ( ! isset( $content_width ) )
    $content_width = 960;


class StarterSite extends TimberSite {

    function __construct(){
        add_theme_support('post-formats');
        add_theme_support('post-thumbnails');
        add_theme_support('menus');

        add_filter('timber_context', array($this, 'add_to_context'));
        add_filter('get_twig', array($this, 'add_to_twig'));

        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_taxonomies'));

        parent::__construct();
    }

    function register_post_types(){
        //this is where you can register custom post types
    }

    function register_taxonomies(){
        //this is where you can register custom taxonomies
    }

    function add_to_context($context){

        $context['layout'] = 'content-sidebar';
        $context['sidebar'] = Timber::get_widgets('sidebar-1');
        $context['mainMenu'] = new TimberMenu('main_menu');
        $context['footerNav'] = new TimberMenu('footer_menu');
        $context['headerImage'] = new TimberImage( get_header_image() );

        $context['theme_options'] = thsp_cbp_get_options_values();

        $context["commentReplyArgs"] = array('reply_text' => "Reply", 'depth' => 1, 'max_depth' => 5);
        $context['site'] = $this;

        return $context;
    }

    function add_to_twig($twig){
        /* this is where you can add your own fuctions to twig */
        $twig->addExtension(new Twig_Extension_StringLoader());
        // $twig->addFilter('myfoo', new Twig_Filter_Function('myfoo'));
        return $twig;
    }

}

new StarterSite();


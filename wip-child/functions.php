<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

require_once( get_template_directory() . '/mdf/init.php' );
require_once( PARENT_DIR . '/mdf/extras.php' );

// TODO: Ver se isto é necessário
// require_once( CHILD_DIR . '/lib/underscores/inc/customizer.php' );



/**
 * SETUP
 * Enqueue styles, register widget regions, etc.
 */
require_once( CHILD_DIR . '/fw/setup.php' );
require_once( CHILD_DIR . '/fw/hooks.php' );

/**
 * CONF
 */
require_once( CHILD_DIR . '/fw/conf/customizer.php' );
require_once( CHILD_DIR . '/fw/conf/media.php' );
require_once( CHILD_DIR . '/fw/post-types.php' );

/**
 * PARTS
 * Funções que geram código para apresentação nos templates
 */
require_once( CHILD_DIR . '/fw/parts/header.php' );
require_once( CHILD_DIR . '/fw/parts/maincontent.php' );


require_once( CHILD_DIR . '/fw/shame.php' );


if ( is_woocommerce_activated() ) {
    require_once( CHILD_DIR . '/fw/woocommerce/hooks.php' );
}




class StarterSite extends TimberSite {

    function __construct(){

        add_theme_support('post-formats');
        // add_theme_support('post-thumbnails'); Adicionei no ficheiro Setup
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

        $context['main_sidebar'] = Timber::get_widgets('sidebar-1');
        $context['home_widgets'] = Timber::get_widgets('home-widgets');
        $context['footerWidgets1'] = Timber::get_widgets('footer-1');
        // $context['footerWidgets2'] = Timber::get_widgets('footer-2');
        // $context['footerWidgets3'] = Timber::get_widgets('footer-3');
        // $context['footerWidgets4'] = Timber::get_widgets('footer-4');

        $context['mainMenu'] = new TimberMenu('main_menu');
        $context['footerNav'] = new TimberMenu('footer_menu');
        $context['headerImage'] = new TimberImage( get_header_image() );

        $context['theme_options'] = thsp_cbp_get_options_values();

        // TODO: ver o que é isto
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



/**
 * Hack para estabelecer contexto correcto dentro do loop de produtos.
 * Resolve problem em que hooks corriam todos com o mesmo contexto.
 */
function timber_set_product($post) {
    global $product;
    if ( is_woocommerce() ) {
        $product = get_product($post->ID);
    }
    // global $woocommerce;
    //
    // var_dump($product);
    // $product = get_product($post->ID);
}
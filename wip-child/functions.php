<?php

require_once( get_template_directory() . '/mdf/init.php' );

require_once( CHILD_DIR . '/inc/media.php' );
require_once( CHILD_DIR . '/inc/menus.php' );
require_once( CHILD_DIR . '/inc/post-types.php' );
require_once( CHILD_DIR . '/inc/sidebars.php' );


// add_action('tha_footer_bottom','teste');
// function teste()
// {
//     echo 'teste';
// }



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
        // $context['foo'] = 'bar';
        // $context['stuff'] = 'I am a value set in your functions.php file';
        // $context['notes'] = 'These values are available everytime you call Timber::get_context();';
        $context['layout'] = 'content-sidebar';
        $context['sidebar'] = Timber::get_widgets('sidebar-1');
        $context['menu'] = new TimberMenu('0');
        $content['footerNav'] = new TimberMenu('0');
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

// function myfoo($text){
//     $text .= ' bar!';
//     return $text;
// }

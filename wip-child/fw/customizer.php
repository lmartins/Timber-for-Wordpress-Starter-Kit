<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/*
 * ----------------------------------------------------------------------------
 * THEME CUSTOMIZER
 * ----------------------------------------------------------------------------
 */

// Theme Customizer Boilerplate
require_once( get_template_directory() . '/lib/customizer/customizer.php' );


function mw_theme_options_array() {

    // Using helper function to get default required capability
    $thsp_cbp_capability = thsp_cbp_capability();

    $options = array(

      /*
       * Add fields to an existing Customizer section
       */
      'colors' => array(
        'existing_section' => true,
        'fields' => array(
            /*
             * ==============
             * THEME COLORS
             * ==============
             */

            /**
             * ACTIVE COLOR
             */
            'theme_high1' => array(
                'setting_args' => array(
                'default' => '#9eb305',
                'type' => 'option',
                'capability' => $thsp_cbp_capability,
                'transport' => 'refresh',
            ),
                'control_args' => array(
                'label' => __( 'Highlights', 'mw_theme_options' ),
                'type' => 'color', // Checkbox field control
                'sanitize_callback' => 'sanitize_hex_color',
                'priority' => 1
            )
          ),

          /**
           * MAIN BACKGROUND
           */

          'theme_mainBg' => array(
            'setting_args' => array(
              'default' => '#322c24',
              'type' => 'option',
              'capability' => $thsp_cbp_capability,
              'transport' => 'refresh',
            ),
            'control_args' => array(
              'label' => __( 'Main Background', 'mw_theme_options' ),
              'type' => 'color', // Checkbox field control
              'sanitize_callback' => 'sanitize_hex_color',
              'priority' => 3
            )
          ),

          /**
           * DARK
           */

          'theme_dark1' => array(
            'setting_args' => array(
              'default' => '#303030',
              'type' => 'option',
              'capability' => $thsp_cbp_capability,
              'transport' => 'refresh',
            ),
            'control_args' => array(
              'label' => __( 'Dark', 'mw_theme_options' ),
              'type' => 'color', // Checkbox field control
              'sanitize_callback' => 'sanitize_hex_color',
              'priority' => 3
            )
          ),

          /**
           * MUTED COLOR
           */

          'theme_muted' => array(
            'setting_args' => array(
              'default' => '#c9c9c9',
              'type' => 'option',
              'capability' => $thsp_cbp_capability,
              'transport' => 'refresh',
            ),
            'control_args' => array(
              'label' => __( 'Color Muted', 'mw_theme_options' ),
              'type' => 'color', // Checkbox field control
              'sanitize_callback' => 'sanitize_hex_color',
              'priority' => 3
            )
          ),

          /*
           * ============
           * COMPANY LOGO
           * ============
           */
          'theme_logo' => array(
            'setting_args' => array(
              'default' => '',
              'type' => 'option',
              'capability' => $thsp_cbp_capability,
              'transport' => 'refresh',
            ),
            'control_args' => array(
              'label' => __( 'Site Logo', 'mw_theme_options' ),
              'description' => __( 'Upload the site logo here. It should be previously resized to the desired dimensions', 'wip' ),
              'type' => 'image', // Image upload field control
              'priority' => 6
            )
          ),

        )
      ),

      'genesis_layout' => array(
        'existing_section' => true,
        'fields' => array(

          /*
           * -----------------------------------------------------------------
           * HOMEPAGE LAYOUT
           * -----------------------------------------------------------------
           */
          'homepage_grid_layout' => array(
              'setting_args' => array(
                  'default' => 'layout_1',
                  'type' => 'option',
                  'capability' => $thsp_cbp_capability,
                  'transport' => 'refresh',
              ), // End setting args
              'control_args' => array(
                  'label' => __( 'Homepage Layout', 'mw_theme_options' ),
                  'type' => 'images_radio',
                  'choices' => array(
                      'layout_1' => array(
                          'label' => __( 'Option 1', 'mw_theme_options' ),
                          'image_src' => get_template_directory_uri() . '/../wip-sparkling/' . 'build/images/customizer/home-layout-1.png'
                      ),
                      'layout_2' => array(
                          'label' => __( 'Option 2', 'mw_theme_options' ),
                          'image_src' => get_template_directory_uri() . '/../wip-sparkling/' . 'build/images/customizer/home-layout-2.png'
                      )
                  ),
                  'priority' => 9
                  ) // End control args
              ),

        )
      )

    );

    return $options;

}

add_filter( 'thsp_cbp_options_array', 'mw_theme_options_array', 1 );



/**
 * Dynamically generated CSS (link color), based on theme options
 *
 * @since Cazuela 1.0
 */

require_once( PARENT_DIR . '/lib/phpcolor/Color.php' );
use Mexitek\PHPColors\Color;

function thsp_dynamic_css() {

  $theme_options = thsp_cbp_get_options_values();

  $theme_high1 = new Color( $theme_options['theme_high1'] );
  $theme_dark1 = new Color( $theme_options['theme_dark1'] );
  $theme_muted = new Color( $theme_options['theme_muted'] );
  $theme_bodyBg = new Color( $theme_options['theme_mainBg'] );

  $theme_logo = $theme_options['theme_logo'];


  ?>

    <style type="text/css">

        a{
            color: #<?=($theme_dark1->isDark() ? $theme_dark1->getHex() : $theme_dark1->darken(44) )?>;
        }

    </style>


  <?php

}


add_action( 'wp_head', 'thsp_dynamic_css' );

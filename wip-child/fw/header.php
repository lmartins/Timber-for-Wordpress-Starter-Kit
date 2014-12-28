<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


$defaults = array(
    'random-default'         => false,
    'width'                  => 1400,
    'height'                 => 300,
    'flex-height'            => true,
    'flex-width'             => true,
    'uploads'                => true,
);
add_theme_support( 'custom-header', $defaults );
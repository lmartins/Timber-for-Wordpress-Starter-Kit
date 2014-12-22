<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$context = array();
$context['sidebar'] = Timber::get_widgets('sidebar-1');
var_dump($context);
Timber::render(array('sidebar.twig'), $context);

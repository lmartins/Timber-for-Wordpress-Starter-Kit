<?php
/**
 * The Template for displaying all single posts
 *
 *
 * @package  WordPress
 * @subpackage  Timber
 */

$data['sidebar'] = Timber::get_widgets('sidebar-1');
Timber::render(array('sidebar.twig'), $data);

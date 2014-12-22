<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


// TODO: 2014-12-22 - Adicionar nova configuração de users


/**
 * ----------------------------------------------------------------------------
 * NINJA FORMS
 * ----------------------------------------------------------------------------
 */

// To give Editors access to ADD New Forms
function my_custom_change_ninja_forms_add_new_capabilities_filter( $capabilities ) {
    $capabilities = "edit_pages";
    return $capabilities;
}
add_filter( 'ninja_forms_admin_parent_menu_capabilities', 'my_custom_change_ninja_forms_add_new_capabilities_filter' );
add_filter( 'ninja_forms_admin_add_new_capabilities', 'my_custom_change_ninja_forms_add_new_capabilities_filter' );


/* To give Editors access to the Submissions - Simply replace â€˜edit_postsâ€™ in the code snippet below with the capability
that you would like to attach the ability to view/edit submissions to.Please note that all three filters are needed to
provide proper submission viewing/editing on the backend!
*/
function nf_subs_capabilities( $cap ) {
    $capabilities = array(
        "edit_pages",
        "view_pages"
    );
    return 'edit_posts';
}
add_filter( 'ninja_forms_admin_submissions_capabilities', 'nf_subs_capabilities' );
add_filter( 'ninja_forms_admin_parent_menu_capabilities', 'nf_subs_capabilities' );
add_filter( 'ninja_forms_admin_menu_capabilities', 'nf_subs_capabilities' );

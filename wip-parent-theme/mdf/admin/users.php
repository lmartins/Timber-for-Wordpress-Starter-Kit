<?php

if( !defined( 'ABSPATH' ) ) exit; // Exit if accessed directly


/*
 * Let Site Managers manage users, and run this only once.
 * http://isabelcastillo.com/editor-role-manage-users-wordpress
 */
function mw_add_site_manager_role() {

    // delete_option('mw_add_cap_site_manager_once');  // Uncomment when changes needed

    if ( get_option( 'mw_add_cap_site_manager_once' ) != 'done' ) {
        // let editor manage users

        if ( get_role('site_manager') ) {
            $edit_site_manager = get_role('site_manager');
        } else {
            $edit_site_manager = add_role('site_manager', 'Site Manager');
        }

        $edit_site_manager->add_cap('read');
        $edit_site_manager->add_cap('edit_posts');
        $edit_site_manager->add_cap('edit_posts');
        $edit_site_manager->add_cap('edit_pages');
        $edit_site_manager->add_cap('edit_others_posts');
        $edit_site_manager->add_cap('edit_others_pages');
        $edit_site_manager->add_cap('edit_private_posts');
        $edit_site_manager->add_cap('edit_private_pages');
        $edit_site_manager->add_cap('edit_published_posts');
        $edit_site_manager->add_cap('edit_published_pages');
        $edit_site_manager->add_cap('delete_others_posts');
        $edit_site_manager->add_cap('delete_others_pages');
        $edit_site_manager->add_cap('delete_posts');
        $edit_site_manager->add_cap('delete_pages');
        $edit_site_manager->add_cap('publish_posts');
        $edit_site_manager->add_cap('publish_pages');
        $edit_site_manager->add_cap('read_private_posts');
        $edit_site_manager->add_cap('read_private_pages');
        $edit_site_manager->add_cap('delete_private_posts');
        $edit_site_manager->add_cap('delete_private_pages');
        $edit_site_manager->add_cap('delete_published_posts');
        $edit_site_manager->add_cap('delete_published_pages');
        $edit_site_manager->add_cap('manage_categories');
        $edit_site_manager->add_cap('moderate_comments');
        $edit_site_manager->add_cap('edit_users');
        $edit_site_manager->add_cap('list_users');
        $edit_site_manager->add_cap('promote_users');
        $edit_site_manager->add_cap('create_users');
        $edit_site_manager->add_cap('add_users');
        $edit_site_manager->add_cap('delete_users');
        $edit_site_manager->add_cap('upload_files');
        $edit_site_manager->add_cap('edit_theme_options');

        update_option( 'mw_add_cap_site_manager_once', 'done' );
    }

}
add_action( 'init', 'mw_add_site_manager_role' );




//prevent editor from deleting, editing, or creating an administrator
// only needed if the editor was given right to edit users

class ISA_User_Caps {

  // Add our filters
  function ISA_User_Caps(){
    add_filter( 'editable_roles', array(&$this, 'editable_roles'));
    add_filter( 'map_meta_cap', array(&$this, 'map_meta_cap'),10,4);
  }
  // Remove 'Administrator' from the list of roles if the current user is not an admin
  function editable_roles( $roles ){
    if( isset( $roles['administrator'] ) && !current_user_can('administrator') ){
      unset( $roles['administrator']);
    }
    return $roles;
  }
  // If someone is trying to edit or delete an
  // admin and that user isn't an admin, don't allow it
  function map_meta_cap( $caps, $cap, $user_id, $args ){
    switch( $cap ){
        case 'edit_user':
        case 'remove_user':
        case 'promote_user':
            if( isset($args[0]) && $args[0] == $user_id )
                break;
            elseif( !isset($args[0]) )
                $caps[] = 'do_not_allow';
            $other = new WP_User( absint($args[0]) );
            if( $other->has_cap( 'administrator' ) ){
                if(!current_user_can('administrator')){
                    $caps[] = 'do_not_allow';
                }
            }
            break;
        case 'delete_user':
        case 'delete_users':
            if( !isset($args[0]) )
                break;
            $other = new WP_User( absint($args[0]) );
            if( $other->has_cap( 'administrator' ) ){
                if(!current_user_can('administrator')){
                    $caps[] = 'do_not_allow';
                }
            }
            break;
        default:
            break;
    }
    return $caps;
  }

}

$isa_user_caps = new ISA_User_Caps();




// hide admin from user list
add_action('pre_user_query','isa_pre_user_query');
function isa_pre_user_query($user_search) {
  $user = wp_get_current_user();
  if ($user->ID!=1) { // Is not administrator, remove administrator
    global $wpdb;
    $user_search->query_where = str_replace('WHERE 1=1',
      "WHERE 1=1 AND {$wpdb->users}.ID<>1",$user_search->query_where);
  }
}


/**
 * NINJA FORM PERMISSIONS
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




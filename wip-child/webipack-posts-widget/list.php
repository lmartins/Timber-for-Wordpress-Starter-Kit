<?php
/**
 * Webipack Posts Widget: Default widget template
 */

// Block direct requests
if ( !defined('ABSPATH') )
	die('-1');

echo $before_widget;

if ( !empty($title) )
	echo $before_title . $title . $after_title;

if( $flexible_posts->have_posts() ):
?>
	<div class="loop loop--list" <?php if ( $display_mode == 'slider') echo "data-slider" ; ?> >

        <?php while( $flexible_posts->have_posts() ) : $flexible_posts->the_post(); global $post; ?>

                <?php

                    $data = Timber::get_context();
                    $data['showthumb'] = $thumbnail ?: true;
                    $data['thumbsize'] = $thumbsize ?: 'thumbnail';
                    $data['excerpt']   = $excerpt;
                    $data['post'] = new TimberPost( $post );

                    if ( $post->post_type == 'product') {

                        Timber::render('woo/tease-product.twig', $data);

                    } else {

                        Timber::render('partials/tease-post.twig', $data);

                    }

                ?>

        <?php endwhile; ?>


	</div><!-- .dpe-flexible-posts -->
<?php else: // We have no posts ?>
	<div class="dpe-flexible-posts no-posts">
		<p><?php _e( 'No post found', 'flexible-posts-widget' ); ?></p>
	</div>
<?php
endif; // End have_posts()

echo $after_widget;

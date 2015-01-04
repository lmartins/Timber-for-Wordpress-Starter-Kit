<?php
/**
 * Posts Widget: MINIBANNERS
 *
 * @since 3.4.0
 *
 * This template was added to overcome some often-requested changes
 * to the old default template (widget.php).
 */

// Block direct requests
if ( !defined('ABSPATH') )
    die('-1');

echo $before_widget;

if ( !empty($title) )
    echo $before_title . $title . $after_title;

$content_types = $flexible_posts->query['post_type'];

if( $flexible_posts->have_posts() ):
?>
    <div class="loop loop--minibanners" <?php if ( $display_mode == 'slider') echo 'am-slider="nav-inside" data-slider' ; ?> >

        <?php while( $flexible_posts->have_posts() ) : $flexible_posts->the_post(); global $post; ?>

            <?php

                $data = Timber::get_context();
                $data['showthumb'] = $thumbnail;
                $data['thumbsize'] = $thumbsize;
                $data['excerpt']   = $excerpt;
                $data['post'] = new TimberPost();

                if ( $post->post_type == 'product') {

                    Timber::render('woo/tease-product.twig', $data);

                } else {

                    Timber::render('partials/tease-post.twig', $data);

                }

            ?>

        <?php endwhile; ?>

    </div><!-- .dpe-flexible-posts -->
<?php
endif; // End have_posts()

echo $after_widget;

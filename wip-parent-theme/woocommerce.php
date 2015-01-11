<?
$context = Timber::get_context();
$context['cats'] = Timber::get_terms('product_cat');;

if (is_singular('product')) {

    $context['post'] = Timber::get_post();
    $product = get_product( $context['post']->ID );
    $context['product'] = $product;
    $context['sidebar'] = Timber::get_widgets('shop-sidebar');
    add_action( 'mc_attributes', function($product){
        $product->list_attributes();
    });
    add_action( 'mc_reviews', function($product){
        return wc_get_template('single-product-reviews.php');
    });

    Timber::render('views/woo/single-product.twig', $context);

} else {

    $posts = Timber::get_posts();

    $context['products'] = $posts;
    $context['showthumb'] = true;
    $context['sidebar'] = Timber::get_widgets('shop-sidebar');

    Timber::render('views/woo/archive.twig', $context);

}
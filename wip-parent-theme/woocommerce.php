<?
$context = Timber::get_context();
$context['cats'] = Timber::get_terms('product_cat');;

if (is_singular('product')) {

    $context['post'] = Timber::get_post();
    $product = get_product( $context['post']->ID );
    $context['product'] = $product;
    add_action( 'mc_attributes', function($product){
        $product->list_attributes();
    });
    add_action( 'mc_reviews', function($product){
        return wc_get_template('single-product-reviews.php');
    });

    Timber::render('views/woo/single-product.twig', $context);

} else {

    $posts = Timber::get_posts();

    /**
     * Hack para estabelecer contexto correcto dentro do loop de produtos.
     * Resolve problem em que hooks corriam todos com o mesmo contexto.
     */
    function timber_set_product($post) {
        global $product;
        $product = get_product($post->ID);
    }

    $context['products'] = $posts;
    Timber::render('views/woo/archive.twig', $context);

}
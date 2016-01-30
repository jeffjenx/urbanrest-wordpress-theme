<?php get_header(); ?>
<?php get_sidebar(); ?>
<?php the_post(); ?>
	<main class="page row around-xs">
		<article id="page-<?php the_ID(); ?>" <?php post_class('col-xs-11 col-sm-9 col-md-7'); ?>>
			<header class="page-header" role="banner">
				<h2>
					<form action="/search" autocomplete="off" class="site-search" method="get">
						<label for="q">Search results for</label>
						<input class="search-input" id="q" name="q" value="<?php echo (isset($_GET['q'])) ? $_GET['q'] : ''; ?>" />
						<button class="search-submit" type="submit"><span class="btn-label">Find Results</span></button>
					</form>
				</h2>
			</header>
			<div class="page-content">
<?php
$args = array(
	's' => (isset($_GET['q'])) ? $_GET['q'] : ''
);
$the_query = new WP_Query( $args );
?>
<?php if( $the_query->have_posts() ) : ?>
				<ul>
<?php 	while( $the_query->have_posts() ) : ?>
<?php 		$the_query->the_post(); ?>
					<li><a href="<?php echo the_permalink(); ?>"><?php echo get_the_title(); ?></a></li>
<?php 	endwhile; ?>
				</ul>
<?php else : ?>
				<em>Nothing was found.</em>
<?php endif; ?>
<?php wp_reset_postdata(); ?>
			</div>

		</article>
	</main>
<?php urb_get_specials(); ?>
<?php urb_get_community(); ?>
<?php urb_get_shop(); ?>
<?php urb_get_company(); ?>
<?php get_footer(); ?>
<?php get_header(); ?>
<?php get_sidebar(); ?>
<?php the_post(); ?>
	<main class="page row around-xs">
		<article id="page-<?php the_ID(); ?>" <?php post_class('col-xs-11 col-sm-9 col-md-7'); ?>>
<?php get_template_part( 'page', 'header' ); ?>
<?php get_template_part( 'page', 'content' ); ?>
<?php get_template_part( 'page', 'footer' ); ?>
		</article>
	</main>
<?php urb_get_specials(); ?>
<?php urb_get_community(); ?>
<?php urb_get_shop(); ?>
<?php urb_get_company(); ?>
<?php get_footer(); ?>
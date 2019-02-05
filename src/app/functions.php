<?php
/**
 * jandaia functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package jandaia
 */

if ( ! function_exists( 'jandaia_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function jandaia_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on jandaia, use a find and replace
		 * to change 'jandaia' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'jandaia', get_template_directory() . '/languages' );

		// Add default pojandaia and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on pojandaia and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => esc_html__( 'Menu Barra Topo Equerda', 'jandaia' ),
			'menu-2' => esc_html__( 'Menu Principal', 'jandaia' ),
			'menu-3' => esc_html__( 'Menu Footer Esquerda', 'jandaia' ),
			'menu-4' => esc_html__( 'Menu Footer Centro', 'jandaia' ),
			'menu-5' => esc_html__( 'Menu Footer Direita', 'jandaia' ),
			'menu-6' => esc_html__( 'Menu Barra Topo Direita', 'jandaia' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'jandaia_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'jandaia_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function jandaia_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'jandaia_content_width', 640 );
}
add_action( 'after_setup_theme', 'jandaia_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function jandaia_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'jandaia' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'jandaia' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'jandaia_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function jandaia_scripts() {
	wp_enqueue_style( 'jandaia-style', get_stylesheet_uri() );

	wp_enqueue_script( 'jandaia-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20151215', true );

	wp_enqueue_script( 'jandaia-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20151215', true );

	wp_enqueue_script( 'jandaia-bootstrap-js', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js', array(), '20151215', true );
	wp_enqueue_style( 'jandaia-bootstrap-css', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css' );

	wp_enqueue_style( 'jandaia-fancybox-css', 'https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.3/dist/jquery.fancybox.min.css' );
	wp_enqueue_script( 'jandaia-fancybox-js', 'https://cdn.jsdelivr.net/gh/fancyapps/fancybox@3.5.3/dist/jquery.fancybox.min.js', array(), null, true );

	wp_enqueue_style( 'jandaia-slick-css',  get_template_directory_uri() . '/js/slick/slick.css' );
	wp_enqueue_style( 'jandaia-slick-theme-css',  get_template_directory_uri() . '/js/slick/slick-theme.css' );
	wp_enqueue_script( 'jandaia-slick-js',  get_template_directory_uri() . '/js/slick/slick.min.js', array(), null, true );

	//wp_enqueue_script( 'jandaia-infinitescroll', 'https://unpkg.com/infinite-scroll@3/dist/infinite-scroll.pkgd.min.js', array(), null, true );	

	wp_enqueue_script( 'jandaia-jquery-mask', get_template_directory_uri() . '/js/jquerymask/jquery.mask.min.js', array(), null, true );
	
	wp_enqueue_script( 'jandaia-jquery-validates', get_template_directory_uri() . '/js/jqueryvalidate/jquery.validate.min.js', array(), null, true );	
	wp_enqueue_script( 'jandaia-jquery-validate-additional', get_template_directory_uri() . '/js/jqueryvalidate/additional-methods.min.js', array(), null, true );	
	wp_enqueue_script( 'jandaia-jquery-validate-localizations', get_template_directory_uri() . '/js/jqueryvalidate/localization/messages_pt_BR.js', array( 'jquery' ) , null, true );

	wp_enqueue_style( 'jandaia-fontawesome', 'https://use.fontawesome.com/releases/v5.6.1/css/all.css' );
	wp_enqueue_style( 'jandaia-fira-sans', 'https://fonts.googleapis.com/css?family=Fira+Sans' );
	wp_enqueue_style( 'jandaia-exo', 'https://fonts.googleapis.com/css?family=Exo' );
	wp_enqueue_style( 'jandaia-exo-2', 'https://fonts.googleapis.com/css?family=Exo+2:300,400,700' );
	
	wp_enqueue_script( 'jandaia-scripts-js', get_template_directory_uri() . '/js/scripts.js', array(), null, true );

	wp_localize_script( 'jandaia-scripts-js', 'ajax_obj', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ), 'ajax_nonce' => wp_create_nonce('ajax-nonce') ) );

	wp_enqueue_style( 'jandaia-styles', get_template_directory_uri() . '/layouts/styles.css' );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'jandaia_scripts' );

function yakult_custom_login() {
	echo '<link rel="stylesheet" type="text/css" href="' . get_bloginfo('stylesheet_directory') . '/layouts/custom-login-styles.css" />';
}
add_action('login_head', 'yakult_custom_login');

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Custom post type.
 */
require get_template_directory() . '/inc/custom-post-type.php';

require get_template_directory() . '/inc/class-footer-navigation-menu.php';

require get_template_directory() . '/inc/wp-bootstrap-navwalker.php';

require get_template_directory() . '/inc/Mobile_Detect.php';

function yakult_register_query_vars( $vars ) {
    $vars[] = 't';
    return $vars;
}
add_filter( 'query_vars', 'yakult_register_query_vars' );

if( function_exists('acf_add_options_page') ) {
	
	$parent = acf_add_options_page(array(
		'page_title' => 'Opções do Tema',
		'menu_title' => 'Opções do Tema',
		'menu_slug' => 'jandaia-theme-settings',
		'capability' => 'edit_posts',		
		'redirect' => false
	));

	acf_add_options_sub_page(array(
		'page_title' 	=> 'Redes Sociais',
		'menu_title' 	=> 'Redes Sociais',
		'parent_slug' 	=> $parent['menu_slug'],
	));
}

if ( function_exists( 'add_theme_support' ) ) {

	add_theme_support( 'post-thumbnails');

	add_image_size( 'jandaia-home-blog', 300, 400, true );
	add_image_size( 'jandaia-home-linhas', 300, 300, true );
	add_image_size( 'jandaia-empresa-timeline', 650, 350, true );
	add_image_size( 'jandaia-exportacao', 300, 150, true );
}

add_action('wp_ajax_jandaia_get_representantes', 'jandaia_get_representantes' );
add_action('wp_ajax_nopriv_jandaia_get_representantes', 'jandaia_get_representantes' );
function jandaia_get_representantes() {

	global $wpdb;
	$response['code'] = 500;
	$response['result'] = '';

    $nonce = $_POST['nonce'];    
    if ( ! wp_verify_nonce( $nonce, 'ajax-nonce' ) )
        die ( 'Wrong nonce!');
    
    $regiao = $_POST['regiao'];  

 	if (!empty($regiao)) {

		$postResult = new WP_Query( array( 'post_type' => 'representantes', 'posts_per_page' => -1) );

		$result = array();
		$resultString = '';
		while ( $postResult->have_posts() ) : $postResult->the_post();

			$regioes = get_field('cpr_regiao');
			foreach ($regioes as $key => $estado) {

				if ($estado['estado'] == $regiao) {

					$response['code'] = 200;				

					$contatos = get_field('cpr_contato');
					$contatoString = '';
					foreach ($contatos as $key => $contato) {

						
						switch ($contato['tipo']) {
							case 2:
								$contatoTipo = 'Celular';		
								break;
							
							case 3:
								$contatoTipo = 'WhatsApp';		
								break;

							case 4:
								$contatoTipo = 'Fax';		
								break;								

							default:
								$contatoTipo = 'Telefone';
								break;
						}

						$contatoString = $contatoString . $contatoTipo . ' : ' . $contato['numero'] . '<br>';
					}


					$resultString = $resultString . '<div class="col-md-4"><div class="representative">' . ((empty(get_field('cpr_area_de_atuacao'))) ? '' : '<strong>' . get_field('cpr_area_de_atuacao') . '</strong><br><br>' ) . get_the_title() . '<br>' .  ((empty(get_field('cpr_responsavel'))) ? '' : '<strong>' . get_field('cpr_responsavel') . '</strong><br>' ) . $contatoString . get_field('cpr_email') . '</div></div>';

			        break;
				}
			}

	    endwhile;

	    wp_reset_query();

		$response['result'] = $resultString;
    }
	
	wp_send_json($response);
}

add_action('wp_ajax_jandaia_find_sellers', 'jandaia_find_sellers' );
add_action('wp_ajax_nopriv_jandaia_find_sellers', 'jandaia_find_sellers' );
function jandaia_find_sellers() {

	global $wpdb;
	$response['code'] = 500;
	$response['notes'] = '-Erro';
	$response['result'] = '';
	
    $nonce = $_POST['nonce'];    
    if ( ! wp_verify_nonce( $nonce, 'ajax-nonce' ) )
        die ( 'Wrong nonce!');

    $linha = $_POST['linha'];
    $tipo = $_POST['tipo'];
    $uf = $_POST['uf'];
    $cidade = $_POST['cidade'];
    $cep = $_POST['cep'];

    $tableSellers = $wpdb->prefix . 'jdc_sellers';
	$tableSellersProducts = $wpdb->prefix . 'jdc_sellers_products';

	$sqlContent = '';
	if (!empty($linha)) {
		$sqlContent = $sqlContent . ' AND sp.product_line = "' . $linha . '"';
	}

	if (!empty($tipo)) {
		$sqlContent = $sqlContent . ' AND sp.product_code = "' . $tipo . '"';
	}

	if (!empty($uf)) {
		$sqlContent = $sqlContent . ' AND s.state = "' . $uf . '"';
	}

	if (!empty($cidade)) {
		$sqlContent = $sqlContent . ' AND s.city = "' . $cidade . '"';
	}
	
	if (!empty($cep)) {
		$rows = $wpdb->get_results( 'SELECT * FROM ' . $tableSellers . ' WHERE zip_code = ' . $cep );

		if (empty($rows)) {
			$sqlContent = $sqlContent . ' AND s.zip_code LIKE "' . addslashes(substr($cep, 0, 2)) . '%"';	
			$response['notes'] = $response['notes'] . '-CEP próximo';
		} else {
			$sqlContent = $sqlContent . ' AND s.zip_code = "' . addslashes($cep) . '"';
			$response['notes'] = $response['notes'] . '-CEP exato';
		}
	}

	$sql = 'SELECT s.*, sp.* FROM ' . $tableSellers . ' AS s JOIN ' . $tableSellersProducts . ' AS sp ON s.id = sp.id_seller ' . $sqlContent;
	$rows = $wpdb->get_results( $sql );

	if (!empty($rows)) {

		$sellers = '';
		foreach ($rows as $key => $row) {
			
			$sellers = $sellers . '<div class="col-md-4"><div class="seller"><strong>' . $row->name . '</strong><br><br>' . $row->address . ', ' . $row->neighborhood . ', ' . $row->city . '/' . $row->state  . ' - ' . $row->zip_code . '<br><strong>Tel: ' . $row->phone . '</strong></div></div>';
		}

		$response['code'] = 200;
		$response['notes'] = '-Resultados encontrados';
		$response['result'] = $sellers;
	}
 		
	wp_send_json($response);
}

add_action('wp_ajax_jandaia_find_products', 'jandaia_find_products' );
add_action('wp_ajax_nopriv_jandaia_find_products', 'jandaia_find_products' );
function jandaia_find_products() {

	global $wpdb;
	$response['code'] = 500;
	$response['result'] = '';
	
    $nonce = $_POST['nonce'];    
    if ( ! wp_verify_nonce( $nonce, 'ajax-nonce' ) )
        die ( 'Wrong nonce!');

    $tableSellersProducts = $wpdb->prefix . 'jdc_sellers_products';
    $linha = $_POST['linha'];
	
	if (empty($linha)) {
	 	$response['code'] = 501;
	 	$response['result'] = '<option value="">Produto</option>';
	} else {

		$sql = 'SELECT DISTINCT product_code, product_name FROM ' . $tableSellersProducts . ' WHERE product_line = "'  . addslashes($linha) . '"';
		$rows = $wpdb->get_results( $sql );

		if (!empty($rows)) {

			$products = '<option value="">Produto</option>';
			foreach ($rows as $key => $row) {

				$products = $products . '<option value="' . $row->product_code . '">' . $row->product_name . '</option>';
			}

			$response['code'] = 200;
			$response['result'] = $products;
		}
	 		
	}

	wp_send_json($response);
}

add_action('wp_ajax_jandaia_get_cities', 'jandaia_get_cities' );
add_action('wp_ajax_nopriv_jandaia_get_cities', 'jandaia_get_cities' );
function jandaia_get_cities() {

	global $wpdb;
	$response['code'] = 500;
	$response['result'] = '';
	
    $nonce = $_POST['nonce'];    
    if ( ! wp_verify_nonce( $nonce, 'ajax-nonce' ) )
        die ( 'Wrong nonce!');

    $tableStates = $wpdb->prefix . 'jdc_states';
    $tableCities = $wpdb->prefix . 'jdc_cities';
    $estado = $_POST['uf'];
	
	if (empty($estado)) {
	 	$response['code'] = 501;
	 	$response['result'] = '<option value="">CIDADE:</option>';
	} else {

		$sql = 'SELECT c.name FROM ' . $tableStates . ' AS s INNER JOIN ' . $tableCities . ' AS c ON s.id = c.id_state AND s.initials = "' . $estado . '"';

		$rows = $wpdb->get_results( $sql );

		if (!empty($rows)) {

			$stringResult = '<option value="">CIDADE:</option>';
			foreach ($rows as $key => $row) {

				$stringResult = $stringResult . '<option value="' . mb_strtoupper($row->name, 'UTF-8') . '">' . mb_strtoupper($row->name, 'UTF-8') . '</option>';
			}

			$response['code'] = 200;
			$response['result'] = $stringResult;
		}
	 		
	}

	wp_send_json($response);
}

function jandaia_get_lines(){

	global $wpdb;

	$tableSellersProducts = $wpdb->prefix . 'jdc_sellers_products';
	
	$rows = $wpdb->get_results('SELECT DISTINCT product_line FROM ' . $tableSellersProducts );

	return $rows;
}

function jandaia_get_products(){	

	global $wpdb;

	$tableSellersProducts = $wpdb->prefix . 'jdc_sellers_products';
	
	$rows = $wpdb->get_results('SELECT DISTINCT product_code, product_name FROM ' . $tableSellersProducts );

	return $rows;
}

/** 
 * Custom code Guilherme
 * from: https://v2.wp-api.org/extending/adding/
**/


function custom_get_products( $data ) {

	global $wpdb;
	$tableSellersProducts = $wpdb->prefix . 'jdc_sellers_products';
	
	$linha = $_GET['s_linha_produtos'];
	$familia = $_GET['s_familia_produtos'];
	$materia = $_GET['s_materias_produtos'];
	$categoria = $_GET['s_categoria_produtos'];
	$lancamento = $_GET['s_lancamento'];

	$tax_query = array(
		'relation' => 'AND'
	);

	if (!empty($linha)) {
		
		$content = array(
			'taxonomy' => 'linha_produtos',
			'field'    => 'term_id',
			'terms'    => $linha,
		);
		array_push($tax_query, $content);
	}else{
		$linha = array();
	}
		
	if (!empty($familia)) {
		
		$content = array(
			'taxonomy' => 'familia_produtos',
			'field'    => 'term_id',
			'terms'    => $familia,
		);
		array_push($tax_query, $content);
	}else{
		$familia = array();
	}
	
	if (!empty($materia)) {
		
		$content = array(
			'taxonomy' => 'materias_produtos',
			'field'    => 'term_id',
			'terms'    => $materia,
		);
		array_push($tax_query, $content);
	}else{
		$materia = array();
	}

	if (!empty($categoria)) {
		
		$content = array(
			'taxonomy' => 'categoria_produtos',
			'field'    => 'term_id',
			'terms'    => $categoria,
		);
		array_push($tax_query, $content);
	}else{
		$categoria = array();
	}	
	
	$meta_query = array();
	if (!empty($lancamento)) {
		
		$content = array(
            'key' => 'pp_lancamento',
            'value' => 1,
            'compare' => 'LIKE'
        );
		array_push($meta_query, $content);
	}	
	
	$page = 1;
	
	if(is_numeric($data['page']) && $data['page'] > 1){
		$page = $data['page'];
	}

	// set the number of items to display per page
	$items_per_page = 10;
	$results = [];
	
	
	$postResult = new WP_Query( 
    	array( 
    		'post_type' => 'produtos', 
    		'posts_per_page' => $items_per_page, 
    		'tax_query' => $tax_query,
			'meta_query' => $meta_query,
			'paged' => $page,
			'orderby' => 'rand',
		    'order'    => 'ASC'
    	)
    );
	
	if ($postResult->have_posts()) {
		while ( $postResult->have_posts() ) {
			
			$postResult->the_post();

			$image = get_template_directory_uri() . '/library/images/placeholder/yakult-thumb-filmes.jpg';
			if ( has_post_thumbnail() ) {
				$image = wp_get_attachment_image_src( get_post_thumbnail_id(), 'yakult-thumb-filmes' );                            
				$image = $image[0];
			}
			
			$data = array(
				'id' => get_the_ID(),
				'image' => $image, 
				'link' => get_permalink(),
				'title' => get_the_title()
			);
			
			array_push($results, $data);
			
		}
	}
	
	wp_reset_postdata();
	
	header("Content-type: application/json; charset=utf-8");
	return $results;
}

function custom_get_product_details($data){

	$id = $data['id'];
	
	$postResult = new WP_Query( 
    	array( 
    		'post_type' => 'produtos', 
			'p' => $id
    	)
    );
	
	$results = [];

	if ($postResult->have_posts()) {
		while ( $postResult->have_posts() ) {
			
			$postResult->the_post();
			$temp = [];
			
			if(have_rows('pp_informacoes')){	
				while ( have_rows('pp_informacoes') ){
					array_push($temp, the_row());
				}				
			}
			
			
			$data = array(
				'id' => get_the_ID(),
				'gallery' => get_field('pp_galeria'),
				'title' => get_the_title(),
				'pp_informacoes' => $temp
			);
			
			array_push($results, $data);
			
		}
	}
	
	wp_reset_postdata();
	
	header("Content-type: application/json; charset=utf-8");
	return $results;
	
	
}

function custom_login($request){
    $creds = array();
    $creds['user_login'] = $request["username"];
    $creds['user_password'] =  $request["password"];
    $creds['remember'] = true;
    $user = wp_signon( $creds, false );

    if ( is_wp_error($user) )
      echo $user->get_error_message();

    return $user;
}

add_action( 'rest_api_init', function () {
  
    register_rest_route( 
        'myplugin/v1', 
        '/products/(?P<page>\d+)', 
        array(
            'methods' => 'GET',
            'callback' => 'custom_get_products',
        )
    );

    register_rest_route( 
        'myplugin/v1', 
        '/product-details/(?P<id>\d+)', 
        array(
            'methods' => 'GET',
            'callback' => 'custom_get_product_details',
        )
    );

    register_rest_route(
        'myplugin/v1', 
        '/login/',
        array(
            'methods'  => 'GET',
            'callback' => 'custom_login',
        )
    );

});

/*
	Uma recompensa, já que você chegou até aqui ;)

	Deixa Alagar
	Grupo Intimistas

	Tô sofrendo de amor
	Mas dizendo a verdade
	E agora que eu sou
	Merecedor da tua fidelidade

	Mas pra ser a mulher
	Mais feliz desse mundo
	Basta acreditar
	Meu sentimento é profundo

	Vai ver
	Que a razão de viver
	Tá focada em você
	Meu coração é todo seu

	E quando a gente quer
	Basta dizer sim
	Então volta pra mim
	Que eu tô querendo saciar
	Essa vontade louca

	Lembro da gente
	Se amando embaixo do chuveiro
	Vendo o banheiro inundar
	Deixa alagar! Deixa alagar! Deixa alagar!
	E namorando na cozinha com o feijão no fogo
	A ponto de nos incendiar
	Deixa queimar! Deixa queimar! Deixa queimar!
*/
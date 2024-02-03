<?php
/*
Plugin Name: Beer E-Commerce
Description: Custom plugin for creating pages from an API endpoint.
Version: 1.0
Author: Eng. Víctor Rivas
*/

// Activation hook to run when the plugin is activated
register_activation_hook(__FILE__, 'beer_e_commerce_activate');

function beer_e_commerce_activate() {
    // Register custom post type
    add_action('init', 'register_beer_product_post_type');
    
    // Fetch data from the API endpoint
    $api_url = 'http://localhost:3000/api/products';
    $response = wp_remote_get($api_url);

    // Check if the request was successful
    if (is_array($response) && !is_wp_error($response)) {
        $data = json_decode($response['body'], true);

        // Create Custom Post Types for each product
        foreach ($data as $product) {
            $brand = sanitize_title($product['brand']); // Sanitize brand name for post slug
            $url = sanitize_title($product['url']); // Sanitize URL for post slug

            // Define post data
            $post_data = array(
                'post_title' => $product['brand'],
                'post_content'  => '',
                'post_name' => $url,
                'post_type' => 'page', // Custom Post Type
                'post_status' => 'publish',
            );

            // Insert the post into the database
            $post_id = wp_insert_post($post_data);

            // Add custom fields if needed
            update_post_meta($post_id, 'brand', $product['brand']);
            update_post_meta($post_id, 'url', $product['url']);
            update_post_meta($post_id, 'product_id', $product['id']);
        }
    }
}
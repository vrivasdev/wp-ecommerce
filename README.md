Welcome to the Beer E-Commerce Challenge! 

In this challenge, we aim to create a beer e-commerce.  
We have two main sources of data: a file named "products.js" containing product details and 
images, and a separate file named "stock-price.js" with stock and price information, which is 
updated regularly. 

Our goal is to build a Product Detail Page (PDP) that displays all the information for a single 
product. Here are the technical requirements for this project: 

1. Build an API endpoint that returns stock and price information for a specific product 
identified by its SKU code. 
2. Ensure that the PDP updates stock and price information every 5 seconds by using the 
API endpoint. 
3. Do not modify the "products.js" file. 
4. Modify the "stock-price.js" file only for testing the 5-second update requirement. 
5. Access the PDP through a URL in the format of /productId-productBrand. For instance, 
for a product with ID 5 and the brand "Modelo Especial," the URL should be /5-modelo
especial. 
6. Create the API endpoint for stock and price information retrieval with the URL format: 
GET /api/stock-price/code. For example, for a product SKU with the code 123, the URL 
should be /api/stock-price/123. 
7. Keep in mind that prices are stored in cents but should be displayed in dollars with 2 
decimal places (e.g., a product priced at 4350 cents should be shown as $43.50). 
You can check the mobile design of the app by visiting the following link: 
https://www.figma.com/file/7YLJQSm9fBWzqbs9UqzPnO/Web-developer-Challenge-2?node
id=405%3A367&t=aEeRJiFSK3eFij3X-0  
Feel free to use your creativity to design the tablet and desktop resolution as you see fit.  
For the solution, you should use Gutenberg custom blocks and deliver the codebase.  
Good luck with the challenge! 

## INSTRUCTIONS
1. Setup the API node's system to retrieve services by port's number 3000. See the api-products repository on github
2. Optional: Install your wordpress project within docker conmpose file. Just run it the following command line => "docker compose up"
   Note: You might copy the nodeJS api folder into the root's WP project, by this way you'll be able to access to the endpoint once up and running
3. After WP's project setup you must enable two plugins: 
    3.1 Beer E-Commerce: It will connect with the endpoint and create all pages needed by each product
    3.2 Beers: It will create the Beer Block component for each page already created
4. Go to any product's page and add the Custom Beer's block 
    Note: You'll get a harcoded sku code at the first load. But user will be able to
    click on each sizes and component will retrieve the stock info related. 
    I will suggest to add a selected sku code in the "products.js" by this way the
    block might display a default sku code

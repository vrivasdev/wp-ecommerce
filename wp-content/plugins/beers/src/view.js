/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import domReady from "@wordpress/dom-ready";
import { render, useEffect, useState } from "@wordpress/element";
import { ReactComponent as Chain } from "../assets/chain.svg";

const BeersBlock = () => {
    const api = 'http://localhost:3000/api/stock-price';
    const importImages = require.context('../products', false, /\.(png|jpe?g|svg)$/);
    const images = importImages.keys().map(importImages);
    // TODO: The DB info should include the selected sku code by this way I can avoid the harcoded value
    const defaultCode = '10167';
    const [productData, setProductData] = useState(null);
    const [selectedSku, setSelectedSku] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${api}/${defaultCode}`);
                const data = await response.json();
                setProductData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data initially
        fetchData();

        // Fetch data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    const getImagePath = (comparedImg) => {
        let imagePath = '';
        let finalImg = '';

        images.forEach(imageUrl => {
            const imageNameWithHash = imageUrl.split('/').pop();
            const [imageName, hash, format] = imageNameWithHash.split('.');
            const imageFile = "/products/" + imageName + "." + format;

            // Compare the image name with the provided one
            if (imageFile === comparedImg) {
                imagePath = `/products/${imageName}.${format}`;
                finalImg = imageUrl;
            }
        });

        return finalImg;
    };

    const handleClick = (skuCode) => {
        // Fetch data for the selected SKU
        fetch(`${api}/${skuCode}`)
            .then(response => response.json())
            .then(data => {
                setProductData(data);
                setSelectedSku(skuCode);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <main className="beers-block">
            {
                productData && (
                    <>
                        <section className="header">
                            <figure>
                                <section>
                                    <img src={getImagePath(productData.image)} alt="" />
                                </section>
                            </figure>
                        </section>
                        <section className="details">
                            <div className="details__header">
                                <h4>{productData.brand}</h4>
                                <span className="details__price">${productData.priceInDollars}</span>
                            </div>
                            <div className="details__stock">
                                <span>Origin: {productData.origin} | Stock: ${productData.stock}</span>
                            </div>
                            <div className="details__description">
                                <span className="subtitle">Description</span>
                                <p>{productData.information}</p>
                            </div>
                        </section>
                        <section className="sizes">
                            <span className="subtitle">Size</span>
                            <div className="sizes__list">
                                {productData && productData.skus.map(sku => (
                                    <button 
                                        key={sku.code} 
                                        className={selectedSku === sku.code ? 'sizes__button--selected' : 'sizes__button'} 
                                        onClick={() => handleClick(sku.code)}
                                    >
                                        {sku.name}
                                    </button>
                                ))}
                            </div>

                        </section>
                        <section className="buttons">
                            <Chain/>
                            <button className="buttons__add">Add to Cart</button>
                        </section>
                    </>
                )
            }

        </main>
    );
}

domReady(function () {
    const container = document.querySelector(".wp-block-post-content");
    render(<BeersBlock />, container);
});

/* eslint-enable no-console */

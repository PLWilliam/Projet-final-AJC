import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonAddDel } from '../component.js';
import './ProductCard.css';


const ProductCard = ({ value }) => {
    const [product, setProduct] = useState('');

    useEffect(() => {
        setProduct(value);
    }, [value]);

    return (
        <div className="featured-product">
            {product.best_seller && <span className="best-seller-badge">Meilleur vendeur</span>}
            <Link to={`/products/${product.id}`}>
                <img src={product.poster} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
            </Link>
            <p>{product.overview}</p>
            <p>Prix: {product.price} €</p>
            <p>Note: {product.rating} / 5</p>
            <div className="button-container">
                <ButtonAddDel product={product} />
            </div>
        </div>
    );
}

export default ProductCard;

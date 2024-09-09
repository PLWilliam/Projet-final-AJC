import React, {useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { ButtonAddDel } from '../component.js'

const ProductCard = (data) => {
    const [product,setProduct] = useState('')

    useEffect(()=>{
        setProduct(data.value)
    },[])

    
  return (
    <div className="featured-product">
        {product.best_seller && <span className="best-seller-badge">Meilleur vendeur</span>}
        <Link to={`/products/${product.id}`}>
            <img src={product.poster} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
        </Link>
        <p>{product.overview}</p>
        <p>Price: {product.price} €</p>
        <p>Rating: {product.rating} / 5</p>
        {product.id}
        <ButtonAddDel product={product}/>
    </div>
  )
}

export default ProductCard
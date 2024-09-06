import React, {useContext,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import ButtonAddDel from './ButtonAddDel';


const ProductCard = (data) => {
    const { cart,addToCart } = useContext(CartContext);
    const [product,setProduct] = useState('')

    useEffect(()=>{
        setProduct(data.value)
        // console.log(cart);
        // console.log(product);
        
        // if (cart.some(item => item.id === product.id))  {
        //     // console.log('yes');
        // }
        // else{
        //     // console.log('no');
        // }
        
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
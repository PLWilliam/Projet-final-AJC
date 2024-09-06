import React, {useContext,useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';



const ProductCard = (data) => {
    const { cart } = useContext(CartContext);
    const [product,setProduct] = useState('')

    useEffect(()=>{
        setProduct(data.value)
        console.log(cart);
        console.log(product);
        
        if (cart.some(item => item.id === product.id))  {
            console.log('yes');
        }
        else{
            console.log('no');
        }
        
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
        {cart.some(item => item.id === product.id)?(
            <button className="del-to-cart">Supprimer du panier -</button>
            
        ):(
            <button className="add-to-cart">Ajouter au panier +</button>

        )}
    </div>
  )
}

export default ProductCard
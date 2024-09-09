import React, { useContext,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../component.js'
import { useNavigate } from 'react-router-dom';
import './Cart.css'
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Cart = () => {
  const { cart, removeFromCart,resetCart } = useContext(CartContext);
  const [totalPrice,setTotalPrice]         = useState('')

  const token    = sessionStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() =>{
    if (cart.length == 1) {
      setTotalPrice(cart[0].price)
    }
    else if (cart.length > 1){ 
      setTotalPrice(cart.reduce((accumulator, calc)=> accumulator + calc.price, 0))
    } 
    
  },[cart.length])

  const returnBtn =()=>{
    navigate('/');
  }

  const goToBook = (id)=>{
    navigate('/products/'+id);
  }

    
  const resetCartBtn = ()=>{
    confirmAlert({
      message: "Êtes-vous sûr de vouloir vider votre panier ?",
      buttons: [
        {
          label: "Oui",
          onClick: () => resetCart(token)
        },
        {
          label: "Annuler",
        }
      ]
    });
  }


  return (
    <div>
      <div className="cart-container-all">
        <button className="cart-container-return-btn" onClick={returnBtn}>Retour</button>
        <div className="cart-container">
          <h2>Votre panier</h2>
          {cart.length === 0 ? (
            <p>Votre panier est vide</p>
          ) : (
            cart.map((product) => (
              <div key={product.id} className="product-card">
                <h3 onClick={()=>goToBook(product.id)}>{product.name}</h3>
                <img src={product.poster} alt={product.name} className="product-image" />
                <p>Prix: ${product.price}</p>
                <button onClick={() => removeFromCart(product.id)}>Supprimer</button>
              </div>
            ))
          )}
          {cart.length > 0 && (
            <div className="cart-actions">
              <div>Total : ${totalPrice}</div>
              <button onClick={() => resetCartBtn()}>Vider panier</button>
              <Link to="/checkout" className="checkout-link">
                <button>Payer</button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

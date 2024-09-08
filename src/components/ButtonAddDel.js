import React, { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { getFirestore, collection, query, where, getDocs,addDoc,setDoc,doc,updateDoc } from 'firebase/firestore';
import { db } from '../firebase'; // Importer Firebase Firestore

const ButtonAddDel = ({ product }) => {
    const { cart, addToCart, removeFromCart } = useContext(CartContext);
    const [currentProduct, setCurrentProduct] = useState(null);
    const user = sessionStorage.getItem('token')

    // Mettez à jour le produit actuel avec celui reçu dans les props
    useEffect(() => {
        if (product) {
            setCurrentProduct(product);
        }
    }, [product]);

    // Fonction pour ajouter un produit au panier dans Firestore
    const addCart = async () => {
        if (currentProduct && currentProduct.in_stock) {
            if (user) {
                try {
                    const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', sessionStorage.getItem('token'))));
                    console.log(querySnapshot.docs[0].id);
                    
                    // Ajouter le produit au panier localement
                    const updatedCart = [...cart, currentProduct];  // Crée une copie du panier avec le produit ajouté
                    
                    await addToCart(currentProduct);  // Met à jour le panier dans le contexte (asynchrone)
      
                    // Assure-toi que le panier est mis à jour correctement
                    console.log("Panier mis à jour :", updatedCart); // Utilise updatedCart qui contient le produit ajouté
                      
                    // Vérifie que le panier n'est pas vide
                    if (updatedCart && updatedCart.length > 0) {
                        // Met à jour le champ `cart` dans le document utilisateur
                        await updateDoc(doc(db, 'users', querySnapshot.docs[0].id), { cart: updatedCart });
                        console.log("Panier mis à jour dans Firestore.");
                    } else {
                        console.log("Le panier est vide, impossible de mettre à jour Firestore.");
                    }
                } catch (error) {
                    console.error("Erreur lors de l'ajout au panier :", error);
                }
            } else {
                alert('Veuillez vous connecter pour ajouter des articles au panier');
            }
        } else {
            alert("Produit pas en stock");
        }
    };
    

    // Fonction pour retirer un produit du panier dans Firestore
    const removeCart = async () => {
        if (currentProduct && user) {
            try {
                // Récupère l'utilisateur correspondant à l'email stocké dans sessionStorage
                const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', sessionStorage.getItem('token'))));
                const userId = querySnapshot.docs[0].id;
    
                // Filtre les articles pour enlever celui correspondant
                const updatedCart = cart.filter(item => item.id !== currentProduct.id);
    
                // Met à jour le panier dans le contexte (supprime l'article)
                removeFromCart(currentProduct.id);
    
                // Assure-toi que le panier est mis à jour correctement
                console.log("Panier après suppression :", updatedCart);
    
                // Vérifie que le panier mis à jour n'est pas vide avant de mettre à jour Firestore
                if (updatedCart && updatedCart.length >= 0) {
                    // Met à jour Firestore avec le panier mis à jour
                    await updateDoc(doc(db, 'users', userId), { cart: updatedCart });
                    console.log("Panier mis à jour dans Firestore.");
                } else {
                    console.log("Le panier est vide, impossible de mettre à jour Firestore.");
                }
            } catch (error) {
                console.error("Erreur lors de la suppression du panier :", error);
            }
        } else {
            alert('Veuillez vous connecter pour supprimer des articles du panier');
        }
    };
    

    return (
        <div>
            {currentProduct && currentProduct.in_stock ? (
                cart.some(item => item.id === currentProduct.id) ? (
                    <button className="del-to-cart" onClick={removeCart}>
                        Supprimer du panier -
                    </button>
                ) : (
                    <button className="add-to-cart" onClick={addCart}>
                        Ajouter au panier +
                    </button>
                )
            ) : (
                <div className="not-in-stock" onClick={addCart}>
                    Plus en stock
                </div>
            )}

        </div>
    );
};

export default ButtonAddDel;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Header,Accordion,ProductCard } from './component.js'

import './Home.css';


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {

    // Randomisation des featured_products et limitation à 3 produits affichés
    const fetchProducts = async () => {
      const querySnapshot    = await getDocs(query(collection(db, 'featured_products')));
      const featuredProducts = querySnapshot.docs.map(doc => ({...doc.data()}));

      const shuffledProducts = featuredProducts.sort(() => Math.random() - 0.5);
      const limitedProducts  = shuffledProducts.slice(0, 3);

      setFeaturedProducts(limitedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <Header/>, 
    <div className="home-container">
    
      <header className="hero">
        <div className="hero-content">
          <h1>La librairie électronique ultime</h1>
          <p>
            CodeBook est la source la plus populaire et la plus fiable au monde en matière de livres électroniques sur l'informatique.
            Trouvez des notes et accédez aux livres les plus récents au format numérique.
          </p>
          <Link to="/products">
            <button className="cta-button">Découvrir les livres électroniques</button>
          </Link>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=40" alt="eBooks" />
        </div>
      </header>

 
      <section className="featured-section">
        <h2>Livres électroniques en vedette</h2>
        <div className="featured-products">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
              <ProductCard key={product.id} value={product}/>
          ))
        ) : (
          <p>Chargement des produits en vedette...</p>
        )}
      </div>
      <Link to="/featured_products">
            <button className="cta-button">Découvrir les livres en vedette</button>
          </Link>
      </section>

     
      <section className="testimonials-section">
        <h2>Étudiant À propos de CodeBook</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>« C'était très facile à intégrer »</p>
            <span>Bonnie Green, Développeur chez Random AI</span>
          </div>
          <div className="testimonial">
            <p>« Une base solide pour tout projet »</p>
            <span>Roberta Casas, Concepteur principal chez Random</span>
          </div>
        </div>
      </section>

      
    <Accordion/>


   
      <footer>
        <p>&copy; 2030 CodeBook. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;

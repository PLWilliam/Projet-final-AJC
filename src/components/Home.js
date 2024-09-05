import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Header from './Header';
import Accordion from './Accordion';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(query(collection(db, 'featured_products')));
      const featuredProducts = querySnapshot.docs.map(doc => ({...doc.data()}));
      setFeaturedProducts(featuredProducts);
    };

    fetchProducts();
  }, []);

  return (
    <Header/>, 
    <div className="home-container">
      {/* Hero section */}
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

      {/* Featured products section */}
      <section className="featured-section">
        <h2>Livres électroniques en vedette</h2>
        <div className="featured-products">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product) => (
            <div key={product.id} className="featured-product">
              {product.best_seller && <span className="best-seller-badge">Meilleur vendeur</span>}
              <Link to={`/products/${product.id}`}>
                <img src={product.poster} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
              </Link>
              <p>{product.overview}</p>
              <p>Price: {product.price} €</p>
              <p>Rating: {product.rating} / 5</p>
              <button className="add-to-cart">Ajouter au panier +</button>
            </div>
          ))
        ) : (
          <p>Chargement des produits en vedette...</p>
        )}
      </div>
      </section>

      {/* Testimonials section */}
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

      {/* FAQ section */}
      {/* <section className="faq-section">
        <h2>Une question en tête ?</h2>
        <div className="faq">
          <div className="faq-item">Pourquoi devrais-je utiliser CodeBook ?</div>
          <div className="faq-item">Puis-je accéder à mon eBook sur mobile ?</div>
          <div className="faq-item">Offrez-vous des remboursements ?</div>
          <div className="faq-item">Supportez-vous les paiements internationaux ?</div>
        </div>
      </section> */}
    <Accordion/>


      {/* Footer */}
      <footer>
        <p>&copy; 2030 CodeBook. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default Home;

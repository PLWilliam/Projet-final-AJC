import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/featuredProducts')
      .then((res) => res.json())
      .then((data) => setFeaturedProducts(data));
  }, []);

  return (
    <div>
      <header>
        <h1>Welcome to Codebook</h1>
        <p>Your one-stop shop for the best eBooks!</p>
      </header>
      <section>
        <h2>Featured eBooks</h2>
        <div className="featured-products">
          {featuredProducts.map((product) => (
            <div key={product.id} className="featured-product">
              <Link to={`/products/${product.id}`}>
                <h3>{product.title}</h3>
              </Link>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))}
        </div>
      </section>
      <footer>
        <Link to="/products">
          <button>View All eBooks</button>
        </Link>
      </footer>
    </div>
  );
};

export default Home;

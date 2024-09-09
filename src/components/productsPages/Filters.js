import React, { useState, useEffect } from 'react';
import './Filters.css';

const Filters = ({ products, onFilteredProductsChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [bestSellerOnly, setBestSellerOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
    const applyFilters = () => {
      const filteredProducts = products
        .filter(product => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(product => product.rating >= ratingFilter)
        .filter(product => (bestSellerOnly ? product.best_seller : true))
        .filter(product => (inStockOnly ? product.in_stock : true))
        .sort((a, b) => {
          if (sortOption === 'croissant') {
            return a.price - b.price;
          } else if (sortOption === 'decroissant') {
            return b.price - a.price;
          }
          return 0;
        });
        
      onFilteredProductsChange(filteredProducts);
    };

    applyFilters();
  }, [products, searchQuery, sortOption, ratingFilter, bestSellerOnly, inStockOnly, onFilteredProductsChange]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRatingFilter(parseInt(e.target.value));
  };

  const handleBestSellerToggle = () => {
    setBestSellerOnly(prev => !prev);
  };

  const handleInStockToggle = () => {
    setInStockOnly(prev => !prev);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSortOption('');
    setRatingFilter(0);
    setBestSellerOnly(false);
    setInStockOnly(false);
  };

  return (
    <div className="filters-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for eBooks"
      />
      <div>
        <p>Filtrer par :</p>
        <div>
          <label>
            <input
              type="radio"
              name="sort"
              value=""
              checked={sortOption === ''}
              onChange={handleSortChange}
            />
            Aucun
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="croissant"
              checked={sortOption === 'croissant'}
              onChange={handleSortChange}
            />
            Prix - Croissant
          </label>
          <label>
            <input
              type="radio"
              name="sort"
              value="decroissant"
              checked={sortOption === 'decroissant'}
              onChange={handleSortChange}
            />
            Prix - Décroissant
          </label>
        </div>

        <div>
          <p>Note :</p>
          <label>
            <input
              type="radio"
              name="rating"
              value="0"
              checked={ratingFilter === 0}
              onChange={handleRatingChange}
            />
            Toute les notes
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="4"
              checked={ratingFilter === 4}
              onChange={handleRatingChange}
            />
            4 Etoiles et +
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="3"
              checked={ratingFilter === 3}
              onChange={handleRatingChange}
            />
            3 Etoiles et +
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="2"
              checked={ratingFilter === 2}
              onChange={handleRatingChange}
            />
            2 Etoiles et +
          </label>
          <label>
            <input
              type="radio"
              name="rating"
              value="1"
              checked={ratingFilter === 1}
              onChange={handleRatingChange}
            />
            1 Etoile et +
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={bestSellerOnly}
              onChange={handleBestSellerToggle}
            />
            Seulement les meilleurs ventes
          </label>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={handleInStockToggle}
            />
            Seulement les eBooks en stock
          </label>
        </div>

        <button onClick={resetFilters}>Réinitialiser les filtres</button>
      </div>
    </div>
  );
};

export default Filters;

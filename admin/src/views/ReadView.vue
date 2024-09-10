<script setup>
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

import CardBook from '@/components/CardBook.vue';

const products = ref([]);
const loading =  ref(true)

// Delete locally
const deleteBook = async (id) => {
  let index = products.value.findIndex((e) => e.firebaseID === id);
  products.value.splice(index, 1);
};

const sortProducts = () => {
  products.value = products.value.sort((a, b) => {
    if (a.featured_products < b.featured_products) {
      return 1;
    } else {
      return -1;
    }
  });
};

onMounted(async () => {
  try {
    // Create products array with [id from firebase, data from products table, boolean if it's also in featured_products table]
    const querySnapshot = await getDocs(collection(db, "products"));
    const querySnapshot2 = await getDocs(collection(db, "featured_products"));

    products.value = querySnapshot.docs.map(doc => {
      const productId = doc.data().id;
      let featured_products = false;

      if (querySnapshot2.docs.some(featuredDoc => featuredDoc.data().id === productId)) {
        featured_products = true;
      }

      return { firebaseID: doc.id, ...doc.data(), featured_products };
    });

    sortProducts();
  } catch (error) {
    console.log('error : '+ error);
    
  }finally {
    loading.value = false;
  }

});
</script>

<template>
  <div class="container">
    <div class="containerBtn">
      <RouterLink to="/create" class="centralBtn">Ajouter un eBook</RouterLink>
      <RouterLink to="/orders" class="centralBtn">Liste commandes</RouterLink>
    </div>

    <div v-if="loading" id="containerLoader">
      <div class="loader"></div>
    </div>
    <ul v-else id="listCard">
      <li v-for="(product, index) in products" :key="product.firebaseID">
        <CardBook :product="product" :index="index" @deleteBook="deleteBook"/>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  background-color: var(--main-bg-color); 
  color: var(--main-text-color); 
  padding: 1rem;
}

.containerBtn {
  margin-bottom: 1rem;
}

.centralBtn {
  background-color: var(--button-color);
  color: var(--main-bg-color);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  text-decoration: none;
  display: inline-block;
  transition: background-color 0.3s ease;
}

.centralBtn:hover {
  background-color: #09b8b8;
}

#listCard {
  padding: 0;
  padding-top: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  flex-wrap: wrap;
  list-style: none;
}

#listCard li {
  min-width: 400px;
  max-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  align-self: stretch;
}

#containerLoader{
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
      transform: rotate(0deg);
  }
  100% {
      transform: rotate(360deg);
  }
} 
</style>

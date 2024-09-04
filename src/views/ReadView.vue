<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const products = ref([]);

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  products.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  console.log(products.value);
  
});
</script>

<template>
  <div>
    <ul>
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>
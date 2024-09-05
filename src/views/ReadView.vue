<script setup>
import { ref, onMounted ,watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { collection, query, where, getDocs ,deleteDoc , doc , addDoc} from 'firebase/firestore';
import { db } from '../firebase';

import CardBook from '@/components/CardBook.vue';

const products = ref([]);

//Delete locally
const deleteBook = async(id)=>{
  console.log(id);
  
  let index = products.value.findIndex((e)=> e.firebaseID == id)
  products.value.splice(index, 1);

}



onMounted(async () => {

  //Create products array with [id from firebase,data from products table,boolean if it's also in featured_products table]
  const querySnapshot  = await getDocs(collection(db, "products"));  
  const querySnapshot2 = await getDocs(collection(db, "featured_products"));  

  products.value = querySnapshot.docs.map(doc => {
    const productId      = doc.data().id; 
    let featured_products = false;
    
    if (querySnapshot2.docs.some(featuredDoc => featuredDoc.data().id === productId)) {
      featured_products = true;
    }
    
    return { firebaseID: doc.id, ...doc.data(), featured_products };
  });
});

</script>

<template>
  <div>
    <ul id="listCard">
      <li v-for="(product,index) in products" :key="product.id">
        <CardBook :product="product" :index="index" @deleteBook="deleteBook"/>

      </li>
    </ul>
  </div>
</template>

<style scoped>

#listCard{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
  padding: 0;
}

#listCard li{
  width: 90%;
  list-style: none;
  margin: 0;
}

</style>
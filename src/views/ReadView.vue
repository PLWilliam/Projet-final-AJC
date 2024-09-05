<script setup>
import { ref, onMounted ,watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { collection, query, where, getDocs ,deleteDoc , doc , addDoc} from 'firebase/firestore';
import { db } from '../firebase';

const products = ref([]);

//Delete locally and on db chosen book
const deleteBook = async(id)=>{

  await deleteDoc(doc(db, "products", id))

  let index = products.value.findIndex((e)=> e.firebaseID == id)
  products.value.splice(index, 1);

}

//Add or delete book from featured_products if it's in or not
const updateFeatured = async(id)=>{  
  
  try {
    let find = products.value.find((e)=> e.id == id)
    if (!find.featured_products) {
      delete find.firebaseID;
      delete find.featured_products;
      await addDoc(collection(db, "featured_products"),find);
    }
    else{
      const q         = query(collection(db, 'featured_products'), where('id', '==', id));
      const queryDocs = await getDocs(q)
      const docs      = queryDocs.docs.pop()
      await deleteDoc(doc(db, "featured_products", docs.id));
    }
    find.featured_products = !find.featured_products
  } catch (error) {
    console.log("erreur : "+error);
  }
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
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }}
        {{ product.id }}
        <RouterLink :to="{
          name : 'update',
          params: {
            id: product.id
          }
        }">Modifier </RouterLink>
        <button @click="deleteBook(product.firebaseID)">Supprimer</button>
        <button @click="updateFeatured(product.id)">featured</button>
        {{ product.featured_products }}
      </li>
    </ul>
  </div>
</template>
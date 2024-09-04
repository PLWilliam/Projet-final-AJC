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

const updateFeatured = async(id)=>{  
  
  try {
    let find = products.value.find((e)=> e.id == id)
    if (!find.featured_product) {
      await addDoc(collection(db, "featured_products"),find);
    }
    else{
      const q         = query(collection(db, 'featured_products'), where('id', '==', id));
      const queryDocs = await getDocs(q)
      const docs      = queryDocs.docs.pop()
      await deleteDoc(doc(db, "featured_products", docs.id));
    }
    find.featured_product = !find.featured_product
  } catch (error) {
    console.log("erreur : "+error);
  }
}

onMounted(async () => {
  const querySnapshot  = await getDocs(collection(db, "products"));  
  const querySnapshot2 = await getDocs(collection(db, "featured_products"));  

  products.value = querySnapshot.docs.map(doc => {
    const productId      = doc.data().id; 
    let featured_product = false;
    
    if (querySnapshot2.docs.some(featuredDoc => featuredDoc.data().id === productId)) {
      featured_product = true;
    }
    
    return { firebaseID: doc.id, ...doc.data(), featured_product };
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
        {{ product.featured_product }}
      </li>
    </ul>
  </div>
</template>
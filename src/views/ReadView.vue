<script setup>
import { ref, onMounted ,watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { collection, query, where, getDocs ,deleteDoc , doc} from 'firebase/firestore';
import { db } from '../firebase';

const products = ref([]);

//Delete locally and on db chosen book
const deleteBook = async(id)=>{

  const q = query(collection(db, 'products'), where('id', '==', id));
  const queryDocs = await getDocs(q)
  const docs = queryDocs.docs.pop()

  deleteDoc(doc(db, "products", docs.id))

  let index = products.value.findIndex((e)=>  e.id == id)
  products.value.splice(index, 1);

}

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, "products"));  
  products.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
        <button @click="deleteBook(product.id)">Supprimer</button>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute,useRouter } from "vue-router";
import { collection, getDocs, deleteDoc, doc, addDoc,query,where,updateDoc  } from 'firebase/firestore';
import { db } from '../firebase';

const route = useRoute();
const id    = Number(route.params.id)

const firebaseID = ref();

const form = ref({})

const updateBook = async()=>{
    try {
        await updateDoc(doc(db, 'products', firebaseID.value), form.value);
        console.log("update");
        
    } catch (error) {
        console.log("erreur :"+ error);
        
    }

}

onBeforeMount(async()=>{    
    const q          = query(collection(db, 'products'), where('id', '==', id));
    const queryDocs  = await getDocs(q)
    const data       = queryDocs.docs.pop().data()
    firebaseID.value = queryDocs.docs.pop().id
    form.value       = data
})

</script>

<template>


<div class="form">    
    <label for="name">name</label>
    <input type="text" name="name" v-model="form.name">
    
    <label for="overview">overview</label>
    <input type="text" name="overview" v-model="form.overview">
    
    <label for="long_description">long_description</label>
    <input type="text" name="long_description" v-model="form.long_description">
    
    <label for="price">price</label>
    <input type="text" name="price" v-model="form.price">
    
    <label for="poster">poster</label>
    <input type="text" name="poster" v-model="form.poster">
    
    <label for="image_local">image_local</label>
    <input type="text" name="image_local" v-model="form.image_local">
    
    <label for="rating">rating</label>
    <input type="text" name="rating" v-model="form.rating">
    
    <label for="in_stock">in_stock</label>
    <input type="checkbox" name="in_stock" v-model="form.in_stock">
    
    <label for="size">size</label>
    <input type="text" name="size" v-model="form.size">
    
    <label for="best_seller">best_seller</label>
    <input type="checkbox" name="best_seller" v-model="form.best_seller">

    <button @click="updateBook">Update</button>
</div>
    
    
</template>

<style scoped>

.form{
    display: flex;
    flex-direction: column;
}

</style>
<script setup>
import { ref, onBeforeMount } from 'vue';
import { collection, getDocs, deleteDoc, doc, addDoc  } from 'firebase/firestore';
import { db } from '../firebase';
import dbjson from '@/assets/db.js'

// console.log(dbjson);
const listProducts = dbjson.products;

const lastIndex = ref()

console.log(listProducts);

const form = ref({
    "id": '',
    "name": '',
    "overview":'' ,
    "long_description": '',
    "poster": '',
    "image_local": '',
    "rating": '',
    "in_stock": false,
    "size": '',
    "best_seller": false,
})



// Reset collection/db 
const resetDB = async ()=>{
    try {
        // delete everything from db
        const querySnapshot = await getDocs(collection(db, "products"));
        const batchPromises = querySnapshot.docs.map(documentSnapshot => 
            deleteDoc(doc(db, "products", documentSnapshot.id))
        );
        await Promise.all(batchPromises);

        // ReAdd every books from the default db.js
        listProducts.forEach(async(element) =>{
            await addDoc(collection(db, "products"), {
                "id": element.id,
                "name": element.name,
                "overview": element.overview,
                "long_description": element.long_description,
                "poster": element.poster,
                "image_local": element.image_local,
                "rating": element.rating,
                "in_stock": element.in_stock,
                "size": element.size,
                "best_seller": element.best_seller,
            });
        });        
    } catch (error) {
        console.log("erreur :" + error);
    }
}

// Add data form into the db
const addDB = async() =>{
    try {
        lastIndex.value++
        await addDoc(collection(db, "products"), {
            "id": lastIndex.value,
            "name": form.value.name,
            "overview": form.value.overview,
            "long_description": form.value.long_description,
            "poster": form.value.poster,
            "image_local": form.value.image_local,
            "rating": form.value.rating,
            "in_stock": form.value.in_stock,
            "size": form.value.size,
            "best_seller": form.value.best_seller,
        });
        console.log("Nouvelle entrée dans la db");
        console.log(lastIndex.value);
        
    } catch (error) {
        console.log("erreur : "+error);
        
    }
}

// Find last "real" id from database and not id from firebase
const findLastId = async()=>{
    const querySnapshot = await getDocs(collection(db, "products"));
    const maxID = querySnapshot.docs.reduce((a, b) => {
        const id = b.data().id;
        return Math.max(a, id);
    }, -Infinity);
    lastIndex.value = maxID
    console.log(lastIndex.value);
}

onBeforeMount(()=>{
    findLastId()
})

</script>

<template>


<button @click="resetDB">reset database</button>

<div class="form">    
    <label for="name">name</label>
    <input type="text" id="name" v-model="form.name">
    
    <label for="overview">overview</label>
    <input type="text" id="overview" v-model="form.overview">
    
    <label for="long_description">long_description</label>
    <input type="text" id="long_description" v-model="form.long_description">
    
    <label for="price">price</label>
    <input type="text" id="price" v-model="form.price">
    
    <label for="poster">poster</label>
    <input type="text" id="poster" v-model="form.poster">
    
    <label for="image_local">image_local</label>
    <input type="text" id="image_local" v-model="form.image_local">
    
    <label for="rating">rating</label>
    <input type="text" id="rating" v-model="form.rating">
    
    <label for="in_stock">in_stock</label>
    <input type="checkbox" id="in_stock" v-model="form.in_stock">
    
    <label for="size">size</label>
    <input type="text" id="size" v-model="form.size">
    
    <label for="best_seller">best_seller</label>
    <input type="checkbox" id="best_seller" v-model="form.best_seller">

    <button @click="addDB">Envoyer</button>
</div>
    
    
</template>

<style scoped>

.form{
    display: flex;
    flex-direction: column;
}

</style>
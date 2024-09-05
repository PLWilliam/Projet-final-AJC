<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute,useRouter } from "vue-router";
import { collection, getDocs, deleteDoc, doc, addDoc  } from 'firebase/firestore';
import { db } from '../firebase';
import dbjson from '@/assets/db.js'
import FormBook from '@/components/FormBook.vue';

const router = useRouter()

const listProducts = dbjson.products;

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

const lastID = ref()

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
            await addDoc(collection(db, "products"), element);
        })        
    } catch (error) {
        console.log("erreur :" + error);
    }
}

// Add data form into the db
const addDB = async(form) =>{
    try {
        lastID.value++
        form.id = lastID.value
        await addDoc(collection(db, "products"), form);
        console.log("Nouvelle entrée dans la db");
        router.push({ name: 'read' });
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
    lastID.value = maxID
}

onBeforeMount(()=>{
    findLastId()
})

</script>

<template>


<button @click="resetDB">reset database</button>

<FormBook :form="form" @emitForm="addDB"/>
    
    
</template>

<style scoped>


</style>
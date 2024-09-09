<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import { collection, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import dbjson from '@/assets/db.js'
import FormBook from '@/components/FormBook.vue';

const router = useRouter();

const listProducts = dbjson.products;

const form = ref({
    id: '',
    name: '',
    overview: '',
    long_description: '',
    poster: '',
    image_local: '',
    rating: '',
    in_stock: false,
    size: '',
    best_seller: false,
});

const lastID = ref();

// Reset collection/db
const resetDB = async () => {
    try {
        // Delete everything from db
        const querySnapshot = await getDocs(collection(db, "products"));
        const batchPromises = querySnapshot.docs.map(documentSnapshot => 
            deleteDoc(doc(db, "products", documentSnapshot.id))
        );
        await Promise.all(batchPromises);

        // Re-add every book from the default db.js
        listProducts.forEach(async (element) => {
            await addDoc(collection(db, "products"), element);
        });
    } catch (error) {
        console.log("Erreur :" + error);
    }
};

// Add data form into the db
const addDB = async (form) => {
    try {
        lastID.value++;
        form.id = lastID.value;
        await addDoc(collection(db, "products"), form);
        console.log("Nouvelle entrée dans la db");
        router.push({ name: 'ebooks' });
    } catch (error) {
        console.log("Erreur : " + error);
    }
};

// Find last "real" id from database and not id from firebase
const findLastId = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const maxID = querySnapshot.docs.reduce((a, b) => {
        const id = b.data().id;
        return Math.max(a, id);
    }, -Infinity);
    lastID.value = maxID;
};

onBeforeMount(() => {
    findLastId();
});
</script>

<template>
    <section class="main-section">
        
        <div class="containerBtn">
            <RouterLink to="/ebooks" class="centralBtn">Retour</RouterLink>
        </div>
        
        <FormBook :form="form" @emitForm="addDB"/>
        <!-- <button @click="resetDB" class="reset-button">Réinitialiser la base de données</button> -->
    </section>
</template>

<style scoped>
.main-section {
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.reset-button {
    background-color: var(--button-color);
    color: var(--main-bg-color);
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 1rem;
}

.reset-button:hover {
    background-color: #09b8b8;
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
</style>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute,useRouter } from "vue-router";
import { collection, getDocs, doc,query,where,updateDoc  } from 'firebase/firestore';
import { db } from '../firebase';
import FormBook from '@/components/FormBook.vue';

const route  = useRoute();
const router = useRouter()
const id     = Number(route.params.id)

const firebaseID = ref();
const form       = ref({})

const updateBook = async()=>{    
    try {
        await updateDoc(doc(db, 'products', firebaseID.value), form.value);

        const q = query(collection(db, 'featured_products'), where('id', '==', form.value.id));
        const queryDocs = await getDocs(q)        
        
        if (queryDocs.docs.length > 0) {
            await updateDoc(doc(db, 'featured_products', queryDocs.docs.pop().id), form.value);
        }

        router.push({ name: 'ebooks' });
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

<section class="main-section">
        
    <div class="containerBtn">
        <RouterLink to="/ebooks" class="centralBtn">Retour</RouterLink>
    </div>
    
    <FormBook :form="form" @emitForm="addDB"/>
    
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
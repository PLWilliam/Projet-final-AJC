<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRoute,useRouter } from "vue-router";
import { collection, getDocs, deleteDoc, doc, addDoc,query,where,updateDoc  } from 'firebase/firestore';
import { db } from '../firebase';
import FormBook from '@/components/FormBook.vue';

const route = useRoute();
const router = useRouter()
const id    = Number(route.params.id)

const firebaseID = ref();

const form = ref({})

const updateBook = async()=>{
    console.log(form.value);
    
    try {
        await updateDoc(doc(db, 'products', firebaseID.value), form.value);

        const q = query(collection(db, 'featured_products'), where('id', '==', form.value.id));
        
        const queryDocs = await getDocs(q)        
        
        if (queryDocs.docs.length > 0) {
            await updateDoc(doc(db, 'featured_products', queryDocs.docs.pop().id), form.value);
        }

        console.log("update");
        router.push({ name: 'read' });
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

<div class="containerBtn">
    <RouterLink to="/read" class="centralBtn">Retour</RouterLink>
</div>

<FormBook :form="form" @emitForm="updateBook"/>
    
    
</template>

<style scoped>

.form{
    display: flex;
    flex-direction: column;
}

</style>
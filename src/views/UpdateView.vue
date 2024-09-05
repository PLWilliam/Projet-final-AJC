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
    try {
        await updateDoc(doc(db, 'products', firebaseID.value), form.value);
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

<FormBook :form="form" @emitForm="updateBook"/>
    
    
</template>

<style scoped>

.form{
    display: flex;
    flex-direction: column;
}

</style>
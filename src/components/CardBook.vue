<script setup>
import { collection, query, where, getDocs, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const props = defineProps(['product', 'index']);
const emit = defineEmits(['deleteBook']);
const product = props.product;

// Delete from db chosen book
const deleteBook = async (id, firebaseID) => {
    const text = "Êtes-vous sûr de vouloir supprimer ce livre ?";
    if (confirm(text)) {
        try {
            const q = query(collection(db, 'featured_products'), where('id', '==', id));
            const queryDocs = await getDocs(q);

            if (queryDocs.docs.length > 0) {
                const docID = queryDocs.docs[0].id;
                await deleteDoc(doc(db, "featured_products", docID));
            }

            await deleteDoc(doc(db, "products", firebaseID));
            emit('deleteBook', firebaseID);
        } catch (error) {
            console.error(error);
        }
    }
};

// Add or delete book from featured_products if it's in or not
const updateFeatured = async (id) => {
    try {
        const copyProduct = { ...product };
        if (!product.featured_products) {
            delete copyProduct.firebaseID;
            delete copyProduct.featured_products;
            await addDoc(collection(db, "featured_products"), copyProduct);
        } else {
            const q = query(collection(db, 'featured_products'), where('id', '==', id));
            const queryDocs = await getDocs(q);
            const docs = queryDocs.docs.pop();
            await deleteDoc(doc(db, "featured_products", docs.id));
        }
        product.featured_products = !product.featured_products;
    } catch (error) {
        console.error("Erreur : " + error);
    }
};
</script>

<template>
    <div class="card">
        <img :src="product.poster" :alt="'Image de ' + product.name" class="card-image">
        <div class="card-info">
            <h3>{{ product.name }}</h3>
            <p>{{ product.overview }}</p>
            <p>Note : {{ product.rating }} / 5</p>
            <p>Best seller : {{ product.best_seller ? 'Oui' : 'Non' }}</p>
            <p>En stock : {{ product.in_stock ? 'Oui' : 'Non' }}</p>
            <p>Taille : {{ product.size }} MB</p>
            <p>Prix : {{ product.price }} $</p>
        </div>
        <div class="card-buttons">
            <RouterLink :to="{ name: 'update', params: { id: product.id } }" class="btn" aria-label="Modifier ce livre">
                <font-awesome-icon :icon="['fas', 'pen-to-square']" />
            </RouterLink>
            <button @click="deleteBook(product.id, product.firebaseID)" class="btn" aria-label="Supprimer ce livre">
                <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
            <button @click="updateFeatured(product.id)" class="btn" :aria-label="product.featured_products ? 'Retirer de la liste vedette' : 'Ajouter à la liste vedette'">
                <font-awesome-icon :icon="product.featured_products ? 'fa-solid fa-star' : 'fa-regular fa-star'" />
            </button>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    background-color: var(--secondary-bg-color);
    border-radius: 12px; 
    overflow: hidden;
    color: var(--secondary-text-color);
    margin: 1rem;
    border: 1px solid var(--border-color);
    height: 100%;
}

.card h3{
    color: var(--main-text-color);
}

.card-image {
    width: 100%;
    height: auto;
    border-bottom: 2px solid var(--border-color); 
}

.card-info {
    flex: 1;
    padding: 1rem;
}

.card-info h3 {
    margin: 0 0 0.5rem 0;
}

.card-info p {
    margin: 0.5rem 0;
}

.card-buttons {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    border-top: 2px solid var(--border-color);
    background-color: var(--main-bg-color); 
}

.btn {
    background-color: var(--button-color); 
    border: none;
    border-radius: 6px;
    color: var(--main-bg-color);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    width: 36px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #09b8b8;
}

.font-awesome-icon {
    width: 20px;
    height: 20px;
}

</style>

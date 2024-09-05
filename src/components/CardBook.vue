<script setup>
import { collection, query, where, getDocs ,deleteDoc , doc , addDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas, far, fal, fass, fasds } from '@awesome.me/kit-KIT_CODE/icons'

const props = defineProps(['product','index'])

const emit = defineEmits(['deleteBook'])
const product = props.product

//Delete locally and on db chosen book
const deleteBook = async(id)=>{

    await deleteDoc(doc(db, "products", id))

    console.log(id);
    
    emit('deleteBook',id)
    // product.splice(index, 1);

}

//Add or delete book from featured_products if it's in or not
const updateFeatured = async(id)=>{  

try {
  if (!product.featured_products) {
    delete product.firebaseID;
    delete product.featured_products;
    await addDoc(collection(db, "featured_products"),product);
  }
  else{
    const q         = query(collection(db, 'featured_products'), where('id', '==', id));
    const queryDocs = await getDocs(q)
    const docs      = queryDocs.docs.pop()
    await deleteDoc(doc(db, "featured_products", docs.id));
  }
  product.featured_products = !product.featured_products
} catch (error) {
  console.log("erreur : "+error);
}
}

</script>

<template>
    <div class="card">
        <div class="cardText">
            {{ product.name }}
            {{ product.id }}
        </div>
        <div class="cardBtn">
            <RouterLink :to="{
                name : 'update',
                params: {
                    id: product.id
                }
            }">Modifier </RouterLink>
            <button @click="deleteBook(product.firebaseID)">Supprimer</button>
            <button @click="updateFeatured(product.id)">
                <font-awesome-icon icon="star" />
                <!-- <div v-if="product.featured_products">
                </div>
                <div v-else>
                    <font-awesome-icon icon="star" />
                </div> -->
            </button>
            <!-- {{ product.featured_products }} -->
        </div>
    </div>
</template>

<style scoped>

.card{
    background-color: aquamarine;
    width: 100%;
    padding: 1em;
    border-radius: 50px;
    display: flex;
}

.cardText{
    width: 80%;
}

.cardBtn{
    width: 20%;
    align-self: flex-end;
}

</style>
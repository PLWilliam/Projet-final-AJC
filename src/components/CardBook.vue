<script setup>
import { collection, query, where, getDocs ,deleteDoc , doc , addDoc} from 'firebase/firestore';
import { db } from '../firebase';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
            <div class="splitBtn">
                <RouterLink :to="{
                        name : 'update',
                        params: {
                            id: product.id
                        }
                    }"
                    class="btn"
                >
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon"/> 
                </RouterLink>
            </div>
            <div class="splitBtn">
                <button @click="deleteBook(product.firebaseID)" class="btn">
                    <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                </button>
            </div>
            <div class="splitBtn">
                <button @click="updateFeatured(product.id)" class="btn">
                    <div v-if="product.featured_products" class="btn" style="border: none;">
                        <font-awesome-icon icon="fa-solid fa-star" class="icon"/>
                    </div>
                    <div v-else class="btn" style="border: none;">
                        <font-awesome-icon icon="fa-regular fa-star" class="icon"/>
                    </div>
                </button>
            </div>
            <!-- {{ product.featured_products }} -->
        </div>
    </div>
</template>

<style scoped>

.card{
    background-color: aquamarine;
    max-width: 100%;
    padding: 1em;
    border-radius: 50px;
    display: flex;
}

.cardText{
    width: 90%;
}

.cardBtn{
    width: 10%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}

.splitBtn{
    width: 33%;
}

.btn{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: greenyellow;
    height: 36px;
    width: 36px;
    border: 2px black solid;
    padding: 0;
    box-sizing:content-box;
    text-decoration: none;
    color: black;
}

.btn:hover{
    cursor: pointer;
}

svg{
    width: 80%;
    height: 80%;

}


</style>
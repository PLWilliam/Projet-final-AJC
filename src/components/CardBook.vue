<script setup>
import { collection, query, where, getDocs ,deleteDoc , doc , addDoc} from 'firebase/firestore';
import { db } from '../firebase';
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { fas, far, fal, fass, fasds } from '@awesome.me/kit-KIT_CODE/icons'

const props = defineProps(['product','index'])

const emit = defineEmits(['deleteBook'])
const product = props.product

//Delete from db chosen book
const deleteBook = async(id,firebaseID)=>{

    console.log(firebaseID);
    

    try {
        const q = await query(collection(db, 'featured_products'), where('id', '==', id));
        const queryDocs = await getDocs(q)  

        if (queryDocs.docs.length > 0) {
            const docID = queryDocs.docs[0].id;
            await deleteDoc(doc(db, "featured_products", docID))
        }

        await deleteDoc(doc(db, "products", firebaseID))
        emit('deleteBook',firebaseID)
    } catch (error) {
        console.log(error);
    }
}

//Add or delete book from featured_products if it's in or not
const updateFeatured = async(id)=>{  

    try {
        const copyProduct = { ...product }
        if (!product.featured_products) {
            delete copyProduct.firebaseID;
            delete copyProduct.featured_products;
            await addDoc(collection(db, "featured_products"),copyProduct);
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
            <img :src="product.poster" :alt="'image : '+product.name">
            <div class="cardInfo">
                <h3>{{ product.name }}</h3>
                <span>{{ product.overview }}</span>
                <div class="cardInfoDuo">
                    <span>Note : {{ product.rating }} / 5</span>
                    <span>Best seller : {{ product.best_seller ? 'Vrai' : 'Faux' }}</span>
                </div>
                <div class="cardInfoDuo">
                    <span>En stock : {{ product.in_stock ? 'Vrai' : 'Faux' }}</span>
                    <span>Taille : {{ product.size }} MB</span>
                </div>
                <span>Prix : {{ product.price }} $</span>
            </div>
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
                    aria-label="Envoie sur la page de modification de ce livre"
                >
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" class="icon"/> 
                </RouterLink>
            </div>
            <div class="splitBtn">
                <button @click="deleteBook(product.id,product.firebaseID)" class="btn" aria-label="Suppression du livre">
                    <font-awesome-icon icon="fa-solid fa-trash" class="icon"/>
                </button>
            </div>
            <div class="splitBtn">
                <button @click="updateFeatured(product.id)" class="btn" :aria-label="product.featured_products ? 'Retire le livre de la liste vedette' : 'Ajout du livre dans la liste vedette' ">
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
    /* max-width: 100%; */
    /* height: 10em; */
    /* padding: 1em; */
    border-radius: 25px;
    /* display: flex; */
}

.cardText{
    /* display: flex; */
    width: 100%;
    height: 90%;
}

.cardText img{
    border-radius: 25px 25px 0 0;
    width: 100%;
    height: 40%;
}

.cardInfo{
    height: 60%;
    padding: 0 1em;
    display: flex;
    flex-direction: column;
}

.cardInfoDuo{
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.cardInfoDuo span{
    margin: 0.5em 0;
}

.cardBtn{
    border-top: 1px solid black;
    box-sizing: border-box;
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.splitBtn{
    height: 5em;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
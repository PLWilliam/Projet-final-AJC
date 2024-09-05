<script setup>
import { ref,watch,onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { signInWithEmailAndPassword,signOut,onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import { useRoute,useRouter } from "vue-router";
const router = useRouter();

const user = ref('')

// console.log(auth);




const logout = async () => {
    try {
        await signOut(auth);
        console.log("Utilisateur déconnecté");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }
router.push({ name: 'home' });
};


onMounted(() => {
  onAuthStateChanged(auth, (elem) => {
    if (elem) {
      user.value = elem.email.split('@')[0];
    } else {
        user.value = null;
    }
  });
});

</script>

<template>
    <section>
        <div id="logo">
            <img src="@/assets/codebook-logo.png" alt="logo codebook">
            <h1>CodeBook</h1>
        </div>
        <div v-if="user">
            <nav>
                <RouterLink to="/">Home </RouterLink>
                <RouterLink to="/read">read </RouterLink>
                <RouterLink to="/create">create </RouterLink>
            </nav>
        </div>
        <div v-if="user">
            Bonjour : {{ user }}
        </div>
        <button @click="logout">Se Déconnecter</button>
    </section>
</template>

<style scoped>
section{
    background-color: red;
    height: 5vh;
    display: flex;
    justify-content: space-between;
}

#logo{
    height: 100%;
    display: flex;
    align-items: center;
}

#logo img{
    height: 100%;
}


</style>
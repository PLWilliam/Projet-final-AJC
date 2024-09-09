<script setup>
import { ref,onMounted } from 'vue';
import { signOut,onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import { useRouter } from "vue-router";
const router = useRouter();

const user = ref('')

const logout = async () => {
    try {
        await signOut(auth);
        console.log("Utilisateur déconnecté");
    } catch (error) {
        console.error("Erreur lors de la déconnexion :", error);
    }
    router.push({ name: 'home' });
};

const logoClicked = ()=>{
    router.push({ name: 'home' });
}


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
        <div id="logo" @click="logoClicked">
            <img src="@/assets/codebook-logo.png" alt="logo codebook">
            <h1>CodeBook</h1>
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

#logo :hover{
    cursor: pointer;
}


</style>
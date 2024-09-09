<script setup>
import { ref, onMounted } from 'vue';
import { signOut, onAuthStateChanged } from 'firebase/auth';
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

const logoClicked = () => {
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
        <div v-if="user" class="user-info">
            Bonjour : {{ user }}
        </div>
        <button v-if="user" @click="logout" class="logout-button">Se Déconnecter</button>
    </section>
</template>

<style scoped>
section {
    background-color: var(--main-bg-color);
    height: 10vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom: 2px solid var(--border-color);
    box-sizing: border-box;
}

#logo {
    display: flex;
    align-items: center;
    color: var(--main-text-color);
}

#logo img {
    height: 40px;
    margin-right: 0.5rem;
}

#logo h1 {
    margin: 0;
    font-size: 1.2rem;
}

#logo:hover {
    cursor: pointer;
}

.user-info {
    color: var(--main-text-color);
}

.logout-button {
    background-color: var(--button-color);
    color: var(--main-bg-color);
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.logout-button:hover {
    background-color: #09b8b8;
}
</style>

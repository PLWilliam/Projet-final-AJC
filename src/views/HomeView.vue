<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useRoute,useRouter } from "vue-router";

const router = useRouter();

const email = ref("tgp.william@gmail.com");
const password = ref("MiGii@9jtERHz7NF");

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    console.log('Utilisateur connecté :', userCredential.user);
    router.push({ name: 'read' });
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    console.log("Utilisateur déconnecté");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};
</script>

<template>
  <div>
    <h1>Connexion</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Mot de passe" />
    <button @click="login">Se connecter</button>
    <button @click="logout">Se Déconnecter</button>
  </div>
</template>
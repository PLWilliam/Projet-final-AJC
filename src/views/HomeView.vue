<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("tgp.william@gmail.com");
const password = ref("MiGii@9jtERHz7NF");

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    // console.log('Utilisateur connecté :', userCredential.user);
    router.push({ name: 'ebooks' });
  } catch (error) {
    console.error('Erreur de connexion:', error.message);
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    router.push({ name: 'ebooks' });
  }
});
</script>

<template>
  <div id="containerLogin">
    <div class="loginBox">
      <h1>Connexion</h1>
      <div class="labelInput">
        <label for="mail">Email :</label>
        <input v-model="email" name="mail" placeholder="Email" />
      </div>
      <div class="labelInput">
        <label for="password">Mot de passe :</label>
        <input v-model="password" name="password" type="password" placeholder="Mot de passe" />
      </div>
      <button @click="login">Se connecter</button>
    </div>
  </div>
</template>

<style scoped>

#containerLogin {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--main-bg-color); 
}

.loginBox {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
  background-color: var(--secondary-bg-color);
  padding: 3em 7em;
  border-radius: 25px;
  border: 1px solid var(--border-color);
  color: var(--main-text-color);
}

.labelInput {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

label {
  color: var(--main-text-color);
}

input {
  padding: 0.5em;
  border: 1px solid var(--border-color);
  border-radius: 6px;
  background-color: #2e2e2e; 
  color: var(--main-text-color); 
}

input::placeholder {
  color: var(--secondary-text-color); 
}

button {
  width: 100%;
  padding: 0.75em;
  border: none;
  border-radius: 6px;
  background-color: var(--button-color); 
  color: var(--main-bg-color); 
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #09b8b8; 
}
</style>

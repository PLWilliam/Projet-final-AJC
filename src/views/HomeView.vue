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

//faire fonction si co router to read

</script>

<template>
  <div id="loginContainer">
    <div class="loginBox">
      <h1>Connexion</h1>
      <div class="labelInput">
        <label for="mail">email :</label>
        <input v-model="email" name="mail" placeholder="Email" />
      </div>
      <div class="labelInput">
        <label for="password">password : </label>
        <input v-model="password" name="password"  type="password" placeholder="Mot de passe" />
      </div>
      <button @click="login">Se connecter</button>
    </div>
  </div>
</template>

<style scoped>

#loginContainer{
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loginBox{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2em;
  /* background-color: firebrick; */
  padding: 3em 7em;
  border-radius: 50px;
  border: black 1px solid;
}

.labelInput{
  display: flex;
  flex-direction: column;
  gap: 0.5em
}

input{
  padding: 0.5em 0.2em;
}

button{
  width: 100%;
}



</style>
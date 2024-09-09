<script setup>
import { ref, onMounted, watch } from 'vue';

const emit = defineEmits(['emitForm']);
const props = defineProps({
    form: {
        type: Object,
        default: () => ({})
    }
});

const form = ref({});

const emitForm = () => {
  if (isValidForm()) {
    emit('emitForm', form.value);
  } else {
    alert('Veuillez remplir tous les champs obligatoires.');
  }
};

const isValidForm = () => {
  return form.value.name && form.value.overview && form.value.long_description && form.value.price && form.value.poster && form.value.image_local && form.value.rating && form.value.size;
};

onMounted(() => {
    form.value = props.form;
});

watch(() => props.form, (newValue) => {
    form.value = newValue;
});
</script>

<template>
  <div class="form">
    <div class="form-group">
      <label for="name">Nom :</label>
      <input type="text" id="name" name="name" v-model="form.name" placeholder="Entrez le nom" required>
    </div>

    <div class="form-group">
      <label for="overview">Résumé :</label>
      <input type="text" id="overview" name="overview" v-model="form.overview" placeholder="Entrez le résumé" required>
    </div>

    <div class="form-group">
      <label for="long_description">Description longue :</label>
      <input type="text" id="long_description" name="long_description" v-model="form.long_description" placeholder="Entrez la description longue" required>
    </div>

    <div class="form-group">
      <label for="price">Prix :</label>
      <input type="text" id="price" name="price" v-model="form.price" placeholder="Entrez le prix" required>
    </div>

    <div class="form-group">
      <label for="poster">Affiche :</label>
      <input type="text" id="poster" name="poster" v-model="form.poster" placeholder="Entrez l'URL de l'affiche" required>
    </div>

    <div class="form-group">
      <label for="image_local">Image locale :</label>
      <input type="text" id="image_local" name="image_local" v-model="form.image_local" placeholder="Entrez l'URL de l'image locale" required>
    </div>

    <div class="form-group">
      <label for="rating">Note :</label>
      <input type="text" id="rating" name="rating" v-model="form.rating" placeholder="Entrez la note" required>
    </div>

    <div class="form-group form-group-check">
      <label for="in_stock">En stock :</label>
      <input type="checkbox" id="in_stock" name="in_stock" v-model="form.in_stock">
    </div>

    <div class="form-group">
      <label for="size">Taille :</label>
      <input type="text" id="size" name="size" v-model="form.size" placeholder="Entrez la taille" required>
    </div>

    <div class="form-group form-group-check">
      <label for="best_seller">Meilleure vente :</label>
      <input type="checkbox" id="best_seller" name="best_seller" v-model="form.best_seller">
    </div>

    <button @click="emitForm" class="submit-button">Envoyer</button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  width: 50%;
  margin: auto;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

.form-group {
  margin-bottom: 1rem;
  padding-right:1em;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--main-text-color);
}

.form-group input[type="text"] {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--secondary-bg-color);
  color: var(--main-text-color);
}

.form-group input[type="checkbox"] {
  margin-left: 0.5rem;
}

.form-group-check{
  display: flex;
}

.submit-button {
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: var(--button-color);
  color: var(--main-bg-color);
  font-size: 1rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #09b8b8;
}
</style>

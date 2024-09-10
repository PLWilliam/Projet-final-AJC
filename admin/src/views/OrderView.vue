<script setup>
import { ref, onMounted } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const orders = ref([]);

const fetchOrders = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    orders.value = querySnapshot.docs.map(doc => ({ ...doc.data(), firebaseID: doc.id }));
    console.log(orders.value);
    
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes : ", error);
  }
};

function convertTimestampToDate(timestamp) {
  const { seconds, nanoseconds } = timestamp;
  const milliseconds = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(milliseconds);
  return date.toLocaleString();
}

function calculateTotal(order) {
  const cart = order.cart;
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return total;
}

onMounted(() => {
  fetchOrders();
});
</script>

<template>

    <div class="orders-page">
        <div class="containerBtn">
            <RouterLink to="/ebooks" class="centralBtn">Retour</RouterLink>
        </div>
      <h2>Liste des commandes</h2>
      <div v-if="orders.length === 0" class="no-orders">
        <p>Aucune commande disponible pour le moment.</p>
      </div>
  
      <!-- Computer -->
      <div class="orders-table-container">
        <table class="orders-table">
          <thead>
            <tr>
              <th># Commande</th>
              <th>Date</th>
              <th>Client</th>
              <th>Panier</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.firebaseID">
              <td>{{ order.firebaseID }}</td>
              <td>{{ convertTimestampToDate(order.createdAt) }}</td>
              <td>{{ order.mail }}</td>
              <td>
                <ul>
                  <li v-for="(item, index) in order.cart" :key="index">
                    {{ item.name }} - {{ item.price }} $
                  </li>
                </ul>
              </td>
              <td>{{ calculateTotal(order) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Mobile -->
      <div v-for="order in orders" :key="order.firebaseID" class="order-card">
        <h3># Commande: {{ order.firebaseID }}</h3>
        <p>Date: {{ convertTimestampToDate(order.createdAt) }}</p>
        <p>Client: {{ order.mail }}</p>
        <p>Panier:</p>
        <ul>
          <li v-for="(item, index) in order.cart" :key="index">
            {{ item.name }} - {{ item.price }} $
          </li>
        </ul>
        <p>Total: {{ calculateTotal(order) }}</p>
      </div>
    </div>
  </template>
  

<style scoped>
.containerBtn {
    margin-bottom: 1rem;
}

.centralBtn {
    background-color: var(--button-color);
    color: var(--main-bg-color);
    border: none;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    text-decoration: none;
    display: inline-block;
    transition: background-color 0.3s ease;
}

.centralBtn:hover {
    background-color: #09b8b8;
}

.order-card{
    display: none;
}

.orders-page {
  padding: 1rem;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: var(--main-text-color);
}

.no-orders {
  text-align: center;
  color: var(--secondary-text-color);
}

.orders-table-container {
  display: none;
}

@media (min-width: 769px) {
  .orders-table-container {
    display: flex;
    justify-content: center;
    overflow-x: auto;
  }

  .orders-table {
    width: 100%;
    max-width: 1200px;
    border-collapse: collapse;
    background-color: var(--secondary-bg-color);
    color: var(--main-text-color);
    border: 1px solid var(--border-color);
  }

  .orders-table th, .orders-table td {
    padding: 1rem;
    text-align: left;
    border: 1px solid var(--border-color);
  }

  .orders-table th {
    background-color: var(--button-color);
    color: var(--main-bg-color);
    font-weight: bold;
  }

  .orders-table td ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .orders-table td ul li {
    margin: 0.5rem 0;
  }

  .orders-table td {
    vertical-align: top;
  }
}

.order-card {
  background-color: var(--secondary-bg-color);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 1rem;
  padding: 1rem;
}

.order-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--main-text-color);
}

.order-card p {
  margin: 0.25rem 0;
}

.order-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.order-card ul li {
  margin: 0.25rem 0;
}

@media (max-width: 768px) {
  .orders-page {
    padding: 1rem;
  }

  .orders-table-container {
    display: none;
  }

  .order-card {
    display: block;
  }
}
</style>

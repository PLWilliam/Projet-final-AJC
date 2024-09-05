import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { FontAwesomeIcon } from './fontAwesome';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

let isLoaded = true;

onAuthStateChanged(auth, (user) => {
    if (isLoaded) {
      if (user) {
        router.push({ name: 'read' });
      } else {
        router.push({ name: 'home' });
      }
      isLoaded = false;
    }
  })

const app = createApp(App)

app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app')

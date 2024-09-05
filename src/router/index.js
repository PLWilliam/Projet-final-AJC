import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/read',
      name: 'read',
      component: () => import('../views/ReadView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../views/CreateView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/update/:id',
      name: 'update',
      component: () => import('../views/UpdateView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

//check if user is connected
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    // if not connect go back home
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router

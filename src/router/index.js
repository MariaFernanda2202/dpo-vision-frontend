import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    // {
    //   path: '/',
    //   name: 'TextBoxView',
    //   component: () => import('@/views/TextBoxView.vue'),
    // },
  ],
})

export default router

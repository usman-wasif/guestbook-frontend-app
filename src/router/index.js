import { createRouter, createWebHistory } from 'vue-router';
import CommentForm from '../components/CommentForm.vue';
import CommentList from '../components/CommentList.vue';
import AdminPanel from '../components/AdminPanel.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: CommentList,
      commentForm: CommentForm,
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminPanel,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
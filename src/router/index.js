import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import Details from '../views/DetailsView.vue';
import Create from '@/views/CreateView.vue';
import Tag from '@/views/TagView.vue';
import RealTime from '@/views/RealTime.vue';
import Edit from '@/views/EditView.vue';
import Gallery from '@/views/GalleryView.vue';
import PostsView from '@/views/PostsView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/posts/:id',
    name: 'Details',
    component: Details,
    props: true,
  },
  {
    path: '/tags/:tag',
    name: 'Tag',
    component: Tag,
    props: true,
  },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery,
  },
  {
    path: '/posts',
    name: 'Posts',
    component: PostsView,
  },
  {
    path: '/realtime',
    name: 'RealTime',
    component: RealTime,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

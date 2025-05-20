import { render, screen } from '@testing-library/vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import App from '../../App.vue';
import HomeView from '../../views/HomeView.vue';
import Gallery from '../../views/Gallery.vue';
import Create from '../../views/Create.vue';
import PostsView from '../../views/PostsView.vue';
import { describe, it, expect, beforeEach, vi } from 'vitest';

export const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/gallery', name: 'Gallery', component: Gallery },
  { path: '/posts', name: 'Posts', component: PostsView },
  {
    path: '/create',
    name: 'Create',
    component: Create,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

describe('Routing', () => {
  it('visar Home på "/"', async () => {
    router.push('/');
    await router.isReady();

    render(App, { global: { plugins: [router] } });
    expect(screen.getByTestId('home')).not.toBeNull();
  });
});

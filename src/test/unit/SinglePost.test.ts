import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BlogPost from '../../components/SinglePost.vue';

describe('SinglePost.vue', () => {
  it('visar titel och innehåll korrekt', () => {
    const post = {
      title: 'Min första post',
      body: 'Detta är innehållet i posten.',
    };
    const wrapper = mount(BlogPost, {
      props: {
        post,
      },
    });

    expect(wrapper.text()).toContain('Min första post');
    expect(wrapper.text()).toContain('Detta är innehållet i posten.');
  });
});

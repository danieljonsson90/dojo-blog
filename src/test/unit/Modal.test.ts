import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Modal from '../../components/Modal.vue';

describe('Modal.vue', () => {
  it('Modal visas och innehåller slottext', () => {
    const wrapper = mount(Modal, {
      props: {
        show: true,
      },
      slots: {
        default: 'Här är slotinnehåll',
      },
    });

    expect(wrapper.text()).toContain('Här är slotinnehåll');
  });

  it('Modal visas inte när show är false', () => {
    const wrapper = mount(Modal, {
      props: {
        show: false,
      },
      slots: {
        default: 'Här är slotinnehåll',
      },
    });

    expect(wrapper.text()).not.toContain('Här är slotinnehåll');
  });

  it('skickar event när close knapp klickas utan att något värde emittas', async () => {
    const wrapper = mount(Modal, {
      props: {
        show: true,
      },
    });

    // Trigger click on the button
    await wrapper.find('.close-button').trigger('click');

    // Check if event was emitted
    expect(wrapper.emitted()).toHaveProperty('close');

    // // Optional: Check event payload to be empty
    const emittedEvents = wrapper.emitted('close');
    expect(emittedEvents).toHaveLength(1);
    expect(emittedEvents?.[0]).toEqual([]);
  });

  it('skickar event när remove knapp klickas', async () => {
    const wrapper = mount(Modal, {
      props: {
        show: true,
      },
    });

    // Trigger click on the button
    await wrapper.find('.remove-button').trigger('click');

    // Check if event was emitted
    expect(wrapper.emitted()).toHaveProperty('remove');
  });
});

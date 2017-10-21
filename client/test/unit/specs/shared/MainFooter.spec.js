import { mount } from 'avoriaz';
import MainFooter from '@/components/shared/MainFooter';

describe('MainFooter.vue', () => {
  it('has a footer as wrapper', () => {
    const wrapper = mount(MainFooter);
    expect(wrapper.is('footer')).to.equal(true);
  });

  it('has a wrapper with class footer', () => {
    const wrapper = mount(MainFooter);
    expect(wrapper.hasClass('footer')).to.equal(true);
  });
});

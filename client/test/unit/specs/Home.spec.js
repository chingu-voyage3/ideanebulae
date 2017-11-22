import { mount } from 'avoriaz';
import Home from '@/components/Home';

describe('Home.vue', () => {
  it('has a div as wrapper', () => {
    const wrapper = mount(Home);
    expect(wrapper.is('div')).to.equal(true);
  });

  it('has a wrapper with class container', () => {
    const wrapper = mount(Home);
    expect(wrapper.hasClass('container')).to.equal(true);
  });

  it('has a wrapper with class splash', () => {
    const wrapper = mount(Home);
    expect(wrapper.hasClass('splash')).to.equal(true);
  });

  it('has a header for idea nebulae', () => {
    const wrapper = mount(Home);
    const expectedMessage = 'Idea Nebulae';
    expect(wrapper.find('.sr-only')[0].text()).to.equal(expectedMessage);
  });

  it('has a flip method', () => {
    const wrapper = mount(Home);
    expect(typeof wrapper.methods().flip).to.equal('function');
  });

  it('has an unflip method', () => {
    const wrapper = mount(Home);
    expect(typeof wrapper.methods().unflip).to.equal('function');
  });
});

import { mount } from 'avoriaz';
import MainNavbar from '@/components/shared/MainNavbar';

describe('MainNavbar.vue', () => {
  it('has a nav as wrapper', () => {
    const wrapper = mount(MainNavbar);
    expect(wrapper.is('nav')).to.equal(true);
  });

  it('has a wrapper with class nav', () => {
    const wrapper = mount(MainNavbar);
    expect(wrapper.hasClass('nav')).to.equal(true);
  });

  it('has a handle login method', () => {
    const wrapper = mount(MainNavbar);
    expect(typeof wrapper.methods().handleLogin).to.equal('function');
  });

  it('has a handle logout method', () => {
    const wrapper = mount(MainNavbar);
    expect(typeof wrapper.methods().handleLogout).to.equal('function');
  });

  it('has a is logged in method', () => {
    const wrapper = mount(MainNavbar);
    expect(typeof wrapper.methods().isLoggedIn).to.equal('function');
  });
});

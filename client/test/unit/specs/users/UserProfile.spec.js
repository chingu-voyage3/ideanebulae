import { mount } from 'avoriaz';
import UserProfile from '@/components/users/UserProfile';

describe('UserProfile.vue', () => {
  it('has a div as wrapper', () => {
    const wrapper = mount(UserProfile);
    expect(wrapper.is('div')).to.equal(true);
  });

  it('has a wrapper with class container', () => {
    const wrapper = mount(UserProfile);
    expect(wrapper.hasClass('container')).to.equal(true);
  });

  it('has a wrapper with profile container', () => {
    const wrapper = mount(UserProfile);
    expect(wrapper.hasClass('profile')).to.equal(true);
  });

  it('has a save qualifications method', () => {
    const wrapper = mount(UserProfile);
    expect(typeof wrapper.methods().saveQualifications).to.equal('function');
  });

  it('has a cancel qualifications method', () => {
    const wrapper = mount(UserProfile);
    expect(typeof wrapper.methods().cancelQualifications).to.equal('function');
  });

  it('has an adjust text area method', () => {
    const wrapper = mount(UserProfile);
    expect(typeof wrapper.methods().adjustTextArea).to.equal('function');
  });

  it('has a toggle edit method', () => {
    const wrapper = mount(UserProfile);
    expect(typeof wrapper.methods().toggleEdit).to.equal('function');
  });
});

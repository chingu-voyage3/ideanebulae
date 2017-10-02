import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
// import Hello from '@/components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
  ],
});

import Vue from 'vue';
import Router from 'vue-router';
// import { requireAuth } from '@/auth';
import Home from '@/components/Home';
import Callback from '@/components/Callback';

Vue.use(Router);

// requireAuth can be used like this:
// {
//   path: '/ideas',
//   name: 'IdeasList',
//   beforeEnter: requireAuth,
// }

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
  ],
  mode: 'history',
});

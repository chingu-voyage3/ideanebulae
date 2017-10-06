import Vue from 'vue';
import Router from 'vue-router';
// import { requireAuth } from '@/auth';
import Home from '@/components/Home';
import Dashboard from '@/components/ideas/Dashboard';
import CreateIdea from '@/components/ideas/CreateIdea';
import IdeaDetails from '@/components/ideas/IdeaDetails';
import ExploreIdeas from '@/components/ideas/ExploreIdeas';
import Agreement from '@/components/misc/Agreement';
import UserProfile from '@/components/users/UserProfile';
import Callback from '@/components/Callback';

Vue.use(Router);

// requireAuth can be used like this:
// {
//   path: '/ideas',
//   name: 'IdeasList',
//   component: IdeasList,
//   beforeEnter: requireAuth,
// }

// Add gate to show the agreement

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/create',
      name: 'CreateIdea',
      component: CreateIdea,
    },
    {
      path: '/ideas/:slug',
      name: 'IdeaDetails',
      component: IdeaDetails,
    },
    {
      path: '/explore',
      name: 'ExploreIdeas',
      component: ExploreIdeas,
    },
    {
      path: '/profile/:username',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement,
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
    },
  ],
  mode: 'history',
});

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Main from '../views/Main.vue';
import SearchResult from '../views/SearchResult.vue';
import ProductDetail from '../views/ProductDetail.vue';
import Signup from '../views/Signup.vue';
import SearchBar from '../components/SearchBar.vue';
import Login from '../views/Login.vue';
import Profile from '../views/Profile.vue';
import MyProducts from '../components/MyProducts';
import autologin from '../helpers/autologin';
import Settings from '../components/Profile/Settings';
import RegisterProduct from '../views/RegisterProduct';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '', name: 'Search', component: SearchBar },
      {
        path: 'signup',
        name: 'Sign Up',
        component: Signup,
        meta: { onlyNoAuth: true }
      },
      {
        path: 'login',
        name: 'Login',
        component: Login,
        meta: { onlyNoAuth: true }
      },
      {
        path: 'forgot-password',
        name: 'Forgot Password',
        component: ForgotPassword,
        meta: { onlyNoAuth: true }
      },
      {
        path: 'reset-password/:token',
        name: 'Reset Password',
        component: ResetPassword,
        meta: { onlyNoAuth: true }
      }
    ]
  },
  { path: '/products', name: 'Search Results', component: SearchResult },
  {
    path: '/products/new',
    name: 'Add Product',
    meta: { requiresAuth: true },
    component: RegisterProduct
  },
  { path: '/products/:id', name: 'Product', component: ProductDetail },
  {
    path: '/profile',
    component: Profile,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: 'products' },
      { path: 'products', name: 'My Products', component: MyProducts },
      { path: 'settings', name: 'Profile Settings', component: Settings }
    ]
  },
  { path: '*', redirect: '/' }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Attempt auto login before first page load
let firstAttempt = true;
router.beforeEach(async (to, from, next) => {
  if (firstAttempt) {
    firstAttempt = false;
    await autologin();
  }
  next();
});

// Auth Guard
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    !store.getters.isLoggedIn
  )
    return next('/login');
  // Do not allow login and register routes for authenticated users
  else if (
    to.matched.some(record => record.meta.onlyNoAuth) &&
    store.getters.isLoggedIn
  )
    return next('/');

  next();
});

export default router;

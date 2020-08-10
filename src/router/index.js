import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import autologin from '../helpers/autologin';
const Main = () =>
  import(/* webpackChunkName: "product-view" */ '../views/Main.vue');
const SearchResult = () =>
  import(/* webpackChunkName: "product-view" */ '../views/SearchResult.vue');
const ProductDetail = () =>
  import(/* webpackChunkName: "product-view" */ '../views/ProductDetail.vue');
const Signup = () => import('../views/Signup.vue');
const SearchBar = () =>
  import(/* webpackChunkName: "product-view" */ '../components/SearchBar.vue');
const Login = () => import('../views/Login.vue');
const Profile = () =>
  import(/* webpackChunkName: "profile" */ '../views/Profile.vue');
const MyProducts = () =>
  import(/* webpackChunkName: "profile" */ '../components/MyProducts');
const Settings = () =>
  import(/* webpackChunkName: "profile" */ '../components/Profile/Settings');
const RegisterProduct = () => import('../views/RegisterProduct');
const ForgotPassword = () => import('../views/ForgotPassword');
const ResetPassword = () => import('../views/ResetPassword');

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

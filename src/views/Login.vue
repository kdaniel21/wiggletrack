<template>
  <b-container id="login" fluid="md">
    <b-card>
      <b-card-title>Login</b-card-title>
      <b-card-sub-title
        >Don't have an account yet?
        <router-link to="signup">
          Sign up!
        </router-link>
      </b-card-sub-title>
      <b-card-body>
        <b-form @submit.prevent="login">
          <b-form-group id="email" label="Email" label-for="email-input">
            <b-form-input
              id="email-input"
              type="email"
              v-model="email"
              required
              placeholder="Your Email Address"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="password"
            label="Password"
            label-for="password-input"
          >
            <b-form-input
              id="password-input"
              type="password"
              v-model="password"
              required
              placeholder="Your Password"
            ></b-form-input>
          </b-form-group>
          <router-link to="/forgot-password">
            <p class="forgot-password">Forgot your password?</p>
          </router-link>
          <b-button type="submit" pill variant="primary" class="float-right"
            >Login</b-button
          >
        </b-form>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios';
import toast from '../mixins/toaster';

export default {
  name: 'Login',
  mixins: [toast],
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    validateForm() {
      if (!this.email && !this.password) {
        this.errorToast('All fields are required!');
        return false;
      }

      return true;
    },
    async login() {
      const isFormValid = this.validateForm();
      if (!isFormValid) return;

      try {
        const { email, password } = this;
        const res = await axios.post('/auth/login', { email, password });

        this.successToast('Successfully logged in!');
        await this.$store.dispatch('loginUser', res.data);

        setTimeout(() => this.$router.push('/'), 1200);
      } catch (err) {
        this.errorToast('Invalid credentials!');
      }
    }
  }
};
</script>

<style scoped>
div.container-md {
  margin-top: clamp(3rem, 20vh, 15rem) !important;
}
.card {
  margin: auto;
  width: min(25rem, 90vw);
  background-color: rgba(255, 255, 255, 0.8);
}
.forgot-password {
  font-size: 0.9rem;
}
</style>

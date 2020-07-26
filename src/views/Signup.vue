<template>
  <b-container id="signup" fluid="md">
    <b-card>
      <b-card-title>Sign Up For Free</b-card-title>
      <b-card-body>
        <b-form @submit.prevent="register()">
          <b-form-group
            id="name"
            label="Name"
            label-for="name-input"
            description="You can use a fictional username if you'd like."
          >
            <b-form-input
              id="name-input"
              type="text"
              v-model="name"
              required
              placeholder="Your Name"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="email"
            label="Email address"
            label-for="email-input"
          >
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
              minlength="8"
              placeholder="Your new password"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="password-confirm"
            label="Password confirm"
            label-for="password-confirm-input"
          >
            <b-form-input
              id="password-confirm-input"
              type="password"
              v-model="passwordConfirm"
              required
              minlength="8"
              placeholder="Your password again"
            ></b-form-input>
          </b-form-group>
          <b-button
            type="submit"
            variant="primary"
            pill
            class="float-right"
            :disabled="loading"
            >Sign up</b-button
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
  name: 'Signup',
  mixins: [toast],
  data() {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
      error: null
    };
  },
  computed: {
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    validateForm() {
      if (
        !this.name ||
        !this.email ||
        !this.password ||
        !this.passwordConfirm
      ) {
        this.errorToast('All fields are required!');
        return false;
      }

      if (this.password !== this.passwordConfirm) {
        this.errorToast('The password and password confirm fields must match!');
        return false;
      }

      return true;
    },
    async register() {
      const isFormValid = this.validateForm();
      if (!isFormValid) return;

      const { email, name, password, passwordConfirm } = this;
      try {
        const res = await axios.post('/auth/signup', {
          email,
          name,
          password,
          passwordConfirm
        });

        this.successToast('Successfully registered!');

        const data = res.data;
        await this.$store.dispatch('loginUser', data);

        setTimeout(() => this.$router.push('/'), 1200);
      } catch (err) {
        this.errorToast('Something went wrong! Please try again.');
      }
    }
  }
};
</script>

<style scoped>
div.container-md {
  margin-top: clamp(3rem, 12vh, 12rem) !important;
}
.card {
  margin: auto;
  width: min(25rem, 90vw);
  background-color: rgba(255, 255, 255, 0.8);
}
</style>

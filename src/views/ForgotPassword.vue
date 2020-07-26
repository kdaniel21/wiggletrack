<template>
  <b-container fluid="md" id="forgot-password">
    <b-card>
      <b-card-title>Forgot Password?</b-card-title>
      <b-card-sub-title
        >No problem! We will send you an email with a link where you can create
        a new password!</b-card-sub-title
      >
      <b-card-body>
        <b-form @submit.prevent="sendPasswordReset">
          <b-form-group id="email" label="Email" label-for="email-input">
            <b-form-input
              id="email-input"
              type="email"
              v-model="email"
              required
              placeholder="Your Email Address"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" pill variant="primary" class="float-right"
            >Send Email</b-button
          >
        </b-form>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import axios from 'axios';
import toaster from '../mixins/toaster';

export default {
  name: 'ForgotPassword',
  mixins: [toaster],
  data() {
    return {
      email: null
    };
  },
  methods: {
    sendPasswordReset() {
      axios
        .post('/auth/forgot-password', { email: this.email })
        .then(() =>
          this.successToast(
            'Password reset email successfully sent! Please check your mailbox.'
          )
        )
        .catch(() => {
          this.errorToast('Password could not be sent! Try again.');
        });
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
</style>

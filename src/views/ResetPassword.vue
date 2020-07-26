<template>
  <b-container id="reset-password" fluid="md">
    <b-card>
      <b-card-title>Reset Password</b-card-title>
      <b-card-sub-title>Please enter your new password!</b-card-sub-title>
      <b-card-body>
        <b-form>
          <b-form-group
            id="password"
            label="New Password"
            label-for="password-input"
          >
            <b-form-input
              id="password-input"
              type="password"
              v-model="password"
              required
              placeholder="Your New Password"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            id="password-confirm"
            label="Password Confirm"
            label-for="password-confirm-input"
          >
            <b-form-input
              id="password-confirm-input"
              type="password"
              v-model="passwordConfirm"
              required
              placeholder="Your New Password Again"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" pill variant="primary" class="float-right"
            >Set Password</b-button
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
  name: 'ResetPassword',
  mixins: [toaster],
  data() {
    return {
      password: null,
      passwordConfirm: null,
      token: null
    };
  },
  methods: {
    validateForm() {
      if (!this.password || !this.passwordConfirm) {
        this.errorToast('Both password and password confirm are required!');
        return false;
      }
      if (this.password !== this.passwordConfirm) {
        this.errorToast('Password and password confirm does not match!');
        return false;
      }

      return true;
    },
    resetPassword() {
      const { password, passwordConfirm } = this;
      axios
        .post(`/auth/reset-password/${this.token}`, {
          password,
          passwordConfirm
        })
        .then(() => {
          this.successToast(
            'Your password has been updated! Now you can log in.'
          );
          setTimeout(() => this.$router.push('/login'), 1500);
        })
        .catch(() =>
          this.errorToast('Your token might be invalid or expired!')
        );
    }
  },
  created() {
    const { token } = this.$route.params;
    if (!token) this.$router.push('/login');

    this.token = token;
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

<template>
  <b-form id="update-password" @submit.prevent="updatePassword">
    <p>
      After changing your password you will be logged out from every device
      except this.
    </p>
    <b-form-group
      id="password"
      label="Current Password"
      label-for="current-password-input"
    >
      <b-form-input
        id="current-password-input"
        type="password"
        required
        v-model="currentPassword"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="password" label="Password" label-for="password-input">
      <b-form-input
        id="password-input"
        type="password"
        required
        v-model="password"
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
        required
        v-model="passwordConfirm"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" pill variant="primary" class="float-right">
      <i class="fa fa-user-edit"></i> Update Password
    </b-button>
  </b-form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UpdatePassword',
  data() {
    return {
      currentPassword: null,
      password: null,
      passwordConfirm: null
    };
  },
  methods: {
    async updatePassword() {
      const { currentPassword, password, passwordConfirm } = this;
      await axios.patch('/auth/update-password', {
        currentPassword,
        password,
        passwordConfirm
      });

      this.successToast('Password updated successfully!');
    }
  }
};
</script>

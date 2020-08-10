<template>
  <b-form id="update-profile" @submit.prevent="updateProfile">
    <b-form-group
      id="email"
      label="Email address"
      label-for="email-input"
      description="This email address is used to log in and this is where we send the notifications."
    >
      <b-form-input
        id="email-input"
        type="email"
        required
        v-model="email"
      ></b-form-input>
    </b-form-group>
    <b-form-group id="name" label="Name" label-for="name-input">
      <b-form-input
        id="name-input"
        type="text"
        required
        v-model="name"
      ></b-form-input>
    </b-form-group>
    <b-button type="submit" pill variant="primary" class="float-right"
      ><i class="fa fa-user-edit"></i> Update Profile</b-button
    >
  </b-form>
</template>
<script>
import axios from 'axios';
import toaster from '../../mixins/toaster';

export default {
  name: 'UpdateProfile',
  mixins: [toaster],
  data() {
    return {
      email: this.$store.state.user.email,
      name: this.$store.state.user.name
    };
  },
  methods: {
    async updateProfile() {
      const { email, name } = this;
      const res = await axios.patch('/users/me', { email, name });

      await this.$store.dispatch('loginUser', { user: res.data.data });

      this.successToast('Profile updated successfully!');
    }
  }
};
</script>

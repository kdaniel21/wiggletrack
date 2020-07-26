<template>
  <b-list-group id="settings">
    <b-list-group-item>
      <h4 v-b-toggle.profile-update>Update Your Profile</h4>
      <b-collapse visible id="profile-update" accordion="update">
        <update-profile />
      </b-collapse>
    </b-list-group-item>
    <b-list-group-item>
      <h4 v-b-toggle.password-update>Change Your Password</h4>
      <b-collapse id="password-update" accordion="update">
        <update-password />
      </b-collapse>
    </b-list-group-item>
    <b-list-group-item>
      <h4 v-b-toggle.profile-actions>Actions</h4>
      <b-collapse id="profile-actions" accordion="update">
        <profile-actions />
      </b-collapse>
    </b-list-group-item>
  </b-list-group>
</template>

<script>
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';
import ProfileActions from './ProfileActions';

export default {
  name: 'Settings',
  components: {
    UpdatePassword,
    UpdateProfile,
    ProfileActions
  }
};
</script>

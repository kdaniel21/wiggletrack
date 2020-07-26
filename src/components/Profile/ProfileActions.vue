<template>
  <div id="profile-actions">
    <p>
      If you don't want to receive any price alerts and emails from us, you can
      disable it. If you'd like, you can turn back on later.
    </p>
    <div class="mb-3">
      <b-button pill variant="warning" @click="disableAllNotifications"
        ><i class="fas fa-bell-slash"></i> Disable All Notifications</b-button
      >
    </div>
    <p>
      Deleting your account is permament and irreversible. We will miss you! 😭
    </p>
    <div>
      <b-button pill variant="danger" @click="showConfirmationModal"
        ><i class="fas fa-user-slash"></i> Delete Profile</b-button
      >
    </div>
    <!-- CONFIRMATION MODAL -->
    <b-modal id="confirmation-modal" title="Are you sure?" @ok="deleteUser">
      <p>
        Are you sure that you want to delete your profile? Remember that this
        action is irreversible.
      </p>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import toaster from '../../mixins/toaster';

export default {
  name: 'ProfileActions',
  mixins: [toaster],
  methods: {
    showConfirmationModal() {
      this.$bvModal.show('confirmation-modal');
    },
    async deleteUser() {
      // Deactivate user profile
      await axios.patch('/users/me', { active: false });

      // Log out user
      await this.$store.dispatch('logout');
      this.toast(
        'Success',
        'User account successfully deleted! We will miss you! 😭 If you decide to come back, you can create a new account anytime!',
        { variant: 'succes', delay: 3500 }
      );
      // Navigate to the main page if necessary
      setTimeout(() => this.$router.push('/'), 3500);
    },
    async disableAllNotifications() {
      await axios.delete('/users/me/notifications');
      await this.$store.dispatch('disableAllNotifications');
      this.successToast(
        `You won't receive any notifications until you turn it back!`
      );
    }
  }
};
</script>

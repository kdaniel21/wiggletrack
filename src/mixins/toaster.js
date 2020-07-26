export default {
  methods: {
    toast(
      title,
      message,
      { toaster = 'b-toaster-top-center', variant, delay = 3500 }
    ) {
      this.$bvToast.toast(message, {
        title,
        autoHideDelay: delay,
        toaster,
        variant
      });
    },
    successToast(msg) {
      this.toast('Success', msg, { variant: 'success' });
    },
    errorToast(msg) {
      this.toast('Error', msg, { variant: 'danger' });
    }
  }
};

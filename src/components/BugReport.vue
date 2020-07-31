<template>
  <div id="bug-report">
    <b-button
      class="bug-report-btn d-none d-md-block"
      variant="primary"
      v-b-modal.bug-report-modal
      >Report a bug</b-button
    >

    <b-modal
      id="bug-report-modal"
      title="Submit bug report"
      @show="resetModal"
      @ok="handleSend"
    >
      <p>
        Encountered a bug? I would really appreciate if you could share it with
        me so I could fix it.
      </p>
      <form ref="form" @submit.stop.prevent="submitReport">
        <b-form-group label="Type" label-for="type-input">
          <b-form-select
            v-model="topic"
            :options="topics"
            id="type-input"
            required
          ></b-form-select>
        </b-form-group>
        <b-form-group label="Description" label-for="description-input">
          <b-form-textarea
            id="description-input"
            v-model="description"
            rows="3"
            required
            placeholder="Please describe the bug as detailed as you can, including your operation system, page, what you're experiencing etc."
          ></b-form-textarea>
        </b-form-group>

        <!-- ADVANCED INFORMATION -->
        <b-button v-b-toggle.advanced-info class="btn-block" variant="primary"
          >Advanced Details</b-button
        >
        <b-collapse id="advanced-info" class="mt-2">
          <b-form-group label="Browser" label-for="browser-input">
            <b-form-input
              id="browser-input"
              v-model="browser"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Operation System" label-for="os-input">
            <b-form-input id="os-input" v-model="os" required></b-form-input>
          </b-form-group>
          <b-form-group label="Page name" label-for="page-name-input">
            <b-form-input
              id="page-name-input"
              v-model="page"
              required
            ></b-form-input>
          </b-form-group>
        </b-collapse>
      </form>
    </b-modal>
  </div>
</template>

<script>
import platform from 'platform';
import axios from 'axios';
import toaster from '../mixins/toaster';

export default {
  name: 'BugReport',
  mixins: [toaster],
  data() {
    return {
      topics: [
        { value: null, text: 'Please select one', disabled: true },
        { value: 'type1', text: 'Type1' },
        { value: 'type2', text: 'Type2' },
        { value: 'type3', text: 'Type3' }
      ],
      topic: '',
      description: '',
      browser: `${platform.name} ${platform.version}`,
      os: platform.os.toString(),
      page: ''
    };
  },
  computed: {
    route() {
      return this.$route.name ? this.$route.name.toString() : '';
    }
  },
  watch: {
    route() {
      this.page = this.route;
    }
  },
  methods: {
    handleSend(bvModalEvt) {
      bvModalEvt.preventDefault();
      this.submitReport();
    },
    submitReport() {
      const { topic, browser, os, page } = this;

      axios
        .post('/feedbacks', {
          topic,
          browser,
          os,
          page,
          message: this.description
        })
        .then(() => {
          this.successToast(
            `Thanks for submitting your bug report. I'll fix it as soon as I can or I'll contact you for further details.`
          );
          this.$bvModal.hide('bug-report-modal');
        })
        .catch(() => {
          this.errorToast(
            'Could not send bug report. Please try again or consider contacting me under me@danielkiss.me'
          );
        });
    },
    resetModal() {
      this.topic = null;
      this.description = null;
    }
  }
};
</script>

<style scoped>
#bug-report {
  width: 100%;
  padding: 0 !important;
}
.bug-report-btn {
  position: fixed;
  top: 70%;
  right: 0;
  padding: 10px;
  float: right;
  transform: rotate(270deg) translateY(2.7rem);

  margin: 0 !important;
}
</style>

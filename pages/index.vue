<template>
  <div>
    <div class="columns is-multiline">
      <div class="column is-full">
        <b-field label="Login">
          <b-input v-model="login.username"> </b-input>
        </b-field>
      </div>
      <div class="column is-full">
        <b-field label="Senha">
          <b-input v-model="login.password" type="password"> </b-input>
        </b-field>
      </div>
      <div class="column is-full">
        <ErrorList :errors="apiError.non_field_errors" />
      </div>
      <div class="column is-full">
        <b-field>
          <b-button
            type="is-primary"
            rounded
            @click="doLogin"
            :loading="isLoading"
            >Login</b-button
          >
        </b-field>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorList from "@/components/atoms/ErrorList";
export default {
  name: "HomePage",
  computed: {
    isLoading() {
      return this.$store.state.api.loading;
    },
    token() {
      return this.$store.state.api.token;
    },
    apiError() {
      return this.$store.state.api.apiError;
    },
  },
  data() {
    return {
      login: {
        username: "01234567890",
        password: "admin",
      },
    };
  },
  methods: {
    async doLogin() {
      console.log("Doing login...");
      await this.$store.dispatch("api/doLogin", this.login);
      console.log("Login done");
    },
  },
};
</script>

<template>
  <v-app>
    <v-main class="blue">
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card>
              <v-card-title>
                <span class="headline">Login</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    label="Password"
                    v-model="password"
                    :rules="passwordRules"
                    type="password"
                    required
                  ></v-text-field>
                  <v-btn
                    :disabled="!valid"
                    color="primary"
                    @click="submit"
                  >
                    Login
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    email: "",
    password: "",
    emailRules: [
      v => !!v || "Email is required",
      v => /.+@.+\..+/.test(v) || "Email must be valid",
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Password must be at least 8 characters",
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        // Implement your login logic here
        console.log("Email:", this.email, "Password:", this.password);
      }
    },
  },
};
</script>
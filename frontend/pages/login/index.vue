<template>
  <div>
    <NavbarFon />
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-sheet class="my-card" height="536" width="751">
          <h1 class="head-title font-display" style="padding-left: 104px;">เข้าสู่ระบบ</h1>
          <v-card-text>
            <v-form class="font-display" @submit.prevent="login">
              <v-text-field
                class="custom-textfield-idperson font-display"
                v-model="username"
                label="เลขประจำตัวประชาชน"
                dense
                outlined
                color="primary"
                :append-icon="userIcon"
              ></v-text-field>
              <v-text-field class="font-display"
                v-model="password"
                :label="showPassword ? 'Password' : 'รหัสผ่าน HN'"
                :type="showPassword ? 'text' : 'password'"
                dense
                outlined
                color="primary"
                :rules="passwordRules"
              >
                <template class="font-display" #append>
                  <v-icon
                    :color="showPassword ? 'primary' : 'grey'"
                    @click="togglePasswordVisibility"
                  >
                    {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                  </v-icon>
                </template>
              </v-text-field>
              <v-row>
                <v-col style="padding-right: 2px">
                  <a
                    class="register font-display"
                    href="/register"
                    style="text-decoration: none; color: #61513f"
                    >ลงทะเบียนบัญชีใหม่</a
                  >
                </v-col>
                <v-col style="padding-left: 130px">
                  <a
                    class="forgotpassword font-display"
                    href="/forgot-HN"
                    style="
                      text-decoration: none;
                      color: #61513f;
                      padding-left: 22px;
                    "
                    >ลืมรหัสผ่าน HN?</a
                  >
                </v-col>
              </v-row>
              <v-btn
                class="bottomLogin font-display"
                style="padding-right: 46px; padding-left: 46px"
                color="orange"
                outlined
                rounded
                type="submit"
                >เข้าสู่ระบบ</v-btn
              >
            </v-form>
          </v-card-text>
        </v-sheet>
      </v-row>
    </v-container>
  </div>
</template>

<style>

.font-display {
  font-family: 'Kanit'
}
.register-link {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}
.register-link span {
  margin-right: 8px;
}
.register-link a,
.forgot-link a {
  color: blue;
}
.forgot-link {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      userIcon: "mdi-account",
      showPassword: false,
      passwordRules: [
        (value) => !!value || "Password is required",
        (value) =>
          value.length >= 8 || "Password must be at least 8 characters",
        (value) =>
          /[A-Z]/.test(value) ||
          "Password must contain at least one uppercase letter",
        (value) =>
          /[a-z]/.test(value) ||
          "Password must contain at least one lowercase letter",
        (value) =>
          /[0-9]/.test(value) || "Password must contain at least one number",
      ],
    };
  },
  methods: {
    login() {
      // Handle login logic here
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
.bottomLogin {
  margin-left: 95px;
  margin-top: 21px;
}

.register {
  position: relative;
}

.forgotpassword {
  position: relative;
}

.my-card {
  margin-top: 50px;
  border-radius: 50px;
  width: 751px;
  height: 536px;
  padding-top: 95px;
  padding-left: 175px;
  padding-right: 175px;
}
.head-title {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 50px;
  font-weight: bold;
  justify-content: center;
  padding-left: 74px;
}

.custom-textfield-idperson {
  width: 300;
}
</style>
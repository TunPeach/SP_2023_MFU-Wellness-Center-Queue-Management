<template>
  <div>
    <NavbarFon />
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-sheet class="my-card" height="536" width="751">
          <h1 class="head-title font-display" style="padding-left: 104px;">เข้าสู่ระบบ</h1>
          <v-card-text>
            <v-form class="font-display" @submit.prevent="login">
              <v-text-field class="custom-textfield-idperson font-display" v-model="username" label="รหัสนักศึกษา" dense
                outlined color="primary" :append-icon="userIcon"></v-text-field>
              <v-text-field class="font-display" v-model="password" :label="showPassword ? 'Password' : 'รหัสผ่าน'"
                :type="showPassword ? 'text' : 'password'" dense outlined color="primary" :rules="passwordRules">
                <template #append>
                  <v-icon :color="showPassword ? 'primary' : 'grey'" @click="togglePasswordVisibility">
                    {{ showPassword ? "mdi-eye" : "mdi-eye-off" }}
                  </v-icon>
                </template>
              </v-text-field>
              <v-row>
                <v-col style="padding-right: 2px">
                    <!-- <nuxt-link to="/verify_student" style="text-decoration: none">
              <v-btn class="font-display" text>ยืนยันตัวตน</v-btn>
              </nuxt-link>   -->
              <router-link to="/verify_student" class="font-display"  style="text-decoration: none; color: #61513f">ยืนยันตัวตน</router-link>
                </v-col>
                <v-col style="padding-left: 130px">
                               <!-- <nuxt-link to="/forgot-password/forgot_student" style="text-decoration: none">
              <v-btn class="font-display" text>ลืมรหัสผ่าน?</v-btn>
              </nuxt-link>   -->
              <router-link to="/forgot-password/forgot_student" class="font-display"  style="text-decoration: none; color: #61513f">ลืมรหัสผ่าน?</router-link>
                </v-col>
              </v-row>
              <v-btn class="bottomLogin font-display" style="padding-right: 46px; padding-left: 46px" color="orange"
                outlined rounded type="submit" @click="login()">เข้าสู่ระบบ</v-btn>
            </v-form>
          </v-card-text>
        </v-sheet>
      </v-row>
    </v-container>
    <v-dialog v-model="loginFailedDialog" persistent max-width="370px">
      <v-card class="font-display">
        <v-card-title class="font-display">เข้าสู่ระบบล้มเหลว</v-card-title>
        <v-card-text>{{ loginErrorMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="loginFailedDialog = false">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      loginFailedDialog: false,
      loginErrorMessage: "",
      showPassword: false,
      passwordRules: [
        (value) => !!value || "จำเป็น",
        (value) =>
          value.length >= 6 || "ควรมีรหัสผ่านอย่างน้อย 6 หลัก",
      ],
    };
  },
  methods: {
    login() {
      if (!this.username || !this.password) {
        this.loginErrorMessage =
          "กรุณากรอกหมายเลขรหัสนักศึกษาและรหัสผ่าน";
        this.loginFailedDialog = true;
        return;
      }
      this.$axios
        .get("/qmanagement/api/studentlogin", {
          params: {
            user: this.username,
            pass: this.password,
          },
        })
        .then((data) => {
          if (data.data.response.length == 0) {
            this.loginErrorMessage = "รหัสนักศึกษาผู้ใช้ที่ไม่รู้จักหรือรหัสผ่านไม่ถูกต้อง";
            this.loginFailedDialog = true;
          } else {
            var user = JSON.stringify(data.data.response);
            window.sessionStorage.setItem("student", user);
            window.sessionStorage.setItem("stdId", this.username);
            this.$router.push("/checkupStudent");
          }
        })
        .catch((error) => {
          this.loginErrorMessage = "การเข้าสู่ระบบล้มเหลว " + error.message;
          this.loginFailedDialog = true;
        });
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
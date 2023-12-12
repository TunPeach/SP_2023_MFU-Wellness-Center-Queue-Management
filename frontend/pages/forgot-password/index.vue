<template>
  <div>
    <NavbarFon />
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-sheet class="my-card" height="536" width="751">
          <h1 class="head-title font-display">ลืมรหัสผ่าน HN?</h1>
          <v-card-text class="font-display">
            <v-form @submit.prevent="login">
              <v-text-field
                class="custom-textfield-idperson"
                v-model="username"
                label="เลขประจำตัวประชาชน"
                dense
                outlined
                color="primary"
                :append-icon="userIcon"
              ></v-text-field>
              <v-text-field
                label="Email"
                v-model="email"
                :rules="emailRules"
                :append-icon="emailIcon"
                dense
                outlined
                required
              ></v-text-field>
              <v-row>
                <v-col style="padding-right: 2px">
                  <!-- <a
                    class="register font-display"
                    href="/register"
                    style="text-decoration: none; color: #61513f"
                    >ลงทะเบียนบัญชีใหม่</a
                  > -->
                  <router-link to="/register" class="register font-display"  style="text-decoration: none; color: #61513f">ลงทะเบียนบัญชีใหม่</router-link>
                </v-col>
                <v-col style="padding-left: 130px">
                  <!-- <a
                    class="forgotpassword font-display"
                    href="/login"
                    style="
                      text-decoration: none;
                      color: #61513f;
                      padding-left: 55px;
                    "
                    >เข้าสู่ระบบ</a
                  > -->
                  <router-link to="/loginFon" class="forgotpassword font-display" style="text-decoration: none; color: #61513f">เข้าสู่ระบบ</router-link>
                </v-col>
              </v-row>
              <v-btn
                class="bottomLogin font-display"
                style="padding-right: 70px; padding-left: 70px"
                color="orange"
                outlined
                rounded
                type="submit"
                >ส่ง</v-btn
              >
            </v-form>
          </v-card-text>
        </v-sheet>
      </v-row>
    </v-container>
    <v-dialog v-model="failedDialog" persistent max-width="370px">
      <v-card class="font-display">
        <v-card-title class="font-display">กู้คืนรหัสผ่านไม่สำเร็จ</v-card-title>
        <v-card-text>{{ ErrorMessage }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="failedDialog = false"
            >ปิด</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="successDialog" persistent max-width="370px">
      <v-card class="font-display">
        <v-card-title class="font-display">กู้คืนรหัสผ่านสำเร็จ!</v-card-title>
        <v-card-text>รหัสผ่าน HN ได้ถูกส่งไปยังอีเมลของท่านที่ลงทะเบียนกับทางเราเรียบร้อย</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="successDialog = false"
            >ปิด</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style>
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
      email: "",
      userIcon: "mdi-account",
      emailIcon: "mdi-email",
      emailRules: [
        (v) => !!v || "จำเป็น",
        (v) => /.+@.+/.test(v) || "อีเมลควรถูกต้องตามหลักของบัญชีเมล",
      ],
      failedDialog: false,
      ErrorMessage: "",
      successDialog: false,
    };
  },
  methods: {
    login() {
      if (!this.username || !this.email) {
        this.ErrorMessage =
          "กรุณากรอกหมายเลขประจำตัวประชาชนและอีเมล";
        this.failedDialog = true;
        return;
      }
      this.$axios
        .get("/qmanagement/api/forgothn", {
          params: {
            user: this.username,
            pass: this.email,
          },
        })
        .then((data) => {
          if (data.data.response.length == 0) {
            this.ErrorMessage = "เลขประจำตัวประชาชนผู้ใช้ที่ไม่รู้จักหรืออีเมลไม่ถูกต้อง";
            this.failedDialog = true;
          } else {
            this.successDialog = true;
          }
        })
        .catch((error) => {
          this.ErrorMessage = "การกู้คืนรหัสผ่านล้มเหลว " + error.message;
          this.failedDialog = true;
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
  padding-left: 22px;
}

.custom-textfield-idperson {
  width: 300;
}

.font-display {
  font-family: "Kanit";
}
</style>

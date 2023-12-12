<template>
  <div>
    <Navbar />
    <v-container style="width: 1000px;">
      <v-sheet color="#ffffff" style="border-radius: 20px">
        <v-toolbar
          elevation="0"
          color="#F49255"
          class="font-display custom-toolbar"
        >
          <v-tabs dark>
            <v-tab
              class="color--text"
              @click="
                UserStudent = false;
                UserOther = true;
              "
              >ข้อมูลผู้ใช้ทั่วไป
            </v-tab>
            <v-tab
              class="color--text"
              @click="
                UserStudent = true;
                UserOther = false;
              "
              >ข้อมูลผู้ใช้นักศึกษา
            </v-tab>
          </v-tabs>
        </v-toolbar>
        <div>
          <UserOther v-if="UserOther" />
          <UserStudent v-if="UserStudent" />
        </div>
      </v-sheet>
    </v-container>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      UserOther: true,
      UserStudent: false,
    };
  },
};
</script>

<style scoped>
.font-display {
  font-family: "Kanit";
}
.color--text {
  font-size: 18px;

  color: #ffffff;
}

.custom-toolbar {
  border-radius: 12px 12px 0 0; /* Set border radius for bottom-left and top-right corners */
  /* Additional styles for spacing, padding, etc. */
}
</style>

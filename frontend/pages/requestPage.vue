<template>
  <div>
    <Navbar />
    <v-container>
      <v-sheet color="#ffffff" style="border-radius:20px">
      <v-toolbar elevation="0" color="#F49255" class="font-display custom-toolbar" >
        <v-tabs dark>
          <v-tab
            class=" color--text"
            @click="
              Request = true;
              Editprofile = false;
              requestAppointmentTab = false;
            "
            >คำขอลงทะเบียน</v-tab
          >
          <v-tab
          class=" color--text"
            @click="
              Editprofile = false;
              Request = false;
              requestAppointmentTab = true;
            "
            >คำขอนัดหมาย</v-tab
          >
          <v-tab
          class=" color--text"
            @click="
              requestAppointmentTab = false;
              Editprofile = true;
              Request = false;
            "
            >การแก้ไขโปรไฟล์</v-tab
          >
        </v-tabs>
      </v-toolbar>
      <div>
        <Request v-if="Request" />
        <Editprofile v-if="Editprofile" />
        <requestAppointmentTab v-if="requestAppointmentTab" />
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
      Request: true,
      Editprofile: false,
      requestAppointmentTab: false,
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
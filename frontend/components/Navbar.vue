<template>
  <v-toolbar height="auto" elevation="0">
    <img class="images" height="70px" :src="getImageUrl(defaultImage)" />
    <v-spacer />
    <nuxt-link to="/dashboard" style="text-decoration: none">
      <v-btn class="font-display" text> หน้าหลัก </v-btn>
    </nuxt-link>
    <nuxt-link to="/requestPage" style="text-decoration: none">
      <v-btn class="ma-2 font-display" v-bind="attrs" v-on="on" text> คำขอ </v-btn>
    </nuxt-link>

    <nuxt-link to="/ManageQueue" style="text-decoration: none">
      <v-btn class="font-display" text> จัดการคิว/บริการ </v-btn>
    </nuxt-link>

    <nuxt-link to="/user" style="text-decoration: none">
      <v-btn class="font-display" text> ข้อมูลผู้ใช้ </v-btn>
    </nuxt-link>

    <nuxt-link to="/adminprofile" style="text-decoration: none">
      <v-btn class="font-display" text> โปรไฟล์ </v-btn>
    </nuxt-link>

    <nuxt-link to="/login" style="text-decoration: none">
      <v-btn class="font-display" text @click="logout"> ออกจากระบบ </v-btn>
    </nuxt-link>
  </v-toolbar>
</template>
  
<script>
export default {
  data() {
    return {
      defaultImage: "Logo.jpg",
      items: [
        {
          title: "ไทย",
          href: "/checkupservice",
        },
        {
          title: "อังกฤษ",
          href: "/vaccineservice",
        },
      ],
    };
  },
  methods: {
    getImageUrl(fileName) {
      return require(`@/upload/${fileName}`);
    },

    logout() {
      window.sessionStorage.removeItem('admin');
      window.sessionStorage.removeItem('empCode');
      this.$router.push('/login');
    },
  },
};
</script>
  
<style scoped>
.images {

  margin-left: 50px;
}

.font-display {
  font-family: 'Kanit'
}
</style>
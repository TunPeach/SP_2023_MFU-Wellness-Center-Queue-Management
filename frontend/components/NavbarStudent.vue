<template>
  <v-toolbar height="auto">
    <img class="images" height="70px" :src="getImageUrl(defaultImage)" />
    <v-spacer />
    <nuxt-link to="/checkupStudent" style="text-decoration: none">
      <v-btn class="font-display" text> บริการ </v-btn>
    </nuxt-link>

    <nuxt-link to="/my_queue" style="text-decoration: none">
      <v-btn class="ma-2 font-display" v-bind="attrs" v-on="on" text>
        คิวของฉัน
      </v-btn>
    </nuxt-link>
    <nuxt-link to="/studentprofile" style="text-decoration: none">
      <v-btn class="font-display" text> โปรไฟล์ </v-btn>
    </nuxt-link>
    <nuxt-link to="/loginStudent" style="text-decoration: none">
      <v-btn class="font-display" text @click="logout"> ออกจากระบบ </v-btn>
    </nuxt-link>

  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      defaultImage: "Logo.jpg",
    };
  },
  methods: {
    getImageUrl(fileName) {
      return require(`@/upload/${fileName}`);
    },

    logout() {
    window.sessionStorage.removeItem('student');
    window.sessionStorage.removeItem('stdId');
    this.$router.push('/loginStudent');
  },
  },
};
</script>

<style scoped>
.images {
  margin-left: 50px;
}

.font-display {
  font-family: "Kanit";
}
</style>

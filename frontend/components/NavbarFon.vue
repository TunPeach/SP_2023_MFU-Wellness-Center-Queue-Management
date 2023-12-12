<template>
  <v-toolbar height="auto">
    <img class="images" height="70px" :src="getImageUrl(defaultImage)" />
    <v-spacer />
        <nuxt-link to="/" style="text-decoration: none">
          <v-btn class="font-display" text > หน้าหลัก </v-btn>
        </nuxt-link>

        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2 font-display" v-bind="attrs" v-on="on" text> บริการ </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              @click="() => {}"
              v-bind:to="item.to"
            >
              <v-list-item-title class="font-display">{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <nuxt-link to="/map" style="text-decoration: none">
        <v-btn class="font-display" text> แผนที่ </v-btn>
        </nuxt-link>

        <v-menu bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="ma-2 font-display" v-bind="attrs" v-on="on" text> เข้าสู่ระบบ </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(login, i) in item"
              :key="i"
              @click="() => {}"
              v-bind:to="login.to"
            >
              <v-list-item-title class="font-display">{{ login.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      defaultImage: "Logo.jpg",
      items: [
        {
          title: "ตรวจสุขภาพ",
          to: "/checkupservice",
        },
        {
          title: "ศูนย์วัคซีน",
          to: "/vaccineservice",
        },
        {
          title: "เวชศาสตร์ชะลอวัย",
          to: "/antiagingservice",
        },
      ],
      item: [
        {
          title: "ผู้ใช้งานทั่วไป",
          to: "/loginFon",
        },
        {
          title: "นักศึกษา",
          to: "/loginStudent",
        },
        {
          title: "ผู้ดูแลระบบ",
          to: "/login",
        },
      ],
    };
  },
  methods: {
    getImageUrl(fileName) {
      return require(`@/upload/${fileName}`);
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

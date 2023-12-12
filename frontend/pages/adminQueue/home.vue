<template>
  <div>
    <Navbar />
    <v-container>

      <v-sheet class="box" style="
          margin: 100px;
          margin-bottom: 50px;
          margin-top: 10px;
          padding-top: 20px;
          padding-bottom: 80px;
        " height="auto" width="auto">
        <Stepper />
        <h3 class="header font-display">โปรดเลือกประเภทบริการของคุณ</h3>
        <div class="card-container">
          <div class="card" v-for="(item, index) in items" :key="index">
            <div class="card-body" align="center" justify="center">
              <h5 class="card-title font-display">{{ item.type_name }}</h5>
              <button class="btn-round font-display" @click="handleButtonClick(item.type_ID)">
                จองคิว
              </button>
            </div>
          </div>
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
      items: [],
      name: "",
    };
  },

  computed: {
    hnCode() {
      return window.sessionStorage.getItem("hnCode");
    },
  },

  async created() {
    console.log("get all types");
    const res = await this.$axios.get("/qmanagement/api/type");
    this.items = res.data.data;
    console.log(this.items);
  },

  methods: {
    handleButtonClick(itemId) {
      if (itemId === 1) {
        this.$router.push({ path: "/adminQueue/checkup", query: { typeId: itemId } });
      } else if (itemId === 2) {
        this.$router.push({ path: "/adminQueue/vaccine", query: { typeId: itemId } });
      } else if (itemId === 3) {
        this.$router.push({ path: "/adminQueue/antiaging", query: { typeId: itemId } });
      }
    },
  },
};
</script>

<style scoped>
.box {
  border-radius: 10px;
}

.font-display {
  font-family: "Kanit";
}

.header {
  margin-top: 20px;
  margin-bottom: 20px;
  text-indent: 30px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.card {
  flex-basis: calc(33.33% - 20px);
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.btn-round {
  display: block;
  margin-top: 10px;
  padding: 5px 30px;
  border-radius: 20px;
  background-color: #f17223;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>

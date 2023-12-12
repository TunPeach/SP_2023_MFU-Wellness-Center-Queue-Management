<template>
  <div>
    <Navbar />
    <v-container>
      <v-sheet class="box" style="
          height: auto;
          width: auto;
          margin: 25px 100px 33px;
          padding-top: 20px;
          padding-bottom: 50px;
        " height="auto" width="auto">
        <v-stepper v-model="e1" elevation="0" class="font-display">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1" color="#f17223">
              เลือกบริการ
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2" color="#f17223">
              เลือกแพ็กเกจ
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 3" step="3">
              บริการเพิ่มเติม
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4">
              จองคิว
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <h3 class="header font-display">ศูนย์วัคซีน</h3>
        <h4 class="header2 font-display">เลือกช่วงอายุ</h4>
        <v-radio-group class="radio-group" row>
          <div v-for="item in items" :key="item.age_ID">
            <input type="radio" :id="item.age_ID" :value="item.age_ID" v-model="selectedItemId" :name="radioGroupName" />
            <label :for="item.age_ID" class="radio-label font-display">{{
              item.age_detail
            }}</label>
          </div>
        </v-radio-group>
        <h4 class="header3 font-display">
          โปรดเลือกบริการฉีดวัคซีนของคุณ สามารถเลือกวัคซีนได้มากกว่า 1 ชนิด
        </h4>
        <div class="grid-container">
          <div class="grid-header">
            <div class="grid-column font-display">รายการ</div>
            <div class="grid-column font-display">เลือก</div>
            <div class="grid-column font-display">ราคา</div>
          </div>
          <v-divider></v-divider>
          <div class="grid-item" v-for="(item, index) in objs" :key="index">
            <p class="font-display">{{ item.service_name }}</p>
            <input type="checkbox" v-model="item.checked" style="transform: scale(1.5)" />
            <p>{{ item.service_price }}</p>
          </div>
          <div class="grid-footer">
            <h4 class="grid-column font-display">
              เลือกทั้งหมด {{ selectedItemCount }} รายการ
            </h4>
            <h4 class="grid-column font-display">ราคา {{ selectedItemsTotalPrice }} บาท</h4>
          </div>
          <div class="button-container">
            <v-btn
              color="#f17223"
              @click="navigateToBooking"
              rounded
              depressed
              class="ml-auto font-display btn-custom "
              small
              style="padding-left: 30px; padding-right: 30px"
              >ถัดไป</v-btn
            >
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
      typeId: 0,
      age_ID: 0,
      selectedItemId: null,
      radioGroupName: "ageRadioGroup",
      objs: [],
      e1: 2,
    };
  },

  async created() {
    this.typeId = this.$route.query.typeId;
    const res = await this.$axios.get("/qmanagement/api/ages", {
      params: {
        typeId: this.typeId,
      },
    });
    this.items = res.data.response;
    this.selectedItemId = this.items[0].age_ID;
  },

  methods: {
    navigateToBooking() {
      const selectedItems = this.objs.filter((item) => item.checked);
      const queryParams = {
        typeId: this.typeId,
        ageId: this.age_ID,
        selectedItems: JSON.stringify(selectedItems),
      };
      console.log(selectedItems);
      this.$router.push({ path: "/adminQueue/booking_vaccine", query: queryParams });
    },
  },

  watch: {
    selectedItemId: async function (newVal) {
      const selectedItem = this.items.find((item) => item.age_ID === newVal);
      this.age_ID = selectedItem.age_ID;
      console.log(newVal);

      const response = await this.$axios.get("/qmanagement/api/vaccine", {
        params: {
          typeId: this.typeId,
          ageId: this.age_ID,
        },
      });
      this.objs = response.data.response;
      console.log(this.objs);
    },
  },
  computed: {
    selectedItemCount() {
      return this.objs.filter((item) => item.checked).length;
    },
    selectedItemsTotalPrice() {
      const selectedItems = this.objs.filter((item) => item.checked);
      return selectedItems.reduce(
        (total, item) => total + item.service_price,
        0
      );
    },
  },
};
</script>

<style scoped>
.btn-custom {
  color: white !important;
  background: linear-gradient(
    to right,
    rgba(241, 114, 35, 100%),
  
  );
}
.font-display {
  font-family: "Kanit";
}

.header {
  margin-top: 20px;
  margin-bottom: 20px;
  text-indent: 30px;
}

.header2 {
  margin-top: 40px;
  margin-bottom: 20px;
  text-indent: 30px;
}

.header3 {
  margin-top: 10px;
  margin-bottom: 20px;
  text-indent: 30px;
}

.radio-group {
  margin-left: 30px;
}

.radio-label {
  margin-right: 8px;
  padding: 8px;
}

.grid-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  text-indent: 30px;
  margin-right: 30px;
}

.grid-header .grid-column:first-child {
  flex-basis: 80%;
}

.grid-header .grid-column:nth-child(2) {
  flex-basis: 10%;
  text-align: center;
padding-right: 20px;
}

.grid-header .grid-column:last-child {
  flex-basis: 10%;
  text-align: end;
}

.grid-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  text-indent: 30px;
}

.grid-item p:first-child {
  flex-basis: 80%;
}

.grid-item input {
  flex-basis: 10%;
}

.grid-item p:last-child {
  flex-basis: 10%;
  text-align: end;
  margin-right: 30px;
}

.grid-footer {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: end;
  padding: 10px;
  margin-right: 30px;
}

.button-container {
  margin-top: 10px;
  display: flex;
  justify-content: space-evenly;
  margin-right: 30px;
  margin-bottom: 20px;
}
.box {
  border-radius: 10px;
}
</style>

<template>
  <div>
    <NavbarUser />
    <v-container>
      <!-- <v-card class="font-display" max-width="400" elevation="0" style="
        
        margin-left: 100px;
        margin-right: 100px;
        margin-bottom: 10px;"
        >
        <v-list-item>
          <v-icon style="padding-right: 10px" v-model="name"> mdi-account </v-icon>
          ยินดีต้อนรับเข้าสู่ระบบ, {{ name }}
        </v-list-item>
      </v-card> -->
      <v-sheet
        class="box"
        style="
          margin: 100px;
          margin-bottom: 50px;
          margin-top: 10px;
          padding-top: 20px;
          padding-bottom: 80px;
        "
        height="auto"
        width="auto"
      >
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
        <h3 class="header font-display" >โปรดเลือกแพ็กเกจบริการตรวจสุขภาพ</h3>
        <div class="card-container">
          <div class="card" v-for="(item, index) in items" :key="index">
            <div class="card-body" align="center" justify="center">
              <h5 class="card-title font-display">{{ item.service_name }}</h5>
              <button
                class="btn-round font-display"
                @click="handleButtonClick(item.service_name)"
              >
                เลือก
              </button>
            </div>
          </div>
        </div>
        <v-dialog v-model="dialogOpen" max-width="500px">
          <v-card>
            <v-toolbar color="#f17223">
              <v-toolbar-title  class="font-display custom-text-color"
                >โปรดทำรายการต่อไปนี้</v-toolbar-title
              >
              <v-row justify="end">
                <v-btn icon @click="dialogOpen = false"
                  ><v-icon color="white">mdi-close</v-icon></v-btn
                >
              </v-row>
            </v-toolbar>
            <v-card-text>
              <v-radio-group class="radio-group-age" row>
                <h4 style="margin-right: 30px" class="font-display">
                  ช่วงอายุ
                </h4>
                <div
                  v-for="item in objs"
                  :key="item.age_ID"
                  style="display: flex; align-items: center; margin-right: 30px"
                >
                  <input
                    type="radio"
                    :id="item.age_ID"
                    :value="item.age_ID"
                    v-model="selectedAgeId"
                    :name="radioGroupNameAge"
                  />
                  <label style="margin-left: 10px;" :for="item.age_ID" class="radio-label font-display">{{
                    item.age_detail
                  }}</label>
                </div>
              </v-radio-group>
              <v-radio-group class="radio-group-gender" row>
                <h4 style="margin-right: 60px" class="font-display">เพศ</h4>
                <div
                  v-for="item in gender"
                  :key="item.gender_ID"
                  style="display: flex; align-items: center; margin-right: 53px"
                >
                  <input
                    type="radio"
                    :id="item.gender_ID"
                    :value="item.gender_ID"
                    v-model="selectedGenderId"
                    :name="radioGroupNameGender"
                  />
                  <label
                  style="margin-left: 10px;"
                    :for="item.gender_ID"
                    class="radio-label font-display"
                    >{{ item.gender_detail }}</label
                  >
                </div>
              </v-radio-group>
              <div v-if="showPrice">
                <div
                  class="price-container font-display"
                  v-for="(item, index) in prices"
                  :key="index"
                >
                  <h2 class="font-display">
                    ราคา {{ item.service_price }} บาท
                  </h2>
                </div>
              </div>
            </v-card-text>
            <v-card-actions style="justify-content: center">
              <v-btn
                class="font-display custom-text-color"
                color="#f17223"
                rounded
                style="padding-left: 40px; padding-right: 40px;"
                @click="HandleConfirmButton()"
                >ยืนยัน</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogConfirmOpen" max-width="500px">
          <v-card>
            <v-toolbar color="#f17223">
              <v-toolbar-title class="font-display custom-text-color"
                >โปรดทำรายการต่อไปนี้</v-toolbar-title
              >
              <v-row justify="end">
                <v-btn icon @click="dialogConfirmOpen = false"
                  ><v-icon color="white">mdi-close</v-icon></v-btn
                >
              </v-row>
            </v-toolbar>
            <v-card-text class="text-center" style="margin-top: 30px">
              <h4 class="font-display">
                คุณต้องการบริการตรวจสุขภาพเพิ่มเติมหรือไม่
              </h4>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                class="font-display"
                color="#f17223"
                style="padding-left: 40px; padding-right: 40px;"
                outlined
                rounded
                @click="HandleSkipButton()"
                >ข้าม</v-btn
              >
              <v-btn
                class="font-display custom-text-color"
                color="#f17223"
                rounded
                depressed
                style="padding-left: 40px; padding-right: 40px;"
                @click="HandleYesButton()"
                >ต้องการ</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'authUser',
  data() {
    return {
      items: [],
      typeId: 0,
      objs: [],
      age_ID: 0,
      gender: [],
      gender_ID: 0,
      prices: [],
      dialogOpen: false,
      dialogConfirmOpen: false,
      radioGroupNameAge: "ageRadioGroup",
      radioGroupNameGender: "genderRadioGroup",
      selectedService: "",
      selectedAgeId: null,
      selectedGenderId: null,
      e1:2,
    };
  },

  async created() {
    this.typeId = this.$route.query.typeId;
    console.log(this.typeId);
    const res = await this.$axios.get("/qmanagement/api/services", {
      params: {
        typeId: this.typeId,
      },
    });
    this.items = res.data.response;
    console.log(this.items);

    const response = await this.$axios.get("/qmanagement/api/ages", {
      params: {
        typeId: this.typeId,
      },
    });
    this.objs = response.data.response;
    this.selectedAgeId = this.objs[0].age_ID;

    const responses = await this.$axios.get("/qmanagement/api/gender", {
      params: {
        typeId: this.typeId,
      },
    });
    this.gender = responses.data.response;
    this.selectedGenderId = this.gender[0].gender_ID;
  },
  methods: {
    async handleButtonClick(itemName) {
      if (itemName == "ตรวจสุขภาพสำหรับข้าราชการ/อปท.") {
        this.selectedService = "ตรวจสุขภาพสำหรับข้าราชการ/อปท.";
        this.dialogOpen = true;
      } else if (itemName == "ตรวจสุขภาพสำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง") {
        this.selectedService = "ตรวจสุขภาพสำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง";
        this.dialogOpen = true;
      } else if (itemName == "ตรวจสุขภาพ โปรโมชั่น ราคา 999 บาท") {
        this.serviceId = 48;
        this.dialogConfirmOpen = true;
      }
      await this.selectedPrice(
        this.selectedService,
        this.selectedAgeId,
        this.selectedGenderId
      );
    },
    async selectedPrice(serviceName, ageId, genderId) {
      const response = await this.$axios.get(
        `/qmanagement/api/prices?serviceName=${encodeURIComponent(
          serviceName
        )}&ageId=${ageId}&genderId=${genderId}`
      );
      this.prices = response.data.response;
      this.showPrice = true;
    },
    HandleConfirmButton() {
      if (
        this.selectedService === "ตรวจสุขภาพสำหรับข้าราชการ/อปท." &&
        this.selectedAgeId === 1 &&
        this.selectedGenderId === 1
      ) {
        this.serviceId = 1;
      } else if (
        this.selectedService === "ตรวจสุขภาพสำหรับข้าราชการ/อปท." &&
        this.selectedAgeId === 2 &&
        this.selectedGenderId === 1
      ) {
        this.serviceId = 2;
      } else if (
        this.selectedService === "ตรวจสุขภาพสำหรับข้าราชการ/อปท." &&
        this.selectedAgeId === 1 &&
        this.selectedGenderId === 2
      ) {
        this.serviceId = 3;
      } else if (
        this.selectedService === "ตรวจสุขภาพสำหรับข้าราชการ/อปท." &&
        this.selectedAgeId === 2 &&
        this.selectedGenderId === 2
      ) {
        this.serviceId = 4;
      } else if (
        this.selectedService ===
          "ตรวจสุขภาพสำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง" &&
        this.selectedAgeId === 2 &&
        this.selectedGenderId === 1
      ) {
        this.serviceId = 44;
      } else if (
        this.selectedService ===
          "ตรวจสุขภาพสำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง" &&
        this.selectedAgeId === 2 &&
        this.selectedGenderId === 2
      ) {
        this.serviceId = 45;
      } else if (
        this.selectedService ===
          "ตรวจสุขภาพสำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง" &&
        this.selectedAgeId === 1 &&
        this.selectedGenderId === 1
      ) {
        this.serviceId = 46;
      } else if (
        this.selectedService ===
          "ตรวจสุขภาพสำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง" &&
        this.selectedAgeId === 1 &&
        this.selectedGenderId === 2
      ) {
        this.serviceId = 47;
      }
      console.log(this.serviceId);
      this.dialogConfirmOpen = true;
    },
    HandleSkipButton() {
      const queryParams = {
        typeId: this.typeId,
        serviceId: this.serviceId,
        ageId: this.age_ID,
        genderId: this.gender_ID,
      };
      console.log(queryParams);
      this.$router.push({ name: "booking_checkup", query: queryParams });
    },
    HandleYesButton() {
      const queryParams = {
        typeId: this.typeId,
        serviceId: this.serviceId,
        ageId: this.age_ID,
        genderId: this.gender_ID,
      };
      console.log(queryParams);
      this.$router.push({ name: "subservice", query: queryParams });
    },
  },
  computed: {
    showPrice() {
      return this.selectedAgeId && this.selectedGenderId;
    },
  },
  watch: {
    selectedAgeId: async function (newAgeVal) {
      const selectedAge = this.objs.find((item) => item.age_ID === newAgeVal);
      this.age_ID = selectedAge.age_ID;
      console.log(newAgeVal);
      this.selectedPrice(
        this.selectedService,
        newAgeVal,
        this.selectedGenderId
      );
    },
    selectedGenderId: async function (newGenderVal) {
      const selectedGender = this.gender.find(
        (item) => item.gender_ID === newGenderVal
      );
      this.gender_ID = selectedGender.gender_ID;
      console.log(newGenderVal);
      this.selectedPrice(
        this.selectedService,
        this.selectedAgeId,
        newGenderVal
      );
    },
  },
};
</script>

<style scoped>
.box{
  border-radius: 10px;
}
.custom-text-color {
  color: white;
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

.price-container {
  text-align: center;
}
</style>

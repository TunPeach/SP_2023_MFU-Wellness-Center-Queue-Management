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
          <v-stepper-header class="font-display ">
            <v-stepper-step :complete="e1 > 1" step="1" color="#f17223">
              เลือกบริการ
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2" color="#f17223">
              เลือกแพ็กเกจ
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
              บริการเพิ่มเติม (ไม่มีบริการ)
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4" color="#f17223"> จองคิว </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <h3 class="header font-display">สรุปรายการ</h3>
        <div class="user-detail font-display">
          <p>
            <span style="font-weight: bold; margin-right: 10px">HN.</span>
            {{ this.hnCode }}
          </p>
          <p>
            <span style="font-weight: bold; margin-right: 10px">ชื่อ-สกุล</span>
            {{ this.name }}
          </p>
          <p style="display: inline-flex; align-items: center">
            <span style="font-weight: bold; margin-right: 10px">นัดวันที่</span>
            {{ selectedDateTime.date }}
          </p>
          <p style="display: inline-flex; align-items: center">
            <span style="font-weight: bold; margin-right: 10px">เวลา</span>
            {{ selectedDateTime.time }}
          </p>
          <br />
          <p style="display: inline-flex; align-items: center">
            <span style="font-weight: bold; margin-right: 10px">บริการ</span>
            {{ type?.type_name ?? "-" }}
          </p>
          <p style="display: inline-flex; align-items: center">
            <span style="font-weight: bold; margin-right: 10px">เพศ</span> ชาย
          </p>
          <p style="display: inline-flex; align-items: center">
            <span style="font-weight: bold; margin-right: 10px">อายุ</span>
            {{ age?.age_detail ?? "-" }}
          </p>
        </div>
        <div class="grid-container font-display">
          <div class="grid-header">
            <div class="grid-column">รายการฉีดวัคซีน</div>
            <div class="grid-column">ค่าบริการ</div>
          </div>
          <v-divider></v-divider>
          <div class="grid-item" v-for="(item, index) in selectedItems" :key="index">
            <v-row>
                <v-col>
                  <p class="font-display" style="padding-left: 40px; padding-top: 10px;">{{ item.service_name }}</p>
                </v-col>
                <v-col>
                  <p class="font-display text-right" style="padding-top: 10px; padding-right: 40px;">{{ item.service_price }}</p>
                </v-col>
              </v-row>
          </div>
          <div class="grid-footer">
            <h4 class="grid-column">
              เลือกทั้งหมด {{ selectedItemCount }} รายการ
            </h4>
            <h4 class="grid-column">ราคา {{ selectedItemsTotalPrice }} บาท</h4>
          </div>
          <div class="button-container">
            <v-btn style="padding-left: 30px; padding-right: 30px" @click="bookingService()" rounded small color="#f17223"
              depressed class="ml-auto btn-custom">ยืนยัน</v-btn>
          </div>
          <v-dialog v-model="dialogOpen" max-width="500px">
          <v-card class="font-display">
            <v-toolbar class="btn-custom" color="#f17223">
              <v-toolbar-title>แจ้งเตือน</v-toolbar-title>
              <v-row justify="end">
                <v-btn icon @click="dialogOpen = false"><v-icon color="white">mdi-close</v-icon></v-btn>
              </v-row>
            </v-toolbar>
            <v-card-text class="text-center" style="margin-top: 60px">
              <v-row justify="center" style="margin-bottom: 10px">
                <v-icon color="green" style="font-size: 24px; padding-right: 10px">mdi-checkbox-marked-circle</v-icon>
                <h4 style="font-size: 24px">จองคิวสำเร็จ</h4>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn class="font-display" color="orange"
                style="padding-left: 40px; padding-right: 40px; margin-bottom: 30px" outlined rounded
                to="/adminQueue/home">จองคิวเพิ่ม</v-btn>
            </v-card-actions>
            <v-spacer></v-spacer>
          </v-card>
        </v-dialog>
        </div>
      </v-sheet>
    </v-container>
    <v-dialog v-model="showErrorAlert" persistent max-width="390px">
    <v-card class="font-display">
      <v-card-title class="font-display">ไม่สามารถทำการจองคิวได้</v-card-title>
      <v-card-text>ผู้ใช้งานมีบริการอื่นๆที่ได้ทำการจองไว้ในวันและเวลาที่เลือกแล้ว</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" to="/ManageQueue" text @click="showErrorAlert = false">ปิด</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  data() {
    return {
      name: "",
      selectedItems: [],
      selectedDateTime: {},
      type: [],
      age: [],
      dialogOpen: false,
      e1: 4,
      showErrorAlert: false,
    };
  },
  async created() {
    if (this.$route.query.selectedItems) {
      this.selectedItems = JSON.parse(this.$route.query.selectedItems);
      console.log("selectedItems:", this.selectedItems);
    }
    if (this.$route.query.selectedDateTime) {
      this.selectedDateTime = JSON.parse(this.$route.query.selectedDateTime);
    }
    if (this.$route.query.typeId) {
      const res = await this.$axios.get("/qmanagement/api/type");
      const types = res.data.data;
      console.log(types);
      this.type = types.find(
        (type) => type.type_ID === Number(this.$route.query.typeId)
      );
      console.log(this.type);
    }
    if (this.$route.query.ageId) {
      const response = await this.$axios.get("/qmanagement/api/ages", {
        params: {
          typeId: this.$route.query.typeId,
          ageId: this.$route.query.ageId,
        },
      });
      const ages = response.data.response;
      console.log(ages);
      this.age = ages.find(
        (age) => age.age_ID === Number(this.$route.query.ageId)
      );
      console.log(this.age);
    }
    try {
      const response = await this.$axios.get('/qmanagement/api/oldusers', {
        params: {
          hnCode: this.hnCode,
        },
      });
      const userData = response.data;
      this.name = "No user found with this hnCode.";
      if (userData.response && userData.response.length > 0) {
        for (const user of userData.response) {
          if (user.HN_code === this.hnCode) {
            this.name = user.name;
            break;
          }
        }
      }
      console.log(this.name);
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async bookingService() {
      try{
      const selectedServiceIds = this.selectedItems.map(
        (item) => item.service_ID
      );
      for (const serviceId of selectedServiceIds) {
        const response = await this.$axios.post("/qmanagement/api/booking", {
          booking_date: this.selectedDateTime.date,
          booking_time: this.selectedDateTime.time,
          status_ID: 1,
          HN_code: this.hnCode,
          service_ID: serviceId,
        });
        console.log(response.data);
        this.dialogOpen = true;
      }
    }catch (error) {
      if (error.response && error.response.status === 400) {
        this.showErrorAlert = true;
        console.log("showErrorAlert set to true");
      } else {
        console.error("Error:", error);
      }
    }
    },
  },
  computed: {
    selectedItemCount() {
      return this.selectedItems.length;
    },
    selectedItemsTotalPrice() {
      const selectedItems = this.selectedItems;
      return selectedItems.reduce(
        (total, item) => total + item.service_price,
        0
      );
    },
    hnCode() {
      return window.sessionStorage.getItem("hnCode");
    },
  },
};
</script>

<style>
.btn-custom {
  color: white !important;
  background: linear-gradient(to right, #f17223);
}

.font-display {
  font-family: "Kanit";
}

.header {
  margin-top: 20px;
  margin-bottom: 20px;
  text-indent: 30px;
}

.user-detail {
  text-indent: 30px;
  padding: 10px;
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

.grid-header .grid-column:last-child {
  flex-basis: 20%;
  text-align: end;
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
</style>
<template>
  <div>
    <Navbar />
    <v-container>
      <v-sheet
        class="box"
        style="
          height: auto;
          width: auto;
          margin: 25px 100px 33px;
          padding-top: 20px;
          padding-bottom: 50px;
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
        <h3 class="header font-display">เวชศาสตร์ชะลอวัย</h3>
        <h4 class="header3 font-display">
          โปรดเลือกบริการเวชศาสตร์ชะลอวัยของคุณ สามารถเลือกบริการได้มากกว่า 1
          รายการ
        </h4>
        <div class="grid-container">
          <div class="grid-header">
            <div class="grid-column font-display">รายการ</div>
            <div class="grid-column font-display">เลือก</div>
            <div class="grid-column font-display">ราคา</div>
          </div>
          <v-divider></v-divider>
          <div class="grid-item" v-for="(item, index) in objs" :key="index">
            <v-card width="100%" outlined>
              <h4 class="font-display" style="margin-top: 15px;">{{ item.service_name }}</h4>
              <div
                v-for="(subItem, subIndex) in item.subservices"
                :key="subIndex"
              >
                <div style="display: flex; align-items: center">
                  <p class="font-display" style="margin-left: 15px; margin-top: 10px">
                    {{ subItem.subservice_name }}
                  </p>
                  <input type="checkbox" v-model="subItem.checked"  style="transform: scale(1.5)"/>
                  <p class="font-display">{{ subItem.subservice_price }}</p>
                </div>
              </div>
            </v-card>
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
              class="ml-auto font-display btn-custom"
              small
              depressed
              style="padding-right: 30px; padding-left: 30px;"
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
      typeId: 0,
      objs: [],
      subservices: [],
      e1:2,
    };
  },

  async created() {
    this.typeId = this.$route.query.typeId;
    const res = await this.$axios.get("/qmanagement/api/antiaging", {
      params: {
        typeId: this.typeId,
      },
    });
    this.objs = res.data.response;
    console.log(this.objs);
    this.fetchSubservices();
  },
  methods: {
    async fetchSubservices() {
      for (let i = 0; i < this.objs.length; i++) {
        const response = await this.$axios.get("/qmanagement/api/subservices", {
          params: {
            serviceId: this.objs[i].service_ID,
          },
        });
        console.log(this.objs[i].service_ID);
        this.$set(this.objs[i], "subservices", response.data.data);
      }
    },
    navigateToBooking() {
      const selectedItems = [];
      this.objs.forEach((item) => {
        if (item.subservices) {
          item.subservices.forEach((subItem) => {
            if (subItem.checked) {
              selectedItems.push(subItem);
            }
          });
        }
      });
      const queryParams = {
        typeId: this.typeId,
        selectedItems: JSON.stringify(selectedItems),
      };
      console.log(selectedItems);
      this.$router.push({ path: "/adminQueue/booking_antiaging", query: queryParams });
    },
  },
  computed: {
    selectedItemCount() {
      let count = 0;
      this.objs.forEach((item) => {
        if (item.subservices) {
          count += item.subservices.filter((subItem) => subItem.checked).length;
        }
      });
      return count;
    },
    selectedItemsTotalPrice() {
      let totalPrice = 0;
      this.objs.forEach((item) => {
        if (item.subservices) {
          const selectedItems = item.subservices.filter(
            (subItem) => subItem.checked
          );
          totalPrice += selectedItems.reduce(
            (total, subItem) => total + subItem.subservice_price,
            0
          );
        }
      });
      return totalPrice;
    },
  },
};
</script>

<style scoped>
.box{
  border-radius: 10px;
}
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
</style>
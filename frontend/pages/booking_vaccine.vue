<template>
  <div>
    <NavbarUser />
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
            <v-stepper-step step="3">
              บริการเพิ่มเติม (ไม่มีบริการ)
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="4" color="#f17223">
              จองคิว
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <v-row>
          <v-col cols="6">
            <h3 class="header font-display">เลือกวันจองคิว</h3>
            <v-container class="d-flex align-center justify-center">
            <v-date-picker style="width:400px" v-model="selectedDate" class="date-picker" locale="th" color="#f17223" :min="minDate"
              :allowed-dates="dateAllowed"></v-date-picker>
            </v-container>
          </v-col>
          <v-col cols="6" class="d-flex align-center justify-center">
            <v-container class="d-flex align-center justify-center">
            
            <div class="select-time">
              <h3 class=" font-display d-flex align-center justify-center">เลือกช่วงเวลา</h3>
              <v-card-text>
                <v-chip-group v-model="selectedTime" active-class="btn-custom">
                  <v-chip @click="toggleColor" :color="color" outlined class="font-display"
                    value="ช่วงเช้า (8.00-12.00)">ช่วงเช้า (8.00-12.00)</v-chip>
                  <v-chip outlined class="font-display" value="ช่วงบ่าย(13.00-16.00)">ช่วงบ่าย(13.00-16.00)</v-chip>
                </v-chip-group>
              </v-card-text>
              <v-container fluid>
                <v-row align="center" justify="center">
                  <v-col cols="12" class="text-center">
                    <h3 class="font-display">จำนวนคิวขณะนี้</h3>
                    <v-row align="center" justify="center">
                      <h1 class="font-display" style="margin-top: 28px">{{ totalQueueCount }}</h1>
                      <h4 class="font-display" style="margin-top: 34px; margin-left: 13px">
                        คิว
                      </h4>
                    </v-row>

                    <v-card-actions>
                      <div class="d-flex justify-center" style="margin-left: 124px; margin-top: 20px">
                        <v-btn :disabled="!selectedTime" small class="font-display" style="padding-left: 30px; padding-right: 30px"
                          color="btn-custom" rounded depressed @click="goToSummary()">
                          ถัดไป
                        </v-btn>
                      </div>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </div>
            </v-container>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  middleware: 'authUser',
  data() {
    return {
      selectedDate: new Date().toISOString().substr(0, 10),
      selectedTime: null,
      typeId: this.$route.query.typeId,
      ageId: this.$route.query.ageId,
      selectedItems: JSON.parse(this.$route.query.selectedItems) || [],
      queues: [],
      e1: 4,
      minDate: new Date().toISOString().substr(0, 10),
    };
  },

  watch: {
    selectedDate: 'fetchApprovedBookings',
    selectedTime: 'fetchApprovedBookings',
  },

  computed: {
    totalQueueCount() {
      return this.queues.length;
    },
  },

  methods: {
    dateAllowed(date) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const selectedDate = new Date(date);
      const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;
      return selectedDate >= currentDate && !isWeekend;
    },
    goToSummary() {
      const selectedDateTime = {
        date: this.selectedDate,
        time: this.selectedTime,
      };
      console.log(selectedDateTime);
      console.log(this.selectedItems);
      this.$router.push({
        name: "summary_vaccine",
        query: {
          selectedDateTime: JSON.stringify(selectedDateTime),
          selectedItems: JSON.stringify(this.selectedItems),
          typeId: this.typeId,
          ageId: this.ageId,
        },
      });
    },

    async fetchApprovedBookings() {
      try {
        const response = await this.$axios.get('/qmanagement/api/totalqueues', {
          params: {
            selectedDate: this.selectedDate,
            selectedTime: this.selectedTime,
            typeId: this.typeId,
          },
        });
        console.log('API Response:', response.data);

        if (response.status === 200) {
          this.queues = response.data.response;
          console.log("queue:", this.queues);
        } else {
          console.error('Failed to fetch approved bookings');
        }
      } catch (error) {
        console.error('Error fetching approved bookings:', error);
      }
    },
  },
};
</script>

<style scoped>
.box {
  border-radius: 10px;
}

.btn-custom {
  color: rgb(255, 255, 255) !important;
  background: linear-gradient(to right,
      rgba(241, 114, 35, 1),
      rgba(241, 114, 35, 1));
}

.font-display {
  font-family: "Kanit";
}

.header {
  margin: 0px;
  margin-left: 10px;
  text-indent: 30px;
}

.date-picker {
  margin-top: 20px;
  margin-left: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 50vw;
}

.select-time {
  margin-top: 40px;
  margin-left: 40px;
}

.custom-chip {
  height: 60px;
  display: flex;
  align-items: center;
}
</style>

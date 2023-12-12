<template>
  <div class="font-display">
    <v-data-table style="border-radius: 12px" v-model="selected" :headers="headers" :items="bookings"
      :single-select="singleSelect" item-key="no" :search="search" show-select class="elevation-0">
      <template v-slot:top>
        <v-toolbar flat class="font-display">
          <v-dialog max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-row class="justify-end">
                <v-col cols="2">
                  <v-row class="pa-6">
                    <v-row class="mt-3">
                      <v-select :items="serviceList" v-model="serviceFilterValue" label="บริการ"></v-select>
                    </v-row>
                  </v-row>
                </v-col>

                <v-col cols="2">
                  <v-row class="pa-6">
                    <v-row class="mt-3">
                      <v-text-field v-model="date" type="date"></v-text-field>
                    </v-row>
                  </v-row>
                </v-col>

                <v-col cols="2">
                  <v-row class="pa-6">
                    <v-row class="mt-3">
                      <v-select :items="timeList" v-model="timeFilterValue" label="เวลา"></v-select>
                    </v-row>
                  </v-row>
                </v-col>

                <v-col cols="2">
                  <v-row class="pa-6">
                    <v-row class="mt-3">
                      <v-select :items="statusList" v-model="statusFilterValue" label="สถานะ"></v-select>
                    </v-row>
                  </v-row>
                </v-col>

                <v-col cols="4">
                  <v-row class="pa-6">
                    <v-row class="ma-3">
                      <v-text-field outlined dense class="search-bar" v-model="search" append-icon="mdi-magnify"
                        type="text" label="ค้นหา" single-line hide-details="auto">
                      </v-text-field>
                    </v-row>
                  </v-row>
                </v-col>
              </v-row>
            </template>
          </v-dialog>
        </v-toolbar>

        <v-toolbar flat class="font-display">
          <v-btn class="mr-2" elevation="0" outlined color="primary" @click="approveAll(
            bookings.booking_date,
            bookings.booking_time,
            bookings.HN_code
          )">อนุมัติทั้งหมด</v-btn>
          <v-btn elevation="0" outlined color="error" @click="rejectAll(
            bookings.booking_date,
            bookings.booking_time,
            bookings.HN_code
          )">ปฏิเสธทั้งหมด</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.type_name="{ item }">
        <td class="custom-td" v-html="applyWordColors(item.type_name)"></td>
      </template>

      <template v-slot:item.no="{ item }">
        {{ item.no }}
        <v-snackbar v-model="successSnackbar" :timeout="timeout">
          อนุมัติคำขอจองคิวสำเร็จ!
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="successSnackbar = false">
              ปิด
            </v-btn>
          </template>
        </v-snackbar>

        <v-snackbar v-model="rejectSnackbar" :timeout="timeout">
          ปฏิเสธคำขอจองคิวสำเร็จ!
          <template v-slot:action="{ attrs }">
            <v-btn color="blue" text v-bind="attrs" @click="rejectSnackbar = false">
              ปิด
            </v-btn>
          </template>
        </v-snackbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <!-- Tooltip for Approve Button -->
        <v-tooltip bottom v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon elevation="0" v-bind="attrs" v-on="on" @click="
              approve(item.booking_date, item.booking_time, item.HN_code)
              ">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <span>อนุมัติ</span>
        </v-tooltip>

        <v-tooltip bottom v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="error" icon v-on="on" v-bind="attrs" @click=" reject(item.booking_date, item.booking_time, item.HN_code)">
              <!-- <img src="../images/reject.png" alt="My Custom Icon" width="20px" height="20px" /> -->
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>ปฏิเสธ</span>
        </v-tooltip>

        <!-- Tooltip for View Info Button -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon elevation="0" v-bind="attrs" v-on="on" @click="
              viewInfo(item.booking_date, item.booking_time, item.HN_code)
              ">
              <v-icon>mdi-file-document-outline</v-icon>
            </v-btn>
          </template>
          <span>ดูรายละเอียด</span>
        </v-tooltip>
      </template>
    </v-data-table>
    <template>
      <v-dialog v-model="dialogInfo" max-width="600">
        <div v-for="item in groupedInfo" :key="item" style="display: flex; flex-direction: column">
          <v-card class="font-display">
            <v-card-title class="text-h5" style="display: flex; align-items: center; margin-bottom: 0">
              <span style="flex-grow: 1">รายละเอียด</span>
              <v-btn icon @click="dialogInfo = false"><v-icon>mdi-close</v-icon></v-btn>
            </v-card-title>
            <v-card-text>
              <div style="display: flex; align-items: center">
                <span style="font-weight: bold">HN.</span>
                <span style="margin-left: 10px">{{ item.HN_code }}</span>
              </div>
              <div style="display: flex; align-items: center">
                <span style="font-weight: bold">ชื่อ-สกุล</span>
                <span style="margin-left: 10px">{{ item.name }}</span>
              </div>
              <div style="display: flex; align-items: center">
                <span style="font-weight: bold">นัดวันที่</span>
                <span style="margin-left: 10px">{{ item.booking_date }}</span>
                <span style="font-weight: bold; margin-left: 10px">เวลา</span>
                <span style="margin-left: 10px">{{ item.booking_time }}</span>
              </div>
              <div style="display: flex; align-items: center">
                <span style="font-weight: bold">ประเภทบริการ</span>
                <span style="margin-left: 10px">{{ item.type_name }}</span>
              </div>
              <span style="font-weight: bold">บริการหลัก</span>
              <div style="display: flex; align-items: center">
                <span style="margin-left: 10px"> {{ item.service_name }}</span>
              </div>
              <div v-if="item.services" style="display: flex; flex-direction: column">
                <div v-for="service in item.services" :key="service" style="display: flex; align-items: center">
                  <span style="margin-left: 10px">{{ service }}</span>
                </div>
              </div>
              <span style="font-weight: bold">บริการเสริม</span>
              <div v-for="subservice in item.subservice_names" :key="subservice"
                style="display: flex; align-items: center">
                <span style="margin-left: 10px">{{ subservice }}</span>
              </div>
            </v-card-text>
            <v-card-actions class="justify-end font-display">
              <v-btn text @click="
                rejectDialog(
                  item.booking_date,
                  item.booking_time,
                  item.HN_code
                )
                " color="error" v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">ปฏิเสธ</v-btn>
              <v-btn text @click="
                approveDialog(
                  item.booking_date,
                  item.booking_time,
                  item.HN_code
                )
                " color="green" v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">อนุมัติ</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      serviceFilterValue: "",
      timeFilterValue: "",
      statusFilterValue: "",
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      singleSelect: false,
      selected: [],
      date: null,
      search: "",
      successSnackbar: false,
      rejectSnackbar: false,
      dialogInfo: false,
      bookings: [],
      appointmentinfo: [],
      groupedInfo: [],
      dialog: false,
      headers: [
        { text: "ลำดับ", align: "start", value: "no" },
        { text: "HN", value: "HN_code" },
        { text: "ชื่อ-นามสกุล", value: "name" },
        { text: "บริการ", value: "type_name", filter: this.typeFilter },
        { text: "วันที่", value: "booking_date", filter: this.dateFilter },
        { text: "เวลา", value: "booking_time", filter: this.timeFilter },
        { text: "สถานะคิว", value: "status_name", filter: this.statusFilter },
        { text: "การกระทำ", value: "actions" },
      ],
      serviceList: [
        { text: "ทั้งหมด", value: null },
        { text: "ตรวจสุขภาพ", value: "ตรวจสุขภาพ" },
        { text: "ศูนย์วัคซีน", value: "ศูนย์วัคซีน" },
        { text: "เวชศาสตร์ชะลอวัย", value: "เวชศาสตร์ชะลอวัย" },
      ],
      timeList: [
        { text: "ทั้งหมด", value: null },
        { text: "ช่วงเช้า", value: "ช่วงเช้า (8.00-12.00)" },
        { text: "ช่วงบ่าย", value: "ช่วงบ่าย(13.00-16.00)" },
      ],
      statusList: [
        { text: "ทั้งหมด", value: null },
        { text: "อนุมัติ", value: "อนุมัติ" },
        { text: "รออนุมัติ", value: "รออนุมัติ" },
        { text: "ปฏิเสธ", value: "ปฏิเสธ" },
      ],
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      console.log("initialize");
      const res = await this.$axios.get("/qmanagement/api/bookings");
      this.bookings = res.data.response.map((booking, index) => {
        const formattedDate = this.formatDate(booking.booking_date);
        return { ...booking, booking_date: formattedDate, no: index + 1 };
      });
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    async fetchData(date, time, hnCode) {
      console.log("Received HN Code in fetchData method:", date, time, hnCode);
      try {
        const res = await this.$axios.get("/qmanagement/api/slip", {
          params: {
            date,
            time,
            hnCode,
          },
        });
        this.appointmentinfo = res.data.response;
        console.log(this.appointmentinfo);
        const groups = {};
        this.appointmentinfo.forEach((item) => {
          if (item.subservice_name) {
            const key = `${item.HN_code}_${item.name}_${item.booking_date}_${item.booking_time}_${item.type_name}`;
            if (!groups[key]) {
              groups[key] = {
                HN_code: item.HN_code,
                name: item.name,
                booking_date: new Date(item.booking_date).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "2-digit", day: "2-digit" }
                ),
                booking_time: item.booking_time,
                type_name: item.type_name,
                services: [],
                subservice_names: [],
                status_name: item.status_name
              };
            }
            const service_key = `${item.service_name}`;
            const subservice_key = `${item.subservice_name}`;
            if (!groups[key].services.includes(service_key)) {
              groups[key].services.push(service_key);
            }
            if (!groups[key].subservice_names.includes(subservice_key)) {
              groups[key].subservice_names.push(subservice_key);
            }
          } else if (item.service_name && !item.subservice_name) {
            // item does not have a subservice_name
            if (!groups[item.HN_code]) {
              groups[item.HN_code] = {
                HN_code: item.HN_code,
                name: item.name,
                booking_date: new Date(item.booking_date).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "2-digit", day: "2-digit" }
                ),
                booking_time: item.booking_time,
                type_name: item.type_name,
                services: [],
                subservice_names: ["-"],
                status_name: item.status_name
              };
            }
            groups[item.HN_code].services.push(item.service_name);
          }
        });
        this.groupedInfo = Object.values(groups);
        console.log(this.groupedInfo);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    },
    viewInfo(booking_date, booking_time, HN_code) {
      console.log(
        "Received parameters - Date:",
        booking_date,
        "Time:",
        booking_time,
        "HN Code:",
        HN_code
      );
      this.dialogInfo = true;
      this.fetchData(booking_date, booking_time, HN_code);
    },
    async approve(booking_date, booking_time, HN_code) {
      try {
        await this.$axios.put(
          `/qmanagement/api/bookings/${booking_date}/${booking_time}/${HN_code}`,
          {
            status_ID: 1,
          }
        );
        console.log(
          `Booking on ${booking_date} at ${booking_time} for HN ${HN_code} approved successfully`
        );
        this.successSnackbar = true;
        this.initialize();
      } catch (error) {
        console.error(
          `Failed to approve booking on ${booking_date} at ${booking_time} for HN ${HN_code}:`,
          error
        );
      }

      this.selected = [];
      this.initialize();
    },
    async approveDialog(booking_date, booking_time, HN_code) {
      const formattedDate = this.formatDate(booking_date);
      try {
        await this.$axios.put(
          `/qmanagement/api/bookings/${formattedDate}/${booking_time}/${HN_code}`,
          {
            status_ID: 1,
          }
        );
        console.log(
          `Booking on ${formattedDate} at ${booking_time} for HN ${HN_code} approved successfully`
        );
        this.successSnackbar = true;
        this.initialize();
      } catch (error) {
        console.error(
          `Failed to approve booking on ${formattedDate} at ${booking_time} for HN ${HN_code}:`,
          error
        );
      }
      this.selected = [];
      this.dialogInfo = false;
      this.initialize();
    },
    async approveAll(booking_date, booking_time, HN_code) {
      for (const user of this.selected) {
        try {
          await this.$axios.put(
            `/qmanagement/api/bookings/${user.booking_date}/${user.booking_time}/${user.HN_code}`,
            {
              status_ID: 1,
            }
          );
          console.log(
            `Booking on ${user.booking_date} at ${user.booking_time} for HN ${user.HN_code} approved successfully`
          );
          this.successSnackbar = true;
          this.initialize();
        } catch (error) {
          console.error(
            `Failed to approve booking on ${user.booking_date} at ${user.booking_time} for HN ${user.HN_code}:`,
            error
          );
        }
      }
      this.selected = [];
      this.initialize();
    },
    async reject(booking_date, booking_time, HN_code) {
      try {
        await this.$axios.put(
          `/qmanagement/api/bookings/${booking_date}/${booking_time}/${HN_code}`,
          {
            status_ID: 3,
          }
        );
        console.log(
          `Booking on ${booking_date} at ${booking_time} for HN ${HN_code} reject successfully`
        );
        this.rejectSnackbar = true;
        this.initialize();
      } catch (error) {
        console.error(
          `Failed to reject booking on ${booking_date} at ${booking_time} for HN ${HN_code}:`,
          error
        );
      }

      this.selected = [];
      this.initialize();
    },
    async rejectDialog(booking_date, booking_time, HN_code) {
      const formattedDate = this.formatDate(booking_date);
      try {
        await this.$axios.put(
          `/qmanagement/api/bookings/${formattedDate}/${booking_time}/${HN_code}`,
          {
            status_ID: 3,
          }
        );
        console.log(
          `Booking on ${formattedDate} at ${booking_time} for HN ${HN_code} rejected successfully`
        );
        this.rejectSnackbar = true;
        this.initialize();
      } catch (error) {
        console.error(
          `Failed to reject booking on ${formattedDate} at ${booking_time} for HN ${HN_code}:`,
          error
        );
      }
      this.selected = [];
      this.dialogInfo = false;
      this.initialize();
    },
    async rejectAll(booking_date, booking_time, HN_code) {
      for (const user of this.selected) {
        try {
          await this.$axios.put(
            `/qmanagement/api/bookings/${user.booking_date}/${user.booking_time}/${user.HN_code}`,
            {
              status_ID: 3,
            }
          );
          console.log(
            `Booking on ${user.booking_date} at ${user.booking_time} for HN ${user.HN_code} reject successfully`
          );
          this.rejectSnackbar = true;
          this.initialize();
        } catch (error) {
          console.error(
            `Failed to reject booking on ${user.booking_date} at ${user.booking_time} for HN ${user.HN_code}:`,
            error
          );
        }
      }
      this.selected = [];
      this.initialize();
    },

    typeFilter(value) {
      if (!this.serviceFilterValue) {
        return true;
      }
      return value
        .toLowerCase()
        .includes(this.serviceFilterValue.toLowerCase());
    },

    dateFilter(value) {
      if (!this.date) {
        return true;
      } else {
        return value === this.date;
      }
    },

    timeFilter(value) {
      if (!this.timeFilterValue) {
        return true;
      }
      return value === this.timeFilterValue;
    },

    statusFilter(value) {
      if (!this.statusFilterValue) {
        return true;
      }
      return value === this.statusFilterValue;
    },

    applyWordColors(text) {
      const words = text.split(" ");

      const coloredWords = words.map((word) => {
        let color = "";

        if (word === "ตรวจสุขภาพ") {
          color = "red";
        } else if (word === "ศูนย์วัคซีน") {
          color = "green";
        } else if (word === "เวชศาสตร์ชะลอวัย") {
          color = "blue";
        }

        return `<span style="color:${color}">${word}</span>`;
      });

      return coloredWords.join(" ");
    },
  },
};
</script>

<style scoped>
.font-display {
  font-family: "Kanit";
}
</style>
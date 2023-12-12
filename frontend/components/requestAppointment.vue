<template>
  <div class="font-display">
    <v-data-table
      style="border-radius: 12px"
      v-model="selected"
      :headers="headers"
      :items="bookings"
      :single-select="singleSelect"
      item-key="no"
      :search="search"
      show-select
      class="elevation-0"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-btn elevation="0" outlined color="primary" @click="approveAll"
            >อนุมัติทั้งหมด</v-btn
          >
          <v-spacer></v-spacer>
          <div>
            <v-text-field
              style="width: 200px; padding-right: 20px"
              outlined
              dense
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="ค้นหา"
              single-line
              hide-details
            ></v-text-field>
          </div>
        </v-toolbar>
      </template>

      <template v-slot:item.type_name="{ item }">
        <td class="custom-td" v-html="applyWordColors(item.type_name)"></td>
      </template>

      <template v-slot:item.no="{ item }">
        <td>
          {{ item.no }}
          <v-snackbar v-model="successSnackbar" :timeout="timeout">
            Booking approved successfully!
            <template v-slot:action="{ attrs }">
              <v-btn
                color="blue"
                text
                v-bind="attrs"
                @click="successSnackbar = false"
              >
                ปิด
              </v-btn>
            </template>
          </v-snackbar>
        </td>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="success" icon elevation="0" @click="approve(item.booking_ID)"
          ><v-icon >mdi-check-circle</v-icon></v-btn
        >
        <v-btn
          icon
          elevation="0"
          v-bind="attrs"
          v-on="on"
          @click="viewInfo(item.booking_date, item.booking_time, item.HN_code)"
          ><v-icon>mdi-file-document-outline</v-icon></v-btn
        >
      </template>
    </v-data-table>
    <template>
      <v-dialog v-model="dialogInfo" max-width="600">
        <v-card class="font-display">
          <v-card-title
            class="text-h5"
            style="display: flex; align-items: center; margin-bottom: 0"
          >
            <span style="flex-grow: 1">รายละเอียด</span>
          </v-card-title>
          <v-card-text>
            <div
              v-for="item in groupedInfo"
              :key="item.booking_ID"
              style="display: flex; flex-direction: column"
            >
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
              <div
                v-if="item.services"
                style="display: flex; flex-direction: column"
              >
                <div
                  v-for="service in item.services"
                  :key="service"
                  style="display: flex; align-items: center"
                >
                  <span style="margin-left: 10px">{{ service }}</span>
                </div>
              </div>
              <span style="font-weight: bold">บริการเสริม</span>
              <div
                v-for="subservice in item.subservice_names"
                :key="subservice"
                style="display: flex; align-items: center"
              >
                <span style="margin-left: 10px">{{ subservice }}</span>
              </div>
            </div>
          </v-card-text>
          <v-card-actions class="justify-end font-display">
            <v-btn text @click="dialogInfo = false" color="error">ปิด</v-btn>
            <v-btn text @click="approveDialog" color="green">อนุมัติ</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      picker: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      singleSelect: false,
      selected: [],
      search: "",
      successSnackbar: false,
      dialogInfo: false,
      bookings: [],
      appointmentinfo: [],
      groupedInfo: [],
      dialog: false,
      headers: [
        { text: "ลำดับ", align: "start", value: "no" },
        { text: "HN", value: "HN_code" },
        { text: "ชื่อ-นามสกุล", value: "name" },
        { text: "บริการ", value: "type_name" },
        { text: "วันที่", value: "booking_date" },
        { text: "เวลา", value: "booking_time" },
        { text: "การกระทำ", value: "actions" },
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
    async approve(booking_ID) {
      try {
        await this.$axios.put(`/qmanagement/api/bookings/${booking_ID}`, {
          status_ID: 1,
        });
        console.log(`Booking ${booking_ID} approved successfully`);
        this.successSnackbar = true;
        this.initialize();
      } catch (error) {
        console.error(`Failed to approve booking ${booking_ID}:`, error);
      }

      this.selected = [];
      this.initialize();
    },
    async approveDialog() {
      if (this.selected.length > 0) {
        const selectedItem = this.selected[0]; // Assuming single-select mode
        const booking_ID = selectedItem.booking_ID;
        try {
          await this.$axios.put(`/qmanagement/api/bookings/${booking_ID}`, {
            status_ID: 1,
          });
          console.log(`User ${booking_ID} approved successfully`);
          this.successSnackbar = true;
        } catch (error) {
          console.error(`Failed to approve user ${booking_ID}:`, error);
        }
        this.selected = [];
        this.dialogInfo = false;
        this.initialize();
      }
    },
    async approveAll() {
      for (const user of this.selected) {
        try {
          await this.$axios.put(`/qmanagement/api/bookings/${user.booking_ID}`, {
            status_ID: 1,
          });
          console.log(`User ${user.booking_ID} approved successfully`);
          this.successSnackbar = true;
        } catch (error) {
          console.error(`Failed to approve user ${user.booking_ID}:`, error);
        }
      }
      this.selected = [];
      this.initialize();
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

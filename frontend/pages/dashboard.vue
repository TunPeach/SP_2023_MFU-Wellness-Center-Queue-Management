<template>
  <div>
    <Navbar />
    <v-container style="max-width: 1250px">
      <v-card class="font-display" max-width="400" elevation="0" style="margin-left: 50px">
        <v-list-item>
          <v-icon style="padding-right: 10px" v-model="name">
            mdi-account
          </v-icon>
          ยินดีต้อนรับเข้าสู่ระบบ, {{ name }}
        </v-list-item>
      </v-card>
      <v-row style="margin-top: 10px">
        <v-col>
          <v-sheet class="font-display" style="
                border-radius: 10px;
                height: 142px;
                width: auto;
                margin-left: 50px;
              " color="white" elevation="0" height="100" :rounded="10" width="100">
            <v-container style="padding-top: 22px; padding-left: 63px">
              <v-col>
                <v-row>
                  <h1>คำขอลงทะเบียน</h1>
                </v-row>
                <v-row>
                  <h4 style="margin-top: 17px; margin-right: 20px">อนุมัติ</h4>
                  <h1 style="color: #f17223">{{ totalRegisterCount }}</h1>
                  <p style="margin-top: 17px; margin-left: 20px">คำขอ</p>

                  <h4 style="margin-top: 17px; margin-right: 20px; margin-left: 50px;">รออนุมัติ</h4>
                  <h1 style="color: #f17223">{{ totalUnAppRegisterCount }}</h1>
                  <p style="margin-top: 17px; margin-left: 20px">คำขอ</p>
                </v-row>
              </v-col>
            </v-container>
          </v-sheet>

          <v-sheet class="font-display" style="
              border-radius: 10px;
              height: auto;
              width: auto;
              margin-top: 30px;
              margin-left: 50px;
            " color="white" :rounded="10" elevation="0">
            <v-btn-toggle v-model="selectedAppTab">
              <v-btn @click="approveTab('0')">อนุมัติ</v-btn>
              <v-btn @click="approveTab('1')">รออนุมัติ</v-btn>
            </v-btn-toggle>
            <v-container style="
                padding-top: 50px;
                padding-left: 66px;
                padding-bottom: 55px;
              ">
              <v-row>
                <v-col>
                  <v-row>
                    <h1>คำขอนัดหมาย</h1>
                  </v-row>
                  <v-row>
                    <h4 style="margin-top: 17px; margin-right: 20px">{{ displayCountText }}</h4>
                    <h1 style="color: #f17223">{{ displayCount }}</h1>
                    <p style="margin-top: 17px; margin-left: 20px">คำขอ</p>
                  </v-row>
                  <v-row>
                    <p>- ตรวจสุขภาพ</p>
                    <p style="
                        padding-left: 10px;
                        padding-right: 10px;
                        color: #f17223;
                      ">
                      {{ serviceCounts.ตรวจสุขภาพ || 0 }}
                    </p>
                    <p style="">คำขอ</p>
                  </v-row>
                  <v-row>
                    <p>- ศูนย์วัคซีน</p>
                    <p style="
                        padding-left: 10px;
                        padding-right: 10px;
                        color: #f17223;
                      ">
                      {{ serviceCounts.ศูนย์วัคซีน || 0 }}
                    </p>
                    <p style="">คำขอ</p>
                  </v-row>
                  <v-row>
                    <p>- เวชศาสตร์ชะลอวัย</p>
                    <p style="
                        padding-left: 10px;
                        padding-right: 10px;
                        color: #f17223;
                      ">
                      {{ serviceCounts.เวชศาสตร์ชะลอวัย || 0 }}
                    </p>
                    <p style="">คำขอ</p>
                  </v-row>
                </v-col>

                <v-sheet>
                  <canvas ref="pieChartCanvas"></canvas>
                </v-sheet>
              </v-row>
            </v-container>
          </v-sheet>
        </v-col>

        <v-col>
          <v-row style="padding-top: 13px;">
            <v-sheet class="font-display" style="
                  border-radius: 10px;
                  height: 142px;
                  margin-left: 30px;
                  width: 170px;
                " color="white" elevation="0" height="100" :rounded="10" max-width="300">
              <v-container style="padding-top: 20px;">
                <v-col>
                  <v-row align="center" justify="center">
                    <h4>จำนวนนักศึกษาใหม่</h4>
                  </v-row>
                  <v-col align="center" justify="center">
                    <h1 style="color: #f17223; font-size: 30px;">{{ totalStudentCount }}</h1>
                    <p>คน</p>
                  </v-col>
                </v-col>
              </v-container>
            </v-sheet>

            <v-sheet class="font-display" style="
                border-radius: 10px;
                height: 142px;
                width: auto;
                margin-left: 30px;
              " color="white" elevation="0" height="100" :rounded="10" width="100">
              <v-container style="padding-top: 20px;">
                <v-col>
                  <v-row align="center" justify="center">
                    <h4>คำขอนัดหมายตรวจสุขภาพนักศึกษาใหม่</h4>
                  </v-row>
                  <v-row>
                    <h4 style="margin-top: 35px; margin-right: 20px">อนุมัติ</h4>
                    <h1 style="margin-top: 20px; color: #f17223">{{ totalStudentQueueCount }}</h1>
                    <p style="margin-top: 35px; margin-left: 20px">คำขอ</p>

                    <h4 style="margin-top: 35px; margin-right: 20px; margin-left: 50px;">รออนุมัติ</h4>
                    <h1 style="margin-top: 20px; color: #f17223">{{ totalUnAppStudentQueueCount }}</h1>
                    <p style="margin-top: 35px; margin-left: 20px">คำขอ</p>
                  </v-row>
                </v-col>
              </v-container>
            </v-sheet>
          </v-row>

          <v-container style="padding-top: 40px;">
            <v-sheet class="font-display" style="border-radius: 10px; height: auto; width: auto" color="white"
              :rounded="10" elevation="0">
              <v-btn-toggle v-model="selectedInterval">
                <v-btn @click="changeInterval('yearly')">รายปี</v-btn>
                <v-btn @click="changeInterval('monthly')">รายเดือน</v-btn>
                <v-btn @click="changeInterval('weekly')">7 วันที่ผ่านมา</v-btn>
              </v-btn-toggle>
              <v-card-text>
                <div v-if="isLoading">Loading...</div>
                <canvas ref="lineChartCanvas" v-else></canvas>
              </v-card-text>
            </v-sheet>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.font-display {
  font-family: "Kanit";
}

.custom-outlined {
  border: 2px solid rgb(0, 0, 0);
  /* Customize the border */
  border-radius: 4px;
  /* Customize the border radius */
  padding: 8px 16px;
  /* Customize the padding */
  /* Add any other custom styles */
}
</style>

<script>
import Chart from "chart.js";

export default {
  middleware: 'auth',
  data() {
    return {
      queueData: [],
      unAppQueueData: [],
      studentQueueData: [],
      studentQueueUnAppData: [],
      registerData: [],
      registerUnAppData: [],
      studentData: [],
      totalQueueCount: 0,
      totalUnAppQueueCount: 0,
      totalStudentQueueCount: 0,
      totalUnAppStudentQueueCount: 0,
      totalRegisterCount: 0,
      totalUnAppRegisterCount: 0,
      totalStudentCount: 0,
      serviceCounts: {
        ตรวจสุขภาพ: 0,
        ศูนย์วัคซีน: 0,
        เวชศาสตร์ชะลอวัย: 0,
      },
      selectedInterval: "monthly",
      selectedAppTab: "0",
      name: "",
      pieChartData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
      pieChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },

  created() {
    this.initialize();
  },

  computed: {
    empCode() {
      return window.sessionStorage.getItem("empCode");
    },
    displayCount() {
      const appTab = String(this.selectedAppTab);
      return appTab === "0" ? this.totalQueueCount : this.totalUnAppQueueCount;
  },
  displayCountText() {
      const appTab = String(this.selectedAppTab);
      return appTab === "0" ? "อนุมัติ " : "รออนุมัติ" ;
  },
},

  methods: {
    async initialize() {
      try {
        const adminResponse = await this.$axios.get("/qmanagement/api/admin", {
          params: {
            empCode: this.empCode,
          },
        });
        const adminData = adminResponse.data;
        console.log(this.adminData);
        this.name = adminData.response[0].name;

        const response = await this.$axios.get("/qmanagement/api/appbookings");
        this.queueData = response.data.response;

        const responses = await this.$axios.get("/qmanagement/api/unappbookings");
        this.unAppQueueData = responses.data.response;

        const studentQueueResponse = await this.$axios.get("/qmanagement/api/studentappbookings");
        this.studentQueueData = studentQueueResponse.data.response;

        const studentQueueUnAppResponse = await this.$axios.get("/qmanagement/api/studentunappbookings");
        this.studentQueueUnAppData = studentQueueUnAppResponse.data.response;

        const registerResponse = await this.$axios.get("/qmanagement/api/oldusers");
        this.registerData = registerResponse.data.response;

        const registerUnAppResponse = await this.$axios.get("/qmanagement/api/unappusers");
        this.registerUnAppData = registerUnAppResponse.data.response;

        const studentResponse = await this.$axios.get("/qmanagement/api/students");
        this.studentData = studentResponse.data.response;

        this.totalQueueCount = this.calculateTotalQueueCount("monthly");
        this.totalUnAppQueueCount = this.calculateTotalUnAppQueueCount("monthly");
        this.totalStudentQueueCount = this.calculateTotalStudentQueueCount("monthly");
        this.totalUnAppStudentQueueCount = this.calculateTotalUnAppStudentQueueCount("monthly");
        this.totalRegisterCount = this.calculateTotalRegisterCount("monthly");
        this.totalUnAppRegisterCount = this.calculateTotalUnAppRegisterCount("monthly");
        this.totalStudentCount = this.calculateTotalStudentCount("monthly");
        this.fetchServiceCounts("monthly");

        this.renderLineChart();
        this.renderPieChart();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    calculatePieChartPercentages() {
      const total = this.pieChartData.datasets[0].data.reduce((acc, value) => acc + value, 0);
      return this.pieChartData.datasets[0].data.map((value) => ((value / total) * 100).toFixed(2));
    },

    renderPieChart() {
      const ctx = this.$refs.pieChartCanvas.getContext("2d");
      const percentages = this.calculatePieChartPercentages();

      new Chart(ctx, {
        type: "pie",
        data: this.pieChartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                let label = data.labels[tooltipItem.index] || "";
                if (label) {
                  label += ": ";
                }
                label += `${percentages[tooltipItem.index]}%`;
                return label;
              },
            },
          },
        },
      });
    },

    changeInterval(interval) {
      this.selectedInterval = interval;
      this.fetchServiceCounts(interval);
      this.totalRegisterCount = this.calculateTotalRegisterCount(interval);
      this.totalUnAppRegisterCount = this.calculateTotalUnAppRegisterCount(interval);
      this.totalQueueCount = this.calculateTotalQueueCount(interval);
      this.totalUnAppQueueCount = this.calculateTotalUnAppQueueCount(interval);
      this.totalStudentQueueCount = this.calculateTotalStudentQueueCount(interval);
      this.totalUnAppStudentQueueCount = this.calculateTotalUnAppStudentQueueCount(interval);
      this.totalStudentCount = this.calculateTotalStudentCount(interval);
      this.renderLineChart();
      this.renderPieChart();
    },

    approveTab(tab) {
      console.log('Changing selectedAppTab to:', tab);
      this.selectedAppTab = tab;
      console.log('Selected App Tab is now:', this.selectedAppTab);
    },

    renderLineChart() {
      const ctx = this.$refs.lineChartCanvas.getContext("2d");

      let queueData, registerData, labels;
      const appTab = String(this.selectedAppTab);

      console.log("selectedAppTab:", appTab);
      console.log("selectedInterval:", this.selectedInterval);
      console.log("Queue Data:", this.queueData);
      console.log("Register Data:", this.registerData);
      console.log("UnAppQueue Data:", this.unAppQueueData);
      console.log("RegisterUnApp Data:", this.registerUnAppData);

      if (appTab === "0" && this.selectedInterval === "yearly") {
        queueData = this.calculateQueueMonthlyCounts(this.queueData);
        registerData = this.calculateRegisterMonthlyCounts(this.registerData);
        labels = this.getAllMonths();
      } else if (appTab === "0" && this.selectedInterval === "monthly") {
        queueData = this.calculateQueueDailyCounts(this.queueData);
        registerData = this.calculateRegisterDailyCounts(this.registerData);
        labels = this.getAllDays();
      } else if (appTab === "0" && this.selectedInterval === "weekly") {
        queueData = this.calculateQueueWeeklyCounts(this.queueData);
        registerData = this.calculateRegisterWeeklyCounts(this.registerData);
        labels = this.getLastSevenDays();
      }
      else if (appTab === "1" && this.selectedInterval === "yearly") {
        queueData = this.calculateUnAppQueueMonthlyCounts(this.unAppQueueData);
        registerData = this.calculateUnAppRegisterMonthlyCounts(this.registerUnAppData);
        labels = this.getAllMonths();
      } else if (appTab === "1" && this.selectedInterval === "monthly") {
        queueData = this.calculateUnAppQueueDailyCounts(this.unAppQueueData);
        registerData = this.calculateUnAppRegisterDailyCounts(this.registerUnAppData);
        labels = this.getAllDays();
      } else if (appTab === "1" && this.selectedInterval === "weekly") {
        queueData = this.calculateUnAppQueueWeeklyCounts(this.unAppQueueData);
        registerData = this.calculateUnAppRegisterWeeklyCounts(this.registerUnAppData);
        labels = this.getLastSevenDays();
      }

      console.log("Labels:", labels);
      new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "คำขอนัดหมาย",
              data: labels.map((label) => queueData[label] || 0),
              borderColor: "#0096FF",
              fill: false,
            },
            {
              label: "คำขอลงทะเบียน",
              data: labels.map((label) => registerData[label] || 0),
              borderColor: "#FFAC1C",
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "คำขอ",
              },
            },
          },
        },
      });
    },

    calculateQueueMonthlyCounts() {
      const queueData = {};

      this.queueData.forEach((entry) => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const key = `${year}-${month.toString().padStart(2, "0")}`;

        if (queueData[key]) {
          queueData[key]++;
        } else {
          queueData[key] = 1;
        }
      });

      return queueData;
    },

    calculateUnAppQueueMonthlyCounts() {
      const queueData = {};

      this.unAppQueueData.forEach((entry) => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const key = `${year}-${month.toString().padStart(2, "0")}`;

        if (queueData[key]) {
          queueData[key]++;
        } else {
          queueData[key] = 1;
        }
      });

      return queueData;
    },

    calculateRegisterMonthlyCounts() {
      const registerData = {};

      this.registerData.forEach((entry) => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(" ")[0].split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const key = `${year}-${month.toString().padStart(2, "0")}`;

        if (registerData[key]) {
          registerData[key]++;
        } else {
          registerData[key] = 1;
        }
      });

      return registerData;
    },

    calculateUnAppRegisterMonthlyCounts() {
      const registerData = {};

      this.registerUnAppData.forEach((entry) => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(" ")[0].split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const key = `${year}-${month.toString().padStart(2, "0")}`;

        if (registerData[key]) {
          registerData[key]++;
        } else {
          registerData[key] = 1;
        }
      });

      return registerData;
    },

    calculateQueueDailyCounts() {
      const queueData = {};

      this.queueData.forEach((entry) => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const day = bookingDate.getDate();
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (queueData[key]) {
          queueData[key]++;
        } else {
          queueData[key] = 1;
        }
      });

      return queueData;
    },

    calculateUnAppQueueDailyCounts() {
      const queueData = {};

      this.unAppQueueData.forEach((entry) => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const day = bookingDate.getDate();
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (queueData[key]) {
          queueData[key]++;
        } else {
          queueData[key] = 1;
        }
      });

      return queueData;
    },

    calculateRegisterDailyCounts() {
      const registerData = {};

      this.registerData.forEach((entry) => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(" ")[0].split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (registerData[key]) {
          registerData[key]++;
        } else {
          registerData[key] = 1;
        }
      });

      return registerData;
    },

    calculateUnAppRegisterDailyCounts() {
      const registerData = {};

      this.registerUnAppData.forEach((entry) => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(" ")[0].split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (registerData[key]) {
          registerData[key]++;
        } else {
          registerData[key] = 1;
        }
      });

      return registerData;
    },

    calculateQueueWeeklyCounts() {
      const weeklyQueueCounts = {};

      this.queueData.forEach((entry) => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const day = bookingDate.getDate();
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (weeklyQueueCounts[key]) {
          weeklyQueueCounts[key]++;
        } else {
          weeklyQueueCounts[key] = 1;
        }
      });

      return weeklyQueueCounts;
    },

    calculateUnAppQueueWeeklyCounts() {
      const weeklyQueueCounts = {};

      this.unAppQueueData.forEach((entry) => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const day = bookingDate.getDate();
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (weeklyQueueCounts[key]) {
          weeklyQueueCounts[key]++;
        } else {
          weeklyQueueCounts[key] = 1;
        }
      });

      return weeklyQueueCounts;
    },

    calculateRegisterWeeklyCounts() {
      const weeklyRegisterCounts = {};

      this.registerData.forEach((entry) => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(" ")[0].split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (weeklyRegisterCounts[key]) {
          weeklyRegisterCounts[key]++;
        } else {
          weeklyRegisterCounts[key] = 1;
        }
      });

      return weeklyRegisterCounts;
    },

    calculateUnAppRegisterWeeklyCounts() {
      const weeklyRegisterCounts = {};

      this.registerUnAppData.forEach((entry) => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(" ")[0].split("-");
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const key = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        if (weeklyRegisterCounts[key]) {
          weeklyRegisterCounts[key]++;
        } else {
          weeklyRegisterCounts[key] = 1;
        }
      });

      return weeklyRegisterCounts;
    },

    getAllMonths() {
      const labels = [];
      for (let i = 1; i <= 12; i++) {
        labels.push(`2023-${i.toString().padStart(2, "0")}`);
      }
      return labels;
    },

    getAllDays() {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;

      const daysInMonth = new Date(year, month, 0).getDate();
      const daysArray = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const formattedDay = day.toString().padStart(2, "0");
        daysArray.push(
          `${year}-${month.toString().padStart(2, "0")}-${formattedDay}`
        );
      }

      return daysArray;
    },

    getLastSevenDays() {
      const labels = [];
      const currentDate = new Date();

      for (let i = 6; i >= 0; i--) {
        // Calculate the date for each day in the past week
        const pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - i);

        const year = pastDate.getFullYear();
        const month = pastDate.getMonth() + 1;
        const day = pastDate.getDate();

        labels.push(
          `${year}-${month.toString().padStart(2, "0")}-${day
            .toString()
            .padStart(2, "0")}`
        );
      }

      return labels;
    },

    async fetchServiceCounts(interval) {
      try {
        let response;
        const appTab = String(this.selectedAppTab);
        if (appTab === "0") {
          response = await this.$axios.get("/qmanagement/api/totalcount");
        } else if (appTab === "1") {
          response = await this.$axios.get("/qmanagement/api/totalunappcount");
        }

        console.log("Response:", response);

        if (!response.data.response) {
          console.error("API response does not contain 'response' field.");
          return;
        }

        const serviceCounts = {};

        const labels = response.data.response.map((result) => result.service_type);
        response.data.response.forEach((result) => {
          const serviceType = result.service_type.toLowerCase();
          let totalQueueCount;

          switch (interval) {
            case "yearly":
              totalQueueCount = result.total_queue_count_yearly;
              break;
            case "monthly":
              totalQueueCount = result.total_queue_count_monthly;
              break;
            case "weekly":
              totalQueueCount = result.total_queue_count_last_7_days;
              break;
            default:
              totalQueueCount = 0;
              break;
          }

          totalQueueCount = parseInt(totalQueueCount);

          serviceCounts[serviceType] = totalQueueCount;
        });

        console.log("Service Counts:", serviceCounts);

        this.serviceCounts = serviceCounts;
        this.pieChartData.labels = labels;
        this.pieChartData.datasets[0].data = labels.map(
          (serviceType) => serviceCounts[serviceType]
        );
        this.renderPieChart();
      } catch (error) {
        console.error("Error fetching service counts:", error);
      }
    },

    calculateTotalQueueCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === "yearly") {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === "monthly") {
        // Calculate the start of the current month
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      } else if (interval === "weekly") {
        // Calculate the last 7 days from the current date
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredQueueData = this.queueData.filter((entry) => {
        const bookingDate = new Date(entry.booking_date);
        return bookingDate >= startDate && bookingDate <= endDate;
      });

      return filteredQueueData.length;
    },

    calculateTotalUnAppQueueCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === "yearly") {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === "monthly") {
        // Calculate the start of the current month
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      } else if (interval === "weekly") {
        // Calculate the last 7 days from the current date
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredUnAppQueueData = this.unAppQueueData.filter((entry) => {
        const bookingDate = new Date(entry.booking_date);
        return bookingDate >= startDate && bookingDate <= endDate;
      });

      return filteredUnAppQueueData.length;
    },

    calculateTotalStudentQueueCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === "yearly") {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === "monthly") {
        // Calculate the start of the current month
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      } else if (interval === "weekly") {
        // Calculate the last 7 days from the current date
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredStudentQueueData = this.studentQueueData.filter((entry) => {
        const bookingDate = new Date(entry.booking_date);
        return bookingDate >= startDate && bookingDate <= endDate;
      });

      return filteredStudentQueueData.length;
    },

    calculateTotalUnAppStudentQueueCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === "yearly") {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === "monthly") {
        // Calculate the start of the current month
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      } else if (interval === "weekly") {
        // Calculate the last 7 days from the current date
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredUnAppStudentQueueData = this.studentQueueUnAppData.filter((entry) => {
        const bookingDate = new Date(entry.booking_date);
        return bookingDate >= startDate && bookingDate <= endDate;
      });

      return filteredUnAppStudentQueueData.length;
    },

    calculateTotalRegisterCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === "yearly") {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === "monthly") {
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      } else if (interval === "weekly") {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 6);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredRegisterData = this.registerData.filter((entry) => {
        const timestamp = new Date(entry.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      });

      return filteredRegisterData.length;
    },

    calculateTotalUnAppRegisterCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === "yearly") {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === "monthly") {
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      } else if (interval === "weekly") {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 6);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredUnAppRegisterData = this.registerUnAppData.filter((entry) => {
        const timestamp = new Date(entry.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      });

      return filteredUnAppRegisterData.length;
    },

    calculateTotalStudentCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === "yearly") {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === "monthly") {
        startDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
        endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      } else if (interval === "weekly") {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 6);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredStudentData = this.studentData.filter((entry) => {
        const timestamp = new Date(entry.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      });

      return filteredStudentData.length;
    },
  },
};
</script>
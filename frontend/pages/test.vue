<template>
  <div>
    <Navbar />
    <v-container>
      <v-card class="font-display" max-width="400" elevation="0" style="margin-left: 50px">
        <v-list-item>
          <v-icon style="padding-right: 10px"> mdi-account </v-icon>
          ยินดีต้อนรับเข้าสู่ระบบ, ชนกันต์ ฐานทัพ
        </v-list-item>
      </v-card>
      <v-row style="margin-top: 10px">
        <v-col>
          <v-sheet class="font-display" style="
              border-radius: 10px;
              height: 142px;
              width: 393px;
              margin-left: 50px;
            " color="white" elevation="0" height="100" :rounded="10" width="100">
            <v-container style="padding-top: 22px; padding-left: 63px">
              <v-col>
                <v-row>
                  <h1>คำขอลงทะเบียน</h1>
                </v-row>
                <v-row>
                  <h1 style="color: #f17223">{{ totalRegisterCount }}</h1>
                  <p style="margin-top: 17px; margin-left: 20px">คำขอ</p>
                </v-row>
              </v-col>
            </v-container>
          </v-sheet>
          <v-sheet class="font-display" style="
              border-radius: 10px;
              height: auto;
              width: 393px;
              margin-top: 30px;
              margin-left: 50px;
            " color="white" :rounded="10" elevation="0">
            <v-container style="padding-top: 22px; padding-left: 63px">
              <v-col>
                <v-row>
                  <h1>คำขอนัดหมาย</h1>
                </v-row>
                <v-row>
                  <h1 style="color: #f17223">{{ totalQueueCount }}</h1>
                  <p style="margin-top: 17px; margin-left: 20px">คำขอ</p>
                </v-row>
              </v-col>
              <v-col>
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
            </v-container>
          </v-sheet>
        </v-col>
        <v-col>
          <v-container class="font-display">
            <v-card>
              <v-btn-toggle v-model="selectedInterval">
                <v-btn @click="changeInterval('yearly')">Yearly</v-btn>
                <v-btn @click="changeInterval('monthly')">Monthly</v-btn>
                <v-btn @click="changeInterval('weekly')">Last 7 days</v-btn>
              </v-btn-toggle>
              <v-card-title>
                <h1>Queue Data Line Graph</h1>
              </v-card-title>
              <v-card-text>
                <div v-if="isLoading">
                  Loading...
                </div>
                <canvas ref="lineChartCanvas" v-else></canvas>
              </v-card-text>
            </v-card>
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
import Chart from 'chart.js';

export default {
  data() {
    return {
      queueData: [],
      registerData: [],
      totalQueueCount: 0,
      totalRegisterCount: 0,
      serviceCounts: {
        ตรวจสุขภาพ: 0,
        ศูนย์วัคซีน: 0,
        เวชศาสตร์ชะลอวัย: 0,
      },
      selectedInterval: 'monthly',
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      try {
        const response = await this.$axios.get("/qmanagement/api/appbookings");
        this.queueData = response.data.response;

        const registerResponse = await this.$axios.get("/qmanagement/api/oldusers");
        this.registerData = registerResponse.data.response;

        this.totalQueueCount = this.calculateTotalQueueCount('monthly');
        this.totalRegisterCount = this.calculateTotalRegisterCount('monthly');

        this.renderLineChart();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },

    changeInterval(interval) {
      this.selectedInterval = interval;
      this.fetchServiceCounts(interval);
      this.totalRegisterCount = this.calculateTotalRegisterCount(interval);
      this.totalQueueCount = this.calculateTotalQueueCount(interval);
      this.renderLineChart();
    },

    renderLineChart() {
      const ctx = this.$refs.lineChartCanvas.getContext('2d');

      let queueData, registerData, labels;

      if (this.selectedInterval === 'yearly') {
        queueData = this.calculateQueueMonthlyCounts(this.queueData);
        registerData = this.calculateRegisterMonthlyCounts(this.registerData);
        labels = this.getAllMonths();
      } else if (this.selectedInterval === 'monthly') {
        queueData = this.calculateQueueDailyCounts(this.queueData);
        registerData = this.calculateRegisterDailyCounts(this.registerData);
        labels = this.getAllDays();
      } else if (this.selectedInterval === 'weekly') {
        queueData = this.calculateQueueWeeklyCounts(this.queueData);
        registerData = this.calculateRegisterWeeklyCounts(this.registerData);
        labels = this.getLastSevenDays();
      }

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Queue Numbers',
              data: labels.map(label => queueData[label] || 0),
              borderColor: 'blue',
              fill: false,
            },
            {
              label: 'Register Numbers',
              data: labels.map(label => registerData[label] || 0),
              borderColor: 'green',
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'category',
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },

    calculateQueueMonthlyCounts() {
      const queueData = {};

      this.queueData.forEach(entry => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const key = `${year}-${month.toString().padStart(2, '0')}`;

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

      this.registerData.forEach(entry => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(' ')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const key = `${year}-${month.toString().padStart(2, '0')}`;

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

      this.queueData.forEach(entry => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const day = bookingDate.getDate();
        const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

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

      this.registerData.forEach(entry => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(' ')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

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

      this.queueData.forEach(entry => {
        const bookingDate = new Date(entry.booking_date);
        const year = bookingDate.getFullYear();
        const month = bookingDate.getMonth() + 1;
        const day = bookingDate.getDate();
        const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

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

      this.registerData.forEach(entry => {
        const timestamp = entry.timestamp;
        const dateParts = timestamp.split(' ')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const day = parseInt(dateParts[2]);
        const key = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

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
        labels.push(`2023-${i.toString().padStart(2, '0')}`);
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
        const formattedDay = day.toString().padStart(2, '0');
        daysArray.push(`${year}-${month.toString().padStart(2, '0')}-${formattedDay}`);
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

        labels.push(`${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`);
      }

      return labels;
    },

    // formatMonth(month) {
    //   const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //   return monthNames[parseInt(month.split('-')[1]) - 1];
    // },

    async fetchServiceCounts(interval) {
      try {
        const response = await this.$axios.get("/qmanagement/api/totalcount");

        console.log("API Response:", response);

        if (!response.data.response) {
          console.error("API response does not contain 'response' field.");
          return;
        }

        const serviceCounts = {};

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
      } catch (error) {
        console.error("Error fetching service counts:", error);
      }
    },

    calculateTotalQueueCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === 'yearly') {
        startDate = new Date(currentDate.getFullYear(), 0, 1); 
        endDate = new Date(currentDate.getFullYear(), 11, 31); 
      } else if (interval === 'monthly') {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 6); 
        startDate = sevenDaysAgo;
        endDate = currentDate; 
      } else if (interval === 'weekly') {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 6); 
        startDate = sevenDaysAgo;
        endDate = currentDate; 
      }

      const filteredQueueData = this.queueData.filter(entry => {
        const bookingDate = new Date(entry.booking_date);
        return bookingDate >= startDate && bookingDate <= endDate;
      });

      return filteredQueueData.length;
    },

    calculateTotalRegisterCount(interval) {
      const currentDate = new Date();
      let startDate, endDate;

      if (interval === 'yearly') {
        startDate = new Date(currentDate.getFullYear(), 0, 1);
        endDate = new Date(currentDate.getFullYear(), 11, 31);
      } else if (interval === 'monthly') {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 6);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      } else if (interval === 'weekly') {
        const sevenDaysAgo = new Date(currentDate);
        sevenDaysAgo.setDate(currentDate.getDate() - 6);
        startDate = sevenDaysAgo;
        endDate = currentDate;
      }

      const filteredRegisterData = this.registerData.filter(entry => {
        const timestamp = new Date(entry.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      });

      return filteredRegisterData.length;
    },
  },
};
</script>
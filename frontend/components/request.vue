<template>
  <div class="font-display">
    <v-data-table v-model="selected" :headers="headers" :items="userRequest" :single-select="singleSelect" item-key="name"
      :search="search" show-select class="elevation-0 custom-td">
      <template v-slot:top>
        <v-toolbar flat class="font-display">
          <v-dialog max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-row class="justify-end">

                <v-col cols="4">
                  <v-row class="pa-6">
                    <v-row class="mt-3">
                      <v-text-field v-model="date" type="date"></v-text-field>
                    </v-row>
                  </v-row>
                </v-col>

                <v-col cols="4">
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
          <v-btn class="mr-2" elevation="0" outlined color="primary" @click="approveAll">อนุมัติทั้งหมด</v-btn>
          <v-btn elevation="0" outlined color="error" @click="rejectAll">ปฏิเสธทั้งหมด</v-btn>
        </v-toolbar>
      </template>

      <template v-slot:item.no="{ item }">
        <td>{{ item.no }}
        </td>
      </template>
      <template v-slot:item.email="{ item }">
        <td class="custom-td">
          {{ item.email }}
          <v-icon style="margin-left: 10px" small class="mr-2" @click="copyText(item.email)">
            mdi-content-copy
          </v-icon>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            {{ text }}

            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                ปิด
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar v-model="successSnackbar" :timeout="timeout">
            อนุมัติคำขอลงทะเบียนสำเร็จ!
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="successSnackbar = false">
                ปิด
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar v-model="rejectSnackbar" :timeout="timeout">
            ปฏิเสธคำขอลงทะเบียนสำเร็จ!
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="rejectSnackbar = false">
                ปิด
              </v-btn>
            </template>
          </v-snackbar>
        </td>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip bottom v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="primary" elevation="0" v-bind="attrs" v-on="on" @click="
              approve(item.HN_code)
              ">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <span>อนุมัติ</span>
        </v-tooltip>


        <v-tooltip bottom v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon color="error" v-on="on" v-bind="attrs" @click=" reject(item.HN_code)">
              <!-- <img src="../images/reject.png" alt="My Custom Icon" width="20px" height="20px" /> -->
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>ปฏิเสธ</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon elevation="0" v-bind="attrs" v-on="on" @click="
              viewInfo(item.HN_code)
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
        <template v-slot:default="dialog">
          <!-- <v-card> -->
            <div v-for="item in userData" :key="item" style="display: flex; flex-direction: column">
              <v-card>
              <v-container style="padding: 50px" class="font-display">
                <v-row no-gutters>
                  <v-col style="padding-bottom: 10px">
                    <h3 class="font-display" style="display: flex; align-items: center; margin-bottom: 0">
                      <span style="flex-grow: 1">ข้อมูลส่วนตัว</span>
                      <v-btn icon @click="dialogInfo = false"><v-icon>mdi-close</v-icon></v-btn>
                    </h3>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>ชื่อ-สกุล</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.name }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>เลขประจำตัวประชาชน</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.citizen_num }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>เพศ</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.gender }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>กรุ๊ปเลือด</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.blood_type }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>เกิดวันที่</p>
                  </v-col>
                  <v-col>
                    <p>{{ formatDate(item.birthdate) }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>สัญชาติ</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.nationality }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>สถานภาพ</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.marriage_status }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>อาชีพ</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.occupation }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col style="padding-bottom: 10px">
                    <h3>ข้อมูลติดต่อ</h3>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>ที่อยู่ตามบัตรประจำตัวประชาชน</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.address }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>เบอร์โทรศัพท์</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.tel }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>อีเมล</p>
                  </v-col>
                  <v-col>
                    <div class="text-container">
                      <p>{{ item.email }}</p>

                      <v-icon style="margin-left: 10px; margin-bottom: 10px;" small class="mr-2"
                        @click="copyText(item.email)">
                        mdi-content-copy
                      </v-icon>
                    </div>

                    <v-snackbar v-model="snackbar" :timeout="timeout">
                      {{ text }}

                      <template v-slot:action="{ attrs }">
                        <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                          ปิด
                        </v-btn>
                      </template>
                    </v-snackbar>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col style="padding-bottom: 10px">
                    <h3>ข้อมูลอื่นๆ</h3>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>ประวัติการแพ้ยา/อาหาร</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.allergy }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.emergency_tel }}</p>
                  </v-col>
                </v-row>

                <v-row no-gutters>
                  <v-col>
                    <p>ชื่อผู้ติดต่อฉุกเฉิน</p>
                  </v-col>
                  <v-col>
                    <p>{{ item.emergency_contact }}</p>
                  </v-col>
                </v-row>
              </v-container>
            <!-- </div> -->
            <v-card-actions class="justify-end font-display">
              <v-btn text @click="rejectDialog(item.HN_code)" color="error" v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">ปฏิเสธ</v-btn>
              <v-btn text @click="approveDialog(item.HN_code)" color="green" v-if="item.status_name !== 'อนุมัติ' && item.status_name !== 'ปฏิเสธ'">อนุมัติ</v-btn>
            </v-card-actions>
          </v-card>
        </div>
        </template>
      </v-dialog>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      search: "",
      statusFilterValue: "",
      text: `คัดลอกอีเมลสำเร็จ`,
      snackbar: false,
      successSnackbar: false,
      rejectSnackbar: false,
      dialogInfo: false,
      timeout: 2000,
      dialog: false,
      singleSelect: false,
      selected: [],
      headers: [
        { text: "ลำดับ", align: "start", value: "no" },
        { text: "ชื่อ", sortable: false, value: "name" },
        { text: "อีเมล", value: "email", sortable: false },
        { text: "วันที่", value: "formatted_date", filter: this.dateFilter },
        { text: "สถานะคำขอ", value: "status_name", filter: this.statusFilter },
        { text: "การกระทำ", value: "actions", sortable: false },
      ],
      userRequest: [],
      userData: [],
      statusList: [
        { text: "ทั้งหมด", value: null },
        { text: "อนุมัติ", value: "อนุมัติ" },
        { text: "รออนุมัติ", value: "รออนุมัติ" },
        { text: "ปฏิเสธ", value: "ปฏิเสธ" },
      ],
    };
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      console.log("initialize")
      const res = await this.$axios.get("/qmanagement/api/users");
      this.userRequest = res.data.response;
      this.userRequest = res.data.response.map((user, index) => {
        return { ...user, no: index + 1 };
      });
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      return formattedDate;
    },
    copyText(email) {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          console.log("Text copied to clipboard!");
          this.snackbar = true;
        })
        .catch((error) => {
          console.error("Failed to copy text:", error);
        });
    },
    async approve(HN_code) {
      try {
        await this.$axios.put(`/qmanagement/api/user/${HN_code}`, {
          status_ID: 1
        });
        console.log(`User ${HN_code} approved successfully`);
        this.successSnackbar = true;
      } catch (error) {
        console.error(`Failed to approve user ${HN_code}:`, error);
      }
      this.selected = [];
      this.initialize();
    },
    async reject(HN_code) {
      try {
        await this.$axios.put(`/qmanagement/api/user/${HN_code}`, {
          status_ID: 3
        });
        console.log(`User ${HN_code} rejected successfully`);
        this.rejectSnackbar = true;
      } catch (error) {
        console.error(`Failed to rejected user ${HN_code}:`, error);
      }
      this.selected = [];
      this.initialize();
    },
    async approveDialog(HN_code) {
      try {
        await this.$axios.put(`/qmanagement/api/user/${HN_code}`, {
          status_ID: 1
        });
        console.log(`User ${HN_code} approved successfully`);
        this.successSnackbar = true;
      } catch (error) {
        console.error(`Failed to approve user ${HN_code}:`, error);
      }
      this.selected = [];
      this.dialogInfo = false;
      this.initialize();
    },
    async rejectDialog(HN_code) {
      try {
        await this.$axios.put(`/qmanagement/api/user/${HN_code}`, {
          status_ID: 3
        });
        console.log(`User ${HN_code} rejected successfully`);
        this.rejectSnackbar = true;
      } catch (error) {
        console.error(`Failed to reject user ${HN_code}:`, error);
      }
      this.selected = [];
      this.dialogInfo = false;
      this.initialize();
    },
    async approveAll() {
      for (const user of this.selected) {
        try {
          await this.$axios.put(`/qmanagement/api/user/${user.HN_code}`, {
            status_ID: 1
          });
          console.log(`User ${user.HN_code} approved successfully`);
          this.successSnackbar = true;
        } catch (error) {
          console.error(`Failed to approve user ${user.HN_code}:`, error);
        }
      }
      this.selected = [];
      this.initialize();
    },

    async rejectAll() {
      for (const user of this.selected) {
        try {
          await this.$axios.put(`/qmanagement/api/user/${user.HN_code}`, {
            status_ID: 3
          });
          console.log(`User ${user.HN_code} rejected successfully`);
          this.rejectSnackbar = true;
        } catch (error) {
          console.error(`Failed to rejected user ${user.HN_code}:`, error);
        }
      }
      this.selected = [];
      this.initialize();
    },

    async viewInfo(HN_code) {
      try {
        const res = await this.$axios.get("/qmanagement/api/user", {
          params: {
            hnCode: HN_code,
          },
        });
        this.userData = res.data.response;
        this.dialogInfo = true;
      } catch (error) {
        console.error(error);
      }
    },

    dateFilter(value) {
      if (!this.date) {
        return true;
      } else {
        return value === this.date;
      }
    },

    statusFilter(value) {
      if (!this.statusFilterValue) {
        return true;
      }
      return value === this.statusFilterValue;
    },
  },
};
</script>

<style scoped>
.font-display {
  font-family: "Kanit";
}

.custom-td {}

.text-container {
  display: flex;
  align-items: center;
}
</style>

<template>
  <div>
    <v-container class="font-display">
      <v-sheet class="box" style="
          height: auto;
          width: auto;
          margin: 25px 0px 33px;
          padding-top: 20px;
          padding-bottom: 50px;
          border-radius: 10px;
        ">

        <v-alert v-model="showErrorAlert" type="error" dismissible>
          ไม่สามารถลบข้อมูลผู้ใช้รายนี้ได้ เนื่องจากผู้ใช้รายนี้ยังมีรายการจองคิว
        </v-alert>

        <v-alert v-model="dataUpToDateAlert" type="info" dismissible>
          ข้อมูลนักศึกษาเป็นข้อมูลล่าสุดแล้ว
        </v-alert>

        <v-alert v-model="uploadSuccess" type="success" dismissible>
          {{ successMessage }}
        </v-alert>

        <v-dialog v-model="upload" max-width="500px">
          <v-card class="font-display">
            <v-card-title>
              <span>อัพโหลดไฟล์</span>
              <v-spacer></v-spacer>
            </v-card-title>
            <v-container>
              <input type="file" @change="handleFileUpload" accept=".xlsx" />

            </v-container>
            <v-card-actions class="justify-end font-display">
              <v-btn color="error" text @click="upload = false">
                ปิด
              </v-btn>
              <v-btn :loading="loading" :disabled="loading" text @click="uploadFile" color="success">อัพโหลด<v-icon right
                  dark>
                  mdi-cloud-upload
                </v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row no-gutters style="padding-left: 10px; ">
          <v-toolbar flat class="font-display">
            <v-dialog max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-row class="justify-end">
                  <v-col cols="3">
                    <v-row class="pa-6">
                      <v-row class="mt-3">
                        <v-select :items="yearList" v-model="yearFilterValue" label="ปีการศึกษา"></v-select>
                      </v-row>
                    </v-row>
                  </v-col>

                  <v-col cols="3">
                  <v-row class="pa-6">
                    <v-row class="mt-3">
                      <v-select :items="statusList" v-model="statusFilterValue" label="สถานะ"></v-select>
                    </v-row>
                  </v-row>
                </v-col>

                  <v-col cols="6">
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
          <v-col cols="auto">
            <v-btn color="blue-grey" class=" white--text" @click="upload = true" style="margin-left: 15px; ">
              อัพโหลด
              <v-icon right dark> mdi-cloud-upload </v-icon>
            </v-btn>
            <v-col>

              <v-icon>
                mdi-information
              </v-icon>
              <a href="https://drive.google.com/drive/folders/1ux-jQlFPH5sdujpXSULZooXcc7cctdvX?usp=sharing" download
                class="custom-link">ฟอร์มมาตรฐาน</a>
            </v-col>
          </v-col>
        </v-row>
        <v-spacer></v-spacer>

        <v-data-table :headers="headers" :items="processedUserData" :search="search" sort-by="calories" class="data-table"
          style="width: 90%">
          <template v-slot:top>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="font-display"
                  style="justify-content: center">ต้องการลบผู้ใช้รายนี้หรือไม่</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="font-display" color="#f17223" style="padding-left: 40px; padding-right: 40px" outlined
                    rounded @click="closeDelete">ยกเลิก</v-btn>
                  <v-btn class="font-display" color="#f17223" rounded depressed style="
                      padding-left: 40px;
                      padding-right: 40px;
                      color: white;
                    " @click="deleteItemConfirm(itemToDelete.STD_ID)">ยืนยัน</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <v-dialog max-width="600">
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on"><v-icon color="D9D9D9">mdi-file-document-outline</v-icon></v-btn>
              </template>
              <template v-slot:default="dialog">
                <v-card>
                  <div>
                    <v-container style="padding: 50px" class="font-display">
                      <v-row style="margin-bottom: 10px; " no-gutters>
                        <v-col>
                          <h4 class="font-display" style="display: flex; align-items: center; margin-bottom: 0">
                            <span style="flex-grow: 1">ข้อมูลส่วนตัว</span>
                            <v-btn icon @click="dialog.value = false"><v-icon>mdi-close</v-icon></v-btn>
                          </h4>
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
                          <p>{{ item.citizen_num || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>เพศ</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.gender || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>กรุ๊ปเลือด</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.blood_type || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>เกิดวันที่</p>
                        </v-col>
                        <v-col>
                          <p>{{ formatDate(item.birthdate) || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>สัญชาติ</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.nationality || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>สถานภาพ</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.marriage_status || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>อาชีพ</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.occupation || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>ประวัติการแพ้ยา/อาหาร</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.allergy || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row style="margin-bottom: 10px; margin-top: 10px;" no-gutters>
                        <v-col>
                          <h4>ข้อมูลติดต่อ</h4>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>อีเมล</p>
                        </v-col>

                        <v-col>
                          <div class="text-container">
                            <p>{{ item.email || '-' }}</p>

                            <v-icon style="margin-left: 10px; margin-bottom: 10px" small class="mr-2"
                              @click="copyText(item.email)">
                              mdi-content-copy
                            </v-icon>
                          </div>

                          <v-snackbar v-model="snackbar" :timeout="timeout">
                            {{ text }}

                            <template v-slot:action="{ attrs }">
                              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                                Close
                              </v-btn>
                            </template>
                          </v-snackbar>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>เบอร์โทรศัพท์</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.tel || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row style="margin-bottom: 10px; margin-top: 10px;" no-gutters>
                        <v-col>
                          <h4>ข้อมูลผู้ติดต่อฉุกเฉิน</h4>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>ชื่อผู้ติดต่อฉุกเฉิน</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.emergency_contact || '-' }}</p>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.emergency_tel || '-' }}</p>
                        </v-col>
                      </v-row>



                      <v-row style="margin-bottom: 10px; margin-top: 10px;" no-gutters>
                        <v-col>
                          <h4>ที่อยู่</h4>
                        </v-col>
                      </v-row>

                      <v-row no-gutters>
                        <v-col>
                          <p>ที่อยู่ตามบัตรประจำตัวประชาชน</p>
                        </v-col>
                        <v-col>
                          <p>{{ item.address || '-' }}</p>
                        </v-col>
                      </v-row>
                    </v-container>
                  </div>

                  <!-- <v-card-actions class="justify-end font-display">
                    <v-btn text @click="dialog.value = false" color="error">ปิด</v-btn>
                  </v-card-actions> -->
                </v-card>
              </template>
            </v-dialog>

            <v-btn icon style="
                margin-right: 20px;
                padding-left: 20px;
                padding-right: 20px;
              " @click="deleteItem(item)"><v-icon color="error">mdi-delete</v-icon></v-btn>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
          </template>
        </v-data-table>
      </v-sheet>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      statusFilterValue: "",
      yearFilterValue: "",
      loading: false,
      loader: null,
      upload: false,
      showErrorAlert: false,
      dataUpToDateAlert: false,
      uploadSuccess: false,
      successMessage: "",
      file: null,
      // files: [],
      text: `Copy email success`,
      snackbar: false,
      timeout: 2000,
      dialogDelete: false,
      headers: [
        {
          text: "ปีการศึกษา",
          align: "start",
          sortable: false,
          value: "school_year",
          filter: this.yearFilter
        },
        {
          text: "Student ID",
          align: "start",
          sortable: false,
          value: "STD_ID",
        },
        { text: "ชื่อ-นามสกุล", value: "name" },
        { text: "สถานะผู้ใช้", value: "status_name", filter: this.statusFilter },
        { text: "การกระทำ", value: "actions", sortable: false },
      ],
      userdata: [],
      statusList: [
        { text: "ทั้งหมด", value: null },
        { text: "อนุมัติ", value: "อนุมัติ" },
        { text: "รออนุมัติ", value: "รออนุมัติ" },
        { text: "ปฏิเสธ", value: "ปฏิเสธ" },
      ],
      yearList: [],
    };
  },

  computed: {
    processedUserData() {
      return this.userdata.map(item => ({
        ...item,
        name: item.name || '-',
      }));
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      console.log("initialize");
      const res = await this.$axios.get("/qmanagement/api/appstudents");
      this.userdata = res.data.response;

      const response = await this.$axios.get("/qmanagement/api/schoolyear");
      const schoolYears = response.data.response.map(item => item.school_year);
      this.yearList = [{ text: "ทั้งหมด", value: null }, ...schoolYears];
      console.log(response);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("th-TH", {
        year: "numeric",
        month: "long",
        day: "numeric",
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

    deleteItem(item) {
      this.dialogDelete = true;
      this.itemToDelete = item;
    },

    deleteItemConfirm(stdId) {
      console.log(typeof stdId);
      this.closeDelete();
      this.fetchUpdateData(stdId);
    },

    async fetchUpdateData(stdId) {
      try {
        const res = await this.$axios.delete("/qmanagement/api/student", {
          params: {
            stdId: stdId,
          },
        });
        console.log(res);
        this.initialize();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.showErrorAlert = true;
          console.log("showErrorAlert set to true");
        } else {
          console.error('Error:', error);
        }
      }
    },

    statusFilter(value) {
      if (!this.statusFilterValue) {
        return true;
      }
      return value === this.statusFilterValue;
    },

    yearFilter(value) {
      if (!this.yearFilterValue) {
        return true;
      }
      return value === this.yearFilterValue;
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      const formData = new FormData();
      formData.append('excelFile', this.file);

      try {
        console.log('Before axios.post');
        const response = await this.$axios.post('/qmanagement/api/uploadfile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('After axios.post', response);

        if (response.data.message === 'Data already up to date') {
          this.upload = false;
          this.dataUpToDateAlert = true;
          console.log("dataUpToDateAlert set to true");
        } else {
          this.upload = false;
          this.uploadSuccess = true;
          this.successMessage = response.data.message;
          console.log("uploadSuccess set to true");
        }
      } catch (error) {
        alert('An error occurred');
        console.error('Error:', error);
      }
    },
  },
};
</script>

<style scoped>
.custom-link {
  font-size: 15px;
  color: gray;
  /* Replace with your desired color */
  text-decoration: none;
  /* This removes the underline */
}

/* Optional: Add hover effect */
.custom-link:hover {
  text-decoration: underline;
  /* or other hover effect */
}

.btn-custom {
  color: white !important;
  background: linear-gradient(to right,
      rgba(241, 114, 35, 100%),
      rgba(241, 114, 35, 75%));
}

.font-display {
  font-family: "Kanit";
}

.fill-height {
  height: 100%;
}

.search-bar {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
}

.data-table {
  margin: 0 auto;
  text-align: left;
}

.text-container {
  display: flex;
  align-items: center;
}

.custom-file-input {
  display: inline-block;
  cursor: pointer;
}

.file-input-label {
  background-color: #673ab7;
  color: #fff;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.file-input-label i {
  margin-right: 8px;
}
</style>
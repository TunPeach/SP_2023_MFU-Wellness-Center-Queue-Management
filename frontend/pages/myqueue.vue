<template>
  <div>
    <NavbarUser />
    <v-container class="font-display">
      <v-sheet class="box" style="
          height: auto;
          width: auto;
          margin: 25px 100px 33px;
          padding-top: 20px;
          padding-bottom: 50px;
        " height="auto" width="auto">
        <v-card-title>
          คิวของฉัน
          <v-spacer></v-spacer>
        </v-card-title>
        <v-text-field class="search-bar" style="width:90%" v-model="search" append-icon="mdi-magnify" label="ค้นหา"
          single-line hide-details></v-text-field>
        <v-spacer></v-spacer>
        <v-alert class="alert " style="width: 90%" border="left" color="rgba(241, 114, 35, 100%)" dark>
          หมายเหตุ: เมื่อการนัดหมายได้รับการยืนยันแล้ว
          กรุณาดาวน์โหลดใบนัดที่ปุ่มดาวน์โหลด
        </v-alert>
        <v-data-table :headers="headers" :items="booking" :search="search" sort-by="calories" class="data-table"
          style="width:90%">
          <template v-slot:top>
            <div id="slip-dialog">
              <v-dialog v-model="dialogSlip" max-width="500px">
                <v-card class="font-display">
                  <v-card-title class="text-h5" style="display: flex; align-items: center; margin-bottom: 0;">
                    <img class="images" height="70px" :src="getImageUrl(defaultImage)" style="margin-right: 50px;" />
                    <span style="flex-grow: 1;">ใบนัด</span>
                    <v-btn icon @click="dialogSlip = false"><v-icon>mdi-close</v-icon></v-btn>
                  </v-card-title>
                  <v-card-text>
                    <div v-for="item in groupedSlip" :key="item.booking_ID"
                      style="display: flex; flex-direction: column;">
                      <div style="display: flex; align-items: center;">
                        <span style="font-weight: bold;">HN.</span>
                        <span style="margin-left: 10px;">{{ item.HN_code }}</span>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <span style="font-weight: bold;">ชื่อ-สกุล</span>
                        <span style="margin-left: 10px;">{{ item.name }}</span>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <span style="font-weight: bold;">นัดวันที่</span>
                        <span style="margin-left: 10px;">{{ item.booking_date }}</span>
                        <span style="font-weight: bold; margin-left: 10px;">เวลา</span>
                        <span style="margin-left: 10px;">{{ item.booking_time }}</span>
                      </div>
                      <div style="display: flex; align-items: center;">
                        <span style="font-weight: bold;">ประเภทบริการ</span>
                        <span style="margin-left: 10px;">{{ item.type_name }}</span>
                      </div>
                      <span style="font-weight: bold;">บริการหลัก</span>
                      <div style="display: flex; align-items: center;">
                        <span style="margin-left: 10px;"> {{ item.service_name }}</span>
                      </div>
                      <div v-if="item.services" style="display: flex; flex-direction: column;">
                        <div v-for="service in item.services" :key="service" style="display: flex; align-items: center;">
                          <span style="margin-left: 10px;">{{ service }}</span>
                        </div>
                      </div>
                      <span style="font-weight: bold;">บริการเสริม</span>
                      <div v-for="subservice in item.subservice_names" :key="subservice"
                        style="display: flex; align-items: center;">
                        <span style="margin-left: 10px;">{{ subservice }}</span>
                      </div>
                      <div style="display: flex;  flex-direction: column;">
                        <span style="font-weight: bold;">หมายเหตุ</span>
                        <span>1. กรุณานำบัตรประจำตัวประชาชนมาด้วย</span>
                        <span>2. กรุณามาตามเวลานัด
                          หากไม่ตรงเวลาต้องรอตามเวลานัดหรือนัดใหม่</span>
                      </div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-dialog>
            </div>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5" style="justify-content: center;">ต้องการลบรายการจองนี้หรือไม่</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn class="font-display" color="#f17223" style="padding-left: 40px; padding-right: 40px;" outlined
                    rounded @click="closeDelete">ยกเลิก</v-btn>
                  <v-btn class="font-display" color="#f17223" rounded depressed
                    style="padding-left: 40px; padding-right: 40px; color: white;"
                    @click="deleteItemConfirm(itemToDelete.booking_date, itemToDelete.booking_time)">ยืนยัน</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small style="margin-right: 5px;" @click="viewSlip(item.booking_date, item.booking_time)">
              mdi-file-document-outline
            </v-icon>
            <v-icon 
    small 
    :style="{ color: item.status_name === 'รออนุมัติ' || item.status_name === 'ปฏิเสธ' ? 'grey' : 'green' }" 
    style="margin-right: 5px;" 
    :disabled="item.status_name === 'รออนุมัติ' || item.status_name === 'ปฏิเสธ'"
    @click="downloadSlip(item.booking_date, item.booking_time)">
    mdi-download
</v-icon>

            <v-icon small color="red" style="margin-right: 5px;" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="initialize">
              Reset
            </v-btn>
          </template>
        </v-data-table>
      </v-sheet>
    </v-container>
  </div>
</template>


<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../assets/custom-fonts.js'

export default {
  middleware: 'authUser',
  data: () => ({
    defaultImage: "wellnesslogo.png",
    search: '',
    dialogSlip: false,
    dialogDelete: false,
    headers: [
      {
        text: 'บริการ',
        align: 'start',
        sortable: false,
        value: 'type_name',
      },
      { text: 'ปปปป/ดด/วว', value: 'booking_date' },
      { text: 'เวลา', value: 'booking_time' },
      { text: 'สถานะ', value: 'status_name' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    booking: [],
    slip: [],
    groupedSlip: [],
  }),

  watch: {
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize(),
      this.fetchData();
  },

  computed: {
    hnCode() {
      return window.sessionStorage.getItem("hnCode");
    },
  },

  methods: {
    async initialize() {
      console.log("initialize")
      const res = await this.$axios.get("/qmanagement/api/booking", {
        params: {
          hnCode: this.hnCode,
        },
      });
      this.booking = res.data.response;
    },
    getImageUrl(fileName) {
      return require(`@/upload/${fileName}`);
    },
    async fetchData(date, time) {
      const res = await this.$axios.get("/qmanagement/api/slip", {
        params: {
          date,
          time,
          hnCode: this.hnCode,
        },
      })
      console.log(typeof this.hnCode);
      this.slip = res.data.response;
      const groups = {};
      this.slip.forEach(item => {
        if (item.subservice_name) {
          const key = `${item.HN_code}_${item.name}_${item.booking_date}_${item.booking_time}_${item.type_name}`;
          if (!groups[key]) {
            groups[key] = {
              HN_code: item.HN_code,
              name: item.name,
              booking_date: new Date(item.booking_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
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
        } else if (item.service_name && !item.subservice_name) {// item does not have a subservice_name
          if (!groups[item.HN_code]) {
            groups[item.HN_code] = {
              HN_code: item.HN_code,
              name: item.name,
              booking_date: new Date(item.booking_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }),
              booking_time: item.booking_time,
              type_name: item.type_name,
              services: [],
              subservice_names: ['-'],
            };
          }
          groups[item.HN_code].services.push(item.service_name);
        }
      });
      this.groupedSlip = Object.values(groups);
      console.log(this.groupedSlip);
    },
    viewSlip(date, time) {
      this.dialogSlip = true;
      this.fetchData(date, time);
    },

    async getImageBase64(imageUrl) {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    },

    async downloadSlip(date, time) {
      const res = await this.$axios.get('/qmanagement/api/slip', {
        params: {
          date,
          time,
          hnCode: this.hnCode,
        },
      });
      this.slip = res.data.response;

      const groups = {};
      this.slip.forEach((item) => {
        if (item.subservice_name) {
          const key = `${item.HN_code}_${item.name}_${item.booking_date}_${item.booking_time}_${item.type_name}`;
          if (!groups[key]) {
            groups[key] = {
              HN_code: item.HN_code,
              name: item.name,
              booking_date: new Date(item.booking_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
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
              booking_date: new Date(item.booking_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }),
              booking_time: item.booking_time,
              type_name: item.type_name,
              services: [],
              subservice_names: ['-'],
            };
          }
          groups[item.HN_code].services.push(item.service_name);
        }
      });
      const groupedSlip = Object.values(groups);

      const imageUrl = this.getImageUrl(this.defaultImage);
      const imageBase64 = await this.getImageBase64(imageUrl);
      const docDefinition = {
        content: [],
        defaultStyle: {
          font: 'Kanit'
        }
      };

      pdfMake.vfs = pdfFonts.pdfMake.vfs
      pdfMake.fonts = {
        Roboto: {
          normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
          bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
          italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
          bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        },
        // Kanit Font
        Kanit: {
          normal: 'Kanit-Regular.ttf',
        }
      }

      // Loop through the grouped slip data and add it to the PDF
      groupedSlip.forEach((item) => {
        docDefinition.content.push(
          {
            image: imageBase64,
            width: 150,
            height: 70,
          },
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 5,
                x2: 520,
                y2: 5,
                lineWidth: 1,
                lineColor: '#000000'
              }
            ]
          },
          {
            text: 'ใบนัด',
            fontSize: 20,
            margin: [10, 25, 0, 20],
            alignment: 'center'
          },
          {
            text: `HN: ${item.HN_code}`,
          },
          {
            text: `ชื่อ-นามสกุล: ${item.name}`,
          },
          {
            text: `นัดวันที่: ${item.booking_date}`,
          },
          {
            text: `เวลา: ${item.booking_time}`,
          },
          {
            text: `ประเภทบริการ: ${item.type_name}`,
          },
          {
            text: 'บริการหลัก:',
          },
          {
            ul: item.services,
          },
          {
            text: 'บริการเสริม:',
          },
          {
            ul: item.subservice_names,
          },
          {
            text: 'หมายเหตุ:',
            margin: [10, 5, 0, 0],
          },
          {
            text: '1. กรุณานำบัตรประจำตัวประชาชนมาด้วย',
          },
          {
            text: '2. กรุณามาตามเวลานัด หากไม่ตรงเวลาต้องรอตามเวลานัดหรือนัดใหม่',
          },
        );
      });
      console.log(docDefinition.content);
      // Create the PDF document
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);

      // Download the PDF document
      pdfDocGenerator.download('slip.pdf');
    },

    deleteItem(item) {
      this.dialogDelete = true
      this.itemToDelete = item
    },

    async fetchUpdateData(date, time) {
      const res = await this.$axios.delete("/qmanagement/api/booking", {
        params: {
          date,
          time,
          hnCode: this.hnCode,
        },
      })
      this.initialize()
    },
    deleteItemConfirm(date, time) {
      this.closeDelete()
      this.fetchUpdateData(date, time);
    },

    closeDelete() {
      this.dialogDelete = false
    },
  },
}
</script>

<style scoped>
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

.alert {
  margin: 0 auto;
  text-align: left;
  margin-bottom: 20px;
}

.data-table {
  margin: 0 auto;
  text-align: left;
}

.box {
  border-radius: 10px;
}
</style>
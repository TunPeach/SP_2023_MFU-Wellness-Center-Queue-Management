<template>
  <div class="font-display">
    <v-data-table :headers="headers" :search="search" :items="history" item-key="timestamp" show-expand
      class="elevation-0">
      <template v-slot:top>
        <v-toolbar flat class="font-display">
          <v-dialog max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-row class="justify-end">
                <v-col cols="3">
                  <v-row class="pa-6">
                    <v-row class="mt-3">
                      <v-text-field v-model="date" type="date"></v-text-field>
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
      </template>
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.no }}</td>
          <td>{{ item.HN_code }}</td>
          <td>{{ item.name }}</td>
          <td>
            <template v-if="item.comparedItems.length > 1">
              ได้แก้ไขโปรไฟล์
            </template>
            <template v-else>
              <div v-html="item.detail"></div>
            </template>
          </td>
          <td>{{ item.timestamp }}</td>
          <td v-if="item.comparedItems.length > 1">
            <v-icon small @click="item.expanded = !item.expanded">{{ item.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'
            }}</v-icon>
          </td>
          <td v-else></td>
        </tr>
        <tr v-if="item.expanded">
          <td :colspan="headers.length">
            <div v-html="item.detail"></div>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      headers: [
        { text: "ลำดับ", align: "start", value: "no" },
        {
          text: "HN",
          value: "HN_code",
          sortable: false,
        },
        { text: "ชื่อ", value: "name", sortable: false },
        { text: "รายละเอียด", value: "detail", sortable: false },
        { text: "วันที่", value: "timestamp", sortable: false, filter: this.dateFilter },
        { text: "", value: "data-table-expand", sortable: false },
      ],
      history: [],
      date: null,
      search: "",
    };
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      console.log("initialize");
      const res = await this.$axios.get("/qmanagement/api/history");
      this.history = res.data.response.map((item, index) => ({
        ...item,
        timestamp: moment(item.timestamp).format("YYYY-MM-DD HH:mm:ss"),
        detail: this.getDetailText(item),
        comparedItems: this.getComparedItems(item),
        expanded: false,
        no: index + 1,
      }));
    },

    dateFilter(value) {
      if (!this.date) {
        return true;
      } else {
        const selectedTimestamp = new Date(this.date).setHours(0, 0, 0, 0);
        const valueTimestamp = new Date(value).setHours(0, 0, 0, 0);
        return valueTimestamp === selectedTimestamp;
      }
    },

    getDetailText(item) {
      let modifications = '';
      if (item.name !== item.name_edit) {
        modifications += `ได้แก้ไขชื่อ จาก ${item.name} เป็น ${item.name_edit}<br>`;
      }
      if (item.citizen_num !== item.citizen_num_edit) {
        modifications += `ได้แก้ไขเลขบัตรประชาชน จาก ${item.citizen_num} เป็น ${item.citizen_num_edit}<br>`;
      }
      if (item.gender !== item.gender_edit) {
        modifications += `ได้แก้ไขเพศ จาก ${item.gender} เป็น ${item.gender_edit}<br>`;
      }
      if (item.blood_type !== item.blood_type_edit) {
        modifications += `ได้แก้ไขกรุ๊ปเลือด จาก ${item.blood_type} เป็น ${item.blood_type_edit}<br>`;
      }
      if (item.birthdate !== item.birthdate_edit) {
        modifications += `ได้แก้ไขวัน/เดือน/ปีเกิด จาก ${item.birthdate} เป็น ${item.birthdate_edit}<br>`;
      }
      if (item.nationality !== item.nationality_edit) {
        modifications += `ได้แก้ไขสัญชาติ จาก ${item.nationality} เป็น ${item.nationality_edit}<br>`;
      }
      if (item.marriage_status !== item.marriage_status_edit) {
        modifications += `ได้แก้ไขสถานภาพ จาก ${item.marriage_status} เป็น ${item.marriage_status_edit}<br>`;
      }
      if (item.occupation !== item.occupation_edit) {
        modifications += `ได้แก้ไขอาชีพ จาก ${item.occupation} เป็น ${item.occupation_edit}<br>`;
      }
      if (item.allergy !== item.allergy_edit) {
        modifications += `ได้แก้ไขประวัติการแพ้ยา/อาหาร จาก ${item.allergy} เป็น ${item.allergy_edit}<br>`;
      }
      if (item.tel !== item.tel_edit) {
        modifications += `ได้แก้ไขเบอร์โทรศัพท์ จาก ${item.tel} เป็น ${item.tel_edit}<br>`;
      }
      if (item.email !== item.email_edit) {
        modifications += `ได้แก้ไขอีเมล จาก ${item.email} เป็น ${item.email_edit}<br>`;
      }
      if (item.emergency_contact !== item.emergency_contact_edit) {
        modifications += `ได้แก้ไขชื่อผู้ติดต่อฉุกเฉิน จาก ${item.emergency_contact} เป็น ${item.emergency_contact_edit}<br>`;
      }
      if (item.emergency_tel !== item.emergency_tel_edit) {
        modifications += `ได้แก้ไขเบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน จาก ${item.emergency_tel} เป็น ${item.emergency_tel_edit}<br>`;
      }
      if (item.address !== item.address_edit) {
        modifications += `ได้แก้ไขที่อยู่ตามบัตรประจำตัวประชาชน จาก ${item.address} เป็น ${item.address_edit}<br>`;
      }
      return modifications;
    },

    getComparedItems(item) {
      const comparedItems = [];

      if (item.name !== item.name_edit) {
        comparedItems.push({
          label: "ชื่อ",
          oldValue: item.name,
          newValue: item.name_edit
        });
      }
      if (item.citizen_num !== item.citizen_num_edit) {
        comparedItems.push({
          label: "เลขบัตรประชาชน",
          oldValue: item.citizen_num,
          newValue: item.citizen_num_edit
        });
      }
      if (item.gender !== item.gender_edit) {
        comparedItems.push({
          label: "เพศ",
          oldValue: item.gender,
          newValue: item.gender_edit
        });
      }
      if (item.blood_type !== item.blood_type_edit) {
        comparedItems.push({
          label: "กรุ๊ปเลือด",
          oldValue: item.blood_type,
          newValue: item.blood_type_edit
        });
      }
      if (item.birthdate !== item.birthdate_edit) {
        comparedItems.push({
          label: "วัน/เดือน/ปีเกิด",
          oldValue: item.birthdate,
          newValue: item.birthdate_edit
        });
      }
      if (item.nationality !== item.nationality_edit) {
        comparedItems.push({
          label: "สัญชาติ",
          oldValue: item.nationality,
          newValue: item.nationality_edit
        });
      }
      if (item.marriage_status !== item.marriage_status_edit) {
        comparedItems.push({
          label: "สถานภาพ",
          oldValue: item.marriage_status,
          newValue: item.marriage_status_edit
        });
      }
      if (item.occupation !== item.occupation_edit) {
        comparedItems.push({
          label: "อาชีพ",
          oldValue: item.occupation,
          newValue: item.occupation_edit
        });
      }
      if (item.allergy !== item.allergy_edit) {
        comparedItems.push({
          label: "ประวัติการแพ้ยา/อาหาร",
          oldValue: item.allergy,
          newValue: item.allergy_edit
        });
      }
      if (item.tel !== item.tel_edit) {
        comparedItems.push({
          label: "เบอร์โทรศัพท์",
          oldValue: item.tel,
          newValue: item.tel_edit
        });
      }
      if (item.email !== item.email_edit) {
        comparedItems.push({
          label: "อีเมล",
          oldValue: item.email,
          newValue: item.email_edit
        });
      }
      if (item.emergency_contact !== item.emergency_contact_edit) {
        comparedItems.push({
          label: "ชื่อผู้ติดต่อฉุกเฉิน",
          oldValue: item.emergency_contact,
          newValue: item.emergency_contact_edit
        });
      }
      if (item.emergency_tel !== item.emergency_tel_edit) {
        comparedItems.push({
          label: "เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน",
          oldValue: item.emergency_tel,
          newValue: item.emergency_tel_edit
        });
      }
      if (item.address !== item.address_edit) {
        comparedItems.push({
          label: "ที่อยู่ตามบัตรประจำตัวประชาชน",
          oldValue: item.address,
          newValue: item.address_edit
        });
      }
      return comparedItems;
    },
  },
};
</script>
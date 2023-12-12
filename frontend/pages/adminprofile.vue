<template>
  <div>
    <Navbar />
    <v-container>
      <v-sheet
        class="box align-center justify-center flex-wrap mx-auto"
        height="auto"
        width="auto"
      >
        <v-row justify="center">
          <h1 class="head-title font-display">โปรไฟล์ข้อมูลส่วนตัว</h1>
        </v-row>

        <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
          <v-container>
            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h2 class="font-display">ข้อมูลส่วนตัว</h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">ชื่อ-สกุล</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  background-color="#FEFCFC"
                  v-model="name"
                  :rules="nameRules"
                  required
                  outlined
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">เลขประจำตัวประชาชน</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  v-model="id_person"
                  background-color="#FEFCFC"
                  :rules="id_personRules"
                  required
                  outlined
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px" class="pt-6">
                <h4 class="font-display">เพศ</h4>
              </v-col>
              <v-col class="textfield">
                <v-radio-group
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  v-model="gender"
                  :rules="genderRules"
                  required
                >
                  <v-radio label="ชาย" value="1" color="#f17223"></v-radio>
                  <v-radio label="หญิง" value="2" color="#f17223"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row class="pb-3">
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px" class="pt-6">
                <h4 class="font-display">กรุ๊ปเลือด</h4>
              </v-col>
              <v-col class="textfield">
                <v-radio-group
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  v-model="bloodtype"
                  :rules="bloodtpyeRules"
                  required
                >
                  <v-radio label="A" value="1" color="#f17223"></v-radio>
                  <v-radio label="B" value="2" color="#f17223"></v-radio>
                  <v-radio label="O" value="3" color="#f17223"></v-radio>
                  <v-radio label="AB" value="4" color="#f17223"></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">วัน/เดือน/ปีเกิด</h4>
              </v-col>
              <v-col class="textfield">
                <v-menu
                  :disabled="!isEditing"
                  class="font-display"
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      :disabled="!isEditing"
                      dense
                      class="font-display"
                      v-model="date"
                      append-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      required
                      background-color="#FEFCFC"
                      :rules="dateRules"
                      outlined
                      style="width: 350px"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    class="font-display"
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      class="font-display"
                      text
                      color="primary"
                      @click="menu = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      class="font-display"
                      text
                      color="primary"
                      @click="$refs.menu.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">สัญชาติ</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  v-model="nationality"
                  :rules="nationalityRules"
                  outlined
                  background-color="#FEFCFC"
                  required
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">สถานภาพ</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  v-model="status"
                  :rules="statusRules"
                  required
                  background-color="#FEFCFC"
                  outlined
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

          
            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">หน่วยงาน</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field :disabled="!isEditing" dense class="font-display" v-model="department" required
                  background-color="#FEFCFC" :rules="jobRules" outlined style="width: 350px"></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">ตำแหน่ง</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field :disabled="!isEditing" dense class="font-display" v-model="position" outlined
                  background-color="#FEFCFC" :rules="df_allergiesRules" style="width: 350px"></v-text-field>
              </v-col>
            </v-row>

            <v-row class="py-3">
              <v-divider></v-divider>
            </v-row>

            <v-row justify="left">
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h2 class="font-display">ข้อมูลติดต่อ</h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">อีเมล</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  v-model="email"
                  :rules="emailRules"
                  background-color="#FEFCFC"
                  required
                  outlined
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">เบอร์โทรศัพท์</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  v-model="phonenumber"
                  :rules="phoneRules"
                  background-color="#FEFCFC"
                  required
                  outlined
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="py-3">
              <v-divider></v-divider>
            </v-row>

            <v-row justify="left">
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h2 class="font-display">ข้อมูลผู้ติดต่อฉุกเฉิน</h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">ชื่อผู้ติดต่อฉุกเฉิน</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  v-model="eg_name"
                  :rules="eg_nameRules"
                  required
                  background-color="#FEFCFC"
                  outlined
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน</h4>
              </v-col>
              <v-col class="textfield">
                <v-text-field
                  :disabled="!isEditing"
                  dense
                  class="font-display"
                  v-model="eg_phonenumber"
                  :rules="phoneRules"
                  required
                  background-color="#FEFCFC"
                  outlined
                  style="width: 350px"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row class="py-3">
              <v-divider></v-divider>
            </v-row>

            <v-row justify="left">
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h2 class="font-display">ที่อยู่</h2>
              </v-col>
            </v-row>

            <v-row>
              <v-col style="max-width: 100px"></v-col>
              <v-col style="max-width: 250px">
                <h4 class="font-display">ที่อยู่ตามบัตรประจำตัวประชาชน</h4>
              </v-col>
              <div>
                <v-col class="textarea">
                  <v-textarea
                    :disabled="!isEditing"
                    dense
                    class="font-display"
                    auto-grow
                    v-model="address"
                    :rules="addressRules"
                    required
                    background-color="#FEFCFC"
                    outlined
                  ></v-textarea>
                </v-col>
              </div>
            </v-row>

            <v-row justify="center">
              <div class="my-2">
                <v-btn
                  class="font-display"
                  color="#f17223"
                  rounded
                  depressed
                  style="
                    padding-left: 40px;
                    padding-right: 40px;
                    font-weight: bold;
                    color: white;
                  "
                  @click="isEditing = !isEditing"
                  v-if="!isEditing"
                  >แก้ไข</v-btn
                >

                <v-btn
                  class="font-display"
                  color="#f17223"
                  style="
                    padding-left: 40px;
                    padding-right: 40px;
                    font-weight: bold;
                  "
                  outlined
                  rounded
                  @click="cancelEdit"
                  v-if="isEditing"
                  >ยกเลิก</v-btn
                >

                <v-btn
                  class="font-display"
                  color="#f17223"
                  rounded
                  depressed
                  style="
                    padding-left: 40px;
                    padding-right: 40px;
                    font-weight: bold;
                    color: white;
                  "
                  @click="submitForm()"
                  v-if="isEditing"
                  >บันทึก</v-btn
                >
              </div>
            </v-row>
          </v-container>
        </v-form>
      </v-sheet>
    </v-container>
  </div>
</template>

<style>
.my-2 {
  padding-top: 50px;
  padding-left: 80px;
}

.head-title {
  margin-top: 35px;
  margin-bottom: 35px;
  font-size: 40px;
  font-weight: bold;
  justify-content: center;
}

.box {
  margin-top: 20px;
  margin-left: 50px;
  border-radius: 10px;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 50px;
}
</style>

<script>
import moment from "moment";
export default {
  middleware: 'auth',
  data: () => ({
    user: [],
    isEditing: false,
    valid: true,
    name: "",
    id_person: "",
    gender: "",
    genderOptions: ["ชาย", "หญิง"],
    bloodtype: "",
    bloodtypeOptions: ["A", "B", "AB", "O"],
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    nationality: "",
    status: "",
    job: "",
    drug_food_allergies: "",
    phonenumber: "",
    email: "",
    eg_phonenumber: "",
    eg_name: "",
    address: "",
    originalData: {},

    dateRules: [
      (value) => !!value || "จำเป็น",
      (value) =>
        new Date(value).toString() !== "Invalid Date" ||
        "Please enter a valid date",
    ],

    bloodtpyeRules: [(value) => !!value || "จำเป็น"],

    genderRules: [(value) => !!value || "จำเป็น"],

    addressRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z0-9\s,'-]*$/.test(value) ||
      //   "Address must only contain letters, numbers, spaces, commas, apostrophes, and hyphens",
    ],

    nationalityRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z\s]*$/.test(value) || "Name must only contain letters",
    ],

    eg_nameRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z\s]*$/.test(value) || "Name must only contain letters",
    ],

    statusRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z\s]*$/.test(value) || "Name must only contain letters",
    ],

    nationalityRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z\s]*$/.test(value) || "Name must only contain letters",
    ],

    nameRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z\s]*$/.test(value) || "Name must only contain letters",
    ],

    jobRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z\s]*$/.test(value) || "Name must only contain letters",
    ],

    df_allergiesRules: [
      (value) => !!value || "จำเป็น",
      // (value) =>
      //   /^[a-zA-Z\s]*$/.test(value) || "Name must only contain letters",
    ],

    id_personRules: [
      (value) => !!value || "จำเป็น",
      (value) =>
        /^[+]{0,1}[\d]{0,2}[\s-]{0,1}[(]{0,1}[\d]{1,4}[)]{0,1}[\s-]{0,1}[\d]{1,4}[\s-]{0,1}[\d]{1,4}$/.test(
          value
        ) || "Please enter a valid phone number",
      (value) =>
        /^\d+$/.test(value) || "Phone number must only contain numbers",
    ],

    phoneRules: [
      (value) => !!value || "จำเป็น",
      (value) =>
        /^[+]{0,1}[\d]{0,2}[\s-]{0,1}[(]{0,1}[\d]{1,4}[)]{0,1}[\s-]{0,1}[\d]{1,4}[\s-]{0,1}[\d]{1,4}$/.test(
          value
        ) || "Please enter a valid phone number",
    ],
    emailRules: [
      (v) => !!v || "จำเป็น",
      (v) => /.+@.+/.test(v) || "E-mail must be valid",
    ],
  }),

  async created() {
    try {
      const response = await this.$axios.get('/qmanagement/api/admin', {
        params: {
          empCode: this.empCode,
        },
      });
      const userData = response.data;
        this.user = userData;
        console.log(this.user);
        this.name = this.user.response[0].name;
        this.id_person = this.user.response[0].citizen_num;
        this.gender = this.user.response[0].gender;
        this.bloodtype = this.user.response[0].blood_type;
        const isoDate = this.user.response[0].birthdate;
        this.date = moment(isoDate).format('YYYY-MM-DD');
        this.nationality = this.user.response[0].nationality;
        this.status = this.user.response[0].marriage_status;
        this.department = this.user.response[0].department;
        this.position = this.user.response[0].position;
        this.phonenumber = this.user.response[0].tel;
        this.email = this.user.response[0].email;
        this.eg_name = this.user.response[0].emergency_contact;
        this.eg_phonenumber = this.user.response[0].emergency_tel;
        this.address = this.user.response[0].address;
  
        this.originalData = {
          name: this.name,
          id_person: this.id_person,
          gender: this.gender,
          bloodtype: this.bloodtype,
          date: this.date,
          nationality: this.nationality,
          status: this.status,
          department: this.department,
          position: this.position,
          phonenumber: this.phonenumber,
          email: this.email,
          eg_name: this.eg_name,
          eg_phonenumber: this.eg_phonenumber,
          address: this.address,
        };
    } catch (error) {
      console.log(error);
    }
  },
  computed: {
    empCode() {
      return window.sessionStorage.getItem("empCode");
    },
  },

  methods: {
    async saveToEditHistory() {
      try {
        const response = await this.$axios.post("/qmanagement/api/history", {
          HN_code: this.empCode,
          name: this.originalData.name,
          citizen_num: this.originalData.id_person,
          gender: this.originalData.gender,
          blood_type: this.originalData.bloodtype,
          birthdate: this.originalData.date,
          nationality: this.originalData.nationality,
          marriage_status: this.originalData.status,
          occupation: this.originalData.job,
          allergy: this.originalData.drug_food_allergies,
          tel: this.originalData.phonenumber,
          email: this.originalData.email,
          emergency_tel: this.originalData.eg_phonenumber,
          emergency_contact: this.originalData.eg_name,
          address: this.originalData.address,

          name_edit: this.name,
          citizen_num_edit: this.id_person,
          gender_edit: this.gender,
          blood_type_edit: this.bloodtype,
          birthdate_edit: this.date,
          nationality_edit: this.nationality,
          marriage_status_edit: this.status,
          occupation_edit: this.job,
          allergy_edit: this.drug_food_allergies,
          tel_edit: this.phonenumber,
          email_edit: this.email,
          emergency_tel_edit: this.eg_phonenumber,
          emergency_contact_edit: this.eg_name,
          address_edit: this.address,
        });
        console.log("Original data saved to edit history:", response.data);
      } catch (error) {
        console.error("Error saving original data to edit history:", error);
      }
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          console.log("HN_code:", this.empCode);
          const empCode = this.empCode.toString().padStart(9, "0");
          const response = await this.$axios.put(`/qmanagement/api/admins/${empCode}`, {
            name: this.name,
            citizen_num: this.id_person,
            gender: this.gender,
            blood_type: this.bloodtype,
            birthdate: this.date,
            nationality: this.nationality,
            marriage_status: this.status,
            department: this.department,
            position: this.position,
            tel: this.phonenumber,
            email: this.email,
            emergency_contact: this.eg_name,
            emergency_tel: this.eg_phonenumber,
            address: this.address,
          });
          console.log("Response:", response);
          const updatedData = response.data.data;
          console.log("Updated data:", updatedData);
          this.isEditing = false;
          await this.saveToEditHistory();
        } catch (error) {
          console.error("Error updating data:", error);
        }
      }
    },
    cancelEdit() {
      this.name = this.originalData.name;
      this.id_person = this.originalData.id_person;
      this.gender = this.originalData.gender;
      this.bloodtype = this.originalData.bloodtype;
      this.date = this.originalData.date;
      this.nationality = this.originalData.nationality;
      this.status = this.originalData.status;
      this.department = this.originalData.department,
        this.position = this.originalData.position,
        this.phonenumber = this.originalData.phonenumber,
        this.email = this.originalData.email,
        this.eg_name = this.originalData.eg_name,
        this.eg_phonenumber = this.originalData.eg_phonenumber,
        this.address = this.originalData.address,
        this.isEditing = false;
    },
  },
};
</script>

<style>
.textfield {
  padding: 0px;
  padding-right: 15px;
}

.textarea {
  padding: 0px;
  width: 350px;
}

.font-display {
  font-family: "Kanit";
}
</style>

<template>
    <div>
      <v-container>
        <v-sheet class="box align-center justify-center flex-wrap mx-auto" height="1650" width="1076">
  
          <v-form v-model="valid" ref="form">
            <v-container>
  
              <v-row justify="center">
                <h1 class="head-title font-display">สร้างบัญชีใหม่ของคุณ</h1>
              </v-row>
  
              <v-row class="pb-3">
                <v-divider></v-divider>
              </v-row>
  
              <v-row justify="left" class="pb-6">
                <v-col>
                  <h2 class="font-display">ข้อมูลส่วนตัว</h2>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">ชื่อ-สกุล</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" background-color="#FEFCFC" v-model="name" :rules="nameRules"
                    required outlined style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">เลขประจำตัวประชาชน</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" v-model="id_person" background-color="#FEFCFC"
                    :rules="id_personRules" required outlined style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px" class="pt-6">
                  <h4 class="font-display">เพศ</h4>
                </v-col>
                <v-col class="textfield">
                  <v-radio-group dense class="font-display" v-model="gender" :rules="genderRules" required>
                    <v-radio label="ชาย" value="ชาย" color="#f17223"></v-radio>
                    <v-radio label="หญิง" value="หญิง" color="#f17223"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
  
              <v-row class="pb-3">
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px" class="pt-6">
                  <h4 class="font-display">กรุ๊ปเลือด</h4>
                </v-col>
                <v-col class="textfield">
                  <v-radio-group dense class="font-display" v-model="bloodtype" :rules="bloodtpyeRules" required>
                    <v-radio label="A" value="A" color="#f17223"></v-radio>
                    <v-radio label="B" value="B" color="#f17223"></v-radio>
                    <v-radio label="O" value="O" color="#f17223"></v-radio>
                    <v-radio label="AB" value="AB" color="#f17223"></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">วัน/เดือน/ปีเกิด</h4>
                </v-col>
                <v-col class="textfield">
                  <v-menu class="font-display" ref="menu" v-model="menu" :close-on-content-click="false"
                    :return-value.sync="date" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field dense class="font-display" v-model="date" append-icon="mdi-calendar" readonly
                        v-bind="attrs" v-on="on" required background-color="#FEFCFC" :rules="dateRules" outlined
                        style="width: 350px"></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title scrollable class="font-display" style="width: 300px">
                      <v-spacer></v-spacer>
                      <v-btn class="font-display" text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn class="font-display" text color="primary" @click="$refs.menu.save(date)">
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
                  <v-text-field dense class="font-display" v-model="nationality" :rules="nationalityRules" outlined
                    background-color="#FEFCFC" required style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">สถานภาพ</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" v-model="status" :rules="statusRules" required
                    background-color="#FEFCFC" outlined style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">หน่วยงาน</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" v-model="department" required background-color="#FEFCFC"
                    :rules="jobRules" outlined style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">ตำแหน่ง</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" v-model="position" outlined background-color="#FEFCFC"
                    :rules="df_allergiesRules" style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row class="py-3">
                <v-divider></v-divider>
              </v-row>
  
              <v-row justify="left" class="pb-6">
                <v-col>
                  <h2 class="font-display">ข้อมูลติดต่อ</h2>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">เบอร์โทรศัพท์</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field class="font-display" dense v-model="phonenumber" :rules="phoneRules" background-color="#FEFCFC" required outlined
                    style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">อีเมล</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" v-model="email" :rules="emailRules" background-color="#FEFCFC" required outlined
                    style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">เบอร์โทรศัพท์ผู้ติดต่อฉุกเฉิน</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" v-model="eg_phonenumber" :rules="phoneRules" required
                    background-color="#FEFCFC" outlined style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">ชื่อผู้ติดต่อฉุกเฉิน</h4>
                </v-col>
                <v-col class="textfield">
                  <v-text-field dense class="font-display" v-model="eg_name" :rules="eg_nameRules" required
                    background-color="#FEFCFC" outlined style="width: 350px"></v-text-field>
                </v-col>
              </v-row>
  
              <v-row>
                <v-col style="max-width: 100px"></v-col>
                <v-col style="max-width: 250px">
                  <h4 class="font-display">ที่อยู่ตามบัตรประจำตัวประชาชน</h4>
                </v-col>
                <div>
  
                  <v-col class="textarea">
                    <v-textarea dense class="font-display" auto-grow v-model="address" :rules="addressRules" required
                      background-color="#FEFCFC" outlined></v-textarea>
                  </v-col>
                </div>
              </v-row>
  
              <v-row justify="center">
                <div class="my-2">
                  <v-col>
                    <v-btn class="font-display" depressed color="warning" rounded dark style="
                      padding-left: 40px;
                      padding-right: 40px;
                      font-weight: bold;
                    " @click="Signup()">
                      ลงทะเบียน
                    </v-btn>
                  </v-col>
                </div>
              </v-row>
            </v-container>
          </v-form>
        </v-sheet>
      </v-container>
      <v-dialog v-model="registerSuccess" persistent max-width="370px">
        <v-card class="font-display">
          <v-card-title class="font-display">ลงทะเบียนสำเร็จ!</v-card-title>
          <v-card-text>รหัสผ่านพนักงานได้ถูกส่งไปยังอีเมลของท่านที่ลงทะเบียนกับทางเราเรียบร้อย
            ท่านสามารถเข้าสู่ระบบเพื่อใช้งานได้ตั้งแต่ตอนนี้</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="toLogin">ปิด</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </template>
  
  <style>
  .head-title {
    margin-top: 35px;
    margin-bottom: 35px;
    font-size: 40px;
    font-weight: bold;
    justify-content: center;
  }
  
  .box {
    margin-top: 55px;
    margin-left: 50px;
    border-radius: 50px;
    padding-left: 50px;
    padding-right: 50px;
    padding-bottom: 50px;
  }
  </style>
  
  <script>
  export default {
    data: () => ({
      valid: false,
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
      department: "",
      position: "",
      phonenumber: "",
      email: "",
      eg_phonenumber: "",
      eg_name: "",
      address: "",
      registerSuccess: false,
  
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
        //   /^[a-zA-Z\s]*$/.test(value) || "ชื่อควรมีแค่ตัวอักษร",
      ],
  
      id_personRules: [
        (value) => !!value || "จำเป็น",
        (value) =>
          /^[+]{0,1}[\d]{0,2}[\s-]{0,1}[(]{0,1}[\d]{1,4}[)]{0,1}[\s-]{0,1}[\d]{1,4}[\s-]{0,1}[\d]{1,4}$/.test(
            value
          ) || "ไม่ควรกรอกอย่างอื่นนอกจากตัวเลข",
        (value) =>
          /^\d+$/.test(value) || "ไม่ควรกรอกอย่างอื่นนอกจากตัวเลข",
          (value) => value.length === 13 || "ควรมีตัวเลข 13 หลัก",
      ],
  
      phoneRules: [
        (value) => !!value || "จำเป็น",
        (value) =>
          /^[+]{0,1}[\d]{0,2}[\s-]{0,1}[(]{0,1}[\d]{1,4}[)]{0,1}[\s-]{0,1}[\d]{1,4}[\s-]{0,1}[\d]{1,4}$/.test(
            value
          ) || "ไม่ควรกรอกอย่างอื่นนอกจากตัวเลข",
      ],
      emailRules: [
        (v) => !!v || "จำเป็น",
        (v) => /.+@.+/.test(v) || "อีเมลควรถูกต้องตามหลักของบัญชีเมล",
      ],
    }),
  
    methods: {
      async Signup() {
        // Trigger validation
      if (this.$refs.form.validate()) {
        // If the form is valid, proceed with the signup process
        // Place your signup logic here
        try {
        let res = await this.$axios.post("/qmanagement/api/admins", {
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
        console.log(res.data);
        if (res.status == 200) {
          this.registerSuccess = true;
        }
      } catch (error) {
          console.error(error);
        }
      } else {
        // If the form is not valid, do nothing (error messages will be shown automatically)
        return;
      }
    },
  
      toLogin(){
              this.registerSuccess = false
              this.$router.push("/login");
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
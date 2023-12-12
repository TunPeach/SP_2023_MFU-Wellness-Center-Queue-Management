<template>
  <div>
    <NavbarFon />
    <v-app>
      <v-main class="custom-main-color">
        <v-container>
          <v-sheet
            class="box"
            style="padding-top: 47px"
            height="auto"
            width="auto"
          >
            <div style="margin-left: 12px; margin-bottom: 20px">
              <h2 class="header font-display" style="color: #61513f">
                สำหรับพนักงานอายุมากกว่า 35 ปี
              </h2>
            </div>
            <v-row style="padding-bottom: 1px"> </v-row>
            <!--------------------------------------- Table data start------------------------------------------------------->
            <v-simple-table class="custom-table" style="margin-bottom: 20px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>
                      <h3
                        class="font-display"
                        style="color: #61513f; margin-top: 26px"
                      >
                        รายการ
                      </h3>
                    </th>
                    <th class="text-center">
                      <img
                        src="./man.png"
                        height="30px"
                        style="margin-left: 0px"
                      />
                      <h3
                        class="font-display"
                        style="color: #61513f; margin-bottom: 10px"
                      >
                        เพศชาย
                      </h3>
                    </th>
                    <th class="text-center">
                      <img
                        src="./woman.png"
                        style="margin-left: 0px"
                        height="30px"
                      />
                      <h3
                        class="font-display"
                        style="color: #61513f; margin-bottom: 10px"
                      >
                        เพศหญิง
                      </h3>
                    </th>
                    <th class="text-center">
                      <img src="./Money.png" height="18px" />
                      <h3
                        class="font-display"
                        style="color: #61513f; margin-top: 3px"
                      >
                        ค่าบริการ
                      </h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td class="font-display" style="color: #61513f">
                      {{ item.name }}
                    </td>
                    <td class="text-center">
                      <img
                        v-if="item.MenLower35 === 'x'"
                        src="./check.png"
                        height="20px"
                      />
                    </td>
                    <td class="text-center">
                      <img
                        v-if="item.MenOver35 === 'x'"
                        src="./check.png"
                        height="20px"
                      />
                    </td>
                    <td class="text-center">
                      <h3 class="font-display" style="color: orange">
                        {{ item.cost }}
                      </h3>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <!--------------------------------------- Table data end------------------------------------------------------->
            <v-row>
              <v-col>
                <NuxtLink
                  to="/checkupservice/addpromotion"
                  style="text-decoration: none"
                >
                  <v-btn
                    rounded
                    outlined
                    block
                    class="font-display"
                    style="
                      color: #f17223;
                      width: 405px;
                      font-size: 15px;
                      font-weight: bold;
                    "
                    >ดูรายการตรวจสุขภาพเพิ่มเติม</v-btn
                  >
                </NuxtLink>
              </v-col>
              <v-col>
                <nuxt-link to="/loginFon" style="text-decoration: none">
                  <v-btn
                    rounded
                    outlined
                    block
                    class="btn-custom font-display"
                    style="
                      width: 405px;

                      font-size: 15px;
                      font-weight: bold;
                    "
                    >เริ่มต้นการจองเลย !</v-btn
                  >
                </nuxt-link>
              </v-col>
            </v-row>
          </v-sheet>
        </v-container>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "ตรวจร่างกายโดยแพทย์ (PE)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "120 ฿",
        },
        {
          name: "ตรวจความสมบูรณ์ของเม็ดเลือด ดูภาวะซีดและธาลัสซีเมีย (CBC)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "120 ฿",
        },
        {
          name: "ตรวจปัสสาวะ (Urine analysis)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "90 ฿",
        },
        {
          name: "ตรวจอุจจาระ (Direct smear Stool)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "90 ฿",
        },
        {
          name: "เอกซ์เรย์ทรวงอก (Chest X-ray)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "200 ฿",
        },
        {
          name: "ตรวจคลื่นไฟฟ้าหัวใจ (EKG)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "300 ฿",
        },
        {
          name: "ตรวจระดับน้ำตาลสะสมในเลือด (HbA1C)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "150 ฿",
        },
        {
          name: "ตรวจระดับคอเลสเตอรอลในเลือด (Cholesterol)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "100 ฿",
        },
        {
          name: "ตรวจระดับไขมันไตรกลีเซอไรด์ในเลือด (Triglyceride)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "220 ฿",
        },
        {
          name: "ตรวจระดับไขมันในเลือด (HDL ไขมันดี)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "220 ฿",
        },
        {
          name: "ตรวจระดับไขมันเลวในเลือด (LDL ไขมันชนิดไม่ดี)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "150 ฿",
        },
        {
          name: "ตรวจการทำงานของไต (BUN)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "90 ฿",
        },
        {
          name: "ตรวจการทำงานของไต (Creatinine)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "90 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (SGOT)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "110 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (SGPT)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "110 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (Alkaline Phosphatase) ",
          MenLower35: "x",
          MenOver35: "x",
          cost: "110 ฿",
        },
        {
          name: "ตรวจหาสารก่อให้เกิดโรคเก๊าท์ (Uric acid)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "90 ฿",
        },
        {
          name: "ตรวจอัลตราซาวด์ช่องท้อง (Ultrasound Whole Abdomen)",
          MenLower35: "x",
          MenOver35: "x",
          cost: "1,200 ฿",
        },
        {
          name: "ตรวจมะเร็งเต้านม (Digital mammogram)",
          MenLower35: "",
          MenOver35: "x",
          cost: "220 ฿",
        },
        {
          name: "ตรวจหามะเร็งปากมดลูก (ThinPrep)",
          MenLower35: "",
          MenOver35: "x",
          cost: "490 ฿",
        },
      ],
    };
  },
};
</script>

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

<style scoped>
.custom-main-color {
  background-color: #ffece0; /* Replace #yourColor with your desired color */
}
.btn-custom {
  background: linear-gradient(
    to right,
    rgba(241, 114, 35, 100%),
    rgba(241, 114, 35, 75%)
  );

  color: white;
}
.font-display {
  font-family: "Kanit";
}
</style>

<template>
  <div>
    <NavbarFon />
    <v-app>
      <v-main class="custom-main-color">
        <v-container>
          <v-sheet
            class="box"
            style="margin-top: 20px; margin-left: 62px; padding-top: 47px"
            height="auto"
            width="auto"
          >
            <div style="margin-left: 12px; margin-bottom: 20px">
              <h2 class="header font-display" style="color: #61513f">
                ตรวจสุขภาพสำหรับ ข้าราชการ / อปท.
              </h2>
            </div>
            <v-row style="padding-bottom: 1px">
              <img
                src="./man.png"
                height="30px"
                style="margin-left: 55%; text-align: center"
              />
              <h4 class="font-display" style="color: #61513f">เพศชาย</h4>
              <img
                src="./woman.png"
                style=" align: center; margin-left: 12%"
                height="30px"
              />
              <h4 class="font-display" style="color: #61513f">เพศหญิง</h4>
            </v-row>
            <!--------------------------------------- Table data start------------------------------------------------------->
            <v-simple-table class="custom-table" style="margin-bottom: 20px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>
                      <h3 class="font-display" style="color: #61513f">
                        รายการ
                      </h3>
                    </th>
                    <th class="text-center">
                      <h3 class="font-display" style="color: #61513f">
                        ไม่เกิน35ปี
                      </h3>
                    </th>
                    <th class="text-center">
                      <h3 class="font-display" style="color: #61513f">
                        มากกว่า35ปี
                      </h3>
                    </th>
                    <th class="text-center">
                      <h3 class="font-display" style="color: #61513f">
                        ไม่เกิน35ปี
                      </h3>
                    </th>
                    <th class="text-center">
                      <h3 class="font-display" style="color: #61513f">
                        มากกว่า35ปี
                      </h3>
                    </th>
                    <th class="text-center">
                      <img src="./Money.png" height="18px" />
                      <h3 class="font-display" style="color: #61513f">
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
                      <img
                        v-if="item.WomenLower35 === 'x'"
                        src="./check.png"
                        height="20px"
                      />
                    </td>
                    <td class="text-center">
                      <img
                        v-if="item.WomenOver35 === 'x'"
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
              <v-col md="6" sm="12">
                <NuxtLink
                  to="/checkupservice/addCivil_servants"
                  style="text-decoration: none"
                >
                  <v-btn
                    rounded
                    outlined
                    block
                    class="font-display"
                    style="
                      color: #f17223;
                      width: auto;

                      font-size: 15px;
                      font-weight: bold;
                    "
                    >ดูรายการตรวจสุขภาพเพิ่มเติม</v-btn
                  >
                </NuxtLink>
              </v-col>
              <v-col md="6" sm="12">
                <nuxt-link to="/loginFon" style="text-decoration: none">
                  <v-btn
                    rounded
                    outlined
                    block
                    class="btn-custom font-display"
                    style="
                      width: auto;

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
    </v-app>
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "ค่าบริการทางการแพทย์",
          MenLower35: "x",
          MenOver35: "x",
          WomenLower35: "x",
          WomenOver35: "x",
          cost: "120 ฿",
        },
        {
          name: "ค่าบริการผู้ป่วยนอกในเวลา (ศูนย์บริการสุขภาพ)",
          MenLower35: "x",
          MenOver35: "x",
          WomenLower35: "x",
          WomenOver35: "x",
          cost: "100 ฿",
        },
        {
          name: "ตรวจสมบูรณ์ของเม็ดเลือด ดูภาวะซีด(CBC)",
          MenLower35: "x",
          MenOver35: "x",
          WomenLower35: "x",
          WomenOver35: "x",
          cost: "90 ฿",
        },
        {
          name: "ตรวจปัสสาวะดูการอักเสบ นิ่ว และโรคในทางเดินปัสสาวะ",
          MenLower35: "x",
          MenOver35: "x",
          WomenLower35: "x",
          WomenOver35: "x",
          cost: "50 ฿",
        },
        {
          name: "ตรวจอุจจาระทั่วไป (Direct Smear stool)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "30 ฿",
        },
        {
          name: "เอกช์เรย์ทรวงอก (Chest X-ray)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "170 ฿",
        },
        {
          name: "การตรวจระดับน้ำตาลในเลือด (Glucose)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "40 ฿",
        },
        {
          name: "ตรวจระดับคอเลสเตอรอลในเลือด (Cholesterol)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "60 ฿",
        },
        {
          name: "ตรวจระดับไขมันไตรกลีเซอไรด์ ในเลือด (Triglyceride)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "60 ฿",
        },
        {
          name: "ตรวจการทำงานของไต (BUN)    ",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "50 ฿",
        },
        {
          name: "ตตรวจการทำงานของไต (Creatinine)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "50 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (SGOT)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "50 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (SGPT))",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "50 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (Alkaline Phosphatase)",
          MenLower35: "",
          MenOver35: "x",
          WomenLower35: "",
          WomenOver35: "x",
          cost: "50 ฿",
        },
        {
          name: "ตรวจหาสารก่อให้เกิดเก๊าท์ (Uric Acid)",
          MenLower35: "",
          MenOver35: "",
          WomenLower35: "x",
          WomenOver35: "x",
          cost: "60 ฿",
        },
        {
          name: "การตรวจภายใน",
          MenLower35: "",
          MenOver35: "",
          WomenLower35: "x",
          WomenOver35: "x",
          cost: "100 ฿",
        },
        {
          name: "การตรวจหาเซลล์มะเร็งปากมดลูก โดยวิธี Pap Smear ความแม่นยำ 50%",
          MenLower35: "",
          MenOver35: "",
          WomenLower35: "x",
          WomenOver35: "x",
          cost: "100 ฿",
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
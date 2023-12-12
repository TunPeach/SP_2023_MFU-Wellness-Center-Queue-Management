.
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
                ตรวจสุขภาพ โปรโมชั่น ราคา 999 บาท
              </h2>
            </div>
            <v-row style="padding-bottom: 1px">
              
            </v-row>
            <!--------------------------------------- Table data start------------------------------------------------------->
            <v-simple-table class="custom-table" style="margin-bottom: 20px">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="font-display" style="color: #61513f">
                      <h3>รายการ</h3>
                    </th>
                    <th class="text-center font-display" style="color: #61513f">
                      <img src="./Money.png" height="18px"  />
                      <h3>ค่าบริการ</h3>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in desserts" :key="item.name">
                    <td class="font-display" style="color: #61513f">
                      {{ item.name }}
                    </td>
                    <td class="text-center font-display" style="color: #61513f">
                      <h4>{{ item.cost }}</h4>
                    </td>
                  </tr>
                </tbody>
                 
              </template>
            </v-simple-table>
            <!--------------------------------------- Table data end------------------------------------------------------->
            <v-row>
              <v-col md="6" sm="12">
                <NuxtLink
                  to="/checkupservice/addpromotion"
                  style="text-decoration: none"
                >
                  <v-btn
                    rounded
                    block
                    outlined
                    class="font-display"
                    style="
                      color: #f17223;

                      margin-top: 10px;

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
                    block
                    outlined
                    class="btn-custom font-display"
                    style="
                      margin-top: 10px;

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
          name: "ค่าตรวจร่างกายโดยแพทย์ (Physical Examination)",
          cost: "/",
        },
        {
          name: "ค่าบริการผู้ป่วยนอก",
          cost: "/",
        },
        {
          name: "ตรวจสมบูรณ์ของเม็ดเลือด (CBC)",
          cost: "/",
        },
        {
          name: "ตรวจปัสสาวะ (UA)",
          cost: "/",
        },
        {
          name: "เอกซเรย์ทรวงอก ดูโรคปอด/ภาวะหัวใจโต (Chest X-ray : Lung & Heart)",
          cost: "/",
        },
        {
          name: "ตรวจระดับน้ำตาลในเลือด (Glucose)",
          cost: "/",
        },
        {
          name: "ตรวจระดับไขมันคอเรสเตอรอลในเลือด (Cholesterol)",
          cost: "/",
        },
        {
          name: "ตรวจระดับไขมันไตรกลีเซอไรด์ (Triglyceride)",
          cost: "/",
        },
        {
          name: "ตรวจระดับไขมันดีในเลือด (HDL)",
          cost: "/",
        },
        {
          name: "ตรวจระดับไขมันเลวในเลือด (LDL)    ",
          cost: "/",
        },
        {
          name: "ตรวจการทำงานของไต (BUN)",
          cost: "/",
        },
        {
          name: "ตรวจการทำงานของไต (Creatinine)",
          cost: "/",
        },
        {
          name: "ตรวจการทำงานของตับ (SGOT)",
          cost: "/",
        },
        {
          name: "ตรวจการทำงานของตับ (SGPT)",
          cost: "/",
        },
        {
          name: "ตรวจการทำงานของตับ (Alkaline Phosphatase)",
          cost: "/",
        },
        {
          name: "ตรวจหาค่าเก๊าท์ (Uric acid)",
          cost: "/",
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
  background-color: #FFECE0; /* Replace #yourColor with your desired color */
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
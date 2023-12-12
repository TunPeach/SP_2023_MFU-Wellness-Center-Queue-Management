<template>
  <div>
    <NavbarFon />
    <v-app>
      <v-main class="custom-main-color">

 
    <v-container>
      <v-sheet
        class="box"
        style="margin-top: 20px; margin-left: 62px; padding-top: 47px"
        height="2140px"
        width="1101"
      >
        <div style="margin-left: 12px; margin-bottom: 20px">
          <h2 class="header font-display" style="color: #61513f">
              บริการตรวจสุขภาพเพิ่มเติม พนักงานมฟล น้อยกว่าหรือเท่ากับ 35 ปี
          </h2>
        </div>
        <v-row style="padding-bottom: 1px">
          <img src="./Money.png" height="18px" style="margin-left: 930px;" />
        </v-row>
        <!--------------------------------------- Table data start------------------------------------------------------->
        <v-simple-table class="custom-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="font-display" style="color: #61513f">
                  <h3>รายการ</h3>
                </th>
                <th class="text-center font-display" style="color: #61513f">
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
                  <h3 style="color: orange;">{{ item.cost }}</h3>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <!--------------------------------------- Table data end------------------------------------------------------->
        <v-btn
        rounded
        outlined
        class="btn-custom font-display"
        style="
        width: 405px;
        margin-left: 290px;
        margin-top: 30px;
        padding-left: 40px;
        padding-right: 40px;
        font-size: 15px;
        font-weight: bold;
        "
        >เริ่มต้นการจองเลย !</v-btn
      >
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
          name: "ชั่งน้ำหนัก วัดความดัน ตรวจร่างกายโดยแพทย์ (PE)",
          cost: "220 ฿",
        },
        {
          name: "ตรวจสมบูรณ์ของเม็ดเลือด ดูภาวะซีด (CBC)",
          cost: "90 ฿",
        },
        {
          name: "ตรวจปัสสาวะดูการอักเสบ นิ่ว และโรคในทางเดินปัสสาวะ (Urine analysis)",
          cost: "50 ฿",
        },
        {
          name: "ตรวจอุจจาระทั่วไป (Direct Smear stool)",
          cost: "30 ฿",
        },
        {
          name: "เอกซ์เรย์ทรวงอก (Chest X-ray)",
          cost: " 170 ฿",
        },
        {
          name: "การตรวจระดับน้ำตาลในเลือด (Glucose)",
          cost: " 40 ฿",
        },
        {
          name: "ตรวจระดับคอเลสเตอรอลในเลือด (Cholesterol)",
          cost: "60 ฿",
        },
        {
          name: "ตรวจระดับไขมันกลีเซอไรด์ในเลือด (Triglyceride)",
          cost: "60 ฿",
        },
        {
          name: "ตรวจการทำงานของไต (BUN)",
          cost: " 50  ฿",
        },
        {
          name: "ตรวจการทำงานของไต (Creatinine)",
          cost: "50 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (SGOT)  ",
          cost: "50 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (SGPT)",
          cost: "50 ฿",
        },
        {
          name: "ตรวจการทำงานของตับ (Alkaline Phosphatase)",
          cost: "50 ฿",
        },
        {
          name: "ตรวจหาสารก่อให้เกิดเก๊าท์ (Uric Acid)",
          cost: "60 ฿",
        },
        {
          name: "การตรวจภายใน",
          cost: "100 ฿",
        },
        {
          name: "การตรวจหาเซลล์มะเร็งปากมดลูก โดยวิธี Pap Smear ความแม่นยำ 50%",
          cost: "100 ฿",
        },
        {
          name: "ตรวจมะเร็งปากมดลูกแบบ ThinPrep (ตรวจหาเซลล์ผิดปกติบริเวณปากมดลูก) ความแม่นยำ 80% รวม+ (KEY เพิ่ม PV)  ",
          cost: "490+100 ฿",
        },
        {
          name: "ตรวจหาเชื้อไวรัสHVP เฮช พี วี(หาความเสี่ยงมะเร็งปากมดลูก) ความแม่นยำ99% รวม PV",
          cost: "910 ฿",
        },
        {
          name: "ตรวจหามะเร็งปากมดลูกแบบพิเศษ co-test ความแม่นยำ99% (ตรวจหาเซลล์มะเร็งผิดปกติและเชื้อไวรัสHPV）รวม PV",
          cost: " 1500  ฿",
        },
        {
          name: "ตรวจอุจจาระ ดูภาวะเลือดออกในทางเดินอาหาร (Hemoglobin detection stool)",
          cost: "80  ฿",
        },
        {
          name: "ตรวจอุจจาระ หาพยาธิ (Wet Smear For ova/parasite)",
          cost: "60  ฿",
        },
        {
          name: "ตรวจไขมันชนิดดีในเลือด HDL",
          cost: "100 ฿",
        },
        {
          name: "ตรวจไขมันชนิดร้ายในเลือด LDL",
          cost: "150 ฿",
        },
        {
          name: "ตรวจความหนาแน่นของมวลกระดูก (Bone density)",
          cost: " 300 ฿",
        },
        {
          name: "ตรวจคลื่นไฟฟ้าหัวใจ (E.C.G)",
          cost: "200 ฿",
        },
        {
          name: "ตรวจสารบ่งชี้มะเร็งตับจากเลือด (AFP)",
          cost: "250 ฿",
        },
        {
          name: "ตรวจสารบ่งชี้มะเร็งลำไส้ใหญ่และทวาร (CEA) ตับ ตับอ่อน กระเพาะอาหาร เต้านม ปอด รังไข่ กระเพาะปัสสาวะ ต่อมน้ำเหลือง",
          cost: "280 ฿",
        },
        {
          name: "ตรวจสารบ่งชี้มะเร็งต่อมลูกหมากจากเลือด (PSA)",
          cost: "300 ฿",
        },
        {
          name: "ตรวจสารบ่งชี้มะเร็งตับอ่อน  ลำไส้ใหญ่ ลำไส้ตรง กระเพาะอาหาร ท่อน้ำดี (CA 19-9)",
          cost: "550 ฿",
        },
        {
          name: "ตรวจสารบ่งชี้มะเร็งเต้านม ปอด รังไข่ เยื่อบุโพรงมดลูก กระเพาะปัสสาวะ ทางเดินอาหาร (CA153)",
          cost: "550 ฿",
        },
        {
          name: "ตรวจสารบ่งชี้มะเร็งรังไข่ เยื่อบุโพรงมดลูก มดลูก ปากมดลูก เต้านม ลำไส้ใหญ่ ลำไส้ตรง ตับอ่อน ตับ ปอด (CA-125)",
          cost: " 550 ฿",
        },
        {
          name: "ตรวจหาเชื้อไวรัสตับอักเสบบี (Hepatitis B Antigen-HBs Ag)",
          cost: "130 ฿",
        },
        {
          name: "ตรวจหาภูมิคุ้มกันไวรัสตับอักเสบบี (Hepatitis B Antibody-HBs Ab)",
          cost: "150 ฿",
        },
        {
          name: "  บาทตรวจหาเชื้อไวรัสตับอักเสบซี (Anti HCV)",
          cost: "300 ฿",
        },
        {
          name: "ตรวจการทำงานของต่อมไทรอยด์(FT3,FT4,TSH)",
          cost: "490 ฿",
        },
        {
          name: "ตรวจหามะเร็งเต้านมด้วยวิธี แมมโมแกรม (Mammogram with Ultrasound)",
          cost: "2,400 ฿",
        },
        {
          name: "ตรวจอัลตราซาวด์ช่องท้อง (Ultrasound Whole abdomen)",
          cost: "1,200 ฿",
        },
        {
          name: "ตรวจอัลตราซาวด์ช่องท้องส่วนบน (Ultrasound upper abdomen)",
          cost: "800 ฿",
        },
        {
          name: "ตรวจอัลตราซาวด์ช่องท้องส่วนล่าง (Ultrasound lower abdomen)",
          cost: "800 ฿",
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

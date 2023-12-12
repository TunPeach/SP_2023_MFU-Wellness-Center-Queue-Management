<template>
  <div>
    <NavbarFon />
    <v-app>
    <v-main class="custom-main-color">
      <v-container  fluid class="d-flex align-center justify-center">
      <v-sheet
      
        class="box"
        style="margin: 50px;  "
        height="auto"
        width="auto"
      >
        <div style="margin-left: 12px; margin-bottom: 20px; margin-top: 20px" >
          <h2 class="header-title font-display">ตรวจสุขภาพ</h2>
          <p class="subheader font-display" style="padding-top: 10px;">
            โปรดเลือกบริการตรวจสุขภาพของคุณ
          </p>
        </div>

        <v-row>
          <v-col md="4" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto"
              width="auto"
              outlined
            >
              <h2 class="font-display" style="font-size: 20px; ">ตรวจสุขภาพสำหรับ</h2>
              <h2 class="font-display" style="font-size: 20px; color: #F17223;">ข้าราชการ / อปท.</h2>
              <p class="font-display" style="padding-top: 10px;">
                สำหรับพนักงานส่วนท้องถิ่น และลูกจ้างประจำของ อปท.
                ผู้ได้รับบำนาญหรือนายกองค์การบริหารส่วน จังหวัด
              </p>
              <NuxtLink
                to="/checkupservice/civil_servants"
                style="text-decoration: none"
              >
              <v-col align="end" justify="end" style="padding: 0px; padding-right: 20px;">
                <v-btn
                  outlined
                  style="
                    
                    border-radius: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    
                    
                  "
                  class="btn-custom font-display"
                >
                  รายละเอียด
                </v-btn>
              </v-col>
              </NuxtLink>
            </v-card>
          </v-col>

          <v-col md="4" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px; padding-right: 6px"
              class="cardcontent"
              height="auto"
              width="auto"
              outlined
            >
              <h2 class="font-display" style="font-size: 20px;">ตรวจสุขภาพ โปรโมชั่น</h2>
              <h2 class="font-display" style="font-size: 20px; color: #F17223;">ราคา 999 บาท</h2>
              <p class="font-display"  style="padding-top: 10px;">
                โปรแกมตรวจสุขภาพ โปรโมชั่น ราคา 999 บาท
                ของศูนย์บริการสุขภาพมหาลัยแม่ฟ้าหลวง
              </p>
              <NuxtLink
                to="/checkupservice/promotion"
                style="text-decoration: none"
              >
              <v-col align="end" justify="end" style="padding: 0px; padding-right: 20px;">
                <v-btn
                  outlined
                  style="
                   
                    border-radius: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                   
                  "
                  class="btn-custom font-display"
                >
                  รายละเอียด
                </v-btn>
              </v-col>
              </NuxtLink>
            </v-card>
          </v-col>

          <v-col md="4" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px; padding-right: 6px"
              class="cardcontent"
              height="auto"
              width="auto"
              outlined
            >
              <h2 class="font-display" style="font-size: 20px;">
                ตรวจสุขภาพสำหรับพนักงาน
              </h2>
              <h2 class="font-display" style="font-size: 20px; color: #F17223;">
                มหาวิทยาลัยแม่ฟ้าหลวง
              </h2>
              <h2 class="font-display"></h2>
              <p class="font-display"  style="padding-top: 10px;">
                สำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง เรามีบริการตรวจสุขภาพทั้งหมด
                20 รายการ
              </p>
              <NuxtLink
                to="/checkupservice/employee"
                style="text-decoration: none"
              >
              <v-col align="end" justify="end" style="padding: 0px; padding-right: 20px;">
                <v-btn
                
                  outlined
                  style="
                    
                    border-radius: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    
                  "
                  class="btn-custom font-display"
                >
                  รายละเอียด
                </v-btn>
              </v-col>
                
              </NuxtLink>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </v-main>
  <Footer/>
</v-app>
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

.font-display {
  font-family: "Kanit";
}

.box {
  border-radius: 50px;
  max-width: 1200px; /* Max width for larger screens */
  margin: 50px auto; /* Center the box */
}

.cardcontent {
  border-radius: 12px;
  max-width: 300px; /* Max width for cards */
  margin: 0 auto; /* Center cards within v-col */
}

.btn-custom {
  background: linear-gradient(
    to right,
    rgba(241, 114, 35, 100%),
    rgba(241, 114, 35, 75%)
  );
  color: white;
}

.header-title {
  font-weight: bold;
  font-size: 2em; /* Responsive font size */
}

.subheader {
  font-size: 1.5em; /* Responsive font size */
}

@media (max-width: 600px) {
  .header {
    font-size: 1.75em; /* Smaller font for smaller screens */
  }
  .subheader {
    font-size: 1.25em; /* Smaller font for smaller screens */
  }
}
</style>

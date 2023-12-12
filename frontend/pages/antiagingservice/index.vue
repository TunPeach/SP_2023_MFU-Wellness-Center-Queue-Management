<template>
  <div>
    <NavbarFon />
    <v-app>
      <v-main class="custom-main-color">

      
    <v-container fluid>
      <v-sheet
        class="box"
        style="
          margin: 150px;
          margin-top: 20px;
          margin-bottom: 20px;
          padding-top: 20px;
        "
        height="auto"
        width="auto"
      >
        <div style="margin-left: 12px; margin-bottom: 20px">
          <h2 class="header font-display">เวชศาสตร์ชะลอวัย</h2>
          <p class="subheader font-display">
            โปรดเลือกบริการเวชศาสตร์ชะลอวัยของคุณ
          </p>
        </div>

        <v-row>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">ทรีตเม้นท์หน้าใส</h2>
              <p class="font-display" style="padding-top: 10px">
                ทรีทเมนท์หน้าใสในรายการหัตถการของคลินิกเวชศาสตร์ชะลอวัยและความงาม
                มีรายการทั้งหมด 3 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/facial_treatment"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>

          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">รักษาสิว</h2>
              <p class="font-display" style="padding-top: 10px">
                รักษาสิวในรายการหัตถการของคลินิกเวชศาสตร์ชะลอวัยและความงาม
                มีรายการทั้งหมด 2 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/acne_treatment"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row
                style="margin-top: 0px; margin-left: 0px; margin-bottom: 0px"
              >
                <h2 class="font-display titleheader">เลเซอร์หน้าใส</h2>
                <h2
                  class="font-display titleheader"
                  style="margin-left: 5px; color: #f17223"
                >
                  รักษาฝ้า
                </h2>
              </v-row>

              <p class="font-display" style="padding-top: 10px">
                เลเซอร์หน้าใส รักษาฝ้า ในรายการหัตถการของ
                คลินิกเวชศาสตร์ชะลอวัยและความงาม มีรายการ ทั้งหมด 3 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/facial_laser"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 13px"
                >
                  เลเซอร์รักษา
                </h2>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 5px; color: #f17223"
                >
                  รอยสิว หลุมสิว
                </h2>
              </v-row>
              <p class="font-display" style="padding-top: 20px">
                เลเซอร์รักษารอยสิว หลุมสิว ในรายการหัตถการของ
                คลินิกเวชศาสตร์ชะลอวัยและความงาม มีรายการ ทั้งหมด 3 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/acne_laser"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row style="margin-top: 0px">
                <h2 class="font-display titleheader" style="margin-left: 10px">
                  ยกกระชับใบหน้า ด้วยเครื่อง
                </h2>
                <h2
                  class="font-display titleheader"
                  style="margin-left: 5px; color: #f17223"
                >
                  Ultformer lll
                </h2>
              </v-row>

              <p
                class="font-display"
                style="padding-top: 10px; padding-top: 30px"
              >
                ยกกระชับใบหน้า ด้วยเครื่อง Ultformer lll
                ในรายการหัตถการของคลินิกเวชศาสตร์ชะลอวัย และความงาม
                มีรายการทั้งหมด 4 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/face_lift"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>

          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 13px"
                >
                  ลดริ้วรอย
                </h2>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 5px; color: #f17223"
                >
                  KELOID
                </h2>
              </v-row>
              <p
                class="font-display"
                style="margin-top: 20px; padding-top: 10px"
              >
                ลดริ้วรอย ย้อนวัยผิวในรายการหัตถการของคลินิก
                เวชศาสตร์ชะลอวัยและความงาม มีรายการ ทั้งหมด 4 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/reduce_wrinkles"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row
                style="margin-top: 0px; margin-left: 0px; margin-bottom: 15px"
              >
                <h2 class="font-display titleheader">
                  กำจัดขนถาวร ด้วยเครื่อง
                </h2>
                <h2
                  class="font-display titleheader"
                  style="margin-left: 5px; color: #f17223"
                >
                  Long Pulse ND yag
                </h2>
              </v-row>
              <p class="font-display" style="padding-top: 10px">
                กำจัดขนถาวร ด้วยเครื่อง Long Pulse ND yag
                ในรายการหัตถการของคลินิกเวชศาสตร์ชะลอวัย และความงาม
                มีรายการทั้งหมด 5 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/hair_removal"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 13px"
                >
                  รักษาแผลเป็น
                </h2>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 5px; color: #f17223"
                >
                  KELOID
                </h2>
              </v-row>
              <p
                class="font-display"
                style="margin-top: 23px; padding-top: 10px"
              >
                รักษาแผลเป็น KELOIDในรายการหัตถการของคลินิก
                เวชศาสตร์ชะลอวัยและความงาม มีทั้งหมด 1 รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/scar_treatment"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row
                style="margin-top: 0px; margin-left: 0px; margin-bottom: 15px"
              >
                <h2 class="font-display titleheader">
                  จี้ไฝขี้แมลงวัน กระเนื้อ ติ่งเนื้อ
                </h2>
                <h2
                  class="font-display titleheader"
                  style="margin-left: 3px; color: #f17223"
                >
                  ด้วยเครื่อง CO2
                </h2>
              </v-row>

              <p class="font-display">
                จี้ไฝขี้แมลงวัน กระเนื้อ ติ่งเนื้อ ด้วยเครื่อง CO2
                ในรายการหัตถการของคลินิกเวชศาสตร์ชะลอวัย และความงาม มีทั้งหมด 1
                รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/co2_machine"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
          <v-col md="6" sm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <v-row>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 13px"
                >
                  เติมวิตามินสู่ผิว
                </h2>
                <h2
                  class="font-display titleheader"
                  style="margin-top: 10px; margin-left: 5px; color: #f17223"
                >
                  ราคา 690 บาท
                </h2>
              </v-row>
              <p class="font-display" style="margin-top: 27px">
                จี้ไฝขี้แมลงวัน กระเนื้อ ติ่งเนื้อ ด้วยเครื่อง CO2
                ในรายการหัตถการของคลินิกเวชศาสตร์ชะลอวัย และความงาม มีทั้งหมด 1
                รายการ
              </p>

              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
                <NuxtLink
                  to="/antiagingservice/vitamins_skin"
                  style="text-decoration: none"
                >
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
                </NuxtLink>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
   
  </v-main>
  <Footer />
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
}

.cardcontent {
  border-radius: 12px;
}

.btn-custom {
  background: linear-gradient(
    to right,
    rgba(241, 114, 35, 100%),
    rgba(241, 114, 35, 75%)
  );

  color: white;
}
.titleheader {
  font-size: 20px;
}

.header {
  font-weight: bold;
  font-size: 30px;
}

.subheader {
  font-size: 24px;
}
</style>

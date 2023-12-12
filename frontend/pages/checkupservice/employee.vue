<template>
  <div>
    <NavbarFon />
    <v-app>
      <v-main class="custom-main-color">
        <v-container fluid class="d-flex align-center justify-center">
          <v-sheet
            class="box"
            style="margin: 50px; padding-top: 20px"
            height="auto"
            width="auto"
          >
            <div
              style="margin-left: 12px; margin-bottom: 20px; margin-top: 20px"
            >
              <h2 class="header-title font-display">
                ตรวจสุขภาพสำหรับ พนักงาน มหาวิทยาลัยแม่ฟ้าหลวง
              </h2>
              <p class="subheader font-display" style="padding-top: 10px">
                โปรดเลือกบริการตรวจสุขภาพของคุณ
              </p>
            </div>

            <v-row>
              <v-col cols="12" md="6" lg="4">
                <v-card
                  elevation="3"
                  style="padding: 10px"
                  class="cardcontent"
                  height="auto;"
                  width="auto"
                  outlined
                >
                  <h2 class="font-display">สำหรับพนักงานอายุมากกว่า 35 ปี</h2>
                  <p class="font-display">
                    สำหรับพนักงานอายุมากกว่า 35 ปี เรามีบริการตรวจสุขภาพทั้งหมด
                    3 รายการ
                  </p>
                  <NuxtLink
                    to="/checkupservice/employeeOver35"
                    style="text-decoration: none"
                  >
                    <v-col align="end" justify="end" style="padding: 0px">
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

              <v-col cols="12" md="6" lg="4">
                <v-card
                  elevation="3"
                  style="padding: 10px; padding-right: 6px"
                  class="cardcontent"
                  height="auto;"
                  width="auto"
                  outlined
                >
                  <h2 class="font-display">สำหรับพนักงานอายุน้อยกว่า 35 ปี</h2>
                  <p class="font-display">
                    สำหรับพนักงานอายุน้อยกว่าหรือเท่ากับ 35 ปี
                    เรามีบริการตรวจสุขภาพทั้งหมด 3 รายการ
                  </p>
                  <NuxtLink
                    to="/checkupservice/employeeLower35"
                    style="text-decoration: none"
                  >
                    <v-col
                      align="end"
                      justify="end"
                      style="padding: 0px; padding-right: 20px"
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
                    </v-col>
                  </NuxtLink>
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
  max-width: 100%;
}

.btn-custom {
  background: linear-gradient(
    to right,
    rgba(241, 114, 35, 100%),
    rgba(241, 114, 35, 75%)
  );

  color: white;
}
.header-title,
.subheader {
  /* Resetting font sizes to use 'em' for better scaling */
  font-size: 1.875em; /* For .header */
  font-size: 1.5em; /* For .subheader */
}

@media (max-width: 768px) {
  .header,
  .subheader {
    font-size: 1.5em; /* Slightly smaller for .header on smaller screens */
    font-size: 1.25em; /* For .subheader */
  }
}
</style>

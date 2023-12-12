<template>
  <div>
    <NavbarFon />
    <v-app>
      <v-main class="custom-main-color">
    <v-container fluid>

      <v-sheet
        class="box"
        style="
          margin: 100px;
          margin-bottom: 90px;
          margin-top: 50px;
          padding-top: 20px;
        "
        height="auto"
        width="auto"
      >
        <div style="margin-left: 6px; margin-bottom: 20px">
          <h2 class="header font-display">
            ยกกระชับใบหน้า ด้วยเครื่อง Ultformer lll
          </h2>
          <p class="subheader font-display">
            โปรดเลือกบริการเวชศาสตร์ชะลอวัยของคุณ
          </p>
        </div>

        <v-row>
          <v-col md="4" sm="6" xm="12">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto"
              width="auto"
              outlined
            >
              <h2 class="font-display">Ultraformer เฉพาะจุด</h2>
              <p class="font-display">ราคาครั้งละ 4,000 บาท</p>
              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
              <nuxt-link to="/loginFon" style="text-decoration: none">
                <v-btn
                  outlined
                  style="
                    border-radius: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    
                  "
                  class="btn-custom font-display"
                >
                  จองเลย
                </v-btn>
              </nuxt-link>
              </v-col>
            </v-card>
          </v-col>

          <v-col md="4" sm="6" xm="12">
            <v-card
              elevation="3"
              style="padding: 20px; padding-right: 6px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display">Ultraformer กรอบหน้า</h2>
              <p class="font-display">ราคาครั้งละ 5,000 บาท</p>
              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
              <nuxt-link to="/loginFon" style="text-decoration: none">
                <v-btn
                  outlined
                  style="
                    border-radius: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    
                  "
                  class="btn-custom font-display"
                >
                  จองเลย
                </v-btn>
              </nuxt-link>
              </v-col>
            </v-card>
          </v-col>

          <v-col md="4" sm="6" xm="12">
            <v-card
              elevation="3"
              style="padding: 20px; padding-right: 6px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display">Ultraformer ทั่วหน้า</h2>
              <p class="font-display">ราคาครั้งละ 15,000 บาท</p>
              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
              <nuxt-link to="/loginFon" style="text-decoration: none">
                <v-btn
                  outlined
                  style="
                    border-radius: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    
                  "
                  class="btn-custom font-display"
                >
                  จองเลย
                </v-btn>
              </nuxt-link>
              </v-col>
            </v-card>
          </v-col>

          <v-col md="4" sm="6" xm="12">
            <v-card
              elevation="3"
              style="padding: 20px; padding-right: 6px"
              class="cardcontent"
              height="auto"
              width="auto"
              outlined
            >
              <h2 class="font-display">Ultraformer ยกกระชับ</h2>
              <h2 class="font-display">หน้าท้อง</h2>
              <p class="font-display">ราคาเริ่มต้นครั้งละ 4,500 บาท</p>
              <v-col
                align="end"
                justify="end"
                style="padding: 0px; padding-right: 20px"
              >
              <nuxt-link to="/loginFon" style="text-decoration: none">
                <v-btn
                  outlined
                  style="
                    border-radius: 10px;
                    padding-left: 20px;
                    padding-right: 20px;
                    
                  "
                  class="btn-custom font-display"
                >
                  จองเลย
                </v-btn>
              </nuxt-link>
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

.header {
  font-weight: bold;
  font-size: 30px;
}

.subheader {
  font-size: 24px;
}
</style>

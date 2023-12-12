<template>
  <div>
    <v-container fluid>
      <v-sheet class="box" style=" padding-top: 20px;" height="auto" width="auto">
        <div style="margin-left: 12px; margin-bottom: 20px">
          <h2 class="header font-display">ศูนย์วัคซีน</h2>
          <p class="subheader font-display">โปรดเลือกบริการวัคซีนของคุณ</p>
        </div>

        <v-row>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">
                วัคซีนไข้หวัดใหญ่ 4 สายพันธ์ุ
              </h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ราคา 400 บาท
              </h2>
              <p class="font-display">
                แนะนำให้ฉีดวัคซีนป้องกันไข้หวัดใหญ่ก่อนฤดูที่มี การระบาด (ฤดูฝน
                และ ฤดูหนาว) และฉีดอย่าง ต่อเนื่องเป็นประจำทุกปี
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px; padding-right: 6px"
              class="cardcontent font-display"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">วัคซีนไวรัสตับอักเสบบี</h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ราคา 163 บาท
              </h2>
              <p class="font-display">
                ป้องกันการติดเชื้อไวรัสที่ทำให้ตับอักเสบ หากฉีดครบ
                โดสตั้งแต่อายุไม่เกิน 6 เดือนอาจให้ผลป้องกัน
                การติดเชื้อได้ตลอดชีวิต
              </p>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">วัคซีนบาดทะยัก</h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ราคา 32 บาท
              </h2>
              <p class="font-display">
                ผู้ที่เป็นโรคบาดทะยักจำเป็นต้องได้รับการฉีดวัคซีน
                ป้องกันบาดทะยักทันทีที่ได้รับการวินิจฉัยโรค
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">
                วัคซีนบาดทะยัก-คอตีบ-ไอกรน
              </h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ชนิดไร้เซลล์ Tdap ราคา 880 บาท
              </h2>
              <p class="font-display">
                วัคซีนรวมโรค ใช้ในกรณีที่หากใช้วัคซีนไอกรนชนิดทั้ง
                เซลล์แล้วเกิดไข้สูง ชัก หรือกิดภาวะแทรกซ้อนรุนแรง
              </p>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">
                วัคซีนไข้หวัดใหญ่ 4 สายพันธ์ุ
              </h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ราคา 400 บาท
              </h2>
              <p class="font-display">
                แนะนำให้ฉีดวัคซีนป้องกันไข้หวัดใหญ่ก่อนฤดูที่มี การระบาด (ฤดูฝน
                และ ฤดูหนาว) และฉีดอย่าง ต่อเนื่องเป็นประจำทุกปี
              </p>
            </v-card>
          </v-col>

          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px; padding-right: 6px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">วัคซีนไวรัสตับอักเสบบี</h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ราคา 163 บาท
              </h2>
              <p class="font-display">
                ป้องกันการติดเชื้อไวรัสที่ทำให้ตับอักเสบ หากฉีดครบ
                โดสตั้งแต่อายุไม่เกิน 6 เดือนอาจให้ผลป้องกัน
                การติดเชื้อได้ตลอดชีวิต
              </p>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">วัคซีนบาดทะยัก</h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ราคา 32 บาท
              </h2>
              <p class="font-display">
                ผู้ที่เป็นโรคบาดทะยักจำเป็นต้องได้รับการฉีดวัคซีน
                ป้องกันบาดทะยักทันทีที่ได้รับการวินิจฉัยโรค
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">
                วัคซีนบาดทะยัก-คอตีบ-ไอกรน
              </h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ชนิดไร้เซลล์ Tdap ราคา 880 บาท
              </h2>
              <p class="font-display">
                วัคซีนรวมโรค ใช้ในกรณีที่หากใช้วัคซีนไอกรนชนิดทั้ง
                เซลล์แล้วเกิดไข้สูง ชัก หรือกิดภาวะแทรกซ้อนรุนแรง
              </p>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">วัคซีนบาดทะยัก</h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ราคา 32 บาท
              </h2>
              <p class="font-display">
                ผู้ที่เป็นโรคบาดทะยักจำเป็นต้องได้รับการฉีดวัคซีน
                ป้องกันบาดทะยักทันทีที่ได้รับการวินิจฉัยโรค
              </p>
            </v-card>
          </v-col>
          <v-col cols="12" md="6">
            <v-card
              elevation="3"
              style="padding: 20px"
              class="cardcontent"
              height="auto;"
              width="auto"
              outlined
            >
              <h2 class="font-display titleheader">
                วัคซีนบาดทะยัก-คอตีบ-ไอกรน
              </h2>
              <h2 class="font-display titleheader" style="color: #f17223">
                ชนิดไร้เซลล์ Tdap ราคา 880 บาท
              </h2>
              <p class="font-display">
                วัคซีนรวมโรค ใช้ในกรณีที่หากใช้วัคซีนไอกรนชนิดทั้ง
                เซลล์แล้วเกิดไข้สูง ชัก หรือกิดภาวะแทรกซ้อนรุนแรง
              </p>
            </v-card>
          </v-col>
          <v-row>
            <v-col align="center" justify="center">
              <nuxt-link to="/loginFon" style="text-decoration: none">
              <v-btn
                rounded
                outlined
                class="btn-custom font-display"
                style="
                  width: 405px;
                  margin-top: 20px;
                  font-size: 15px;
                  font-weight: bold;
                "
                >เริ่มต้นการจองเลย !</v-btn
              >
              </nuxt-link>
            </v-col>
          </v-row>
        </v-row>
      </v-sheet>
    </v-container>
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
  font-size: 32px;
}

.subheader {
  font-size: 24px;
}

.titleheader {
  font-size: 20px;
}
</style>

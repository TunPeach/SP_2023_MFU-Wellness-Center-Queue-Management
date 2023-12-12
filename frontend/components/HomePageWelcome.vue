<template>
  <div>
    <v-row no-gutters>
      <v-col lg="7" md="6" no-gutters>
        <img
          src="../images/Group 111.png"
          class="custom-max-height"
          width="auto"
        />
      </v-col>

      <v-col lg="5" md="6" style="background-color: white">
        <v-sheet color="white" height="100%" width="100%">
          <div class="d-flex align-center justify-center" style="height: 100%">
            <div class="head-welcome">
              <h1 class="head-homepage font-display" style="color: #f17223">
                อยู่อย่างปลอดภัย มีสุขภาพที่ดี
              </h1>
              <h5 class="subtext1 font-display">
                บริการจองคิวของ MFU Wellness Center
                เพื่อให้คุณได้รับความสะดวกสะบาย
              </h5>
              <h5 class="subtext2 font-display">
                “ให้พวกเราได้เป็นผู้ดูแล คนที่คุณรักนะครับ”
              </h5>
              <v-btn class="ma-2 font-display" outlined rounded color="#F17223">
                เยี่ยมชมบริการ
              </v-btn>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <h1
        class="font-display header"
        style="margin-right: 10px; color: #f17223"
      >
        บริการ
      </h1>
      <h1 class="font-display header" style="margin-left: 5px">ของเรา</h1>
    </v-row>
    <v-row>
      <v-col>
        <p class="font-display titleheader" style="text-align: center">
          ศูนย์บริการสุขภาพมหาลัยแม่ฟ้าหลวง เรามีบริการให้กับคุณหลักๆ 3
          รูปแบบคือ ตรวจสุขภาพ, ศูนย์วัคซีนและเวชศาสตร์ชะลอวัย
        </p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped>
.custom-max-height {
  max-height: 100vh; /* Responsive height */
  overflow-y: auto;
}

.font-display {
  font-family: "Kanit";
}

.head-welcome {
  margin: 10vh 5%; /* Responsive margin */
}

.head-homepage {
  font-size: 2vw; /* Responsive font size */
  padding-bottom: 10px;
}

.subtext1,
.subtext2 {
  padding-top: 10px;
  font-size: 1vw; /* Responsive font size */
}

.subtext2 {
  font-weight: bold;
  padding-bottom: 20px;
}

.header {
  font-size: 3vw; /* Responsive font size */
}

.titleheader {
  font-size: 20px; /* Responsive font size */
  text-align: center;
}

@media (max-width: 600px) {
  .head-homepage {
    font-size: 6vw; /* Adjust font size for smaller screens */
  }
  .subtext1,
  .subtext2 {
    font-size: 4vw; /* Adjust font size for smaller screens */
  }
  .header,
  .titleheader {
    font-size: 5vw; /* Adjust font size for smaller screens */
  }
  .head-welcome {
    margin: 20px; /* Adjust margins for smaller screens */
  }
}
</style>

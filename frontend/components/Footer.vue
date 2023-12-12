<template>
  <v-footer color="#F49255" padless >
    <v-container style="margin-top: 12px">
      <v-row>
        <v-col sm="4">
          <div class="heading-container">
            <p class="headerText font-display">ติดต่อได้ที่</p>
          </div>
          <div class="heading-container">
            <p class="heading font-display">สถานที่</p>
            <p class="address font-display">ศูนย์บริการสุขภาพมหาลัยแม่ฟ้าหลวง</p>
          </div>
          <div class="heading-container">
            <p class="headerText font-display">อีเมล</p>
            <p class="email font-display">wellness-center@mfu.ac.th.</p>
          </div>
          <div class="heading-container">
            <p class="heading font-display">เบอร์ติดต่อ</p>
            <p class="phonenumber font-display">053 917 568</p>
          </div>
        </v-col>

        <v-col sm="3">
          <div class="heading-container">
            <p class="headerText font-display">เวลาทำการ</p>
          </div>
          <div class="heading-container">
            <p class="font-display">วันจันทร์ - วันศุกร์ 8:00–16:00</p>
          </div>
          <div class="heading-container">
            <p class="font-display">วันเสาร์ - อาทิตย์ ปิดทำการ</p>
          </div>
        </v-col>

        <v-col sm="2">
          <div class="heading-container">
            <p class="headerText font-display">เมนู</p>
          </div>
          <div class="heading-container">
            <p class="font-display">
              <!-- <a href="/" style="text-decoration: none; color: white"
                >หน้าหลัก</a
              > -->
              <router-link to="/" class="font-display"  style="text-decoration: none; color: white">หน้าหลัก</router-link>
            </p>
          </div>
          <div class="heading-container">
            <p class="font-display font-display">
              <!-- <a href="/" style="text-decoration: none; color: white">บริการ</a> -->
              <router-link to="/" class="font-display"  style="text-decoration: none; color: white">บริการ</router-link>
            </p>
          </div>
          <div class="heading-container">
            <p class="font-display">
              <!-- <a href="/" style="text-decoration: none; color: white">แผนที่</a> -->
              <router-link to="/map" class="font-display"  style="text-decoration: none; color: white">แผนที่</router-link>
            </p>
          </div>
        </v-col>

        <v-col sm="3">
          <div class="heading-container">
            <img
              src="../images/Facebook.png"
              width="30px"
              height="30px"
              alt="Facebook"
            />
            <a
              href="https://www.facebook.com/MFUWellnessCenter"
              style="text-decoration: none"
              ><p class="iconcontacts font-display">MFU Wellness Center</p></a
            >
          </div>
          <div class="heading-container font-display">
            <img
              src="../images/Line_white.png"
              width="30px"
              height="30px"
              alt="Line_white"
            />
            <a href="https://lin.ee/QGGB253" style="text-decoration: none"
              ><p class="iconcontacts font-display">MFUwellnesscenter</p></a
            >
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
  }),
};
</script>

<style scoped>
.font-display{
  font-family: 'Kanit'
}

.heading-container {
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.headerText {
  color: white;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
}

.heading {
  color: white;
  font-size: 16px;
  font-weight: bold;
  line-height: 1.2;
}

.email {
  color: white;
  margin-left: 61px;
}

.address {
  color: white;
  margin-left: 46px;
}

.phonenumber {
  color: white;
  margin-left: 20px;
}

.iconcontacts {
  margin-top: 15px;
  margin-left: 10px;
  color: #ffffff;
}
</style>
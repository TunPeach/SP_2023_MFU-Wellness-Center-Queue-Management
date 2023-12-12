<template>
  <section id="section-1">
    <v-container >
      <v-row no-gutters>
        <v-col order="last" md="4" sm="12">
          <v-card
            class="mx-auto"
            max-width="300"
            style="
              border-radius: 12px;
              box-shadow: 0px 2px 4px rgba(241, 114, 35, 33%);
            "
          >
            <v-card-text>
              <p class="color-header font-display subheader">เวชศาสตร์ชะลอวัย</p>

              <div class="text--primary font-display">
                ฟื้นฟูเซลล์และสร้างเซลล์ใหม่ให้ดูอ่อนกว่า วัยจากภายในสู่ภายนอก
                ศาสตร์ของการ ชะลอวัยโดยนำเทคโนโลยีมาช่วยแก้ปัญหา
              </div>
            </v-card-text>
            <v-card-actions>
              <NuxtLink to="/antiagingservice" style="text-decoration: none">
              <v-btn
                rounded
                outlined
                class="btn-custom font-display"
                style="
                  margin-left: 17px;
                  margin-bottom: 11px;
                  padding-left: 110px;
                  padding-right: 110px;
                "
                >เริ่ม!</v-btn
              >
            </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col md="4" sm="12">
          <v-card
            class="mx-auto"
            max-width="300"
            style="
              border-radius: 12px;
              box-shadow: 0px 2px 4px rgba(241, 114, 35, 33%);
            "
          >
            <v-card-text>
              <p class="color-header font-display subheader">ศูนย์วัคซีน</p>

              <div class="text--primary font-display">
                จุดประสงค์ในการฉีดวัคซีนนั้นเพื่อป้อง กันโรคติดต่อร้ายแรง
                ช่วยลดการแพร่ ระบาดและลดผลกระทบที่ร้ายแรง
              </div>
            </v-card-text>
            <v-card-actions>
              <NuxtLink to="/vaccineservice" style="text-decoration: none">
              
              <v-btn
                class="btn-custom font-display"
                rounded
                outlined
                style="
                  width: 250px;
                  margin-left: 17px;
                  margin-bottom: 11px;
                "
              >
                เริ่ม!
              </v-btn>
            </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col order="first" md="4" sm="12">
          <v-card
            class="mx-auto"
            max-width="300"
            style="
              border-radius: 12px;
              box-shadow: 0px 2px 4px rgba(241, 114, 35, 33%);
            "
          >
            <v-card-text>
              <p class="color-header font-display subheader" >ตรวจสุขภาพ</p>

              <div class="text--primary font-display">
                การมีสุขภาพที่ดีเป็นสิ่งที่ทุกคนปรารถนา
                ยิ่งในปัจจุบันที่มีโรคระบาด ดังนั้นจึง
                อยากเรียนเชิญมาตรวจสุขภาพประจำปี
              </div>
            </v-card-text>
            <v-card-actions>
              <NuxtLink to="/checkupservice" style="text-decoration: none">
              <v-btn
                class="btn-custom font-display"
                rounded
                outlined
                style="
                  margin-left: 17px;
                  margin-bottom: 11px;
                  padding-left: 110px;
                  padding-right: 110px;
                "
              >
                เริ่ม!
              </v-btn>
            </NuxtLink>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style scoped>
.font-display{
  font-family: 'Kanit'
}
.btn-custom {
  background: linear-gradient(
    to right,
    rgba(241, 114, 35, 100%),
    rgba(241, 114, 35, 75%)
  );

  color: white;
}
.color-header{
  padding-top: 10px;
  font-weight: bold;
  font-size: 30px;
  color: black;
}

.header{
  font-size: 32px;
}
.subheader{
  font-size: 24px;
}

.title{
  font-size: 20px;
}
</style>
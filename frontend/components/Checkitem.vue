<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="heading-container">
          <p class="title-main">บริการที่เลือก</p>
        </div>
        <div class="heading-container">
          <p class="heading-package">แพ็กเกจ</p>
          <p class="heading-package-name">ตรวจสุขภาพสำหรับข้าราชการ / อปท.</p>
        </div>
        <div class="heading-container">
          <p class="heading-age">อายุ</p>
          <p class="heading-age-output">ไม่เกิน 35 ปี</p>
          <p class="heading-gender">เพศ</p>
          <p class="heading-gender-output">ชาย</p>
        </div>
        <div class="heading-container">
          <p class="heading-package-cost">ราคาแพ็กเกจ</p>
          <p class="heading-package-cost-output">560 บาท</p>
        </div>
      </v-col>
    </v-row>
    <!--------------------------------------- Table data start------------------------------------------------------->
    <v-simple-table fixed-header height="300px">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">รายการตรวจสุขภาพเพิ่มเติม</th>
            <th class="text-left">ราคา</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in desserts" :key="item.nameservice">
            <td>{{ item.nameservice }}</td>
            <td>{{ item.cost }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <!--------------------------------------- Table data end------------------------------------------------------->
      <div class="accpte" >
      <v-btn rounded color="primary" dark> Rounded Button </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          nameservice: "ชั่งน้ำหนัก วัดความดัน ตรวจร่างกายโดยแพทย์ (PE)",
          cost: 120,
        },
        {
          nameservice: "ตรวจความหนาแน่นของมวลกระดูก (Bone density)",
          cost: 300,
        },
        {
          nameservice: "ชั่งน้ำหนัก วัดความดัน ตรวจร่างกายโดยแพทย์ (PE)",
          cost: 120,
        },
        {
          nameservice: "ตรวจความหนาแน่นของมวลกระดูก (Bone density)",
          cost: 300,
        },
        {
          nameservice: "ชั่งน้ำหนัก วัดความดัน ตรวจร่างกายโดยแพทย์ (PE)",
          cost: 120,
        },
        {
          nameservice: "ตรวจความหนาแน่นของมวลกระดูก (Bone density)",
          cost: 300,
        },
      ],
    };
  },
};
</script>

<style scoped>
.heading-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.title-main {
  margin-right: 20px;
  font-size: 24px;
  font-weight: bold;
  line-height: 1.2;
}

.heading-package {
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
}

.heading-package-name {
  margin-right: 20px;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.2;
}

.heading-age {
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
}
.heading-age-output {
  margin-right: 20px;
  font-size: 20px;
  font-weight: normal;
  line-height: 1.2;
}

.heading-gender {
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
}

.heading-gender-output {
  font-size: 20px;
  font-weight: normal;
  line-height: 1.2;
}
.heading-package-cost {
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
}

.heading-package-cost-output {
  font-size: 20px;
  font-weight: normal;
  line-height: 1.2;
}

.accpte {
  
  position:relative; 
  margin-right: 600px;

}
</style>

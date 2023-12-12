<template>
  <div>
    <v-toolbar elevation="0" color="#F49255" class="font-display custom-toolbar">
      <!-- Main Tabs -->
      <v-tabs dark>
        <v-tab class="color--text" @click="changeTab('ChangePriceHealthCheck')">
          ตรวจสุขภาพ
        </v-tab>
        <v-tab class="color--text" @click="changeTab('ChangePriceVaccine')">
          วัคซีน
        </v-tab>
        <v-tab class="color--text" @click="changeTab('ChangePriceAntiaging')">
          เวชศาสตร์ชะลอวัย
        </v-tab>
      </v-tabs>
      <!-- <v-btn class="align-self-center" elevation="0" color="success" @click="savePrices">บันทึก</v-btn> -->
    </v-toolbar>

    <!-- Subtabs -->
    <v-toolbar v-if="activeTab === 'ChangePriceHealthCheck'" elevation="0" color="#F49255"
      class="font-display custom-toolbar">
      <v-tabs dark>
        <v-tab class="color--text" @click="changeSubTab('ChangePriceGvm')">
          สำหรับข้าราชการ/อปท.
        </v-tab>
        <v-tab class="color--text" @click="changeSubTab('ChangePricePromotion')">
          โปรโมชั่น
        </v-tab>
        <v-tab class="color--text" @click="changeSubTab('ChangePriceOfficer')">
          สำหรับพนักงานมหาวิทยาลัยแม่ฟ้าหลวง
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <!-- Content for subtabs and main tabs -->
    <div v-if="activeTab === 'ChangePriceHealthCheck'">
      <ChangePriceGvm v-if="activeSubTab === 'ChangePriceGvm'" :typeId="typeId"
        @servicePriceChanged="handleServicePriceChanged" @subservicePriceChanged="handleSubservicePriceChanged" />
      <ChangePricePromotion v-if="activeSubTab === 'ChangePricePromotion'" :typeId="typeId"
        @servicePriceChanged="handleServicePriceChanged" @subservicePriceChanged="handleSubservicePriceChanged" />
      <ChangePriceOfficer v-if="activeSubTab === 'ChangePriceOfficer'" :typeId="typeId"
        @servicePriceChanged="handleServicePriceChanged" @subservicePriceChanged="handleSubservicePriceChanged" />
    </div>
    <div v-else-if="activeTab === 'ChangePriceVaccine'">
      <ChangePriceVaccine :typeId="typeId" @servicePriceChanged="handleServicePriceChanged" />
    </div>
    <div v-else-if="activeTab === 'ChangePriceAntiaging'">
      <ChangePriceAntiaging :typeId="typeId" @subservicePriceChanged="handleSubservicePriceChanged" />
    </div>
    <template>
      <v-snackbar class="font-display" v-model="snackbar">
        แก้ไขราคาบริการสำเร็จ!
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            ปิด
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </div>
</template>

<script>
import ChangePriceVaccine from './ChangePriceVaccine.vue';
import ChangePriceAntiaging from './ChangePriceAntiaging.vue';
import ChangePriceGvm from './ChangePriceGvm.vue';
import ChangePricePromotion from './ChangePricePromotion.vue';
import ChangePriceOfficer from './ChangePriceOfficer.vue';

export default {
  components: {
    ChangePriceVaccine,
    ChangePriceAntiaging,
    ChangePriceGvm,
    ChangePricePromotion,
    ChangePriceOfficer,
  },
  data() {
    return {
      activeTab: 'ChangePriceHealthCheck',
      activeSubTab: 'ChangePriceGvm',
      typeId: 1,
      prices: [],
      currentServiceId: 0,
      newPrice: 0,
      currentSubserviceId: 0,
      newSubPrice: 0,
      snackbar: false,
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      if (tab === 'ChangePriceHealthCheck') {
        this.typeId = 1;
      } else if (tab === 'ChangePriceVaccine') {
        this.typeId = 2;
      } else if (tab === 'ChangePriceAntiaging') {
        this.typeId = 3;
      }
    },
    changeSubTab(subTab) {
      this.activeSubTab = subTab;
    },

    async savePrices() {
      try {
        if (this.currentServiceId !== 0) {
          const response = await this.$axios.put(`/qmanagement/api/prices/${this.currentServiceId}`, {
            service_price: this.newPrice,
          });
          console.log('Main-service:', response.data);
        }
        if (this.currentSubserviceId !== 0) {
          const subserviceResponse = await this.$axios.put(`/qmanagement/api/price/${this.currentSubserviceId}`, {
            subservice_price: this.newSubPrice,
          });
          console.log('Sub-service:', subserviceResponse.data)
        }
        this.snackbar = true;
      } catch (error) {
        console.error(error);
      }
    },

    handleServicePriceChanged({ serviceId, newPrice }) {
      console.log(`Service Price Changed for serviceId ${serviceId}: ${newPrice}`);
      console.log(typeof serviceId)

      this.currentServiceId = serviceId;
      this.newPrice = newPrice;
    },

    handleSubservicePriceChanged({ subserviceId, newPrice }) {
      console.log(`Service Price Changed for serviceId ${subserviceId}: ${newPrice}`);
      console.log(typeof subserviceId)

      this.currentSubserviceId = subserviceId;
      this.newSubPrice = newPrice;
    },
  },
};
</script>

<style scoped>
.ml-auto {
  margin-left: auto !important;
}
</style>

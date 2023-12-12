<template>
  <div>
    <Navbar />
    <v-container>
      <v-sheet color="#ffffff" style="border-radius:20px">
      <v-toolbar elevation="0" color="#F49255" class="font-display custom-toolbar">
        <v-tabs dark>
          <v-tab
            class=" color--text"
            @click="
              ManageQueueTab = true;
              ChangePriceTabs = false;

            "
            >จัดการคิว</v-tab
          >
          <v-tab
          class=" color--text"
            @click="
              ManageQueueTab = false;
              ChangePriceTabs = true;

            "
            >แก้ไขราคาบริการ</v-tab
          >
        </v-tabs>
        <v-btn v-if="!ManageQueueTab" class="align-self-center" elevation="0" color="success" @click="savePrices">บันทึก</v-btn>
      </v-toolbar>
      <div>
        <ManageQueueTab v-if="ManageQueueTab" />
        <ChangePriceTabs v-if="ChangePriceTabs" />
      </div>
    </v-sheet>
    </v-container>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  data() {
    return {
      ManageQueueTab: true,
      ChangePriceTabs: false,
    }
  },
  methods: {
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
.font-display {
  font-family: "Kanit";
  
}
.color--text {
  font-size: 18px;
  
  color: #ffffff;
}

.custom-toolbar {
  border-radius: 12px 12px 0 0; /* Set border radius for bottom-left and top-right corners */
  /* Additional styles for spacing, padding, etc. */
}
</style>




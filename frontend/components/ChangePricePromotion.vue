<template>
  <div class="font-display">
    <v-simple-table class="custom-table" fixed-header>
      <template v-slot:default>
        <tbody>
          <tr v-for="item in prices" :key="item.service_name">
            <td class="font-display">ราคา</td>
            <td class="text-center font-display">
              <v-col cols="6">
                <v-text-field style="width: 100px" suffix="฿" v-model="item.service_price"
                  @input="emitServicePriceChange(48, item.service_price)"></v-text-field>
              </v-col>
            </td>
          </tr>
          <v-divider></v-divider>
        </tbody>
        <tbody v-for="(item, index) in cates" :key="index">
          <tr elevation="0" color="#F49255" class="font-display custom-toolbar">
            <td class="font-display" colspan="2" style="margin-top: 25px; background-color: #fecfb2">
              <v-toolbar flat style="background-color: #fecfb2">
                <v-toolbar-title class="font-display">
                  {{ item.category_name }}
                </v-toolbar-title> </v-toolbar>
            </td>
          </tr>
          <tr v-for="(subItem, subIndex) in item.subservices" :key="subIndex">
            <td class="subservice-name font-display" style="margin-left: 15px; margin-top: 10px">
              {{ subItem.subservice_name }}
            </td>
            <td>
              <v-col cols="6">
                <v-text-field style="width: 100px" suffix="฿" v-model="subItem.subservice_price"
                  @input="emitSubservicePriceChange(subItem.subservice_ID, subItem.subservice_price)"></v-text-field>
              </v-col>
            </td>
          </tr>
          <v-divider></v-divider>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    typeId: Number,
  },
  data() {
    return {
      items: [],
      typeId: 0,
      objs: [],
      cates: [],
      age_ID: 0,
      gender: [],
      gender_ID: 0,
      prices: [],
      selectedService: "ตรวจสุขภาพ โปรโมชั่น ราคา 999 บาท",
    };
  },

  async created() {
    console.log(this.typeId);
    const res = await this.$axios.get("/qmanagement/api/checkup", {
      params: {
        serviceId: 48,
      },
    });
    this.prices = res.data.response;

    const result = await this.$axios.get("/qmanagement/api/category");
    this.cates = result.data.response;
    console.log(this.cates);
    this.serviceId = 48;
    this.fetchSubservices(this.serviceId);
  },

  methods: {
    async fetchSubservices(serviceId) {
      for (let i = 0; i < this.cates.length; i++) {
        const response = await this.$axios.get("/qmanagement/api/checkupsub", {
          params: {
            categoryId: this.cates[i].category_ID,
            serviceId: serviceId,
          },
        });
        console.log(this.cates[i].category_ID);
        this.$set(this.cates[i], "subservices", response.data.response);
      }
    },

    emitServicePriceChange(serviceId, newPrice) {
      this.$emit('servicePriceChanged', { serviceId, newPrice });
      console.log(`Service Price Changed emitted for serviceId ${serviceId}: ${newPrice}`);
    },

    emitSubservicePriceChange(subserviceId, newPrice) {
      this.$emit('subservicePriceChanged', { subserviceId, newPrice });
      console.log(`Service Price Changed emitted for serviceId ${subserviceId}: ${newPrice}`);
    },
  },
};
</script>

<style scoped>
.font-display {
  font-family: "Kanit";
}
</style>

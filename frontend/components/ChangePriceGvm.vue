<template>
  <div class="font-display">
    <v-container fluid>
      <v-row>
        <v-col>
          <v-radio-group class="radio-group-age" row>
            <h4 style="margin-right: 30px" class="font-display">
              ช่วงอายุ
            </h4>
            <div v-for="item in objs" :key="item.age_ID" style="display: flex; align-items: center; margin-right: 30px">
              <input type="radio" :id="item.age_ID" :value="item.age_ID" v-model="selectedAgeId"
                :name="radioGroupNameAge" />
              <label style="margin-left: 10px;" :for="item.age_ID" class="radio-label font-display">{{
                item.age_detail
              }}</label>
            </div>
          </v-radio-group>
        </v-col>
        <v-col>
          <v-radio-group class="radio-group-gender" row>
            <h4 style="margin-right: 60px" class="font-display">เพศ</h4>
            <div v-for="item in gender" :key="item.gender_ID"
              style="display: flex; align-items: center; margin-right: 53px">
              <input type="radio" :id="item.gender_ID" :value="item.gender_ID" v-model="selectedGenderId"
                :name="radioGroupNameGender" />
              <label style="margin-left: 10px;" :for="item.gender_ID" class="radio-label font-display">{{
                item.gender_detail
              }}</label>
            </div>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-simple-table class="custom-table" fixed-header>
      <template v-slot:default>
        <tbody>
          <tr v-for="item in prices" :key="item.service_name">
            <td class="font-display">
              ราคา
            </td>
            <td class="text-center font-display">
              <v-col cols="6">
                <v-text-field style="width: 100px" suffix="฿" v-model="item.service_price"
                  @input="emitServicePriceChange(selectedService, selectedAgeId, selectedGenderId, item.service_price)"></v-text-field>
              </v-col>
            </td>
          </tr>
          <v-divider></v-divider>
        </tbody>
        <tbody v-for="(item, index) in cates" :key="index">
          <tr elevation="0" color="#F49255" class="font-display custom-toolbar">
            <td style="background-color: #fecfb2" :colspan="2">
              <v-toolbar flat style="background-color: #fecfb2">
                <v-toolbar-title class="font-display">
                  {{ item.category_name }}
                </v-toolbar-title>
              </v-toolbar>
            </td>
          </tr>
          <tr v-for="(subItem, subIndex) in item.subservices" :key="subIndex">
            <td class="subservice-name font-display" style="margin-left: 15px; margin-top: 10px; ">
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
      radioGroupNameAge: "ageRadioGroup",
      radioGroupNameGender: "genderRadioGroup",
      selectedService: "ตรวจสุขภาพสำหรับข้าราชการ/อปท.",
      selectedAgeId: null,
      selectedGenderId: null,
    };
  },

  async created() {
    console.log(this.typeId);
    const res = await this.$axios.get("/qmanagement/api/services", {
      params: {
        typeId: this.typeId,
      },
    });
    this.items = res.data.response;
    console.log(this.items);

    const response = await this.$axios.get("/qmanagement/api/ages", {
      params: {
        typeId: this.typeId,
      },
    });
    this.objs = response.data.response;
    this.selectedAgeId = this.objs[0].age_ID;

    const responses = await this.$axios.get("/qmanagement/api/gender", {
      params: {
        typeId: this.typeId,
      },
    });
    this.gender = responses.data.response;
    this.selectedGenderId = this.gender[0].gender_ID;

    const result = await this.$axios.get("/qmanagement/api/category");
    this.cates = result.data.response;
    console.log(this.cates);
    this.serviceId = 1
    this.fetchSubservices(this.serviceId);
  },

  watch: {
    selectedAgeId: async function (newAgeVal) {
      const selectedAge = this.objs.find((item) => item.age_ID === newAgeVal);
      this.age_ID = selectedAge.age_ID;
      console.log(newAgeVal);
      this.selectedPrice(
        this.selectedService,
        newAgeVal,
        this.selectedGenderId
      );

      if (this.selectedService === "ตรวจสุขภาพสำหรับข้าราชการ/อปท.") {
        if (newAgeVal === 1 && this.selectedGenderId === 1) {
          this.serviceId = 1;
        } else if (newAgeVal === 2 && this.selectedGenderId === 1) {
          this.serviceId = 2;
        } else if (newAgeVal === 1 && this.selectedGenderId === 2) {
          this.serviceId = 3;
        } else if (newAgeVal === 2 && this.selectedGenderId === 2) {
          this.serviceId = 4;
        }
      }
      this.fetchSubservices(this.serviceId);
    },
    selectedGenderId: async function (newGenderVal) {
      const selectedGender = this.gender.find(
        (item) => item.gender_ID === newGenderVal
      );
      this.gender_ID = selectedGender.gender_ID;
      console.log(newGenderVal);
      this.selectedPrice(
        this.selectedService,
        this.selectedAgeId,
        newGenderVal
      );

      if (this.selectedService === "ตรวจสุขภาพสำหรับข้าราชการ/อปท.") {
        if (this.selectedAgeId === 1 && newGenderVal === 1) {
          this.serviceId = 1;
        } else if (this.selectedAgeId === 2 && newGenderVal === 1) {
          this.serviceId = 2;
        } else if (this.selectedAgeId === 1 && newGenderVal === 2) {
          this.serviceId = 3;
        } else if (this.selectedAgeId === 2 && newGenderVal === 2) {
          this.serviceId = 4;
        }
      }
      this.fetchSubservices(this.serviceId);
    },
  },

  methods: {
    async selectedPrice(serviceName, ageId, genderId) {
      const response = await this.$axios.get(
        `/qmanagement/api/prices?serviceName=${encodeURIComponent(
          serviceName
        )}&ageId=${ageId}&genderId=${genderId}`
      );
      this.prices = response.data.response;
    },

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

    emitServicePriceChange(selectedService, selectedAgeId, selectedGenderId, newPrice) {
      let serviceId;

      if (selectedService === "ตรวจสุขภาพสำหรับข้าราชการ/อปท.") {
        if (selectedAgeId === 1 && selectedGenderId === 1) {
          serviceId = 1;
        } else if (selectedAgeId === 2 && selectedGenderId === 1) {
          serviceId = 2;
        } else if (selectedAgeId === 1 && selectedGenderId === 2) {
          serviceId = 3;
        } else if (selectedAgeId === 2 && selectedGenderId === 2) {
          serviceId = 4;
        }
      }
      this.$emit('servicePriceChanged', { serviceId, newPrice });
      console.log(`Service Price Changed emitted for serviceId ${serviceId}: ${newPrice}`);
    },

    emitSubservicePriceChange(subserviceId, newPrice) {
      this.$emit('subservicePriceChanged', { subserviceId, newPrice });
      console.log(`Service Price Changed emitted for serviceId ${subserviceId}: ${newPrice}`);
    },
  }
};
</script>
  
<style scoped>
.font-display {
  font-family: "Kanit";
}
</style>
  
<template>
  <div class="font-display">
    <v-container fluid>
      <v-radio-group class="radio-group-age" row>
        <h4 style="margin-right: 30px" class="font-display">
          ช่วงอายุ
        </h4>
        <div v-for="item in items" :key="item.age_ID"  style="display: flex; align-items: center; margin-right: 30px">
          <input  type="radio" :id="item.age_ID" :value="item.age_ID" v-model="selectedItemId" :name="radioGroupName" />
          <label style="padding-left: 10px;" :for="item.age_ID" class="radio-label font-display">{{
            item.age_detail
          }}</label>
        </div>
      </v-radio-group>
    </v-container>
    <v-divider></v-divider>
    <v-simple-table class="custom-table" fixed-header>
      <template v-slot:default>
        <tbody>
          <tr v-for="item in objs" :key="item.service_name">
            <td class="font-display">
              {{ item.service_name }}
            </td>
            <td class="text-center font-display">
              <v-col cols="6">
                <v-text-field v-model="item.service_price" style="width: 100px" suffix="฿" @input="emitServicePriceChange(item.service_ID, item.service_price)"></v-text-field>
              </v-col>
            </td>
          </tr>
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
      age_ID: 0,
      selectedItemId: null,
      radioGroupName: "ageRadioGroup",
      objs: [],
    };
  },

  async created() {
    const res = await this.$axios.get("/qmanagement/api/ages", {
      params: {
        typeId: this.typeId,
      },
    });
    console.log(this.typeId);
    this.items = res.data.response;
    this.selectedItemId = this.items[0].age_ID;
  },

  watch: {
    selectedItemId: async function (newVal) {
      const selectedItem = this.items.find((item) => item.age_ID === newVal);
      this.age_ID = selectedItem.age_ID;
      console.log(newVal);

      const response = await this.$axios.get("/qmanagement/api/vaccine", {
        params: {
          typeId: this.typeId,
          ageId: this.age_ID,
        },
      });
      this.objs = response.data.response;
      console.log(this.objs);
    },
  },

  methods: {
    emitServicePriceChange(serviceId, newPrice) {
      this.$emit('servicePriceChanged', { serviceId, newPrice });
      console.log(`Service Price Changed emitted for serviceId ${serviceId}: ${newPrice}`);
    },
  },
};
</script>

<style scoped>
.font-display {
  font-family: "Kanit";
}
</style>

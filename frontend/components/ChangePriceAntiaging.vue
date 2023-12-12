<template>
  <div class="font-display">
    <v-simple-table class="custom-table" fixed-header>
      <template v-slot:default>
        <tbody>
          <template v-for="item in objs">
            <tr :key="item.service_name">
              <td style="background-color: #fecfb2" :colspan="2">
                <v-toolbar flat style="background-color: #fecfb2">
                  <v-toolbar-title class="font-display">
                    {{ item.service_name }}
                  </v-toolbar-title>
                </v-toolbar>
              </td>
            </tr>

            <tr v-for="(subItem, subIndex) in item.subservices" :key="subIndex">
              <td class="font-display">{{ subItem.subservice_name }}</td>
              <td class="text-center font-display">
                <v-col cols="6">
                  <v-text-field v-model="subItem.subservice_price" style="width: 100px" suffix="฿"  @input="emitSubservicePriceChange(subItem.subservice_ID, subItem.subservice_price)"></v-text-field>
                </v-col>
              </td>
            </tr>
          </template>
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
      objs: [],
    };
  },

  async created() {
    const res = await this.$axios.get("/qmanagement/api/antiaging", {
      params: {
        typeId: this.typeId,
      },
    });
    this.objs = res.data.response;
    console.log(this.objs);
    this.fetchSubservices();
  },
  methods: {
    async fetchSubservices() {
      for (let i = 0; i < this.objs.length; i++) {
        const response = await this.$axios.get("/qmanagement/api/subservices", {
          params: {
            serviceId: this.objs[i].service_ID,
          },
        });

        this.$set(this.objs[i], "subservices", response.data.data);
      }
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

td {
  max-width: 50px;
}
</style>

<template>
  <v-stepper v-model="e1" elevation="0" class="font-display">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1" color="#f17223">
        เลือกประเภทบริการ
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 2" step="2" color="#f17223">
        เลือกบริการหลัก
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step :complete="e1 > 3" step="3" color="#f17223">
        บริการเสริม
      </v-stepper-step>
      <v-divider></v-divider>
      <v-stepper-step step="4" color="#f17223">
        จองคิว
      </v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  data() {
    return {
      e1: 1,
    }
  }
}
</script>

<style>
.font-display {
  font-family: "Kanit";
}
</style>

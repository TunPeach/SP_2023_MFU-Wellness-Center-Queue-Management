<template>
  <div>
    <v-toolbar elevation="0" color="#F49255" class="font-display custom-toolbar">
      <!-- Main Tabs -->
      <v-tabs dark>
        <v-tab class="color--text" @click="changeTab('requestAppointmentOther')">
          ผู้ใช้ทั่วไป
        </v-tab>
        <v-tab class="color--text" @click="changeTab('requestAppointmentStudent')">
          นักศึกษา
        </v-tab>
      </v-tabs>
    </v-toolbar>

    <!-- Content for subtabs and main tabs -->
    <div v-if="activeTab === 'requestAppointmentStudent'">
      <requestAppointmentStudent :typeId="typeId" />
    </div>
    <div v-else-if="activeTab === 'requestAppointmentOther'">
      <requestAppointmentOther :typeId="typeId" />
    </div>
  </div>
</template>

<script>
import requestAppointmentOther from './requestAppointmentOther.vue';
import requestAppointmentStudent from './requestAppointmentStudent.vue';

export default {
  components: {
    requestAppointmentOther,
    requestAppointmentStudent,
  },
  data() {
    return {
      activeTab: 'requestAppointmentOther',
      activeSubTab: 'requestAppointmentStudent',
      typeId: 1, 
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      if (tab === 'requestAppointmentOther') {
        this.typeId = 1;
      } else if (tab === 'requestAppointmentStudent') {
        this.typeId = 2;
      }
    },
    changeSubTab(subTab) {
      this.activeSubTab = subTab;
    },
  },
};
</script>
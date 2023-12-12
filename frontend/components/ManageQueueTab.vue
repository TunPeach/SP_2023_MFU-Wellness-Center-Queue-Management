<template>
  <div>
    <v-container>
      <v-sheet class="box" height="auto" width="auto">
        <h3 class="header font-display">โปรดเลือกประเภทผู้ใช้ที่ต้องการจะจองคิว</h3>
        <v-row>
          <v-col>
            <div class="card-container">
              <div class="card-container-custom">
                <div class="card-body" align="center" justify="center">
                  <h5 class="card-title font-display">ผู้ใช้ทั่วไป</h5>
                  <button @click="showUserCard" class="btn-round font-display" style="text-decoration: none">
                    จองคิว
                  </button>
                </div>
              </div>
            </div>
          </v-col>
          <v-col>
            <div class="card-container">
              <div class="card-container-custom">
                <div class="card-body" align="center" justify="center">
                  <h5 class="card-title font-display">นักศึกษาใหม่</h5>
                  <button @click="showStudentCard" class="btn-round font-display" style="text-decoration: none">
                    จองคิว
                  </button>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-sheet>
      <div>
        <v-dialog v-model="UserCard" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">เพิ่มคิว</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field  :rules="passwordRules" v-model="HN_code" label="กรุณากรอก HN code"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end font-display">
              <v-btn class="elevation-0" @click="confirmAction">ยืนยัน</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
      <div>
        <v-dialog v-model="showCard" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">เพิ่มคิว</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field :rules="password" v-model="STD_ID" label="กรุณากรอก Student ID"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-end font-display">
              <v-btn class="elevation-0" @click="confirmStdAction">ยืนยัน</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>
  </div>
</template>
  
<script>
import ManageQueueOther from './ManageQueueOther.vue';
import ManageQueueStudent from './ManageQueueStudent.vue';

export default {
  components: {
    ManageQueueOther,
    ManageQueueStudent,
  },
  data() {
    return {
      activeTab: 'ManageQueueOther',
      activeSubTab: 'ManageQueueStudent',
      typeId: 1,
      showCard: false,
      UserCard: false,
      HN_code: '',
      STD_ID: '',
      passwordRules: [
        (value) => !!value || "จำเป็น",
        (value) =>
          value.length >= 9 || "ควรมีตัวเลขอย่างน้อย 9 หลัก",
      ],
      password: [
        (value) => !!value || "จำเป็น",
        (value) =>
          value.length >= 10 || "ควรมีตัวเลขอย่างน้อย 10 หลัก",
      ],
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      if (tab === 'ManageQueueOther') {
        this.typeId = 1;
      } else if (tab === 'ManageQueueStudent') {
        this.typeId = 2;
      }
    },
    changeSubTab(subTab) {
      this.activeSubTab = subTab;
    },
    showStudentCard() {
      this.showCard = true;
    },
    showUserCard() {
      this.UserCard = true;
    },
    confirmAction() {
      window.sessionStorage.setItem("hnCode", this.HN_code);
      this.$router.push({ path: '/adminQueue/home' });
    },
    confirmStdAction() {
      window.sessionStorage.setItem("stdId", this.STD_ID);
      this.$router.push({ path: '/adminQueue/checkupStudent' });
    }
  },
};
</script>

<style>
.font-display {
  font-family: "Kanit";
}

.header {
  margin-top: 20px;
  margin-bottom: 20px;
  text-indent: 30px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.card {
  flex-basis: calc(33.33% - 20px);
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.card-container-custom{
  flex-basis: calc(50% - 0px); 
  margin: 10px;
  border-radius: 10px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

.btn-round {
  display: block;
  margin-top: 10px;
  padding: 5px 30px;
  border-radius: 20px;
  background-color: #f17223;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
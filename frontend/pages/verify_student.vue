<template>
    <div>
        <NavbarFon />
        <v-container fluid>
            <v-row align="center" justify="center">
                <v-sheet class="my-card" height="536" width="751">
                    <h1 class="head-title font-display" style="padding-left: 32px;">กรุณายืนยันตัวตน</h1>
                    <v-card-text>
                        <v-form class="font-display" @submit.prevent="verify">
                            <v-text-field class="custom-textfield-idperson font-display" v-model="std_id"
                                label="รหัสนักศึกษา" dense outlined color="primary"></v-text-field>
                            <v-text-field class="custom-textfield-idperson font-display" v-model="citizen_num"
                                label="เลขประจำตัวประชาชน" dense outlined color="primary"
                                :append-icon="userIcon"></v-text-field>
                            <v-btn class="bottomLogin font-display" style="padding-right: 46px; padding-left: 46px"
                                color="orange" outlined rounded type="submit" @click="verify()">ยืนยัน</v-btn>
                        </v-form>
                    </v-card-text>
                </v-sheet>
            </v-row>
        </v-container>
        <v-dialog v-model="verifyFailedDialog" persistent max-width="400px">
      <v-card class="font-display">
        <v-card-title class="font-display">ยืนยันตัวตนล้มเหลว</v-card-title>
        <v-card-text>รหัสนักศึกษาผู้ใช้ที่ไม่รู้จักหรือเลขประจำตัวประชาชนไม่ถูกต้อง</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="verifyFailedDialog = false"
            >ปิด</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>
    
<style>
.font-display {
    font-family: 'Kanit'
}

.register-link {
    display: flex;
    justify-content: center;
    margin-top: 16px;
}

.register-link span {
    margin-right: 8px;
}

.register-link a,
.forgot-link a {
    color: blue;
}

.forgot-link {
    display: flex;
    justify-content: center;
    margin-top: 8px;
}
</style>
    
<script>
export default {
    data() {
        return {
            std_id: "",
            citizen_num: "",
            userIcon: "mdi-account",
            verifyFailedDialog: false,
        };
    },
    methods: {
        async verify() {
            try {
                console.log('STD_ID:', this.std_id);
                console.log('Citizen Num:', this.citizen_num); 
                const stdId = this.std_id;
                const citizenNum = this.citizen_num; 
                const response = await this.$axios.put(`/qmanagement/api/students/${stdId}`, {
                    STD_ID: stdId,
                    citizen_num: citizenNum, 
                    status_ID: 1 
                });
                console.log('Response:', response);
                if (response.status === 200) {
                    this.$router.push({
                        path: '/registerStudent',
                        query: { std_id: stdId, citizen_num: citizenNum }
                    });
                }
            } catch (error) {
                console.error('Error updating data:', error);
                this.verifyFailedDialog = true;
            }
        },
    },
};
</script>
    
<style scoped>
.bottomLogin {
    margin-left: 95px;
    margin-top: 21px;
}

.register {
    position: relative;
}

.forgotpassword {
    position: relative;
}

.my-card {
    margin-top: 50px;
    border-radius: 50px;
    width: 751px;
    height: 536px;
    padding-top: 95px;
    padding-left: 175px;
    padding-right: 175px;
}

.head-title {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 50px;
    font-weight: bold;
    justify-content: center;
    padding-left: 74px;
}

.custom-textfield-idperson {
    width: 300;
}
</style>
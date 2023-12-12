<template>
    <div>
        <Navbar />
        <v-container>
            <v-sheet class="box" style="
            margin: 100px;
            margin-bottom: 90px;
            margin-top: 50px;
            padding-top: 20px;
            padding-bottom: 50px;
          " height="auto" width="auto">
                <v-stepper v-model="e1" elevation="0" class="font-display">
                    <v-stepper-header>
                        <v-stepper-step :complete="e1 > 1" step="1" color="#f17223">
                            เลือกบริการ
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 2" step="2" color="#f17223">
                            เลือกวันที่และเวลา
                        </v-stepper-step>
                        <v-divider></v-divider>
                        <v-stepper-step :complete="e1 > 3" step="3" color="#f17223">
                            จองคิว
                        </v-stepper-step>
                    </v-stepper-header>
                </v-stepper>
                <h3 class="header font-display">โปรดเลือกประเภทบริการของคุณ</h3>
                <div class="card-container">
                    <div class="card">
                        <div class="card-body" align="center" justify="center">
                            <h5 class="card-title font-display">ตรวจสุขภาพสำหรับนักศึกษาใหม่</h5>
                                <button class="btn-round font-display" style="text-decoration: none" @click="goToBooking">
                                    จองคิว
                                </button>
                        </div>
                    </div>
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
        e1:1
      };
    },

    methods:{
        goToBooking(){
            this.$router.push("/adminQueue/booking_checkupstudent");
        }
    }
}
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
  
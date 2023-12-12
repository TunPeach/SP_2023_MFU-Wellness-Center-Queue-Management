<template>
  <div>
    <v-app>
      <v-main class="custom-main-color">
        <NavbarFon />
        <v-app>
          <v-main>
            <v-card class="fill-height">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14993.826012353094!2d99.8767428!3d20.0313129!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30d70120371f7823%3A0x6d7e985bc11fc576!2sComprehensive%20health%20service%20center%20of%20the%20North%20and%20Mekong%20Subregion%20MFU%20Wellness%20Center!5e0!3m2!1sen!2sth!4v1701158292732!5m2!1sen!2sth"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </v-card>
          </v-main>
        </v-app>
      </v-main>
      <Footer />
    </v-app>
  </div>
</template>

<style scoped>
.custom-main-color {
  background-color: #ffece0; /* Replace #yourColor with your desired color */
}
.fill-height {
  height: 100vh;
  /* Set the height to 100% of the viewport height */
  display: flex;
  align-items: stretch;
  /* Stretch the content to fill the height */
}

/* Optionally, you can set the v-main element to also take up the full height */
v-main {
  height: 100%;
}
</style>

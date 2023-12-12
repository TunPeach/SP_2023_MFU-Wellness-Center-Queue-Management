<template>
  <div>
    <NavbarFon />
    <HomePageWelcome />
    <div style="margin-bottom: 82px;">
      <HomePageService />
    </div>
    <Footer />
  </div>
</template>

<script>
import PageLoader from '~/components/PageLoader.vue';

export default { components: { PageLoader } };
</script>

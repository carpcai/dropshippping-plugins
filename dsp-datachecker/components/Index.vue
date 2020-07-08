<template>
  <div class="index-container">
    <div>
      <logo />
      <h1 class="title">
        dsp-datachecker
      </h1>
      <h2 class="subtitle">
      </h2>
      <div class="links">
        <Button type="primary" to="orders">
          Orders
        </Button>
        <Button type="primary" to="orders-manager">
          Order manager
        </Button>
        <Button target="_blank" to="products">
          Products
        </Button>
        <Button target="_blank" to="https://www.iviewui.com/">
          iView
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  created: function () {
    const self = this;
    console.log(self.$nuxt.$route);
  },
}
</script>

<style scoped>
.index-container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links {
  padding-top: 15px;
}
</style>

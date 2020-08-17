<template>
  <div id="billing-container">
    <Button type="primary" @click="exportBilling">账单导出</Button>
  </div>
</template>

<script>
export default {
  created: function () {
    const self = this;
    console.log(self.$nuxt.$route);
  },
  methods: {
    async exportBilling() {
      console.log('2132111111111111');
      console.log('asd');

    }
  }
}
</script>

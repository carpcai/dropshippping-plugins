<template>
  <div class="container">
    <div style="padding:16px;">
      <h1 class="title">
        dsp-datachecker
      </h1>
    </div>
    <div style="padding:16px; width: 100% !important;
  margin: 0 !important;">
      <Input v-model="am_api_key" type="password" placeholder="am-api-key" style="width: 220px" />
      <Input v-model="reqData.app_key" placeholder="app_key" style="width: 180px" />
      <Input v-model="reqData.app_platform" placeholder="app platform" style="width: 150px" />
      <Input v-model="reqData.organization_id" placeholder="organization id" style="width: 240px" />
      <Input search enter-button v-model="reqData.order_numbers" style="width: 220px" placeholder="订单Id"  @on-search="searchStart"/>
    </div>
    <div style="display: flex;"> 
      <div style="padding: 6px;background: #f8f8f9;">
        <Card title="Dropshipping" icon="ios-options" :padding="0" shadow style="width: 460px;">
            <div class="json-card">
              <json-view :data="dropshippingList"/>
            </div>
        </Card>
        
      </div>
      <div style="padding: 6px;background: #f8f8f9">
        <Card title="Supplier" icon="ios-options" :padding="0" shadow style="width: 460px;">
            <div class="json-card">
              <json-view :data="supplierList"/>
            </div>
        </Card>
      </div>
      <div style="padding: 6px;background: #f8f8f9">
        <Card title="Vendor" icon="ios-options" :padding="0" shadow style="width: 460px;">
            <div class="json-card">
              <json-view :data="vendorList"/>
            </div>
        </Card>
      </div>

    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import jsonView from 'vue-json-views'
export default {
  components: {
    Logo,
    jsonView
  },
  data () {
    return {
      dropshippingList:{},
      supplierList:{},
      vendorList:{},
      am_api_key: "",
      reqData:{
        order_numbers: "",
        app_key: "automizely-store",
        app_platform: "shopify",
        organization_id: "86cf3a92b2c04d849a6056e7cd82e043",
      }
    }
  },
  created: function () {
    const self = this;
    self.initApiKey();
    self.searchStart();
  },
  methods: {
    async initApiKey(){
      const self = this;
      self.am_api_key =  self.$cookies.get('am-api-key')
    },
    async searchStart(){
      const self = this;
      
      if(self.am_api_key){
        self.$cookies.set('am-api-key', self.am_api_key)
      }
    
      let business_order_id = await self.getDropshippingList();
      let supplier_order_id = await self.getSuppliersList(business_order_id);
      self.getVendorList(supplier_order_id);
    },
    async getDropshippingList() {
      const self = this
      let req = {
        app_key: self.reqData.app_key,
        app_platform: self.reqData.app_platform,
        organization_id: self.reqData.organization_id,
      }
      if(self.reqData.order_numbers){
        req.order_numbers = self.reqData.order_numbers;
      }

      const res = await this.$axios.$get('/dropshipping/v1/orders', {
        params: req, 
        headers: {"am-api-key": self.am_api_key},
      })
      self.dropshippingList = res.data.orders
      if(!res.data.orders[0]){
        return ''
      }
      return res.data.orders[0].id
    },
    async getSuppliersList(business_order_id) {
      const self = this

      if(!business_order_id){
         self.supplierList = {}
        return ''
      }

      const res = await this.$axios.$get('/suppliers/v1/orders',{
        params: {
          business_order_ids: business_order_id,
        }, 
        headers: {"am-api-key": self.am_api_key},
      })

      if(!res.data.orders[0]){
        self.supplierList = {}
        return ''
      }
      self.supplierList = res.data.orders[0]
      
      return res.data.orders[0].id
    },
    async getVendorList(supplier_order_id) {
      const self = this
      if(!supplier_order_id){
        self.vendorList = {}
        return ''
      }

      const res = await this.$axios.$get('/suppliers/v1/vendors-orders',{
        params: {
          supplier_order_id: supplier_order_id
        }, 
        headers: {"am-api-key": self.am_api_key},
      })
      self.vendorList = res.data.orders
    }
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* justify-content: center; */
  /* align-items: center; */
  /* text-align: center; */
}
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
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
.json-card{
  height: 600px; 
  overflow-y: scroll;
}
</style>

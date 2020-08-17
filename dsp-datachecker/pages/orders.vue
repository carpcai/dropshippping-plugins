<template>
  <div class="container">
    <div style="padding:16px;">
      <h1 class="title">
        dsp-datachecker
      </h1>
    </div>
    <div>
      <Modal v-model="block_modal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>拦截订单确认</span>
        </p>
        <div style="text-align:center">
            <p>是否订单出现了什么异常，需要拦截此订单？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long :loading="modal_loading" @click="blockOrder">确认拦截</Button>
        </div>
    </Modal>
    </div>
    <div style="padding:16px; width: 100% !important;
  margin: 0 !important;">
      <Input v-model="am_api_key" type="password" placeholder="am-api-key" style="width: 220px" />
      <Input v-model="reqData.app_key" placeholder="app_key" style="width: 180px" />
      <Input v-model="reqData.app_platform" placeholder="app platform" style="width: 150px" />
      <Select v-model="requestEnv" style="width:100px">
        <Option v-for="(item, index) in requestEnvMap" :value="index" :key="index">{{ index }}</Option>
      </Select>
      <Input v-model="reqData.organization_id" placeholder="organization id" style="width: 240px" />
      <div>
        <Input search enter-button v-model="reqData.order_numbers" style="width: 220px" placeholder="订单Id"  @on-search="searchStart"/>

      </div>


    </div>
    <div style="display: flex;">
      <div style="padding: 6px;background: #f8f8f9;">
        <Card title="Dropshipping" icon="ios-options" :padding="0" shadow styl  e="width: 460px;">
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
          <div slot="title">
            <a>vendor</a>
            <Button size="small" type="error" @click="block_modal = true">拦截订单</Button>
          </div>

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

const config = require('~/nuxt.config.js')

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
        organization_id: "b82f5a20ae024f5f82f2a90e8a54bc35",
      },
      requestEnv: "production",
      requestEnvMap: {
        dev:{
          product_url: "http://localhost:8080",
          platform_url: "http://localhost:8079",
        },
        release:{
          product_url: "https://release-incy-platform.automizelyapi.io",
          platform_url: "https://release-incy-product.automizelyapi.io",
        },
        production:{
          product_url: "https://platform.automizelyapi.com",
          platform_url: "https://product.automizelyapi.com",
        },
      },
      //模态框
      block_modal: false,
      modal_loading: false,
    }
  },
  created: function () {
    const self = this;

    console.log(config.default.constants.platform_url);
    console.log(config.default.constants.product_url);

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

      const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].platform_url+ '/dropshipping/v1/orders', {
        params: req,
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
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

      const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/orders',{
        params: {
          business_order_ids: business_order_id,
        },
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
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

      const res = await this.$axios.$get(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/vendors-orders',{
        params: {
          supplier_order_id: supplier_order_id
        },
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
      })
      self.vendorList = res.data.orders
    },

    async blockOrder(){
      const self = this
      if(!self.vendorList[0].id){
          alert('订单不存在')
          return false
      }
      self.modal_loading = true;
      const res = await this.$axios.$post(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/vendors-orders/' + self.vendorList[0].id + '/block', {
      "status":"blocked",
      "remark":"block order"
}, {
        params: {},
        headers: {
          "am-api-key": self.am_api_key,
          "am-organization-id": self.reqData.organization_id
        },
      })
      self.modal_loading = false;
      self.block_modal = false;
      this.$Message.info(JSON.stringify(res));
      // console.log(res);
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

<template>
  <div class="container">
    <div style="padding:16px;">
      <h1 class="title">
        dsp order manager
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
      <Input v-model="reqData.organization_id" placeholder="organization id" style="width: 240px" />
      <Select v-model="requestEnv" style="width:100px">
        <Option v-for="(item, index) in requestEnvMap" :value="index" :key="index">{{ index }}</Option>
      </Select>
      <Select v-model="orderStatus" style="width:100px">
        <Option v-for="(item) in orderStatusMap" :value="item.name" :key="item.name">{{ item.name }}</Option>
      </Select>
      <div>
        <Input search enter-button v-model="reqData.order_numbers" style="width: 220px" placeholder="订单Id"  @on-search="searchStart"/>
      </div>
    </div>
    <div style="display: flex;"> 
      <div style="padding: 6px;background: #fff;width:94%; margin:0 auto">
          <List item-layout="vertical" border="true">
            <ListItem v-for="item in dropshippingList" :key="item.title">
                <ListItemMeta :avatar="item.avatar" :title="item.order_name" :description="item.buyer" />
                <div style="width:850px">
                  <Table stripe :columns="ordersColumns" :data="item.list_content">
                    <template slot-scope="{ row, index }" slot="date">
                        {{row.date | formatDate}}
                      </template>
                  </Table>
                </div>
                <template slot="action">
                    <li>
                        <!-- <Icon type="ios-star-outline" /> 123 -->
                        <Button size="small" type="warning" @click="showBlockOrderModal(item.vendor_orders)">拦截订单</Button>
                    </li>
                    <li>
                      <Button size="small" type="error">取消订单</Button>
                    </li>
                </template>
                <template slot="extra">
                  <!-- <img :src="item.items[0].image_urls[0]" style="width: 180px"> -->
                  <div style="margin-top: 54px;">
                    <h3>商品信息</h3>
                    <Table stripe :columns="ordersItemsColumns" :data="item.items">
                      <template slot-scope="{ row, index }" slot="image">
                        <img v-for="(ri) in row.image_urls" :src="ri" width="70px">
                      </template>
                      <template slot-scope="{ row, index }" slot="unit_price">
                        ${{row.unit_price.amount / 100}}
                      </template>
                    </Table>
                  </div>
                  <!-- <img src="https://dev-file.iviewui.com/5wxHCQMUyrauMCGSVEYVxHR5JmvS7DpH/large" style="width: 280px"> -->
                </template>
            </ListItem>
        </List>
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
      dropshippingList:[],
      supplierList:{},
      vendorList:{},
      am_api_key: "",
      reqData:{
        order_numbers: "",
        app_key: "automizely-store",
        app_platform: "shopify",
        organization_id: "b82f5a20ae024f5f82f2a90e8a54bc35",
      },
      orderStatus: 'normal',
      orderStatusMap:[
        {name: "normal"},
        {name: "abnormal"}
      ],
      ordersItemsColumns:[
        {
          title: '图片',
          width: 150,
          align: 'center',
          slot: 'image',
        },
        {
          title: '单价',
          // key: 'price',
          slot: 'unit_price',
          width:'90px'
        },
        {
          title: '数量',
          key: 'quantity',
          width:'90px'
        },
      ],
      ordersColumns:[
        {
          title: '订单平台',
          key: 'platform',
          width:'110px'
        },
        {
          title: '下单金额',
          key: 'price',
          width:'90px'
        },
        {
          title: '运费',
          key: 'shipping_price',
           width:'80px'
        },
        {
          title: '下单时间',
          // key: 'date',
          slot: 'date'
          // width:'150px'
        },
        {
          title: '订单id',
          key: 'order_id',
          // width:'200px'
        },
        // {
        //   title: '下单成本',
        //   key: 'cost'
        // },

        {
          title: '订单状态',
          key: 'order_status',
          width:'100px'
        },
        {
          title: '支付状态',
          key: 'financial_status',
          width:'100px'
        },
        // {
        //   title: '买家信息',
        //   key: 'buyer'
        // }
      ],
      orderList:[],
      requestEnv: "production",
      requestEnvMap: {
        dev:{
          product_url: "",
          platform_url: "",
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
      block_order_ids: [],
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
        headers: {"am-api-key": self.am_api_key},
      })
      
      if(!res.data.orders){
        return ''
      }

      const promiseQueue = [];
      for(let order of res.data.orders){
        promiseQueue.push(self.supplementContent(order)); 
      }
      await Promise.all(promiseQueue).then(responses => {
        // responses.map(response => write(response));
      });

      // self.dropshippingList = res.data.orders

      //整理数据。
      await self.sortData(res.data.orders)

    },
    async sortData(orders){
      const self = this

      // 
      for (let order of orders){
        //整理order信息
        let orderTemp = [{
          platform: "dropshipping",
          price: (order.order_total.amount / 100),
          date: order.created_at,
          order_id: order.id,
          // cost: order.,
          shipping_price: (order.shipping_total.amount/100),
          order_status: order.order_status,
          financial_status: order.financial_status,
          
          // buyer: order.,
        }];
        
        //整理supplier信息
        if(order.supplier_order){
          const supplier_order = order.supplier_order;
          orderTemp.push({
            platform: "Supplier",
            price: (supplier_order.order_total.amount / 100),
            date: (supplier_order.created_at),
            order_id: supplier_order.id,
            // cost: supplier_order.,
            shipping_price: supplier_order.shipping_total.amount / 100,
            order_status: supplier_order.order_status,
            financial_status: supplier_order.financial_status,
            // buyer: order.,
          })
        }
        
        let vendor_order_price_total = 0;
        let vendor_order_price_cost_total = 0;
        //整理vendor信息
        if(order.vendor_orders){
          
          for(const vendor_order of order.vendor_orders){
            // const vendor_order = order.vendor_orders
            orderTemp.push(
            {
              platform: "Vendor",
              price: vendor_order.order_total_cost.amount / 100,
              date: vendor_order.created_at,
              order_id: vendor_order.id,
              // cost: vendor_order.,
              shipping_price: vendor_order.shipping_total_cost.amount / 100,
              order_status: vendor_order.order_status,
              financial_status: vendor_order.financial_status,
              // buyer: vendor_order.,
            });
            vendor_order_price_total += vendor_order.order_total.amount
            vendor_order_price_cost_total += vendor_order.order_total_cost.amount
          }
        }
        orderTemp.push(
        {
          platform: "利润",
          price: (vendor_order_price_total-vendor_order_price_cost_total) / 100,
          date: '',
          order_id: '',
          // cost: vendor_order.,
          shipping_price: '',
          order_status: '',
          // buyer: vendor_order.,
        });
        

        //整理Buyer信息
        order.buyer = `姓名: ${order.shipping_address.first_name} ${order.shipping_address.last_name}  |  电话：${order.shipping_address.phone.country_code}-${order.shipping_address.phone.number} | 地址: ${order.shipping_address.address_line_1}, ${order.shipping_address.city}, ${order.shipping_address.state} ${order.shipping_address.postal_code} | email: ${order.shipping_address.email}`

        order.list_content = orderTemp
      }
      self.dropshippingList = orders
    },
    async supplementContent(order) {
      const self = this
      // 组装supplier
      const business_order_id = order.id
      const supplierOrder = await self.getSuppliersList(business_order_id);
      if(!supplierOrder){
        return '';
      }
      order['supplier_order'] = supplierOrder;

      // 组装vendor
      const supplier_order_id = supplierOrder['id']
      const vendorOrders = await self.getVendorList(supplier_order_id);
      if(!vendorOrders){
        return '';
      }
      order['vendor_orders'] = vendorOrders;
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
        headers: {"am-api-key": self.am_api_key},
      })

      if(!res.data.orders){
        // self.supplierList = {}
        return ''
      }
      // self.supplierList = res.data.orders[0]
      
      return res.data.orders[0]
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
        headers: {"am-api-key": self.am_api_key},
      })
      if(!res.data.orders){
        return [];
      }
      // self.vendorList = res.data.orders
      return res.data.orders
    },
    async showBlockOrderModal(vendor_orders){
      const self = this
      self.block_order_ids = []
      for(let vendor_order of vendor_orders){
        self.block_order_ids.push(vendor_order.id);
      }
      
      self.block_modal = true
    },
    async blockOrder(){
      const self = this

      if(!self.block_order_ids[0]){
          alert('订单不存在')
          return false
      }
      self.modal_loading = true;
      
      for (let block_order_id of self.block_order_ids){
        const res = await this.$axios.$post(self.requestEnvMap[self.requestEnv].product_url + '/suppliers/v1/vendors-orders/' + block_order_id + '/block', {
          "status":"blocked",
          "remark":"block order"
        }, {
          params: {}, 
          headers: {"am-api-key": self.am_api_key},
        })
      }
      
      self.modal_loading = false;
      self.block_modal = false;
      this.$Message.info('拦截成功');
      // console.log(res);
    }
  },
  filters: {
      formatDate: function (value) {
        if(!value){
          return ''
        }
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
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

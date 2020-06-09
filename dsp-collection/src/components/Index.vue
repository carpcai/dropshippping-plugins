<template>
  <div class="hello">
    <el-form>
      <el-form-item>
        <el-input
     v-model="api_key"
     type="password"
     placeholder="请输入API KEY"
     ></el-input>
             <el-input
     v-model="appData.app.key"
     placeholder="请输入店铺app key"
     ></el-input>
    <el-input
     v-model="input"
     placeholder="搜索内容"
     type="textarea"
     ></el-input>
      </el-form-item>
      <el-form-item>
    <el-button size="small" type="primary" @click="getProductsList">商品查询</el-button>
    <el-button size="small" @click="pushProductsList" v-loading="publishLoading">推送选中的所有商品</el-button>
    <span v-show="pushNumberShow">推送成功数量:{{pushNumber}}</span>
      </el-form-item>
  </el-form>
  <div style="width:96%; margin:0 auto">
<el-row >
  <el-col :span="11" v-for="(o) in productList" :key="o" style="margin-right:6px;margin-bottom:6px">
    <el-card :body-style="{ padding: '0px'}">
      <img :src="o.image_urls[0]" class="image">
      <div style="padding: 8px;">
        <b class="title">{{o.title}}</b>
        <div v-for="(ov) in o.variants.slice(0,1)" ><span class="price">${{ov.price.amount}}</span> <span class="product-id">{{o.external_vendor_product_id}}</span></div>
        <div class="bottom clearfix">
          <b style="color: red">{{o.requestErrorMsg}} </b>
          <b style="color: green">{{o.requestSuccess}}</b>
          <!-- <el-button type="text" class="button">操作按钮</el-button> -->
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
  </div>
  
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      productList: [],
      api_key: this.$cookies.get('am-api-key'),
      input: '',
      currentDate: new Date(),
      pushNumber: 0,
      pushNumberShow:false,
      publishLoading: false,
      appData: {
        app: {
          key: "landon-test-01",
          name: "aftership",
          platform: "shopify"
        },
        organization: {
          id: "9bba1ea4d5a144049772bef6b7a1841a"
        }
      },
    }
  },
  created: function () {
      const self = this;
      // self.setApiKey()
      // self.getProductsList();
		},
  methods: {
    getProductsList(){
      const self = this;
      
      //api-key处理
      let headers = {};
      if(self.api_key){
        self.$cookies.set('am-api-key', self.api_key)
        headers['am-api-key'] = self.api_key
      }

      let data = self.input.split(/[\s\n]/);
      let queryStr = ''
      if(data){
        queryStr = data.join(',')
      }

      let params = {limit:50}
      params.external_vendor_product_ids = queryStr

			self.$axios.get(process.env.VUE_APP_API_URL_SUPPLIER + '/suppliers/v1/products',{params:params,  headers:headers}).then((response) => {
        console.log(response.data.data.products)
          self.productList = response.data.data.products;
      })

    },
    pushProductsList(){
      const self = this;

      self.publishLoading = true;
      self.pushNumberShow = true;
      self.pushNumber = 0;
      let headers = {
        'am-api-key': self.api_key, 
        // "Content-Type": "application/json",
      };

      for (let o of self.productList){
        //处理商品价格
        // let pushProduct = o;
        
        let pushProduct = _.cloneDeepWith(o)
        
        pushProduct = self.productsPricesHandler(pushProduct);
        // let product_id = o.id

        pushProduct.app = self.appData.app;
        pushProduct.organization = self.appData.organization;

        self.$axios.post(process.env.VUE_APP_API_URL_DROPSHIPPING +'/dropshipping/v1/products',pushProduct, {headers:headers}).then((response) => {
          self.pushNumber ++
          let product_id = response.data.data.id
          self.publishProduct(product_id, o)
          
          self.$set(o,"requestSuccess", '推送中，请稍后~')
        }).catch(e => {
          console.log(e);
          if(e.message == 'Request failed with status code 409'){
            // self.publishProduct(product_id)
            this.$set(o,"requestSuccess", '此商品曾被推送成功')
          }else{
            this.$set(o,"requestSuccess", '')
            this.$set(o,"requestErrorMsg", '推送失败: ' + e.message)
          }
        })
      }
     
    },
    publishProduct(product_id, o){
      const self = this;
      let headers = {
        'am-api-key': self.api_key, 
        // "Content-Type": "application/json",
      };

      let publishData = self.appData

      self.$axios.post(process.env.VUE_APP_API_URL_DROPSHIPPING +'/dropshipping/v1/products/' + product_id + '/publish',publishData, {headers:headers}).then((response) => {
        self.publishLoading = false;
        this.$set(o,"requestSuccess", '推送成功')
      }).catch(e => {
        self.publishLoading = false;
        console.log('推送失败');
      })
    },
    productsPricesHandler(product){
      // let shipping_prices = product.shipping_prices;
      // let variants = product.variants;
      if(product.shipping_prices.length == 0){
        return product
      }
      // let variantsMap = _.key(variants, 'id')

      let shippingPriceMap = {}

      for(let shipping_price of product.shipping_prices){
        let shipping_options = shipping_price.shipping_options
        let external_vendor_variant_ids = shipping_price.external_vendor_variant_ids
        
        let shippingOptionsMap = _.keyBy(shipping_options, function(o) {
          return o.country + '-'+ o.shipping_method;
        })   //读出所有物流方式，以国家+快递类型组合，如US-USPS

        //判断哪个价格低：
        let shippingOptionRes = null;
        if(shippingOptionsMap["USA-USPS"]){
          shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-USPS"])
        }else if(shippingOptionsMap["USA-4PX"]){
          shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-4PX"])
        }

        shippingOptionRes.prices = _.keyBy(shippingOptionRes.prices, 'unit')

        //TODO： 若此处没有运费价格，应该是要返回报错的。
        if(!shippingOptionRes){
          return product
        }

        for(let variant_universal_id of shipping_price.variant_universal_ids){
          shippingPriceMap[variant_universal_id] = shippingOptionRes;
        }
      }

      for(let variant of product.variants){
        const variantShippingPrice = shippingPriceMap[variant.universal_id]
        variant.price.amount = _.add(variant.price.amount, variantShippingPrice.prices[1].amount);
      }
      return product
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    /* width: 100%; */
    height: 100px;
    margin:0 auto;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .title{
    font-size: 10px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  .price{
    color: orange;
  }
  .product-id{
    font-size: 8px;
    color: grey;
  }
  .clearfix:after {
      clear: both
  }
</style>

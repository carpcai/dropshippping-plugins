

const axios = require("axios")

// 正式环境
// const DROPSHIPPING_URL = "https://product.automizelyAPI.com/dropshipping"
// const SUPPLIER_URL = "https://platform.automizelyAPI.com/suppliers"

// 测试环境
const DROPSHIPPING_URL = "http://127.0.0.1:8079/dropshipping/v1"
const SUPPLIER_URL = "http://127.0.0.1:8080/suppliers/v1"
const AM_API_KEY = ""

let hasNext = true;


class Services {
    constructor() {
        this.run()
    }
    async run() {
        //  SELECT app_key,organization_id FROM orders GROUP BY app_key,organization_id LIMIT 100
        //
        let appInfoMap = [
            {app_key:"landon-test-01",org_id:"0f456bfa2c394c94999cb7a6c465c1e6"},
            {app_key:"miaoxiaomixiao",org_id:"55660e6b98304423ae47ce8ef2a63964"},
            {app_key:"landon-test-01",org_id:"9bba1ea4d5a144049772bef6b7a1841a"},
            {app_key:"landon-test-05",org_id:"9bba1ea4d5a144049772bef6b7a1841a"},
            {app_key:"landon-test-07",org_id:"9bba1ea4d5a144049772bef6b7a1841a"},
            {app_key:"automizely-store",org_id:"b82f5a20ae024f5f82f2a90e8a54bc35"},
            {app_key:"automizely-store",org_id:"db95bf6a874c48538bb3af995dc0ca4f"},
            {app_key:"canxuemianbao",org_id:"db95bf6a874c48538bb3af995dc0ca4f"},
        ];
        for (let appInfo of appInfoMap ){
            const self = this ;
            let configGet = {
                params: {
                    page: 1,
                    limit: 2,
                    app_platform: "shopify",
                    app_key: appInfo.app_key,
                    // app_key: "canxuemianbao",
                },
                headers: {
                    "am-api-key": AM_API_KEY,
                    // "am-organization-id": "db95bf6a874c48538bb3af995dc0ca4f",
                    "am-organization-id": appInfo.org_id,
                },
            }

            while (hasNext) {
                let orderResp;
                try{
                    orderResp = await axios.get(DROPSHIPPING_URL + "/orders", configGet)
                }catch (e){
                    console.log(e);
                }
                console.log('--------------------获取到的数据---------------------');
                console.log(JSON.stringify(orderResp.data))
                console.log('---------------------------------------------------');
                const meta = orderResp.data.meta
                if (meta.code != 20000) {
                    console.log(orderResp.data.meta)
                    break
                }
                const data = orderResp.data.data

                if(data.orders.length == 0){
                    console.log("本页没有数据")
                }

                //补全订单金额数据。
                let orderPromise = []
                for (let order of data.orders) {
                    if(order.items.length <= 0){
                        continue
                    }
                    for (let item of order.items){
                        item.financial_status = order.financial_status;
                        item.fulfillment_status = order.fulfillment_status;

                        // 价格修复方案待商榷。
                    }
                    orderPromise.push(self.patchOrder(order))
                }
                await Promise.all(orderPromise)

                if (data.pagination.has_next_page != true) {
                    console.log("最后一页了。")
                    break
                }
                // configGet.params.page++

                await sleep(1000)
            }
        }

    }

    //更新orders
    async patchOrder(order){
        console.log('--------------------要patch的数据---------------------');

        let patchConfig = {
            headers: {
                "am-api-key": AM_API_KEY,
                "am-organization-id": "db95bf6a874c48538bb3af995dc0ca4f",
            },
        }
        console.log(JSON.stringify(order));
        console.log('--------------------response---------------------');
        let patchResp
        try{
            patchResp = await axios.patch(DROPSHIPPING_URL + "/orders/" + order.id, order, patchConfig)
        }catch (e){
            console.log(e)
        }

        if(patchResp.status != 200) {
            console.log(JSON.stringify(patchResp.data));
        }
        console.log('------------------------------------------------');

    }
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

new Services()




// axios.

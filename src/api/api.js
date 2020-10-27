import { request } from './request'


export const getDetailByShortTable = async (short) => { // 桌号获取
    const result = await request({
        method: 'post',
        url: '/client/v1/shop/table/detail-by-short',
        data: { short },
    })
    localStorage.setItem('table_id', result.result.table.table_id)
    localStorage.setItem('s', short)
    return result;
}

export const getList = async (shop_id, cate_id = '', is_takeaway = 1) => {
    const result = await request({
        method: 'post',
        url: '/client/v1/product/list',
        data: { shop_id, cate_id, is_takeaway: 1 },
    })
    return result;
}


export const getOrderDetailWithTableID = async (table_id) => {
    const result = await request({
        method: 'post',
        url: '/client/v1/order/detail-by-table',
        data: { table_id }
    })
    return result;
}

export const makeOrder = async (shop_id, list, table_id = '', remark = '', order_id = []) => {
    // console.log(products);
    const result = await request({
        method: 'post',
        url: '/client/v1/order/make',
        data: {
            shop_id,
            list,
            table_id,
            remark,
            order_id,
        }
    })
    return result;
}



// export const getDetail = async (shop_id = '1') => {
//     const result = await request({
//         method: 'post',
//         url: '/client/v1/shop/detail',
//         data: { shop_id }
//     })
//     return result;
// }
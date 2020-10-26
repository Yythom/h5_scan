import { request } from './request'

// let cookie = localStorage.getItem('cookkie')

// export const registerApi = (params) => { //注册
//     return request({
//         method: 'get',
//         url: '/register/cellphone',
//         params: params  //post data:
//     })
// }

export const getDetailByShortTable = async (short) => { // 桌号获取
    const result = await request({
        method: 'post',
        url: '/client/v1/shop/table/detail-by-short',
        data: { short: '8MJ4Ml' },
    })
    return result;
}

export const getList = async (shop_id, cate_id = '', is_takeaway = 1) => {
    const result = await request({
        method: 'post',
        url: '/client/v1/product/list',
        data: { shop_id: 1, cate_id, is_takeaway: 1 },
    })
    return result;
}

export const getDetail = async (shop_id = '1') => {
    const result = await request({
        method: 'post',
        url: '/client/v1/shop/detail',
        data: { shop_id }
    })
    return result;
}
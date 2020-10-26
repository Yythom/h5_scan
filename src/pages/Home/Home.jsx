import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useEffect, useState } from 'react'
import { getDetailByShortTable, getList } from '../../api/api'

import Carbar from '../../component/carBar/CarBar'
import Food from './child/food'
import './home.scss'
function _Home() {
    const [scan, setScan] = useState('')
    const [p_list, setPlist] = useState('')
    const [food_list, setFoodlist] = useState([])
    const [tab, setTab] = useState(1)
    async function initFn() {
        let scanRes = await getDetailByShortTable()
        setScan(scanRes.result)
        let listRes = await getList()
        setPlist(listRes.result);
        tabFn(1, listRes.result)
    }
    useEffect(() => {
        initFn();
        // getDetail().then(res => console.log(res)); // 商品详情
    }, [])

    const tabFn = (cate_id, init) => {
        let renderArr = []
        if (init) {
            renderArr = init.product_list.filter(e => (e.cate_id == cate_id || cate_id == 1));
        } else {
            renderArr = p_list.product_list.filter(e => (e.cate_id == cate_id || cate_id == 1));
        }
        setTab(cate_id);
        if (renderArr) {
            setFoodlist(renderArr)
        }
    }


    return (
        <div className='home_wrap'>
            {(scan && p_list) ? (
                <>
                    <div className='title'  >
                        <div className='mask'> </div>
                        <img className='cover' src={`${scan.cover}`} alt="" />

                        <div className='float_content'>
                            <h2>{scan.table.name}桌</h2>
                            <h3>{scan.shop_name}</h3>
                            <p><svg t="1603694097223" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1182" width="14" height="14"><path d="M515.213312 64c-183.656448 0-339.219456 156.43648-339.219456 341.7344 0 194.046976 180.282368 392.484864 301.551616 531.95264 0.464896 0.560128 20.057088 22.311936 44.215296 22.311936 0.055296 0 2.052096 0 2.132992 0 24.144896 0 43.614208-21.751808 44.106752-22.311936 113.806336-130.828288 280.004608-346.546176 280.004608-531.95264C848.006144 220.43648 726.678528 64 515.213312 64zM526.465024 900.128768c-0.999424 0.984064-2.405376 2.092032-3.678208 2.981888-1.26976-0.889856-2.692096-1.997824-3.704832-2.981888l-14.669824-16.843776C389.44256 751.39072 231.995392 570.769408 231.995392 405.7344c0-154.891264 129.693696-285.7472 283.216896-285.7472 191.205376 0 276.791296 143.502336 276.791296 285.7472C792.003584 531.024896 702.671872 697.372672 526.465024 900.128768z" p-id="1183" fill="#FFFFFF"></path><path d="M512.9984 233.562112c-92.778496 0-168.00256 75.22304-168.00256 168.00256 0 92.778496 75.224064 168.00256 168.00256 168.00256 92.777472 0 168.001536-75.225088 168.001536-168.00256C681.00096 308.785152 605.775872 233.562112 512.9984 233.562112zM512.9984 513.565696c-61.75744 0-113.288192-51.462144-113.288192-113.231872 0-61.75744 50.245632-112.002048 112.002048-112.002048 61.769728 0 112.001024 50.245632 112.001024 112.002048C623.714304 462.103552 574.768128 513.565696 512.9984 513.565696z" p-id="1184" fill="#FFFFFF"></path></svg>{scan.address}</p>
                        </div>
                    </div>
                    <div className='tab'>
                        <ul>
                            {/* <li onClick={() => { tabFn(1) }} style={tab === 1 ? { fontSize: '1.2rem', fontWeight: '600' } : { fontSize: '1rem' }}>全部分类</li> */}
                            {p_list.category_list && p_list.category_list.map((cate) => {
                                return (
                                    <li onClick={() => { tabFn(cate.category_id) }} key={cate.category_id + cate.category_name} style={tab == cate.category_id ? { fontSize: '1.2rem', fontWeight: '600' } : { fontSize: '1rem' }}>
                                        {cate.category_name}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='food_wrap'>
                        {
                            food_list && food_list.map((food_item) => {
                                return (
                                    <div className='food' key={food_item.product_id}>
                                        {/* {console.log(food_item)} */}
                                        <Food
                                            food={food_item}
                                            shop_id={scan.shop_id}
                                            profit_name={scan.profit_name ? true : false} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <Carbar shop_id={scan.shop_id} profit_name={scan.profit_name ? true : false} />
                </>
            ) : null

            }

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Home)
import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDetailByShortTable, getList } from '../../api/api';
import Carbar from '../../component/carBar/CarBar';
import Header from '../../component/header/header';
import Food from './child/food';
import './home.scss';

function _Home() {
    const [scan, setScan] = useState('')
    const [p_list, setPlist] = useState('')
    const [food_list, setFoodlist] = useState([])
    const [tab, setTab] = useState(1)
    async function initFn() {
        let scanRes = await getDetailByShortTable();
        console.log(scanRes);
        if (scanRes.code === '0') {
            setScan(scanRes.result)
        }

        let listRes = await getList()
        if (listRes.code === '0') {
            setPlist(listRes.result);
        }

        tabFn(1, listRes.result)
    }
    useEffect(() => {
        initFn();
        // getDetail().then(res => console.log(res)); // 商品详情
        // eslint-disable-next-line 
    }, [])

    const tabFn = (cate_id, init) => {
        let renderArr = []
        if (init) {
            renderArr = init.product_list.filter(e => (Number(e.cate_id) === Number(cate_id) || Number(cate_id) === 1));
        } else {
            renderArr = p_list.product_list.filter(e => (Number(e.cate_id) === Number(cate_id) || Number(cate_id) === 1));
        }
        setTab(cate_id);
        if (renderArr) {
            setFoodlist(renderArr)
        }
    }


    return (
        <div className='home_wrap'>
            {
                (scan && p_list) ? (
                    <>
                        <Header />
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
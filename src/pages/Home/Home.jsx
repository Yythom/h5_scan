import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDetailByShortTable, getList } from '../../api/api';
import Carbar from '../../component/carBar/CarBar';
import Header from '../../component/header/header';
import Food from './child/food';
import './home.scss';
import { useHistory } from 'react-router-dom';

function _Home() {
    const [scan, setScan] = useState('');
    const [p_list, setPlist] = useState('');
    const [food_list, setFoodlist] = useState([]);
    const [tab, setTab] = useState(0);
    const history = useHistory();

    async function req(s) {
        let scanRes = await getDetailByShortTable(s); // 桌码短号获取详情
        if (scanRes.code === '0') {
            localStorage.setItem('shortTable', JSON.stringify(scanRes.result))
            setScan(scanRes.result);
            let listRes = await getList(scanRes.result.shop_id)
            if (listRes.code === '0') {
                localStorage.setItem('pList', JSON.stringify(listRes.result))
                setPlist(listRes.result);
                tabFn(1, listRes.result);
                return
            }
        }
    }


    async function initFn() {
        let qr = (history.location.search.indexOf('s=') !== -1 && history.location.search.indexOf('t=') !== -1);
        if (localStorage.getItem('again')) {
            let s = localStorage.getItem('s');
            req(s);
            console.log('加菜刷新');

        } else if (qr) {
            let err = '';
            try {
                let params = `${history.location.search}`.replace('?', '');
                // let t = `${params}`.split('&')[1].split('=')[1];
                let s = `${`${params}`.split('&')[1]}`.split('=')[1]
                let scanRes = await getDetailByShortTable(s); // 桌码短号获取详情
                if (scanRes.code === '0') {
                    localStorage.setItem('shortTable', JSON.stringify(scanRes.result))
                    setScan(scanRes.result);
                    let listRes = await getList(scanRes.result.shop_id)
                    if (listRes.code === '0') {
                        localStorage.setItem('pList', JSON.stringify(listRes.result))
                        setPlist(listRes.result);
                        tabFn(1, listRes.result);
                        console.log('二维码读取');
                        return
                    }
                }
            } catch (error) {
                err = error;
                console.log(error);
            }
            tabFn(1, {}, err)
        } else {
            if (localStorage.getItem('shortTable') && localStorage.getItem('pList')) {
                setPlist(JSON.parse(localStorage.getItem('pList')));
                tabFn(1, JSON.parse(localStorage.getItem('pList')));
                setScan(JSON.parse(localStorage.getItem('shortTable')));
            }
            console.log('本地读取');
        }

    }
    useEffect(() => {
        initFn();
        // getDetail().then(res => console.log(res)); // 商品详情
        // eslint-disable-next-line 
    }, [])

    const tabFn = (cate_id, init, error) => {

        // console.log(cate_id, init);
        let renderArr = []
        if ((cate_id || cate_id === 0) || (init && Object.keys(init)[0])) {
            if (init) {
                renderArr = init.product_list.filter(e => (e.cate_id == cate_id || cate_id == 0));
                setTab(0);
            } else {
                renderArr = p_list.product_list.filter(e => (e.cate_id == cate_id || cate_id == 0));
                setTab(cate_id);
            }

            if (renderArr) {
                console.log(renderArr);

                setFoodlist(renderArr)
            }
        } else {
            alert(error);
            console.log(error);
        }
    }


    return (
        <div className='home_wrap'>
            {
                (scan && p_list) ? (
                    <>
                        <Header scanDesc={scan} />
                        <div className='tab'>
                            <ul>
                                <li onClick={() => { tabFn(0) }} style={tab == 0 ? { fontSize: '1.2rem', fontWeight: '600' } : { fontSize: '1rem' }}>
                                    全部分类
                                        </li>
                                {p_list.category_list && p_list.category_list.map((cate) => {
                                    return (
                                        // eslint-disable-next-line
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
import React from 'react';
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import { getDetailByShortTable, getList } from '../../api/api';
import Carbar from '../../component/carBar/CarBar';
import Food from './child/food';
import { useHistory } from 'react-router-dom';
import loadingImg from '../../assets/images/loading.gif'
import './home.scss';


function _Home(props) {
    const [p_list, setPlist] = useState('');
    const [food_list, setFoodlist] = useState([]);
    const [tab, setTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    /**
     * @param {loding状态}} status 
     */
    function isLoadingFn(status) {
        setTimeout(() => {
            setLoading(status);
        }, 400);
    }

    /**
     * @param {桌码短号} s 
     * @param {成功信息} type 
     */
    async function req(s, type) { // 请求短号pb
        isLoadingFn(true)
        try {
            const scanRes = await getDetailByShortTable(s); // 桌码短号获取详情
            if (scanRes.code === '0') {
                localStorage.setItem('shortTable', JSON.stringify(scanRes.result))
                props.setScan(scanRes.result);
                const listRes = await getList(scanRes.result.shop_id);
                if (listRes.code === '0') {
                    localStorage.setItem('pList', JSON.stringify(listRes.result))
                    setPlist(listRes.result);
                    tabFn(0, listRes.result);
                    isLoadingFn(false);
                    console.log(type);
                    return
                }
            }
        } catch (error) {
            tabFn(1, {}, error);
        }
    }

    async function initFn() {
        isLoadingFn(true)
        const qr = (history.location.search.indexOf('s=') !== -1 && history.location.search.indexOf('t=') !== -1);
        if (localStorage.getItem('again') && !qr) {
            const s = localStorage.getItem('s');
            req(s, '加菜刷新');
            setTimeout(() => {
                localStorage.removeItem('again');
            }, 600);
        } else if (qr) {
            const params = `${history.location.search}`.replace('?', '');
            const s = `${`${params}`.split('&')[1]}`.split('=')[1];
            req(s, '二维码读取');
            return
        } else if (localStorage.getItem('shortTable') && localStorage.getItem('pList')) {
            setPlist(JSON.parse(localStorage.getItem('pList')));
            tabFn(0, JSON.parse(localStorage.getItem('pList')));
            props.setScan(JSON.parse(localStorage.getItem('shortTable')));
            console.log('本地读取');
            isLoadingFn(false);
        } else {
            alert('url不正确,桌码解析有误');
        }
    }

    useEffect(() => {
        initFn();
        // eslint-disable-next-line 
    }, [])


    /**
     * @param {分类id 全部时为0} cate_id 
     * @param {厨师} init 
     * @param {页面提示错误信息} error 
     */
    const tabFn = (cate_id, init, error) => {
        if (error) {
            alert(error);
            console.log(error);
            return;
        }

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
                console.log(renderArr, 'tab__Render'); // 根据tab过滤出来的渲染数据 Array[]
                setFoodlist(renderArr);
            }
        }
    }


    return (
        <div className='home_wrap ' >
            {loading && <div className='loading animate__fadeIn animate__animated'>
                <img src={loadingImg} alt="" />
                <h2>loading.....</h2>
            </div>}
            {
                (props.scan && p_list && !loading) ? (
                    <>
                        {/* <Header scanDesc={scan} /> */}
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
                        <div className='food_wrap animate__fadeIn animate__animated'>
                            {
                                food_list && food_list.map((food_item) => {
                                    return (
                                        <div className='food' key={food_item.product_id}>
                                            {/* {console.log(food_item)} */}
                                            <Food
                                                food={food_item}
                                                shop_id={props.scan.shop_id}
                                                profit_name={props.scan.profit_name ? true : false}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {props.scan && <Carbar />}
                    </>
                ) : null
            }

        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(_Home)
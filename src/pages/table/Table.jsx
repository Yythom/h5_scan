import React, { useEffect, useState } from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import Header from '../../component/header/header'

import { useHistory } from 'react-router-dom'
import { getOrderDetailWithTableID } from '../../api/api'
import np from 'number-precision'
import loadingImg from '../../assets/images/loading.gif'
import './table.scss'
function Table(props) {
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState('');
    const [noPay, setNoPay] = useState([]); // 待支付
    // const [donePay, setDonePay] = useState([]); //成功
    // const [cancelPay, setCancelNopay] = useState([]); // 取消
    // const [failPay, setFailNoPay] = useState([]); // 失败
    // const [quitPay, setQuitNoPay] = useState([]); // 退款
    const [renderData, setData] = useState({})
    // 1 取消 2 待支付 3 成功 4 失败 5 退款
    // is_business 
    const history = useHistory();
    function pushArr(e, currentArr) {
        // let product = e.product.product;
        currentArr.push(e);
        // product.forEach(el => {
        //     newArr.push(el)
        // })
    }
    function hideLoading(status) {
        setTimeout(() => {
            setLoading(status)
        }, 400);
    }

    function init() {
        hideLoading(true);
        if (localStorage.getItem('table_id')) {
            // setTable_id(localStorage.getItem('table_id'));
            getOrderDetailWithTableID(localStorage.getItem('table_id')).then(res => {
                if (res.code === '0') {
                    console.log(res, 'table _desc');
                    let noArr = []; // 待支付
                    let doneArr = []; // 完成
                    let cancelArr = []; // 取消
                    let failArr = []; // 失败
                    let quitArr = []; //退款
                    let renderData = {}
                    // let noP = []; // 待支付
                    // let doneP = []; // 完成
                    // let cancelP = []; // 取消
                    // let failP = []; // 失败
                    // let quitP = []; //退款

                    res.result[0] && res.result.forEach((e) => {
                        renderData[e.order.order_id] = {
                            product: e.product.product,
                            status: e.order.status,
                            order: e.order
                        };
                        if (e.order.status === 1) {
                            pushArr(e, cancelArr)
                        }
                        if (e.order.status === 2) {
                            pushArr(e, noArr)
                        }
                        if (e.order.status === 3) {
                            pushArr(e, doneArr)
                        }
                        if (e.order.status === 4) {
                            pushArr(e, failArr)
                        }
                        if (e.order.status === 5) {
                            pushArr(e, quitArr)
                        }
                    })

                    setNoPay(noArr);
                    // setDonePay(doneArr);
                    // setFailNoPay(failArr);
                    // setCancelNopay(cancelArr);
                    // setQuitNoPay(quitArr);
                    setData(renderData)
                }
                setOrder(res.result);
            })
        } else {
            alert('table——Id不存在');
            history.push('/qrcode')
        }
        hideLoading(false);
    }

    function totalCount(noOrder, type) {
        let totalCount = 0;
        let totalPrice = 0;
        noOrder.forEach((e) => {
            totalCount += e.product.product.reduce((pre, next) => pre + next.number, 0)
            totalPrice += e.product.product.reduce((pre, next) => pre + np.times(next.number, next.price), 0)
        })
        if (type === 'count') {
            return totalCount
        } else {
            return totalPrice
        }
    }

    function renderOrder(type) { // 渲染函数
        if (Object.values(renderData)[0]) {
            // 1 取消 2 待支付 3 成功 4 失败 5 退款
            return Object.values(renderData).map((e) => {
                let type = e.status
                return (
                    <li key={e.order.order_id} className='p_item'>
                        <div className='p_title' >
                            <span>
                                {type === 1 ? '已取消订单' : null}   {type === 2 ? '未结算订单' : null}   {type === 1 ? '已完成订单' : null}   {type === 1 ? '支付失败' : null}   {type === 1 ? '已退款订单' : null}
                            </span>
                            <p>{e.order.create_at}</p>
                        </div>
                        <div className='p_content'>
                            {e.product.map((item) => {
                                return <div key={e.order.order_id + item.product_id}>
                                    <aside >
                                        <div className='p_img_box'>
                                            <img src={item.product_picture} alt="error" />
                                        </div>
                                        <div className='p_desc'>
                                            <p>{item.product_name}</p>
                                            <p>x{item.number}</p>
                                        </div>
                                    </aside>
                                    <div className='p_total'>
                                        ¥{np.times(item.price, item.number)}
                                    </div>
                                </div>
                            })}
                        </div>
                        <div className='p_footer'>
                            <span>合计：</span>
                            <span>¥</span>
                            <span>{e.order.total_price}</span>
                        </div>
                    </li>
                )
            })
        }

        return false
    }


    useEffect(() => {
        init();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="table_wrap">
            {loading && <div className='loading animate__fadeIn animate__animated' >
                <img src={loadingImg} alt="" />
                <h1>loading......</h1>
            </div>}
            {!loading && <>
                <Header isAddProduct={true} />
                {
                    order && <>
                        {noPay && <div className="bar">
                            {/* <h1>{table_id}</h1> */}
                            <p>
                                <span>未支付总计：</span>
                                <span>{totalCount(noPay, 'count')}件</span>
                                <span>¥{totalCount(noPay)}</span>
                            </p>
                        </div>}
                        <div className="order_wrap animate__fadeIn animate__animated">
                            {/*  1 取消 2 待支付 3 成功 4 失败 5 退款 */}
                            <ul className="order_ul">
                                {renderOrder()}
                            </ul>
                        </div>
                    </>
                }</>}
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Table)
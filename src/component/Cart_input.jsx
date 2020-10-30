import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../redux/actionCreator'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import np from 'number-precision'

import './Cart_input.scss'

function Input(props) {
    const [num, setNum] = useState(0)
    let { food_item, addCart, shopid, profit_name } = props;


    function cartFn(food, shop_id, current) {
        if (num === 0 && current === 'del') { // 如果数量为0 并且执行减操作的时候 不执行
            return
        }
        addCart(food, shop_id, current);
        foodNum(food)
    }

    useEffect(() => {
        foodNum(food_item)
        // eslint-disable-next-line
    }, [props.cartSummary?.num]) // 同步更新cartBar

    const foodNum = (food) => {
        let flag = false;
        let allNumber = 0;
        let oldPrice = 0;
        let memberPrice = 0;
        let productList = []
        let allCartComputer = {
            num: 0,
            oldPrice: 0,
            memberPrice: 0,
            productList: [],
        };
        if (props.cart) {
            if (Object.keys(props.cart)[0]) {
                Object.values(props.cart)[0].list.forEach(e => {
                    e.product.forEach(el => {
                        allNumber += el.number; // 购物车总数量
                        oldPrice += np.times(el.number, el.sell_price); // 购物车总价格
                        productList.push(el); // 购物车商品列表
                        if (profit_name && el.is_member === 1) { // 购物车总会员价
                            memberPrice += np.times(el.number, el.member_price);
                        }
                        if (el.product_id === food.product_id) {
                            flag = true;
                            if (el.number) { // 当前商品的数量
                                setNum(el.number)
                            } else {
                                setNum(0)
                            }
                        }
                    })
                });
            } else {
                setNum(0)
            }
            if (!flag) { // 如果找不到该商品 默认0
                setNum(0)
            }
            // 执行清空会默认复制 allCartComputer
            allCartComputer.num = allNumber;
            allCartComputer.memberPrice = memberPrice;
            allCartComputer.oldPrice = oldPrice;
            allCartComputer.productList = productList;
            props.setAllNum({ ...allCartComputer });
        }
    }

    return (
        <div className='cart_input_wrap'>
            <i className="btn btn-plus" onClick={() => { cartFn(food_item, shopid, 'add') }}></i>
            <span>{num}</span>
            <i className="btn btn-minus" onClick={() => { cartFn(food_item, shopid, 'del') }}></i>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Input)
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
        if (num === 0 && current === 'del') {
            return
        }
        addCart(food, shop_id, current);
        foodNum(food)
    }

    useEffect(() => {
        foodNum(food_item)
    }, [props.cartSummary?.num])

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
                        allNumber += el.number;
                        oldPrice += np.times(el.number, el.sell_price);
                        productList.push(el);
                        if (profit_name && el.is_member === 1) {
                            memberPrice += np.times(el.number, el.member_price);
                        }
                        if (el.product_id === food.product_id) {
                            flag = true;
                            if (el.number) {
                                console.log(el.product_name, el.number, '数量');
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
            allCartComputer.num = allNumber;
            allCartComputer.memberPrice = memberPrice;
            allCartComputer.oldPrice = oldPrice;
            allCartComputer.productList = productList;
            props.setAllNum({ ...allCartComputer });
        }

    }

    return (
        <div className='cart_input_wrap'>
            <sapn className="btn btn-plus" onClick={() => { cartFn(food_item, shopid, 'add') }}></sapn>
            {num}
            <sapn className="btn btn-minus" onClick={() => { cartFn(food_item, shopid, 'del') }}></sapn>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Input)
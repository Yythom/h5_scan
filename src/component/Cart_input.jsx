import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../redux/actionCreator'
import { connect } from 'react-redux'
import { useState } from 'react'
import { useEffect } from 'react'
function Input(props) {
    const [num, setNum] = useState(0)
    let { food_item, addCart, shopid } = props
    function cartFn(food, shop_id, current) {
        if (num === 0 && current === 'del') {
            return
        }
        addCart(food, shop_id, current);
    }
    useEffect(() => {
        foodNum(food_item)
    }, [num])
    const foodNum = (food) => {
        let flag = false;
        let allNum = 0;
        if (props.cart) {
            if (Object.keys(props.cart)[0]) {
                Object.values(props.cart)[0].list.forEach(e => {
                    e.product.forEach(el => {
                        allNum += el.number;
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
        }
        props.setAllNum(allNum);
    }
    return (
        <div className='cart_input_wrap'>
            <button onClick={() => { cartFn(food_item, shopid, 'add') }}>+</button>
            {num}
            <button onClick={() => { cartFn(food_item, shopid, 'del') }}>-</button>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Input)
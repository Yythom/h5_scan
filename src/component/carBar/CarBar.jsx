import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../redux/actionCreator'
import { connect } from 'react-redux'
import { useState } from 'react'
import './carbar.scss'
import cartimg from '../../assets/icon/icon/cart.png'
import Input from '../Cart_input'
import { useHistory } from 'react-router-dom'
function Carbar(props) {
    const [show, setShow] = useState(false);
    const history = useHistory();
    let { addCart, shop_id, cart, cartNum, cartSummary, profit_name } = props
    function back() {
        history.push('/scanAccount')
    }
    // console.log(props);
    return (
        <div className='carbar'>
            <ul className={!show ? 'none_ul float_ul' : 'float_ul'} style={{ height: `${14 + 1 * cartSummary?.productList.length}rem` }}>
                <div className='title'>
                    <p>已选商品（{cartSummary?.num}）</p>
                    <p onClick={props.clearCart} >清空</p>
                </div>
                <ul className={'produce_ul'}>
                    {cartSummary?.productList && cartSummary.productList.map(e => {
                        return (
                            <li key={e.product_id}>
                                <div className='e_img'>
                                    <img src={e.picture} alt="" />
                                </div>
                                <div className='e_desc'>
                                    <p>{e.product_name}</p>
                                    <div><Input food_item={e} shopid={shop_id} profit_name={profit_name} /></div>
                                </div>
                                <div className='e_price'>
                                    {
                                        profit_name
                                            ? (
                                                e.is_member === 1
                                                    ? <>

                                                        <p className='new'>¥{e.member_price}</p>
                                                        <p className='old'>¥{e.sell_price}</p>
                                                    </>
                                                    : null
                                            )
                                            : <p className='new'>¥{e.sell_price}</p>
                                    }
                                </div>
                            </li>
                        )
                    })}
                </ul>

            </ul>
            <div className='cart_img footer' >
                <img src={cartimg} alt="0" onClick={() => { setShow(!show) }} />
                <li>{cartSummary?.num}</li>
            </div>
            <div className='all_price'>
                {
                    profit_name
                        ? <>
                            <p className='new'>¥{cartSummary?.memberPrice}</p>
                            <p className='old'>¥{cartSummary?.oldPrice}</p>
                        </>

                        : <p className='new'>¥{cartSummary?.oldPrice}</p>
                }
            </div>
            <div className='submit' onClick={() => { back() }}>
                提交订单
            </div>
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Carbar)
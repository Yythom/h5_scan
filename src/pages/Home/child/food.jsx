import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator'
import { connect } from 'react-redux'
import InputCart from '../../../component/Cart_input'
function Food(props) {
    const {
        food, // 单项商品
        profit_name, // 是否会员
        shop_id,
    } = props

    return (
        <div className='food_item'>

            {
                food ?
                    <>
                        <div className='img_wrap'>
                            <img src={food.picture} alt="error" />
                        </div>
                        <p>{food.product_name}</p>
                        <div className='price'>
                            <div>
                                {
                                    // profit_name
                                    //     ? (
                                    //         food.is_member === 1
                                    //             ? <>

                                    //                 <span className='new'>¥{food.member_price}</span>
                                    //                 <span className='old'>¥{food.sell_price}</span>
                                    //             </>
                                    //             : null
                                    //     )
                                    //     : 
                                    <span className='new'>¥{food.sell_price}</span>
                                }
                            </div>
                            <InputCart profit_name={profit_name} food_item={food} shopid={shop_id} />
                        </div>
                    </>
                    : null
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Food)
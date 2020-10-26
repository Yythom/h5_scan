import React from 'react'
import { mapStateToProps, mapDispatchToProps } from '../../../redux/actionCreator'
import { connect } from 'react-redux'
import InputCart from '../../../component/Cart_input'
function Food(props) {
    const { food, profit_name, shop_id, cart } = props


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
                                    profit_name
                                        ? (
                                            food.is_member === 1
                                                ? <>

                                                    <span className='new'>{food.member_price}</span>
                                                    <span className='old'>{food.sell_price}</span>
                                                </>
                                                : null
                                        )
                                        : <span className='new'>{food.sell_price}</span>
                                }
                            </div>
                            <InputCart food_item={food} shopid={shop_id} />
                        </div>
                    </>
                    : null
            }
        </div>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Food)
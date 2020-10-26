let initState = {
    tabStatus: 1,
    cart: JSON.parse(localStorage.getItem('cart')) || {},
    allCartComputer: {
        num: null,
        oldPrice: null,
        memberPrice: null,
        productList: []
    },
}


export const reducer = (state = initState, action) => {
    let states = JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case "TAB":
            console.log(action.index);
            states.tabStatus = action.index
            return states;
        case 'ADDCART':
            // console.log(action);
            states.cart = cart(action.food, action.shop_id, action.current, state.cart);
            localStorage.setItem('cart', JSON.stringify(states.cart))
            console.log(states.cart);
            return states;
        case 'SETNUM':
            states.cartSummary = action.allSummary;
            return states;
        case 'CLEAR':
            states.cart = {};
            states.cartSummary = initState.cartSummary;
            return states;
        default:
            return states;
    }
}



function cart(food, shop_id, current, cart, againNumber) {
    let item = JSON.parse(JSON.stringify(food)); // 菜品item
    if (!item.number) {
        item.number = 1; // 初始化菜品数量
    }
    let setFlag = false; // 删除店铺的开关
    let list = []; // list
    if (cart[shop_id]) { // 如果存在店铺list 则赋值
        let tempList1 = [...cart[shop_id].list];
        list = tempList1;
    }

    // 创建分类
    if (!list[0]) {
        list.push({ category_id: item.cate_id, product: [] });
    } else {
        let flag = false;
        list.forEach((el) => { // 已有该菜品对应的分类对象
            if (el.category_id === item.cate_id) {
                flag = true;
            }
        });
        if (!flag) { // 没有该分类 创建分类
            list.push({ category_id: item.cate_id, product: [] });
        }
    }


    // 将商品插入对应分类
    list.forEach((el, index) => { // el ->>> 每个分类
        let e = item;
        if (item.cate_id === el.category_id) { // 找到->当前商品分类对象
            if (!el.product[0]) { // 如果该分类没有商品  直接插入 不走判断
                list[index].product.push(e);
            } else { // 购物车已有商品  根据 传入current执行加减
                let flag = false; // 判断是否含有该商品 true->存在 false->不存在
                el.product.forEach((el2, i) => { // 遍历该分类下的商品
                    if (el2.product_id === item.product_id) { // 如果当前存在的情况
                        flag = true;
                        if (current === 'add' && !againNumber) {
                            list[index].product[i].number += 1;
                        } else if (current === 'del') {
                            list[index].product[i].number -= 1;
                            if (list[index].product[i].number === 0) { // 如果该商品数量为0  删除商品
                                console.log(list[index].product[i].number);
                                list[index].product[i].number = 0
                                list[index].product.splice(i, 1);
                                if (!el.product[0]) { // 如果该分类商品为空 删除分类
                                    list.splice(index, 1);
                                }
                                if (!list[0]) { // 如果该店铺list为空 del
                                    console.log('删除店铺购物车对象');
                                    setFlag = true;
                                }
                            }
                        }
                        // if (againNumber) { // 直接修改商品 number （再来一单使用）
                        //     list[index].product[i].number = againNumber;
                        // }
                    }
                });
                if (!flag) { // 如果当前分类 不存在商品 push一个初始化商品
                    list[index].product.push(e);
                }
            }
            if (list[index]) {
                list[index].user_coupon_id = ''; // 分类优惠券预留
            }
        }
    });

    if (cart[shop_id]) { // 如果店铺存在 只改变list
        cart[shop_id] = { ...cart[shop_id], list };
    } else {
        const shopObj = {
            shop_id, // 店铺id
            list, // list-> { 分类对象 } -> { product-list }
            user_coupon_id: '', // 全场优惠卷
            table_id: '',
            member_id: '',
            couponNum: null,
        };
        cart[shop_id] = shopObj;
    }
    if (setFlag) { // 如果list为空 删除该店铺购物车对象
        delete cart[shop_id];
    }
    return cart
}
// import icon from '../assets/icon/icon'

import Home from '../pages/Home/Home'
import Test from '../pages/test/index'

let router = () => {
    return {
        index: {
            url: '/test',
            // icon: icon.Index,
            // activeIcon: icon.Active.Index,
            desc: 'test',
            page: Test,
        },
        home: {
            url: '/home',
            // icon: icon.Home,
            // activeIcon: icon.Active.Home,
            desc: '主页',
            page: Home
        },
    }
}
export default router();
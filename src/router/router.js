// import icon from '../assets/icon/icon'

import Home from '../pages/Home/Home'
import Test from '../pages/test/index'
import Register from '../pages/User/Register'
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
        Register: {
            url: '/Register',
            // icon: icon.Register,
            // activeIcon: icon.Active.Register,
            desc: '注册',
            page: Register
        }
    }
}
export default router()
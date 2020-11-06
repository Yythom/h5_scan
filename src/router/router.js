// import icon from '../assets/icon/icon'

import Home from '../pages/Home/Home'
// import Test from '../pages/Test/Test'
import Table from '../pages/table/Table'

let router = () => {
    return {
        home: {
            url: '/qrcode',
            // icon: icon.Home,
            // activeIcon: icon.Active.Home,
            desc: '主页',
            page: Home
        },
        // test: {
        //     url: '/test',
        //     // icon: icon.Home,
        //     // activeIcon: icon.Active.Home,
        //     desc: 'test',
        //     page: Test
        // },
        table: {
            url: '/table',
            // icon: icon.Home,
            // activeIcon: icon.Active.Home,
            desc: '桌——详情',
            page: Table
        },
    }
}
export default router();
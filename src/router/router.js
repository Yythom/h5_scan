// import icon from '../assets/icon/icon'

import Home from '../pages/Home/Home'
import ScanAccount from '../pages/scanAccount/ScanAccount'
import Table from '../pages/table/Table'

let router = () => {
    return {
        home: {
            url: '/home',
            // icon: icon.Home,
            // activeIcon: icon.Active.Home,
            desc: '主页',
            page: Home
        },
        // scanAccount: {
        //     url: '/scanAccount',
        //     // icon: icon.Home,
        //     // activeIcon: icon.Active.Home,
        //     desc: '扫码收银台',
        //     page: ScanAccount
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
import React, { useEffect, useState } from 'react';
// import { getDetailByShortTable } from '../../api/api';
import './header.scss'
import { useHistory } from 'react-router-dom';
function Header(props) {
    const [scan, setScan] = useState('');
    const history = useHistory();
    useEffect(() => {
        if (props.scan) {
            setScan(props.scan);
            localStorage.setItem('shop_desc', JSON.stringify(props.scan))
        } else if (localStorage.getItem('shop_desc')) {
            setScan(JSON.parse(localStorage.getItem('shop_desc')));
        }
        // eslint-disable-next-line
    }, [])
    return (
        <div className='title'  >
            {scan &&
                <>
                    <div className='mask'> </div>
                    <img className='cover' src={`${scan.cover}`} alt="" />

                    <div className='float_content'>
                        <h2>{scan.table.name}</h2>
                        <h3>{scan.shop_name}</h3>
                        <p><svg t="1603694097223" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1182" width="14" height="14"><path d="M515.213312 64c-183.656448 0-339.219456 156.43648-339.219456 341.7344 0 194.046976 180.282368 392.484864 301.551616 531.95264 0.464896 0.560128 20.057088 22.311936 44.215296 22.311936 0.055296 0 2.052096 0 2.132992 0 24.144896 0 43.614208-21.751808 44.106752-22.311936 113.806336-130.828288 280.004608-346.546176 280.004608-531.95264C848.006144 220.43648 726.678528 64 515.213312 64zM526.465024 900.128768c-0.999424 0.984064-2.405376 2.092032-3.678208 2.981888-1.26976-0.889856-2.692096-1.997824-3.704832-2.981888l-14.669824-16.843776C389.44256 751.39072 231.995392 570.769408 231.995392 405.7344c0-154.891264 129.693696-285.7472 283.216896-285.7472 191.205376 0 276.791296 143.502336 276.791296 285.7472C792.003584 531.024896 702.671872 697.372672 526.465024 900.128768z" p-id="1183" fill="#FFFFFF"></path><path d="M512.9984 233.562112c-92.778496 0-168.00256 75.22304-168.00256 168.00256 0 92.778496 75.224064 168.00256 168.00256 168.00256 92.777472 0 168.001536-75.225088 168.001536-168.00256C681.00096 308.785152 605.775872 233.562112 512.9984 233.562112zM512.9984 513.565696c-61.75744 0-113.288192-51.462144-113.288192-113.231872 0-61.75744 50.245632-112.002048 112.002048-112.002048 61.769728 0 112.001024 50.245632 112.001024 112.002048C623.714304 462.103552 574.768128 513.565696 512.9984 513.565696z" p-id="1184" fill="#FFFFFF"></path></svg>{scan.address}</p>
                    </div>
                    {props.isAddProduct ? <div className='add' onClick={() => { history.push('/qrcode'); localStorage.setItem('again', 'yes') }}>
                        加菜
                    </div> : <div className='add' onClick={() => { history.push('/table') }}>
                            订单
                    </div>}
                </>}
        </div>
    );
}
export default Header;

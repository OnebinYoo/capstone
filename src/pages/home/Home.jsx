import React from 'react'
import Chart from '../../components/chart/Chart';
import Chart2 from '../../components/chart/Chart2';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css'

import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';

export default function Home() {
    const userData = []; /*userData초기화 */

    return (
        <div className='Wrap'>
            <div className='Header'>
                <Topbar />
            </div>
            <div className='Container'>
                <div className='Root'>
                    <div className='ColumnLeft'>
                        <Sidebar />
                    </div>
                    <div className='ColumnRight'>
                        
{/*                         <FeaturedInfo />  */}
                        <Chart 
                            data={userData}
                            title='새로운 로그'
                            grid
                            dataKey='Active User'
                        />
                        <Chart2
                            data={userData}
                            title='누적 로그'
                            grid
                            dataKey='Active User'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

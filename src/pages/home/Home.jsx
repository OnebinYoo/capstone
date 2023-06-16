import React from 'react'
import Chart from '../../components/chart/Chart';
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
                    <FeaturedInfo /> 
                    <Chart 
                        data={userData}
                        title='User Analytics'
                        grid
                        dataKey='Active User'
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}
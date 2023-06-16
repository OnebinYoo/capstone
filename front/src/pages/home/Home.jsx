import React from 'react'
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css'

export default function Home() {
    const userData = []; /**userData초기화 */

    return (
        <div className='home'>
            <FeaturedInfo /> 
            <Chart 
                data={userData}
                title='User Analytics'
                grid
                dataKey='Active User'
            />
            
        </div>
    )
}

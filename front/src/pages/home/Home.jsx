import React from 'react'
import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css'
import logData from '../../server.log';

export default function Home() {
    const userData = []; /**userData초기화 */

    console.log('logData: ', typeof logData)
    console.log(logData)

    // const newLogData = logData.map((item, index) => {
    //     return (
    //       <li key={index}>
    //         {item.name}({item.age}) from {item.country}
    //       </li>
    //     );
    //   });

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

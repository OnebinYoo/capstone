import React from 'react'
import './featuredInfo.css'

export default function FeatureInfo() {
    return (
        <div className='featured'>
            <div className='featuredItem'>
                <span className='featuredTitle'>Revenue</span>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>$2.1234</span>
                    <span className='featuredMoneyRate'>-11.4</span>
                </div>
                <span className='featuredSub'>Compared to last month</span>
            </div>
            <div className='featuredItem'>
                <span className='featuredTitle'>Sales</span>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>$2.1234</span>
                    <span className='featuredMoneyRate'>-11.4</span>
                </div>
                <span className='featuredSub'>Compared to last month</span>
            </div>
            <div className='featuredItem'>
                <span className='featuredTitle'>Cost</span>
                <div className='featuredMoneyContainer'>
                    <span className='featuredMoney'>$2.1234</span>
                    <span className='featuredMoneyRate'>-11.4</span>
                </div>
                <span className='featuredSub'>Compared to last month</span>
            </div>
        </div>
    )
}
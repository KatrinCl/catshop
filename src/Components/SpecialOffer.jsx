import React from 'react'
import './../Styles/SpecialOffer.css'
import special_offer from '../assets/special_offer.js'
import ItemSpecialOffers from './ItemSpecialOffers.jsx'


const SpecialOffer = () => {
    return (
        <div className='offers'>
            <h2>ТОП-товары</h2>
            <div className='container'>
                <div className="collections">
                    {special_offer.map((item, i) => {
                        return <ItemSpecialOffers key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default SpecialOffer
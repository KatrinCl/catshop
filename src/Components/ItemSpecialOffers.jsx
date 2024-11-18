import React from 'react'
import './../Styles/ItemSpecialOffers.css'
import { Link } from 'react-router-dom'

const ItemSpecialOffers = (props) => {
  return (
    <div className='item-offer'>
        <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <p>{props.name}</p>
        <div className="price">
            <div className="price-new">
                {props.new_price} ₽
            </div>
            <div className="price-old">
                {props.old_price} ₽
            </div>
        </div>

    </div>
  )
}

export default ItemSpecialOffers;
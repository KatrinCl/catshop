import React, { useContext, useState } from 'react';
import './../Styles/Navbar.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import cat from '/cat.svg'
import user from '/user.svg'
import cart from '/cart.svg'
import location from '/location.svg'
import menu1 from '/menu.svg'
import woman from '/woman.svg'
import shoes from '/shoes.svg'
import stroller from '/stroller.svg'
import man from '/man.svg'
import cook from '/cook.svg'
import beauty from '/beauty.svg'
import bag from '/bag.svg'
import phone from '/phone.svg'
import toy from '/toy.svg'
import sofa from '/sofa.svg'
import adult from '/adult.svg'
import food from '/food.svg'
import paw from '/paw.svg'
import tool from '/tool.svg'
import health from '/health.svg'
import ball from '/ball.svg'

const Navbar = () => {
    const [menu, setMenu] = useState(false);
    const { getTotalCartItems, pickupAddress } = useContext(ShopContext);

    const toggleMenu = () => setMenu(!menu);

    const handleMenuClick = () => {
        setMenu(false); // Close the menu when a link is clicked
    };

    return (
        <div className='nav'>
            <div className='nav-top'>
                <Link to='/'><img src={cat} alt="" className='logo' /></Link>
                <SearchBar />
                <ul>
                    <li>
                        <Link to='/login'><img src={user} alt='' className='user' /></Link>
                    </li>
                    <li>
                        <Link to='/cart'><img src={cart} alt='' className='cartI' /><span className='cart-count'>{getTotalCartItems()}</span></Link>
                    </li>
                    <li>
                        <Link to='/addressdelivery'>
                            <div className='active'>
                                <img src={location} alt='' className='location' />
                            </div>
                        </Link>
                    </li>
                    <li><img src={menu1} alt='' className='menu1' onClick={toggleMenu} /></li>
                </ul>
            </div>
            {menu && (
                <div className='dropdown'>
                    <ul>
                        <li><Link to='/women' onClick={handleMenuClick}><img src={woman} alt='' />Женщинам</Link></li>
                        <li><Link to='/shoes' onClick={handleMenuClick}><img src={shoes} alt='' />Обувь</Link></li>
                        <li><Link to='/kid' onClick={handleMenuClick}><img src={stroller} alt='' />Детям</Link></li>
                        <li><Link to='/men' onClick={handleMenuClick}><img src={man} alt='' />Мужчинам</Link></li>
                        <li><Link to='/home' onClick={handleMenuClick}><img src={cook} alt='' />Дом</Link></li>
                        <li><Link to='/beauty' onClick={handleMenuClick}><img src={beauty} alt='' />Красота</Link></li>
                        <li><Link to='/accessories' onClick={handleMenuClick}><img src={bag} alt='' />Аксессуары</Link></li>
                        <li><Link to='/electronics' onClick={handleMenuClick}><img src={phone} alt='' />Электроника</Link></li>
                        <li><Link to='/toys' onClick={handleMenuClick}><img src={toy} alt='' />Игрушки</Link></li>
                        <li><Link to='/furniture' onClick={handleMenuClick}><img src={sofa} alt='' />Мебель</Link></li>
                        <li><Link to='/adult' onClick={handleMenuClick}><img src={adult} alt='' />Товары для взрослых</Link></li>
                        <li><Link to='/food' onClick={handleMenuClick}><img src={food} alt='' />Продукты</Link></li>
                        <li><Link to='/zoo' onClick={handleMenuClick}><img src={paw} alt='' />Зоотовары</Link></li>
                        <li><Link to='/cartools' onClick={handleMenuClick}><img src={tool} alt='' />Автотовары</Link></li>
                        <li><Link to='/health' onClick={handleMenuClick}><img src={health} alt='' />Здоровье</Link></li>
                        <li><Link to='/sports' onClick={handleMenuClick}><img src={ball} alt='' />Спорт</Link></li>
                    </ul>
                </div>
            )}
            <div className='nav-pickup-address'>
                <p>{pickupAddress}</p> {/* Display the selected pickup address */}
            </div>

            {/* Нижняя панель для экрана до 500px */}
            <div className="bottom-nav">
            <Link to='/cart'><img src={cart} alt='' className='bottom-nav-icon' /><span className='cart-count1'>{getTotalCartItems()}</span></Link>
            <Link to='/login'><img src={user} alt='User' className='bottom-nav-icon' /></Link>
            </div>
        </div>
    );
};

export default Navbar;

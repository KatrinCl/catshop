import React, { useContext, useState } from 'react';
import './../Styles/Navbar.css';
import SearchBar from './SearchBar';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

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
                <Link to='/'><img src="/cat.svg" alt="" className='logo' /></Link>
                <SearchBar />
                <ul>
                    <li>
                        <Link to='/login'><img src='/user.svg' alt='' className='user' /></Link>
                    </li>
                    <li>
                        <Link to='/cart'><img src='/cart.svg' alt='' className='cartI' /><span className='cart-count'>{getTotalCartItems()}</span></Link>
                    </li>
                    <li>
                        <Link to='/addressdelivery'>
                            <div className='active'>
                                <img src='/location.svg' alt='' className='location' />
                            </div>
                        </Link>
                    </li>
                    <li><img src='/menu.svg' alt='' className='menu1' onClick={toggleMenu} /></li>
                </ul>
            </div>
            {menu && (
                <div className='dropdown'>
                    <ul>
                        <li><Link to='/women' onClick={handleMenuClick}><img src='/woman.svg' alt='' />Женщинам</Link></li>
                        <li><Link to='/shoes' onClick={handleMenuClick}><img src='/shoes.svg' alt='' />Обувь</Link></li>
                        <li><Link to='/kid' onClick={handleMenuClick}><img src='/stroller.svg' alt='' />Детям</Link></li>
                        <li><Link to='/men' onClick={handleMenuClick}><img src='/man.svg' alt='' />Мужчинам</Link></li>
                        <li><Link to='/home' onClick={handleMenuClick}><img src='/cook.svg' alt='' />Дом</Link></li>
                        <li><Link to='/beauty' onClick={handleMenuClick}><img src='/beauty.svg' alt='' />Красота</Link></li>
                        <li><Link to='/accessories' onClick={handleMenuClick}><img src='/bag.svg' alt='' />Аксессуары</Link></li>
                        <li><Link to='/electronics' onClick={handleMenuClick}><img src='/phone.svg' alt='' />Электроника</Link></li>
                        <li><Link to='/toys' onClick={handleMenuClick}><img src='/toy.svg' alt='' />Игрушки</Link></li>
                        <li><Link to='/furniture' onClick={handleMenuClick}><img src='/sofa.svg' alt='' />Мебель</Link></li>
                        <li><Link to='/adult' onClick={handleMenuClick}><img src='/adult.svg' alt='' />Товары для взрослых</Link></li>
                        <li><Link to='/food' onClick={handleMenuClick}><img src='/food.svg' alt='' />Продукты</Link></li>
                        <li><Link to='/zoo' onClick={handleMenuClick}><img src='/paw.svg' alt='' />Зоотовары</Link></li>
                        <li><Link to='/cartools' onClick={handleMenuClick}><img src='/tool.svg' alt='' />Автотовары</Link></li>
                        <li><Link to='/health' onClick={handleMenuClick}><img src='/health.svg' alt='' />Здоровье</Link></li>
                        <li><Link to='/sports' onClick={handleMenuClick}><img src='/ball.svg' alt='' />Спорт</Link></li>
                    </ul>
                </div>
            )}
            <div className='nav-pickup-address'>
                <p>{pickupAddress}</p> {/* Display the selected pickup address */}
            </div>

            {/* Нижняя панель для экрана до 500px */}
            <div className="bottom-nav">
            <Link to='/cart'><img src='/cart.svg' alt='' className='bottom-nav-icon' /><span className='cart-count1'>{getTotalCartItems()}</span></Link>
            <Link to='/login'><img src='/user.svg' alt='User' className='bottom-nav-icon' /></Link>
            </div>
        </div>
    );
};

export default Navbar;

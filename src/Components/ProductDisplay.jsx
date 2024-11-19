import React, { useState, useContext, useEffect } from 'react';
import '../Styles/ProductDisplay.css';
import { ShopContext } from '../Context/ShopContext';
import { Link } from 'react-router-dom';
import star from '/star_icon.png';
import starh from '/star_dull_icon.png';
import repeat from "/arrows-repeat.svg";
import tag from "/tag.svg";
import purse from '/purse1.svg';

const ProductDisplay = (props) => {
    const { product } = props;
    const { increaseQuantity } = useContext(ShopContext);


    // Прокрутка страницы к началу при монтировании компонента
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Локальное состояние для отслеживания, добавлен ли товар в корзину
    const [addedToCart, setAddedToCart] = useState(false);

    const handleAddToCart = () => {
        increaseQuantity(product.id); // Увеличиваем количество товара
        setAddedToCart(true); // Меняем состояние на "добавлен в корзину"
    };

    // Состояние для выбранного цвета
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);
    const selectedColor = product.colors ? product.colors[selectedColorIndex] : null;

    // Состояние для выбранного изображения для конкретного цвета
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // Состояние для выбранного размера
    const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);

    // Функция для смены цвета
    const handleColorChange = (index) => {
        setSelectedColorIndex(index);
        setSelectedImageIndex(0); // Сброс изображения при смене цвета
    };

    // Функция для смены изображения
    const handleImageChange = (index) => {
        setSelectedImageIndex(index);
    };

    // Функция для смены размера
    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    // Проверка, есть ли данные о продукте
    if (!product || !product.colors || !selectedColor) {
        return <div>Информация о товаре недоступна</div>;
    }

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className='imgs'>
                    <div className="productdisplay-img-list">
                        {selectedColor.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Превью ${index}`}
                                onClick={() => handleImageChange(index)} // Клик для смены основного изображения
                                style={{ border: selectedImageIndex === index ? '2px solid #9a0bbabe' : 'none' }} // Выделение выбранного миниатюрного изображения
                            />
                        ))}
                    </div>
                    <div className='productdisplay-img'>
                        {selectedColor.images.length > 0 ? (
                            <img
                                className='productdisplay-main-img'
                                src={selectedColor.images[selectedImageIndex]} // Показ выбранного изображения
                                alt={`Основное изображение для ${selectedColor.name}`}
                            />
                        ) : (
                            <div>Изображение недоступно</div>
                        )}
                    </div>
                </div>

                <div className='prices-add-up'>
                    <div className='price-up'>
                        <img src={purse} alt='' />
                        <div className="productdisplay-right-price-new">{product.new_price} ₽</div>
                        <div className="productdisplay-right-price-old">{product.old_price} ₽</div>
                    </div>
                </div>

                <div className='desc-right'>
                    {/* Описание товара */}
                    <div className="product-description">
                        <h3>Описание</h3>
                        <p>{selectedColor.description}</p>
                    </div>

                    <div className='desc2'>
                        <p><img src="/arrows-repeat.svg" alt="" /> 14 дней на возврат</p>
                        <p><img src="/tag.svg" alt="" /> Примерка</p>
                    </div>
                </div>
            </div>

            <div className="productdisplay-right">
                <div className='p-right'>
                    <h1>{product.name}</h1>
                    <div className="productdisplay-right-stars">
                        <img src={star} alt="звезда" />
                        <img src={star} alt="звезда" />
                        <img src={star} alt="звезда" />
                        <img src={star} alt="звезда" />
                        <img src={starh} alt="звезда" />
                    </div>

                    {/* Опции цветов с мини изображениями */}
                    <div className="product-colors">
                        <h4>Цвет: {selectedColor.name}</h4> {/* Отображение выбранного цвета */}
                        <div className='color-card'>
                            {product.colors.map((color, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleColorChange(index)}
                                    style={{
                                        border: selectedColorIndex === index ? '2px solid #9a0bbabe' : '1px solid gray',
                                        padding: '5px',
                                        margin: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {/* Миниатюрное изображение для цвета */}
                                    <img src={color.images[0]} alt={color.name} width="50px" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Размеры под цветами */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="product-sizes">
                            <h4>Выберите размер:</h4>
                            <div className='sizes'>
                                {product.sizes.map((size, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSizeChange(size)}
                                        style={{
                                            border: selectedSize === size ? '2px solid #9a0bbabe' : '1px solid #7c7b7bc4',
                                        }}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Характеристики товара */}
                    <div className="product-characteristics">
                        <ul>
                            {selectedColor.characteristics.season && (
                                <li><span className='char'>Сезон</span><span className='char2'>{selectedColor.characteristics.season}</span></li>
                            )}
                            {selectedColor.characteristics.material && (
                                <li><span className='char'>Состав</span><span className='char2'>{selectedColor.characteristics.material}</span></li>
                            )}
                            {selectedColor.characteristics.materialF && (
                                <li><span className='char'>Материал корпуса</span><span className='char2'>{selectedColor.characteristics.materialF}</span></li>
                            )}
                            {selectedColor.characteristics.materialO && (
                                <li><span className='char'>Материал обивки</span><span className='char2'>{selectedColor.characteristics.materialO}</span></li>
                            )}
                            {selectedColor.characteristics.materialIn && (
                                <li><span className='char'>Наполнитель</span><span className='char2'>{selectedColor.characteristics.materialIn}</span></li>
                            )}
                            {selectedColor.characteristics.hard && (
                                <li><span className='char'>Жесткость</span><span className='char2'>{selectedColor.characteristics.hard}</span></li>
                            )}
                            {selectedColor.characteristics.taste && (
                                <li><span className='char'>Вкус</span><span className='char2'>{selectedColor.characteristics.taste}</span></li>
                            )}
                            {selectedColor.characteristics.type1 && (
                                <li><span className='char'>Тип</span><span className='char2'>{selectedColor.characteristics.type1}</span></li>
                            )}
                            {selectedColor.characteristics.category && (
                                <li><span className='char'>Категория</span><span className='char2'>{selectedColor.characteristics.category}</span></li>
                            )}

                            {selectedColor.characteristics.color && (
                                <li><span className='char'>Цвет</span><span className='char2'>{selectedColor.characteristics.color}</span></li>
                            )}
                            {selectedColor.characteristics.complectation && (
                                <li><span className='char'>Комплектация</span><span className='char2'>{selectedColor.characteristics.complectation}</span></li>
                            )}
                            {selectedColor.characteristics.sizeOnModel && (
                                <li><span className='char'>Размер на модели</span><span className='char2'>{selectedColor.characteristics.sizeOnModel}</span></li>
                            )}
                            {selectedColor.characteristics.height && (
                                <li><span className='char'>Рост модели</span><span className='char2'>{selectedColor.characteristics.height}</span></li>
                            )}
                            {selectedColor.characteristics.modelParams && (
                                <li><span className='char'>Параметры модели</span><span className='char2'>{selectedColor.characteristics.modelParams}</span></li>
                            )}
                            {selectedColor.characteristics.fastenerType && (
                                <li><span className='char'>Тип застежки</span><span className='char2'>{selectedColor.characteristics.fastenerType}</span></li>
                            )}
                            {selectedColor.characteristics.type && (
                                <li><span className='char'>Тип кожи</span><span className='char2'>{selectedColor.characteristics.type}</span></li>
                            )}
                            {selectedColor.characteristics.weight && (
                                <li><span className='char'>Ширина</span><span className='char2'>{selectedColor.characteristics.weight}</span></li>
                            )}
                            {selectedColor.characteristics.length && (
                                <li><span className='char'>Длина</span><span className='char2'>{selectedColor.characteristics.length}</span></li>
                            )}

                            {selectedColor.characteristics.height1 && (
                                <li><span className='char'>Высота</span><span className='char2'>{selectedColor.characteristics.height1}</span></li>
                            )}
                            {selectedColor.characteristics.deep && (
                                <li><span className='char'>Глубина</span><span className='char2'>{selectedColor.characteristics.deep}</span></li>
                            )}
                            {selectedColor.characteristics.weightPackage && (
                                <li><span className='char'>Вес товара</span><span className='char2'>{selectedColor.characteristics.weightPackage}</span></li>
                            )}
                            {selectedColor.characteristics.affect && (
                                <li><span className='char'>Действие</span><span className='char2'>{selectedColor.characteristics.affect}</span></li>
                            )}
                            {selectedColor.characteristics.fastening && (
                                <li><span className='char'>Крепление</span><span className='char2'>{selectedColor.characteristics.fastening}</span></li>
                            )}
                            {selectedColor.characteristics.time && (
                                <li><span className='char'>Время нанесения</span><span className='char2'>{selectedColor.characteristics.time}</span></li>
                            )}
                            {selectedColor.characteristics.SPF && (
                                <li><span className='char'>SPF</span><span className='char2'>{selectedColor.characteristics.SPF}</span></li>
                            )}
                            {selectedColor.characteristics.volume && (
                                <li><span className='char'>Объем товара</span><span className='char2'>{selectedColor.characteristics.volume}</span></li>
                            )}
                            {selectedColor.characteristics.type && (
                                <li><span className='char'>Тип кожи</span><span className='char2'>{selectedColor.characteristics.type}</span></li>
                            )}
                            {selectedColor.characteristics.country && (
                                <li><span className='char'>Страна производства</span><span className='char2'>{selectedColor.characteristics.country}</span></li>
                            )}


                        </ul>
                    </div>
                </div>

                <div className='desc-right-col'>
                    {/* Описание товара */}
                    <div className="product-description">
                        <h3>Описание</h3>
                        <p>{selectedColor.description}</p>
                    </div>

                    <div className='desc2'>
                        <p><img src={repeat} alt="" /> 14 дней на возврат</p>
                        <p><img src={tag} alt="" /> Примерка</p>
                    </div>
                </div>

                {/* Цена и добавление в корзину */}
                <div className='price-add'>
                    <div className='price-wrap'>
                        <div className='prices-add'>
                            <div className="productdisplay-right-price-new">{product.new_price} ₽</div>
                            <div className="productdisplay-right-price-old">{product.old_price} ₽</div>
                        </div>
                        <span className='del'>Доставка завтра</span>
                    </div>
                    <button onClick={handleAddToCart}>
                        {addedToCart ? (
                            <Link to="/cart">
                                В корзине
                            </Link>
                        ) : (
                            <>
                                В корзину
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;

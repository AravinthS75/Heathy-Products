import React, { useEffect, useState, useRef, memo } from 'react';
import LemonGrass from '../../images/Shop/LemonGrass.webp';
import Soursop from '../../images/Shop/Soursop.webp';
import SoursopLeaf from '../../images/Shop/SoursopLeaf.webp';
import style from './Store.module.css';
import { useNavigate } from 'react-router-dom';

function StoreEnable({ loginStatus }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);
  
  return localStorage.getItem('loginStatus') ? <Store /> : null;
}

function Store() {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [cartVisible, setCartVisible] = useState(false);
  const [productQuantities, setProductQuantities] = useState({
    'Lemon Grass': 0,
    'Soursop': 0,
    'Soursop Leaf': 0
  });
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const cartRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const imgLemonGrass = new Image();
    imgLemonGrass.src = LemonGrass;
    const imgSoursop = new Image();
    imgSoursop.src = Soursop;
    const imgSoursopLeaf = new Image();
    imgSoursopLeaf.src = SoursopLeaf;

    // Load cart state from localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
    const quantities = savedCart.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1;
      return acc;
    }, {});
    setProductQuantities(prevState => ({
      ...prevState,
      ...quantities
    }));

    document.addEventListener('click', handleClickOutsideCart);

    return () => {
      document.removeEventListener('click', handleClickOutsideCart);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleClickOutsideCart = (e) => {
    if (cartRef.current && !cartRef.current.contains(e.target) && !isRemoveButton(e.target)) {
      setCartVisible(false);
    }
  };

  const isRemoveButton = (target) => {
    return target.tagName === 'BUTTON' && target.innerText === 'Remove';
  };

  const toggleCartVisibility = (e) => {
    e.stopPropagation();
    setCartVisible(!cartVisible);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    setProductQuantities(prevState => ({
      ...prevState,
      [item]: prevState[item] + 1
    }));
    setShowPopup(true);
    setPopupContent(`${item} added to cart`);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const removeFromCart = (index, item) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setProductQuantities(prevState => ({
      ...prevState,
      [item]: prevState[item] - 1
    }));
    if (newCart.length === 0) {
      setShowPopup(false);
      setCartVisible(false);
    }
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert('Add items to cart to place order');
      setCartVisible(false);
    } else {
      let orderedProducts = Object.keys(productQuantities).reduce((ordered, product) => {
        if (productQuantities[product] > 0) {
          ordered.push({ name: product, quantity: productQuantities[product] });
        }
        return ordered;
      }, []);
      localStorage.setItem('currentOrder', JSON.stringify(orderedProducts));
      setCart([]); // Clear the cart state
      localStorage.removeItem('cart'); // Clear the cart from localStorage
      navigate('/checkout');
    }
  };

  return (
    <div className={style.App}>
      <h1>Products</h1>
      <div className={style.products}>
        <div className={style.product}>
          <img src={LemonGrass} alt="Lemon Grass" />
          <h3>Lemon Grass</h3>
          <button onClick={() => addToCart('Lemon Grass')}>
            Add to Cart
          </button>
        </div>
        <div className={style.product}>
          <img src={Soursop} alt="Soursop" />
          <h3>Soursop</h3>
          <button onClick={() => addToCart('Soursop')}>
            Add to Cart
          </button>
        </div>
        <div className={style.product}>
          <img src={SoursopLeaf} alt="Soursop Leaf" />
          <h3>Soursop Leaf</h3>
          <button onClick={() => addToCart('Soursop Leaf')}>
            Add to Cart
          </button>
        </div>
      </div>
      <div className={style.cartbutton} onClick={(e) => toggleCartVisibility(e)}>
        <span>Cart ({cart.length})</span>
      </div>
      {showPopup && (
        <div className={style.popup}>
          <p>{popupContent}</p>
        </div>
      )}
      {cartVisible && (
        <div ref={cartRef} className={style.cartcontent}>
          <h2>Shopping Cart</h2>
          <ul>
            {Object.keys(productQuantities).map((productName, index) => (
              productQuantities[productName] > 0 && (
                <li key={index}>
                  {productName} x{productQuantities[productName]}
                  <button onClick={() => removeFromCart(cart.findIndex(item => item === productName), productName)}>
                    Remove
                  </button>
                </li>
              )
            ))}
          </ul>
          <button onClick={placeOrder}>Checkout</button>
        </div>
      )}
    </div>
  );
}

export default memo(StoreEnable);

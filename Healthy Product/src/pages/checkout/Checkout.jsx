import React, { useState, useEffect } from 'react';
import style from './Checkout.module.css';
import { useNavigate } from 'react-router-dom';

function CheckoutEnable({ loginStatus }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);

  return localStorage.getItem('loginStatus') ? <Checkout /> : null;
}

function Checkout() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    state: '',
    stateName: '',
    city: '',
    postalcode: ''
  });
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder')) || [];
    if (currentOrder.length === 0) {
      setErrorMessage('!! Add products in cart to place order !!');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const State = [
    { Id: 'TN', name: 'Tamil Nadu' },
    { Id: 'KL', name: 'Kerala' }
  ];

  const City = [
    { Id: 'TN', name: 'Ariyalur' },
    { Id: 'TN', name: 'Chengalpattu' },
    { Id: 'TN', name: 'Chennai' },
    { Id: 'TN', name: 'Coimbatore' },
    { Id: 'TN', name: 'Cuddalore' },
    { Id: 'TN', name: 'Dharmapuri' },
    { Id: 'TN', name: 'Dindigul' },
    { Id: 'TN', name: 'Erode' },
    { Id: 'TN', name: 'Kallakurichi' },
    { Id: 'TN', name: 'Kancheepuram' },
    { Id: 'TN', name: 'Karur' },
    { Id: 'TN', name: 'Krishnagiri' },
    { Id: 'TN', name: 'Madurai' },
    { Id: 'TN', name: 'Mayiladuthurai' },
    { Id: 'TN', name: 'Nagapattinam' },
    { Id: 'TN', name: 'Nagercoil' },
    { Id: 'TN', name: 'Namakkal' },
    { Id: 'TN', name: 'Perambalur' },
    { Id: 'TN', name: 'Pudukkottai' },
    { Id: 'TN', name: 'Ramanathapuram' },
    { Id: 'TN', name: 'Ranipet' },
    { Id: 'TN', name: 'Salem' },
    { Id: 'TN', name: 'Sivagangai' },
    { Id: 'TN', name: 'Tenkasi' },
    { Id: 'TN', name: 'Thanjavur' },
    { Id: 'TN', name: 'Theni' },
    { Id: 'TN', name: 'Thiruvallur' },
    { Id: 'TN', name: 'Thiruvarur' },
    { Id: 'TN', name: 'Thoothukudi' },
    { Id: 'TN', name: 'Tiruchirappalli' },
    { Id: 'TN', name: 'Tirunelveli' },
    { Id: 'TN', name: 'Tirupathur' },
    { Id: 'TN', name: 'Tiruppur' },
    { Id: 'TN', name: 'Tiruvannamalai' },
    { Id: 'TN', name: 'The Nilgiris' },
    { Id: 'TN', name: 'Vellore' },
    { Id: 'TN', name: 'Viluppuram' },
    { Id: 'TN', name: 'Virudhunagar' },
    { Id: 'KL', name: 'Alappuzha' },
    { Id: 'KL', name: 'Ernakulam' },
    { Id: 'KL', name: 'Idukki' },
    { Id: 'KL', name: 'Kannur' },
    { Id: 'KL', name: 'Kasaragod' },
    { Id: 'KL', name: 'Kollam' },
    { Id: 'KL', name: 'Kottayam' },
    { Id: 'KL', name: 'Kozhikode' },
    { Id: 'KL', name: 'Malappuram' },
    { Id: 'KL', name: 'Palakkad' },
    { Id: 'KL', name: 'Pathanamthitta' },
    { Id: 'KL', name: 'Thiruvananthapuram' },
    { Id: 'KL', name: 'Thrissur' },
    { Id: 'KL', name: 'Wayanad' }
  ];

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    const selectedState = State.find(state => state.Id === selectedStateId);
    const filteredCities = City.filter(city => city.Id === selectedStateId);
    setFormData(prevState => ({
      ...prevState,
      state: selectedStateId,
      stateName: selectedState ? selectedState.name : '',
      city: ''
    }));
    setFilteredCities(filteredCities);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentOrderItems = JSON.parse(localStorage.getItem('currentOrder'));

    if (!currentOrderItems || currentOrderItems.length === 0) {
      setErrorMessage('!! Add products in cart to place order !!');
      return;
    }

    const currentDateTime = new Date().toLocaleString();
    const currentOrder = {
      ...formData,
      state: formData.stateName, 
      items: currentOrderItems,
      dateTime: currentDateTime
    };

    const orders = JSON.parse(localStorage.getItem('order')) || [];
    orders.push(currentOrder);
    localStorage.setItem('order', JSON.stringify(orders));

    setMessage('Order placed successfully!');
    localStorage.removeItem('currentOrder');
    localStorage.removeItem('cart'); 

    setFormData({
      name: '',
      email: '',
      mobile: '',
      address: '',
      state: '',
      stateName: '',
      city: '',
      postalcode: ''
    });

    setTimeout(() => {
      navigate('/myorder');
    }, 2000);
  };

  return (
    <div className={style.checkoutContainer}>
      <h1 className={style.checkoutHead}>Checkout</h1>
      {errorMessage && <p className={style.errorMessage}>{errorMessage}</p>}
      <form onSubmit={handleSubmit} className={style.checkoutForm}>
        <label>
          Name:
        </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} style={{ width: '293px' }} required />
        <label>
          Email:
        </label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '293px' }} required />
        <label>
          Mobile:
        </label>
        <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} style={{ width: '293px' }} required />
        <label>
          Address:
        </label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} style={{ width: '293px' }} required />
        <label>
          State:
        </label>
        <select name="state" value={formData.state} onChange={handleStateChange} style={{ width: '293px', marginBottom: '4%' }} required>
          <option value="">Select State</option>
          {State.map(({ Id, name }) => (
            <option key={Id} value={Id}>{name}</option>
          ))}
        </select>
        <label>
          City:
        </label>
        <select name="city" value={formData.city} onChange={handleChange} style={{ width: '293px', marginBottom: '4%' }} required>
          <option value="">Select City</option>
          {filteredCities.map(({ name }, index) => (
            <option key={index} value={name}>{name}</option>
          ))}
        </select>
        <label>
          Postal Code:
        </label>
        <input type="text" name="postalcode" value={formData.postalcode} onChange={handleChange} style={{ width: '293px' }} required />
        <p style={{ paddingLeft: '29%' }}>Cash on Delivery</p>
        <button type="submit" className={style.checkoutButton}>Place Order</button>
      </form>
      {message && <p className={style.message}>{message}</p>}
    </div>
  );
}

export default CheckoutEnable;

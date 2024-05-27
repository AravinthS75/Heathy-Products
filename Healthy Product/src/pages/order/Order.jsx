import React, { useEffect, useState, memo } from 'react';
import style from './Order.module.css';
import { useNavigate } from 'react-router-dom';

function OrderEnable({ loginStatus }) {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!loginStatus) {
      navigate("/login");
    }
  }, [loginStatus, navigate]);
  
  return localStorage.getItem('loginStatus') ? <Order /> : null;
}

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('order')) || [];
    setOrders(storedOrders);
    console.log(storedOrders)
  }, []);

  return (
    <div className={style.orderContainer}>
      {orders.length === 0 ? (
        <p className={style.orderMessage}>No orders placed yet!</p>
      ) : (
        <React.Fragment>
          <h1 className={style.orderHead}>My Orders</h1>
          <ul className={style.orderList}>
            {orders.map((order, index) => {
              const [date, time] = order.dateTime ? order.dateTime.split(',') : ['', ''];
              return (
                <React.Fragment key={index}>
                  {date && time && (
                    <p style={{ paddingTop: '5%' , paddingLeft: '1%'}}>
                      Order {index + 1} - ordered on {date} at {time}
                    </p>
                  )}
                  <li className={style.orderItem}>
                    <p><strong>Name:</strong> {order.name}</p>
                    <p><strong>Email:</strong> {order.email}</p>
                    <p><strong>Mobile:</strong> {order.mobile}</p>
                    <p><strong>Address:</strong> {order.address}</p>
                    <p><strong>State:</strong> {order.state}</p>
                    <p><strong>City:</strong> {order.city}</p>
                    <p><strong>Postal Code:</strong> {order.postalcode}</p>
                    <p><strong>Items:</strong></p>
                    {order.items ? (
                      <ul style={{listStyleType:'numeric'}}>
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex}>{item.name} x {item.quantity}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No items listed</p>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
}

export default memo(OrderEnable);

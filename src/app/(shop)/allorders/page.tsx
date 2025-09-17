
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserToken } from 'src/getUserToken';
import Footer from 'src/app/_component/Footer/Footer';

interface ProductItem {
  _id: string;
  title: string;
  price: number;
  imageCover: string;
  count: number;
  category: { name: string };
  brand: { name: string };
}

interface Order {
  _id: string;
  cartItems: {
    count: number;
    product: ProductItem;
    price: number;
  }[];
  totalOrderPrice: number;
  paymentMethodType: 'cash' | 'card';
  isPaid: boolean;
  createdAt: string;
}

const PreviousOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      // const token = localStorage.getItem('token');
      const token = await getUserToken()
      if (!token) return toast.error('يجب تسجيل الدخول');

      try {
        setLoading(true);
        const res = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const paidOrders = res.data.data.filter((order: Order) => order.isPaid);
        setOrders(paidOrders);
      } catch (error) {
        toast.error('فشل جلب الطلبات السابقة');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='text-3xl text-gray-800'> Orders</h1>
      <ToastContainer />
      {loading ? (
        <p>Loading</p>
      ) : orders.length === 0 ? (
        <p>sure your payed any orders</p>
      ) : (
        <div className='text-lg text-gray-800'>
          {orders.map(order => (
            <div key={order._id} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
              {/* <h2> id: {order._id}</h2> */}
              <p> <span className='text-xl text-gray-950'>payment:</span> {order.paymentMethodType}</p>
              <p> <span className='text-xl text-gray-950'>price:</span>  {order.totalOrderPrice} EGP</p>
              <p> <span className='text-xl text-gray-950'>date:</span>  {new Date(order.createdAt).toLocaleString()}</p>
              <h3> <span className='text-xl text-gray-950'>product:</span></h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                {order.cartItems.map(item => (
                  <div key={item.product._id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', width: '200px' }}>
                    <img src={item.product.imageCover} alt={item.product.title} style={{ width: '100%', borderRadius: '5px' }} />
                    <h4>{item.product.title}</h4>
                    <p> <span className='text-xl text-gray-950'>price item:</span>  {item.price} EGP</p>
                    <p> <span className='text-xl text-gray-950'>quantity:</span> {item.count}</p>
                    <p> <span className='text-xl text-gray-950'>catego:</span> {item.product.category.name}</p>
                    <p> <span className='text-xl text-gray-950'>brand:</span> {item.product.brand.name}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousOrdersPage;


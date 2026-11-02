import React, { useState } from 'react';

export default function TastyRestaurant({ onBackToDashboard }) {
  const [orderModal, setOrderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const menuItems = [
    { img: "/pr1/pizza.jpeg", name: "Pizza", desc: "Cheesy and Delicious", price: "₹299" },
    { img: "/pr1/burger.jpeg", name: "Burger", desc: "Fresh and Tasty", price: "₹199" },
    { img: "/pr1/pasta.jpg", name: "Pasta", desc: "Italian Special", price: "₹249" },
    { img: "/pr1/sandwich.jpg", name: "Sandwich", desc: "Grilled Veg Sandwich", price: "₹149" },
    { img: "/pr1/frenchfries.jpg", name: "French Fries", desc: "Crispy Potato Fries", price: "₹99" },
    { img: "/pr1/noodles.webp", name: "Noodles", desc: "Spicy Chinese Noodles", price: "₹179" },
    { img: "/pr1/coffee.jpg", name: "Cold Coffee", desc: "Pour loaded chocolate coffee", price: "₹149" },
    { img: "/pr1/ice cream.jpeg", name: "Ice Cream", desc: "Chocolate & Vanilla", price: "₹120" }
  ];

  const handleOrder = (item) => {
    setSelectedItem(item);
    setOrderModal(true);
    setOrderSuccess(false);
  };

  const confirmOrder = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderModal(false);
      setOrderSuccess(false);
    }, 2000);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f5f5f5', minHeight: '100vh', color: '#333' }}>
      
      {/* Floating Back to Dashboard Button */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999
      }}>
        <button 
          onClick={onBackToDashboard || (() => window.location.href = '/')}
          style={{
            background: '#2c3e50',
            color: '#fff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <header style={{
        background: '#d35400',
        color: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        flexWrap: 'wrap'
      }}>
        <h1 style={{ fontSize: '2rem', margin: 0 }}>Tasty Restaurant</h1>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#home" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Home</a>
          <a href="#menu" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Menu</a>
          <a href="#about" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>About</a>
          <a href="#contact" style={{ color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: 500 }}>Contact</a>
        </nav>
      </header>

      {/* Hero / Home */}
      <section id="home" style={{
        textAlign: 'center',
        background: '#f39c12',
        color: 'white',
        padding: '60px 20px'
      }}>
        <h2 style={{ fontSize: '35px', marginBottom: '10px' }}>Welcome to Tasty Restaurant</h2>
        <p style={{ fontSize: '18px', marginBottom: '20px' }}>Enjoy Fresh & Delicious Food Every Day</p>
        <button 
          onClick={() => {
            const el = document.getElementById('menu');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            padding: '12px 28px',
            border: 'none',
            background: 'white',
            color: '#d35400',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '4px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
        >
          Order Now
        </button>
      </section>

      {/* Menu */}
      <section id="menu" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', color: '#2c3e50', marginBottom: '10px' }}>Our Special Menu</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '25px',
          marginTop: '30px',
          flexWrap: 'wrap',
          maxWidth: '1200px',
          margin: '30px auto 0'
        }}>
          {menuItems.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'white',
                width: '260px',
                padding: '15px',
                border: '1px solid #ccc',
                borderRadius: '6px',
                textAlign: 'center',
                boxShadow: '0 3px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.2s ease'
              }}
            >
              <div>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{
                    width: '100%',
                    height: '170px',
                    objectFit: 'cover',
                    borderRadius: '4px'
                  }} 
                />
                <h3 style={{ margin: '12px 0 6px', fontSize: '1.25rem', color: '#333' }}>{item.name}</h3>
                <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{item.desc}</p>
              </div>
              <div>
                <h4 style={{ color: '#d35400', fontSize: '20px', margin: '8px 0' }}>{item.price}</h4>
                <button
                  onClick={() => handleOrder(item)}
                  style={{
                    background: '#d35400',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    width: '100%',
                    marginTop: '6px'
                  }}
                >
                  Order This
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ background: '#fff', padding: '50px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '15px', color: '#d35400', fontSize: '28px' }}>About Us</h2>
        <p style={{ maxWidth: '700px', margin: 'auto', lineHeight: '1.7', fontSize: '16px', color: '#555' }}>
          Tasty Restaurant serves fresh and delicious food made with quality
          ingredients. Our mission is to provide excellent food and friendly
          service at affordable prices. We welcome you to enjoy a wonderful
          dining experience with your family and friends.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" style={{ background: '#f9f9f9', padding: '50px 20px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: '#d35400', fontSize: '28px' }}>Contact Us</h2>
        <p style={{ margin: '10px 0', fontSize: '17px', color: '#444' }}><b>Address:</b> 123 Main Road, Nagpur, Maharashtra</p>
        <p style={{ margin: '10px 0', fontSize: '17px', color: '#444' }}><b>Phone:</b> +91 98765 43210</p>
        <p style={{ margin: '10px 0', fontSize: '17px', color: '#444' }}><b>Email:</b> tastyrestaurant@gmail.com</p>
        <p style={{ margin: '10px 0', fontSize: '17px', color: '#444' }}><b>Opening Time:</b> 10:00 AM - 11:00 PM</p>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#333',
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        marginTop: '30px',
        fontSize: '15px'
      }}>
        <p style={{ margin: 0 }}>© 2026 Tasty Restaurant | All Rights Reserved</p>
      </footer>

      {/* Simple Order Modal */}
      {orderModal && selectedItem && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
        }}>
          <div style={{
            background: '#fff', padding: '30px', borderRadius: '10px',
            maxWidth: '400px', width: '90%', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
          }}>
            {orderSuccess ? (
              <div>
                <h3 style={{ color: '#27ae60', fontSize: '22px' }}>Order Placed!</h3>
                <p>Your order for <b>{selectedItem.name}</b> has been received.</p>
              </div>
            ) : (
              <form onSubmit={confirmOrder}>
                <h3 style={{ margin: '0 0 15px', color: '#d35400' }}>Order {selectedItem.name}</h3>
                <img src={selectedItem.img} alt={selectedItem.name} style={{ width: '120px', height: '90px', objectFit: 'cover', borderRadius: '6px' }} />
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>Price: {selectedItem.price}</p>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  required 
                  style={{ width: '100%', padding: '10px', marginBottom: '10px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} 
                />
                <input 
                  type="text" 
                  placeholder="Table Number or Address" 
                  required 
                  style={{ width: '100%', padding: '10px', marginBottom: '15px', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }} 
                />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button type="submit" style={{ background: '#d35400', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Confirm Order</button>
                  <button type="button" onClick={() => setOrderModal(false)} style={{ background: '#7f8c8d', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

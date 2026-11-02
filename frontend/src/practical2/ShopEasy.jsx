import React, { useState } from 'react';

export default function ShopEasy({ onBackToDashboard }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const offerProducts = [
    { img: "/pr2/gaming laptop.webp", title: "Gaming Laptop", oldPrice: "₹80,000", newPrice: "₹65,000", off: "20% OFF" },
    { img: "/pr2/smartPhone.jpeg", title: "Premium Smartphone", oldPrice: "₹35,000", newPrice: "₹27,999", off: "25% OFF" },
    { img: "/pr2/headPhone.webp", title: "Wireless Headphones", oldPrice: "₹5,000", newPrice: "₹2,999", off: "40% OFF" },
    { img: "/pr2/smartWatch.webp", title: "Smart Watch", oldPrice: "₹8,000", newPrice: "₹4,999", off: "35% OFF" },
    { img: "/pr2/tv.jpeg", title: "Smart LED TV", oldPrice: "₹55,000", newPrice: "₹39,999", off: "30% OFF" },
    { img: "/pr2/tab.webp", title: "Android Tablet", oldPrice: "₹25,000", newPrice: "₹18,999", off: "25% OFF" },
    { img: "/pr2/console.jpg", title: "Gaming Console", oldPrice: "₹45,000", newPrice: "₹34,999", off: "22% OFF" },
    { img: "/pr2/tv.avif", title: "4K Smart TV", oldPrice: "₹70,000", newPrice: "₹49,999", off: "28% OFF" },
    { img: "/pr2/camera.jpeg", title: "DSLR Camera", oldPrice: "₹65,000", newPrice: "₹52,000", off: "20% OFF" },
    { img: "/pr2/earbud.jpeg", title: "Wireless Earbuds", oldPrice: "₹3,999", newPrice: "₹1,999", off: "50% OFF" },
    { img: "/pr2/monitor.webp", title: "Gaming Monitor", oldPrice: "₹25,000", newPrice: "₹19,999", off: "20% OFF" },
    { img: "/pr2/watch.webp", title: "Fitness Smart Watch", oldPrice: "₹6,000", newPrice: "₹3,499", off: "40% OFF" },
    { img: "/pr2/laptop.webp", title: "Business Laptop", oldPrice: "₹75,000", newPrice: "₹59,999", off: "20% OFF" },
    { img: "/pr2/headset.webp", title: "Noise Cancelling Headphones", oldPrice: "₹8,000", newPrice: "₹4,499", off: "45% OFF" }
  ];

  const catalogProducts = [
    { img: "/pr2/laptop1.png", title: "Laptop", price: "₹55,000" },
    { img: "/pr2/phone.jpeg", title: "Smart Phone", price: "₹25,000" },
    { img: "/pr2/watch 1.webp", title: "Smart Watch", price: "₹4,500" },
    { img: "/pr2/shoe.jpg", title: "Sports Shoes", price: "₹3,500" },
    { img: "/pr2/camera.jpg", title: "Digital Camera", price: "₹32,000" },
    { img: "/pr2/speaker.webp", title: "Bluetooth Speaker", price: "₹2,500" },
    { img: "/pr2/keyboard.jpeg", title: "Keyboard", price: "₹1,200" },
    { img: "/pr2/mouse.jpeg", title: "Wireless Mouse", price: "₹800" },
    { img: "/pr2/tab.jpeg", title: "Tablet", price: "₹18,000" },
    { img: "/pr2/console.avif", title: "Gaming Console", price: "₹39,999" },
    { img: "/pr2/moniter.webp", title: "LED Monitor", price: "₹12,500" },
    { img: "/pr2/printer.webp", title: "Laser Printer", price: "₹8,500" },
    { img: "/pr2/powerBank.jpeg", title: "Power Bank", price: "₹1,499" },
    { img: "/pr2/tv1.jpeg", title: "Smart LED TV", price: "₹45,000" },
    { img: "/pr2/mkey.jpeg", title: "Mechanical Keyboard", price: "₹2,500" },
    { img: "/pr2/Wmouse.jpeg", title: "Wireless Mouse", price: "₹999" },
    { img: "/pr2/dslr.jpeg", title: "DSLR Camera", price: "₹55,000" },
    { img: "/pr2/speaker1.webp", title: "Bluetooth Speaker", price: "₹3,500" },
    { img: "/pr2/lbag.jpeg", title: "Laptop Bag", price: "₹1,800" },
    { img: "/pr2/router.jpeg", title: "WiFi Router", price: "₹2,200" }
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const filteredOffers = offerProducts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCatalog = catalogProducts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', background: '#f5f5f5', minHeight: '100vh', color: '#222' }}>
      
      {/* Floating Back to Dashboard Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        <button 
          onClick={onBackToDashboard || (() => window.location.href = '/')}
          style={{
            background: '#111827',
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
        height: '80px',
        background: '#111827',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '35px', letterSpacing: '1.5px', margin: 0 }}>ShopEasy</h1>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 50px',
        boxShadow: '0 3px 10px rgba(0,0,0,0.15)',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
          <a href="#home" style={{ textDecoration: 'none', color: '#222', fontSize: '18px', fontWeight: 'bold' }}>Home</a>
          <a href="#offer" style={{ textDecoration: 'none', color: '#222', fontSize: '18px', fontWeight: 'bold' }}>Offers</a>
          <a href="#product" style={{ textDecoration: 'none', color: '#222', fontSize: '18px', fontWeight: 'bold' }}>Products</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#222', fontSize: '18px', fontWeight: 'bold' }}>About</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#222', fontSize: '18px', fontWeight: 'bold' }}>Contact</a>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '240px',
              padding: '10px 18px',
              border: '1px solid #ccc',
              borderRadius: '25px',
              outline: 'none',
              fontSize: '14px'
            }}
          />
          <button 
            onClick={() => setCartOpen(true)}
            style={{
              background: '#ff6600',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '15px',
              fontWeight: 'bold'
            }}
          >
            Cart ({cart.length})
          </button>
        </div>
      </nav>

      {/* Banner */}
      <section id="home" style={{
        height: '420px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url("https://images.unsplash.com/photo-1607082349566-187342175e2f")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        textAlign: 'center',
        padding: '20px'
      }}>
        <h2 style={{ fontSize: '55px', textShadow: '2px 3px 10px black', margin: 0 }}>Big Summer Sale</h2>
        <p style={{ fontSize: '24px', margin: '20px' }}>Up to 50% OFF on Selected Products</p>
        <button 
          onClick={() => {
            const el = document.getElementById('offer');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            background: '#ff6600',
            color: 'white',
            border: 'none',
            padding: '14px 30px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold'
          }}
        >
          Shop Now
        </button>
      </section>

      {/* Offers Section */}
      <section id="offer" style={{ background: 'white', padding: '50px 30px' }}>
        <h2 style={{ textAlign: 'center', color: '#ff6600', fontSize: '35px', marginBottom: '30px' }}>Special Offers</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '25px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {filteredOffers.map((item, idx) => (
            <div 
              key={idx} 
              style={{
                background: '#f8fafc',
                textAlign: 'center',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                paddingBottom: '20px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <span style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                background: '#e11d48',
                color: '#fff',
                fontSize: '12px',
                fontWeight: 'bold',
                padding: '4px 10px',
                borderRadius: '20px'
              }}>
                {item.off}
              </span>
              <div>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
                />
                <h3 style={{ margin: '15px 10px 5px', fontSize: '18px' }}>{item.title}</h3>
                <p style={{ color: 'gray', textDecoration: 'line-through', margin: '4px 0', fontSize: '15px' }}>{item.oldPrice}</p>
                <p style={{ color: '#ff6600', fontSize: '22px', fontWeight: 'bold', margin: '4px 0' }}>{item.newPrice}</p>
              </div>
              <button 
                onClick={() => addToCart(item)}
                style={{
                  background: '#ff6600',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  margin: '10px 20px 0'
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Product Section */}
      <section id="product" style={{ padding: '50px 30px' }}>
        <h2 style={{ textAlign: 'center', color: '#111827', fontSize: '35px', marginBottom: '30px' }}>All Products</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '25px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {filteredCatalog.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: 'white',
                textAlign: 'center',
                borderRadius: '10px',
                padding: '20px 15px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <img 
                  src={item.img} 
                  alt={item.title} 
                  style={{ width: '100%', height: '170px', objectFit: 'contain', marginBottom: '10px' }} 
                />
                <h3 style={{ fontSize: '17px', margin: '8px 0', color: '#222' }}>{item.title}</h3>
                <p style={{ color: '#ff6600', fontSize: '20px', fontWeight: 'bold', margin: '6px 0' }}>{item.price}</p>
              </div>
              <button 
                onClick={() => addToCart(item)}
                style={{
                  background: '#ff6600',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ background: 'white', padding: '50px 30px', textAlign: 'center' }}>
        <h2 style={{ color: '#ff6600', fontSize: '32px', marginBottom: '15px' }}>About Us</h2>
        <p style={{ maxWidth: '750px', margin: '0 auto', fontSize: '17px', lineHeight: '1.7', color: '#444' }}>
          Welcome to <b>ShopEasy</b>, your trusted online shopping destination.
          We provide quality electronics, fashion products and accessories
          at affordable prices with fast delivery and customer support.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: '50px 30px', textAlign: 'center', background: '#f0f2f5' }}>
        <h2 style={{ color: '#ff6600', fontSize: '32px', marginBottom: '20px' }}>Contact Us</h2>
        <p style={{ fontSize: '17px', margin: '8px 0' }}>📍 Nagpur, Maharashtra, India</p>
        <p style={{ fontSize: '17px', margin: '8px 0' }}>📞 +91 98765 43210</p>
        <p style={{ fontSize: '17px', margin: '8px 0' }}>📧 support@shopeasy.com</p>
        <p style={{ fontSize: '17px', margin: '8px 0' }}>🕒 Monday - Saturday (9 AM - 8 PM)</p>
      </section>

      {/* Footer */}
      <footer style={{ background: '#111827', color: 'white', textAlign: 'center', padding: '25px' }}>
        <p style={{ margin: 0, fontSize: '15px' }}>© 2026 ShopEasy. All Rights Reserved.</p>
      </footer>

      {/* Cart Drawer */}
      {cartOpen && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 10000,
          display: 'flex', justifyContent: 'flex-end'
        }}>
          <div style={{
            background: '#fff', width: '360px', height: '100%', padding: '24px',
            boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
                <h3 style={{ margin: 0 }}>Shopping Cart ({cart.length})</h3>
                <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}>✕</button>
              </div>
              <div style={{ marginTop: '15px', maxHeight: '60vh', overflowY: 'auto' }}>
                {cart.length === 0 ? (
                  <p style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>Your cart is empty.</p>
                ) : (
                  cart.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f0f0f0' }}>
                      <img src={item.img} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '14px' }}>{item.title}</h4>
                        <span style={{ color: '#ff6600', fontWeight: 'bold', fontSize: '13px' }}>{item.newPrice || item.price}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            {cart.length > 0 && (
              <button 
                onClick={() => {
                  alert('Thank you for shopping at ShopEasy! Your order has been placed.');
                  setCart([]);
                  setCartOpen(false);
                }}
                style={{
                  background: '#ff6600', color: '#fff', border: 'none', padding: '14px',
                  borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', width: '100%'
                }}
              >
                Checkout Now
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

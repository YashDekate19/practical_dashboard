import React, { useState, useEffect } from 'react';
import { registerUser, loginUser, testPr4Db } from '../services/api';

export default function AuthProfile({ onBackToDashboard }) {
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState(null);
  const [dbStatus, setDbStatus] = useState(null);

  // Sign up state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');

  // Sign in state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user');
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {}
    }

    testPr4Db().then(res => setDbStatus(res)).catch(() => {});
  }, []);

  const showToast = (msg, err = false) => {
    setMessage(msg);
    setIsError(err);
    setTimeout(() => setMessage(null), 3500);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword) {
      showToast('Please fill in all fields.', true);
      return;
    }
    if (signupPassword.length < 6) {
      showToast('Password must be at least 6 characters.', true);
      return;
    }

    try {
      const res = await registerUser({
        name: signupName,
        email: signupEmail,
        password: signupPassword
      });
      if (res.success) {
        showToast('Account created successfully! Please sign in.');
        setIsActive(false); // slide back to sign in
        setLoginEmail(signupEmail);
        setSignupPassword('');
      } else {
        showToast(res.message || 'Registration failed.', true);
      }
    } catch (err) {
      showToast(err.message || 'Registration failed.', true);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      showToast('Please enter both email and password.', true);
      return;
    }

    try {
      const res = await loginUser({
        email: loginEmail,
        password: loginPassword
      });
      if (res.success && res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        setUser(res.user);
        showToast('Login successful!');
      } else {
        showToast(res.message || 'Invalid email or password.', true);
      }
    } catch (err) {
      showToast(err.message || 'Invalid email or password.', true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    showToast('Logged out successfully.');
  };

  // If user is logged in, show Profile Page (from Pr4/templates/profile.html)
  if (user) {
    return (
      <div style={{ fontFamily: 'Arial, sans-serif', background: '#f8fafc', minHeight: '100vh', color: '#1e293b' }}>
        
        {/* Top Navbar */}
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 40px',
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '50%', background: '#4f46e5',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff'
            }}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>Account</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <button
              onClick={onBackToDashboard || (() => window.location.href = '/')}
              style={{
                background: '#f1f5f9',
                color: '#475569',
                border: '1px solid #cbd5e1',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px'
              }}
            >
              ← Dashboard
            </button>
            <button
              onClick={handleLogout}
              style={{
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '8px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Profile Content */}
        <section style={{
          maxWidth: '700px',
          margin: '80px auto',
          background: '#fff',
          borderRadius: '20px',
          padding: '50px 40px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{
            width: '100px', height: '100px', borderRadius: '50%', background: '#e0e7ff',
            margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5'
          }}>
            <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          <p style={{ color: '#4f46e5', fontWeight: 700, letterSpacing: '1px', fontSize: '13px', margin: '0 0 8px' }}>WELCOME</p>
          <h1 style={{ fontSize: '36px', color: '#0f172a', margin: '0 0 12px' }}>
            Hello, <span style={{ color: '#4f46e5' }}>{user.name}</span>!
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px', margin: '0 0 25px' }}>
            You are successfully logged in to your account.
          </p>

          <div style={{
            background: '#f8fafc', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0',
            maxWidth: '380px', margin: '0 auto', textAlign: 'left', fontSize: '14px'
          }}>
            <div style={{ marginBottom: '8px' }}><b>Email:</b> {user.email}</div>
            <div><b>User ID:</b> {user.id}</div>
            {dbStatus?.type && (
              <div style={{ marginTop: '8px', color: '#16a34a', fontSize: '12px', fontWeight: 600 }}>
                ● Database: {dbStatus.type}
              </div>
            )}
          </div>
        </section>

      </div>
    );
  }

  // Login & Registration view (from Pr4/templates/index.html & static/style.css)
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, #e2e2e2, #c9d6ff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      padding: '20px',
      fontFamily: "'Plus Jakarta Sans', Arial, sans-serif"
    }}>
      
      {/* Toast Notification */}
      {message && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 99999,
          background: isError ? '#ef4444' : '#10b981', color: '#fff',
          padding: '12px 24px', borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
          fontWeight: 'bold', fontSize: '14px'
        }}>
          {message}
        </div>
      )}

      {/* Floating Back to Dashboard Button */}
      <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
        <button 
          onClick={onBackToDashboard || (() => window.location.href = '/')}
          style={{
            background: '#312e81',
            color: '#fff',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '50px',
            fontSize: '14px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* The Animated Container */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '30px',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.15)',
        position: 'relative',
        overflow: 'hidden',
        width: '768px',
        maxWidth: '100%',
        minHeight: '480px'
      }}>

        {/* Sign Up Form */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          transition: 'all 0.6s ease-in-out',
          zIndex: isActive ? 5 : 1,
          opacity: isActive ? 1 : 0,
          transform: isActive ? 'translateX(100%)' : 'translateX(0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px'
        }}>
          <form onSubmit={handleRegister} style={{ width: '100%', textAlign: 'center' }}>
            <h1 style={{ fontSize: '28px', color: '#1e293b', margin: '0 0 5px' }}>Create Account</h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>Register with your personal details</p>

            <input 
              type="text" 
              placeholder="Full Name" 
              required
              value={signupName}
              onChange={e => setSignupName(e.target.value)}
              style={{
                backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', margin: '8px 0',
                padding: '12px 16px', fontSize: '14px', borderRadius: '10px', width: '100%', outline: 'none', boxSizing: 'border-box'
              }}
            />
            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={signupEmail}
              onChange={e => setSignupEmail(e.target.value)}
              style={{
                backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', margin: '8px 0',
                padding: '12px 16px', fontSize: '14px', borderRadius: '10px', width: '100%', outline: 'none', boxSizing: 'border-box'
              }}
            />
            <input 
              type="password" 
              placeholder="Password (min. 6 chars)" 
              required
              value={signupPassword}
              onChange={e => setSignupPassword(e.target.value)}
              style={{
                backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', margin: '8px 0',
                padding: '12px 16px', fontSize: '14px', borderRadius: '10px', width: '100%', outline: 'none', boxSizing: 'border-box'
              }}
            />

            <button 
              type="submit"
              style={{
                backgroundColor: '#4f46e5', color: '#fff', fontSize: '14px', padding: '12px 45px',
                border: 'none', borderRadius: '10px', fontWeight: 600, letterSpacing: '0.5px',
                textTransform: 'uppercase', marginTop: '15px', cursor: 'pointer', width: '100%'
              }}
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Sign In Form */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '50%',
          height: '100%',
          transition: 'all 0.6s ease-in-out',
          zIndex: 2,
          transform: isActive ? 'translateX(100%)' : 'translateX(0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 40px'
        }}>
          <form onSubmit={handleLogin} style={{ width: '100%', textAlign: 'center' }}>
            <h1 style={{ fontSize: '28px', color: '#1e293b', margin: '0 0 5px' }}>Welcome Back</h1>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px' }}>Login to continue</p>

            <input 
              type="email" 
              placeholder="Email Address" 
              required
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              style={{
                backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', margin: '8px 0',
                padding: '12px 16px', fontSize: '14px', borderRadius: '10px', width: '100%', outline: 'none', boxSizing: 'border-box'
              }}
            />
            <input 
              type="password" 
              placeholder="Password" 
              required
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              style={{
                backgroundColor: '#f8fafc', border: '1.5px solid #e2e8f0', margin: '8px 0',
                padding: '12px 16px', fontSize: '14px', borderRadius: '10px', width: '100%', outline: 'none', boxSizing: 'border-box'
              }}
            />

            <a href="#" onClick={(e) => { e.preventDefault(); alert('Please register a new account or reset via Supabase.'); }} style={{
              color: '#4f46e5', fontSize: '13px', textDecoration: 'none', margin: '12px 0 15px', display: 'inline-block', fontWeight: 500
            }}>
              Forgot Password?
            </a>

            <button 
              type="submit"
              style={{
                backgroundColor: '#4f46e5', color: '#fff', fontSize: '14px', padding: '12px 45px',
                border: 'none', borderRadius: '10px', fontWeight: 600, letterSpacing: '0.5px',
                textTransform: 'uppercase', cursor: 'pointer', width: '100%'
              }}
            >
              Sign In
            </button>
          </form>
        </div>

        {/* Animated Toggle Container */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          width: '50%',
          height: '100%',
          overflow: 'hidden',
          transition: 'all 0.6s ease-in-out',
          borderRadius: isActive ? '0 120px 100px 0' : '120px 0 0 100px',
          transform: isActive ? 'translateX(-100%)' : 'translateX(0)',
          zIndex: 1000
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #4338ca, #6366f1)',
            color: '#fff',
            position: 'relative',
            left: '-100%',
            height: '100%',
            width: '200%',
            transform: isActive ? 'translateX(50%)' : 'translateX(0)',
            transition: 'all 0.6s ease-in-out'
          }}>
            
            {/* Left Panel (shown when active / signing up) */}
            <div style={{
              position: 'absolute',
              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '0 30px',
              textAlign: 'center',
              top: 0,
              transform: isActive ? 'translateX(0)' : 'translateX(-200%)',
              transition: 'all 0.6s ease-in-out',
              boxSizing: 'border-box'
            }}>
              <h1 style={{ fontSize: '28px', margin: '0 0 10px' }}>Welcome Back!</h1>
              <p style={{ fontSize: '14px', margin: '0 0 20px', lineHeight: '20px' }}>Already have an account?</p>
              <button 
                onClick={() => setIsActive(false)}
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #fff',
                  color: '#fff',
                  fontSize: '14px',
                  padding: '12px 45px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Sign In
              </button>
            </div>

            {/* Right Panel (shown when inactive / signing in) */}
            <div style={{
              position: 'absolute',
              right: 0,
              width: '50%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              padding: '0 30px',
              textAlign: 'center',
              top: 0,
              transform: isActive ? 'translateX(200%)' : 'translateX(0)',
              transition: 'all 0.6s ease-in-out',
              boxSizing: 'border-box'
            }}>
              <h1 style={{ fontSize: '28px', margin: '0 0 10px' }}>Hello, Friend!</h1>
              <p style={{ fontSize: '14px', margin: '0 0 20px', lineHeight: '20px' }}>Don't have an account?</p>
              <button 
                onClick={() => setIsActive(true)}
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid #fff',
                  color: '#fff',
                  fontSize: '14px',
                  padding: '12px 45px',
                  borderRadius: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Sign Up
              </button>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

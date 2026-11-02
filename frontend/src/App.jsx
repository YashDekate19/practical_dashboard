import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard/Dashboard';
import TastyRestaurant from './practical1/TastyRestaurant';
import ShopEasy from './practical2/ShopEasy';
import Portfolio from './practical3/Portfolio';
import AuthProfile from './practical4/AuthProfile';
import DailyTimes from './practical5/DailyTimes';
import StudentPortal from './practical6/StudentPortal';

function getRouteFromPath() {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  if (path === '/pr1' || path === '/practicals/pr1') return 'pr1';
  if (path === '/pr2' || path === '/practicals/pr2') return 'pr2';
  if (path === '/pr3' || path === '/practicals/pr3') return 'pr3';
  if (path === '/pr4' || path === '/practicals/pr4' || path === '/profile') return 'pr4';
  if (path === '/pr5' || path === '/practicals/pr5') return 'pr5';
  if (path === '/pr6' || path === '/practicals/pr6') return 'pr6';
  return 'dashboard';
}

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(getRouteFromPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(getRouteFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route, inNewTab = false) => {
    const targetUrl = route === 'dashboard' ? '/' : `/${route}`;
    if (inNewTab) {
      window.open(targetUrl, '_blank');
      return;
    }
    window.history.pushState({}, '', targetUrl);
    setCurrentRoute(route);
    window.scrollTo(0, 0);
  };

  const backToDashboard = () => navigate('dashboard');

  // Render individual standalone practical page on separate route
  if (currentRoute === 'pr1') {
    return <TastyRestaurant onBackToDashboard={backToDashboard} />;
  }
  if (currentRoute === 'pr2') {
    return <ShopEasy onBackToDashboard={backToDashboard} />;
  }
  if (currentRoute === 'pr3') {
    return <Portfolio onBackToDashboard={backToDashboard} />;
  }
  if (currentRoute === 'pr4') {
    return <AuthProfile onBackToDashboard={backToDashboard} />;
  }
  if (currentRoute === 'pr5') {
    return <DailyTimes onBackToDashboard={backToDashboard} />;
  }
  if (currentRoute === 'pr6') {
    return <StudentPortal onBackToDashboard={backToDashboard} />;
  }

  // Otherwise, render main Central Dashboard on '/'
  return <Dashboard onOpenPractical={(prId) => navigate(prId, true)} />;
}

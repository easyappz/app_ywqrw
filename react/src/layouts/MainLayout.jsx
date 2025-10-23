import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
  return (
    <div data-easytag="id1-src/layouts/MainLayout.jsx" className="layout-root">
      <Header />
      <main data-easytag="id2-src/layouts/MainLayout.jsx" className="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

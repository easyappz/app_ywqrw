import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import CreateListing from './pages/CreateListing';
import Listings from './pages/Listings';
import ListingDetails from './pages/ListingDetails';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <div data-easytag="id1-src/App.js" className="App">
        <BrowserRouter>
          <div data-easytag="id2-src/App.js">
            <Routes>
              <Route
                path="/"
                element={
                  <MainLayout>
                    <Home />
                  </MainLayout>
                }
              />
              <Route
                path="/register"
                element={
                  <MainLayout>
                    <Register />
                  </MainLayout>
                }
              />
              <Route
                path="/login"
                element={
                  <MainLayout>
                    <Login />
                  </MainLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <Profile />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create"
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <CreateListing />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/listings"
                element={
                  <MainLayout>
                    <Listings />
                  </MainLayout>
                }
              />
              <Route
                path="/listing/:id"
                element={
                  <MainLayout>
                    <ListingDetails />
                  </MainLayout>
                }
              />
              <Route
                path="/admin"
                element={
                  <MainLayout>
                    <Admin />
                  </MainLayout>
                }
              />
              <Route
                path="*"
                element={
                  <MainLayout>
                    <NotFound />
                  </MainLayout>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ErrorBoundary>
  );
}

export default App;

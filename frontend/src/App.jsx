import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/Auth';

import Layout from './components/Layout';
import Home from './pages/Home';

import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

import GatunekList from './pages/gatunek/GatunekList';
import GatunekForm from './pages/gatunek/GatunekForm';

import LowiskoList from './pages/lowisko/LowiskoList';
import LowiskoDetails from './pages/lowisko/LowiskoDetails';
import LowiskoForm from './pages/lowisko/LowiskoForm';

import PolowList from './pages/polow/PolowList';
import PolowForm from './pages/polow/PolowForm';


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/gatunki" element={<GatunekList />} />
          <Route path="/gatunki/nowy" element={
            <ProtectedRoute requiredRole="administrator">
              <GatunekForm />
            </ProtectedRoute>
          } />
          <Route path="/gatunki/edytuj/:id" element={
            <ProtectedRoute requiredRole="administrator">
              <GatunekForm />
            </ProtectedRoute>
          } />

          <Route path="/lowiska" element={<LowiskoList />} />
          <Route path="/lowiska/:id" element={<LowiskoDetails />} />

          <Route 
            path="/lowiska/nowe" 
            element={
              <ProtectedRoute requiredRole="administrator">
                <LowiskoForm />
              </ProtectedRoute>
            } 
          />
          <Route 
              path="/lowiska/edytuj/:id" 
              element={
                <ProtectedRoute requiredRole="administrator">
                  <LowiskoForm />
                </ProtectedRoute>
              } 
            />

          <Route path="/polowy" element={<PolowList all={false}/>} />
          <Route 
            path="/polowy-wszystkie" 
            element={
                <ProtectedRoute requiredRole="administrator">
                  <PolowList all={true}/>
                </ProtectedRoute>
            } 
          />
          
          <Route 
              path="/polowy/edytuj/:id" 
              element={
                  <PolowForm />
              } 
          />


          <Route 
              path="/polowy/nowy" 
              element={
                  <PolowForm />
              } 
            />
        </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}
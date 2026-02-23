import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { CustomCursor } from './components/ui/CustomCursor';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForumList from './pages/community/ForumList';
import LearningHub from './pages/learning/LearningHub';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import InteractiveModule from './pages/learning/InteractiveModule';

import { useAuth } from './lib/useAuth';

function App() {
  const initAuthListener = useAuth(state => state.initAuthListener);

  useEffect(() => {
    initAuthListener();
  }, [initAuthListener]);

  return (
    <BrowserRouter>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path="community" element={<ForumList />} />
          <Route path="learning" element={<LearningHub />} />
          <Route path="learning/automating-customer-service" element={<InteractiveModule />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

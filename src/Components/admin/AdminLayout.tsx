import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import AdList from './pages/ads/AdList';
import AdNew from './pages/ads/AdNew';
import QnaList from './pages/qna/QnaList';
import QnaNew from './pages/qna/QnaNew';
import UserList from './pages/users/UserList';
import UserNew from './pages/users/UserNew';

const AdminLayout = () => {
  return (
    
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
            <Routes>
              <Route path="/admin/" element={<Dashboard />} />
              
              {/* İlan Yönetimi */}
              <Route path="/admin/ads">
                <Route index element={<Navigate to="/admin/ads/list" replace />} />
                <Route path="list" element={<AdList />} />
                <Route path="new" element={<AdNew />} />
              </Route>

              {/* Soru-Cevap */}
              <Route path="/admin/qna">
                <Route index element={<Navigate to="/admin/qna/list" replace />} />
                <Route path="list" element={<QnaList />} />
                <Route path="new" element={<QnaNew />} />
              </Route>

              {/* Kullanıcı Yönetimi */}
              <Route path="/admin/users">
                <Route index element={<Navigate to="/admin/users/list" replace />} />
                <Route path="list" element={<UserList />} />
                <Route path="new" element={<UserNew />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
  );
}

export default AdminLayout;
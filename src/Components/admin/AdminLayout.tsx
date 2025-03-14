import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import AdList from './pages/ads/AdList';
import AdNew from './pages/ads/AdNew';
import AdPending from './pages/ads/AdPending';
import QnaList from './pages/qna/QnaList';
import QnaNew from './pages/qna/QnaNew';
import QnaAnswer from './pages/qna/QnaAnswer';
import UserList from './pages/users/UserList';
import UserNew from './pages/users/UserNew';
import PendingUserList from './pages/users/PendingUserList';
import PetHealthList from './pages/pet-health/PetHealthList';
import PetHealthNew from './pages/pet-health/PetHealthNew';
import VaccineTracking from './pages/pet-health/VaccineTracking';
import Treatments from './pages/pet-health/Treatments';
import Appointments from './pages/pet-health/Appointments';
import DonationList from './pages/donations/DonationList';
import DonationNew from './pages/donations/DonationNew';
import DonationEdit from './pages/donations/DonationEdit';
import DonationImageUpload from './pages/donations/DonationImageUpload';

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
                <Route path="pending" element={<AdPending />} />
              </Route>

              {/* Soru-Cevap */}
              <Route path="/admin/qna">
                <Route index element={<Navigate to="/admin/qna/list" replace />} />
                <Route path="list" element={<QnaList />} />
                <Route path="new" element={<QnaNew />} />
                <Route path="answer/:id" element={<QnaAnswer />} />
              </Route>

              {/* Kullanıcı Yönetimi */}
              <Route path="/admin/users">
                <Route index element={<Navigate to="/admin/users/list" replace />} />
                <Route path="list" element={<UserList />} />
                <Route path="new" element={<UserNew />} />
                <Route path="pending" element={<PendingUserList />} />
              </Route>
              
              {/* Evcil Hayvan Sağlığı */}
              <Route path="/admin/pet-health">
                <Route index element={<PetHealthList />} />
                <Route path="new" element={<PetHealthNew />} />
                <Route path="vaccines" element={<VaccineTracking />} />
                <Route path="treatments" element={<Treatments />} />
                <Route path="appointments" element={<Appointments />} />
              </Route>

              {/* Bağış Kurumları */}
              <Route path="/admin/donations">
                <Route index element={<Navigate to="/admin/donations/list" replace />} />
                <Route path="list" element={<DonationList />} />
                <Route path="new" element={<DonationNew />} />
                <Route path="edit/:id" element={<DonationEdit />} />
                <Route path="upload-image/:id" element={<DonationImageUpload />} />
              </Route>
            </Routes>
          </main>
        </div>
      </div>
  );
}

export default AdminLayout;
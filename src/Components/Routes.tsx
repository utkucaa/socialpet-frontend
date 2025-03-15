import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import HomePage from "./Intro/HomePage";
import Register from "./Register/Register";
import ProfilePage from "./Profile/ProfilePage";
import AdoptionPage from "./Adoption/AdoptionPage";
import CreatedPage from "./Adoption/CreatedPage";
import LostPage from "./Lost/LostPage";
import CreateListingPage from "./Lost/CreateListingPage"; 
import QuestionDetail from "./HelpAndInfo/QuestionDetail";
import AdDetail from "./Adoption/AdDetail";
import Donate from "./Donate/Donate";
import NewAnswer from "./HelpAndInfo/NewAnswer";
import MedicalRecord from "./MedicalRecord/MedicalRecord";
import PetList from "./Pets/PetList";
import HelpAndInfo from "./HelpAndInfo/HelpAndInfo";
import AdminLayout from "./admin/AdminLayout";
import VetPetShop from "./VetPetShop/VetPetShop";
import BreedDetector from "./CinsDedektifi";

function AppRoutes() {
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const location = useLocation();

  return (
    <>
      {/* @ts-ignore */}
      {user && user.role === "ADMIN" && location.pathname.includes("/admin") ? (
        <>
          <AdminLayout />
        </>
      ) : (
        <>
          {/* @ts-ignore */}
          <Navbar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/adopt" element={<AdoptionPage />} />
            <Route path="/lost/*" element={<LostPage />} />
            <Route path="/pets" element={<PetList />} />
            <Route path="/lost/create" element={<CreateListingPage />} />
            <Route path="/health-tracking" element={<MedicalRecord />} />
            <Route path="/medical-record/:petId" element={<MedicalRecord />} />
            <Route path="/breed-detector" element={<BreedDetector />} />
            <Route path="/help-info" element={<HelpAndInfo />} />
            <Route path="/question/:id" element={<QuestionDetail />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/create-ad" element={<CreatedPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/adoption/:id" element={<AdDetail />} />
            <Route path="/new-answer" element={<NewAnswer />} />
            <Route path="/vet-pet-shop" element={<VetPetShop />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default AppRoutes;

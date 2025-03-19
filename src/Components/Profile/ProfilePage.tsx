import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEdit2, FiPlus, FiMessageCircle, FiBell, FiUser, FiLogOut, FiHeart, FiEye, FiCalendar, FiFileText, FiMapPin, FiTag } from 'react-icons/fi';
import { FaPaw } from 'react-icons/fa';

import moment from 'moment'
import 'moment/locale/tr'  
import axiosInstance from '../../services/axios';
moment.locale('tr')

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  avatar?: string;
  joinDate: string;
  bio?: string;
  email?: string;
  userName?: string;
  phoneNumber?: string;
  [key: string]: any; // For other potential properties
}

interface UserStatsResponse {
  totalAds: number;
  activeAds: number;
  views: number;
}

interface UserStats {
  totalAds: number;
  activeAds: number;
  views: number;
  membershipDate: string;
}

interface UserInfo {
  name: string;
}

interface ProfilePictureResponse {
  data: string;
}

interface Pet {
  id: string | number;
  name: string;
  type: string;
  animalType?: string;
  breed?: string;
  breedId?: number;
  age: number;
  gender?: string;
  ownerId?: number;
  imageUrl?: string;
}

interface Ad {
  id: string | number;
  title: string;
  description: string;
  details?: string;
  petType?: string;
  petName?: string;
  animalType?: string;
  location: string;
  city?: string;
  district?: string;
  date?: string;
  lastSeenDate?: string;
  lastSeenLocation?: string;
  status: 'active' | 'inactive' | 'Kayıp';
  category: 'kayıp' | 'sahiplendirme';
  additionalInfo?: string;
  contactInfo?: string;
  size?: string;
  gender?: string;
  source?: string;
  fullName?: string;
  phone?: string;
  imageUrl?: string;
  user?: {
    id: number;
  };
}

const ProfilePage: React.FC = () => {
  const [avatar, setAvatar] = useState<string>('/avatar.png');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('pets');
  const [pets, setPets] = useState<Pet[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [ads, setAds] = useState<Ad[]>([]);
  const [adoptionAds, setAdoptionAds] = useState<Ad[]>([]);
  const [lostPetAds, setLostPetAds] = useState<Ad[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({
    totalAds: 0,
    activeAds: 0,
    views: 0,
    membershipDate: ''
  });
  const [adsFilter, setAdsFilter] = useState({
    status: 'all',
    category: 'all'
  });
  const [isLoading, setIsLoading] = useState({
    user: true,
    pets: true,
    adoptionAds: true,
    lostPetAds: true
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch user data
  useEffect(() => {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      try {
        const _userData: UserData = JSON.parse(storedUserData);
        setUserData(_userData);
        
        if (_userData.avatar) {
          setAvatar("http://localhost:8080" + _userData.avatar);
        }
        
        // Set membership date in user stats
        setUserStats(prevStats => ({
          ...prevStats,
          membershipDate: moment(_userData.joinDate).format('LL')
        }));
        
        // Fetch user statistics
        fetchUserStats(_userData.id);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setError('Kullanıcı bilgilerini yüklerken bir hata oluştu.');
        setIsLoading(prev => ({ ...prev, user: false }));
      }
    } else {
      setIsLoading(prev => ({ ...prev, user: false }));
      // Redirect to login if no user data is found
      navigate('/login');
    }
  }, [navigate]);

  // Fetch user statistics
  const fetchUserStats = async (userId: number) => {
    try {
      const response = await axiosInstance.get<UserStatsResponse>(`/api/v1/users/${userId}/stats`);
      setUserStats(prevStats => ({
        ...prevStats,
        totalAds: response.data.totalAds,
        activeAds: response.data.activeAds,
        views: response.data.views
      }));
    } catch (error) {
      console.error('Error fetching user stats:', error);
      // Continue with default values if stats fetch fails
    } finally {
      setIsLoading(prev => ({ ...prev, user: false }));
    }
  };

  // Fetch user's pets
  useEffect(() => {
    const fetchPets = async () => {
      if (!userData?.id) return;
      
      try {
        const response = await axiosInstance.get<Pet[]>(`/api/pets/owner/${userData.id}`);
        
        // Transform API response to match our Pet interface if needed
        const transformedPets = response.data.map(pet => ({
          id: pet.id,
          name: pet.name,
          type: pet.animalType || 'Diğer', // Use animalType as type or default to "Other"
          breed: pet.breed,
          age: pet.age,
          gender: pet.gender,
          imageUrl: pet.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image' // Default image if none provided
        }));
        
        setPets(transformedPets);
      } catch (error) {
        console.error('Error fetching pets:', error);
        setError('Evcil hayvanları yüklerken bir hata oluştu.');
      } finally {
        setIsLoading(prev => ({ ...prev, pets: false }));
      }
    };

    if (userData?.id) {
      fetchPets();
    }
  }, [userData]);

  // Fetch user's adoption ads
  useEffect(() => {
    const fetchAdoptionAds = async () => {
      if (!userData?.id) return;
      
      try {
        console.log(`Fetching adoption ads for user ID: ${userData.id}`);
        // Get the user ID from userData
        const userId = userData.id;
        
        // Try both endpoints until one works
        let response;
        try {
          response = await axiosInstance.get<Ad[]>(`/api/v1/adoption/user/${userId}`);
          console.log('Adoption response:', response.data);
        } catch (err) {
          console.log('Error with first adoption endpoint, trying alternative:', err);
          // Try alternative endpoint with no v1 in path
          response = await axiosInstance.get<Ad[]>(`/api/adoption/user/${userId}`);
          console.log('Alternative adoption response:', response.data);
        }
        
        // Transform API response to match our Ad interface
        const transformedAds = response.data.map(ad => ({
          id: ad.id,
          title: ad.title || 'Untitled Adoption',
          description: ad.description || '',
          petType: ad.animalType || ad.petType || 'Not specified',
          petName: ad.petName,
          location: ad.city || ad.location || '',
          district: ad.district,
          date: ad.date ? moment(ad.date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
          status: 'active' as 'active', // Explicitly cast to the proper type
          category: 'sahiplendirme' as 'sahiplendirme',
          imageUrl: ad.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image'
        }));
        
        console.log('Transformed adoption ads:', transformedAds);
        setAdoptionAds(transformedAds);
      } catch (error) {
        console.error('Error fetching adoption ads:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, adoptionAds: false }));
      }
    };

    if (userData?.id) {
      fetchAdoptionAds();
    }
  }, [userData]);

  // Fetch user's lost pet ads
  useEffect(() => {
    const fetchLostPetAds = async () => {
      if (!userData?.id) return;
      
      try {
        console.log(`Fetching lost pet ads for user ID: ${userData.id}`);
        // Get the user ID from userData
        const userId = userData.id;
        
        // Try both endpoints until one works
        let response;
        try {
          // Use the endpoint from lostPetService
          response = await axiosInstance.get<Ad[]>(`/api/lostpets/user/${userId}`);
          console.log('Lost pets response:', response.data);
        } catch (err) {
          console.log('Error with first lost pets endpoint, trying alternative:', err);
          // Try alternative endpoint format with v1 in path
          response = await axiosInstance.get<Ad[]>(`/api/v1/lostpets/user/${userId}`);
          console.log('Alternative lost pets response:', response.data);
        }
        
        // Transform API response to match our Ad interface
        const transformedAds = response.data.map(ad => {
          // Ensure status is one of the allowed values
          let adStatus: 'active' | 'inactive' | 'Kayıp' = 'Kayıp';
          if (ad.status === 'active' || ad.status === 'inactive') {
            adStatus = ad.status;
          }
          
          return {
            id: ad.id,
            title: ad.title || 'Untitled Lost Pet',
            description: ad.details || ad.description || '',
            petType: ad.category || ad.petType || 'Not specified',
            location: ad.location || '',
            lastSeenDate: ad.lastSeenDate,
            lastSeenLocation: ad.lastSeenLocation,
            date: ad.lastSeenDate ? moment(ad.lastSeenDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD'),
            status: adStatus,
            category: 'kayıp' as 'kayıp',
            additionalInfo: ad.additionalInfo,
            contactInfo: ad.contactInfo,
            imageUrl: ad.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image'
          };
        });
        
        console.log('Transformed lost pet ads:', transformedAds);
        setLostPetAds(transformedAds);
      } catch (error) {
        console.error('Error fetching lost pet ads:', error);
      } finally {
        setIsLoading(prev => ({ ...prev, lostPetAds: false }));
      }
    };

    if (userData?.id) {
      fetchLostPetAds();
    }
  }, [userData]);

  // Combine adoption and lost pet ads
  useEffect(() => {
    // Add sample data if both arrays are empty (API calls failed or no data)
    let combinedAds = [...adoptionAds, ...lostPetAds];
    
    if (combinedAds.length === 0) {
      // Sample adoption ad
      const sampleAdoption: Ad = {
        id: 'sample1',
        title: 'Golden Retriever Yavruları',
        description: 'Sağlıklı ve sevimli Golden Retriever yavruları sahiplendirme ilanı.',
        petType: 'Köpek',
        location: 'İstanbul',
        date: moment().format('YYYY-MM-DD'),
        status: 'active',
        category: 'sahiplendirme',
        imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVwcHl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
      };
      
      // Sample lost pet ad
      const sampleLostPet: Ad = {
        id: 'sample2',
        title: 'Kayıp Kedi Duman',
        description: 'Kadıköy bölgesinde kaybolan British Shorthair cinsi kedim. Bulan veya gören olursa lütfen iletişime geçin.',
        petType: 'Kedi',
        location: 'İstanbul',
        date: moment().subtract(2, 'days').format('YYYY-MM-DD'),
        status: 'Kayıp',
        category: 'kayıp',
        imageUrl: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2F0JTIwYnJpdGlzaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
      };
      
      // Only add sample data for development purposes
      if (process.env.NODE_ENV !== 'production') {
        console.log('Adding sample ad data for development');
        combinedAds = [sampleAdoption, sampleLostPet];
      }
    }
    
    setAds(combinedAds);
  }, [adoptionAds, lostPetAds]);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await axiosInstance.post<ProfilePictureResponse>('/v1/users/profile-picture', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Create a temporary URL for immediate display
        const imageUrl = URL.createObjectURL(file);
        setAvatar(imageUrl);

        // Update user data in localStorage with new avatar
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
          const userData: UserData = JSON.parse(storedUserData);
          userData.avatar = response.data.data;
          localStorage.setItem('user', JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Error uploading profile picture:', error);
      }
    }
  };

  const userInfo: UserInfo = {
    name: userData ? `${userData.firstName} ${userData.lastName}` : ''
  };

  const handleLogout = (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleDarkMode = (): void => {
    setIsDarkMode(!isDarkMode);
    // In a real app, you would apply dark mode classes to the body or a container
  };

  // Filter ads based on selected filters
  const filteredAds = ads.filter(ad => {
    // Filter by category only
    if (adsFilter.category !== 'all' && ad.category !== adsFilter.category) {
      return false;
    }
    
    return true;
  });

  // Handle add pet form submission
  const handleAddPet = async (pet: Omit<Pet, 'id'>) => {
    if (!userData?.id) return;
    
    try {
      const petData = {
        ...pet,
        ownerId: userData.id,
      };
      
      const response = await axiosInstance.post<Pet>('/api/pets', petData);
      
      // Add the new pet to the current pets list
      setPets(prevPets => [...prevPets, {
        ...response.data,
        type: response.data.animalType || 'Diğer',
        imageUrl: response.data.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image'
      }]);
    } catch (error) {
      console.error('Error adding pet:', error);
      setError('Evcil hayvan eklenirken bir hata oluştu.');
    }
  };

  // Handle add adoption listing
  const handleAddAdoptionListing = async (adoptionData: Omit<Ad, 'id' | 'category' | 'status'>) => {
    if (!userData?.id) return;
    
    try {
      const listing = {
        ...adoptionData,
        user: {
          id: userData.id
        }
      };
      
      const response = await axiosInstance.post<Ad>('/api/v1/adoption/create', listing);
      
      // Add the new adoption listing to current listings
      setAdoptionAds(prevAds => [...prevAds, {
        ...response.data,
        status: 'active' as 'active',
        category: 'sahiplendirme' as 'sahiplendirme',
        imageUrl: response.data.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image'
      }]);

      // Upload photo if available
      if (adoptionData.imageUrl && adoptionData.imageUrl.startsWith('data:')) {
        // Convert base64 to file and upload
        await handleAdoptionPhotoUpload(response.data.id.toString(), adoptionData.imageUrl);
      }
    } catch (error) {
      console.error('Error adding adoption listing:', error);
      setError('Sahiplendirme ilanı eklenirken bir hata oluştu.');
    }
  };

  // Handle add lost pet listing
  const handleAddLostPetListing = async (lostPetData: Omit<Ad, 'id' | 'category'>) => {
    if (!userData?.id) return;
    
    try {
      const listing = {
        ...lostPetData,
        status: 'Kayıp' as 'Kayıp'
      };
      
      const response = await axiosInstance.post<Ad>(`/api/lostpets/${userData.id}`, listing);
      
      // Add the new lost pet listing to current listings
      setLostPetAds(prevAds => [...prevAds, {
        ...response.data,
        category: 'kayıp' as 'kayıp',
        status: 'Kayıp' as 'Kayıp',
        imageUrl: response.data.imageUrl || 'https://via.placeholder.com/500x300?text=No+Image'
      }]);

      // Upload photo if available
      if (lostPetData.imageUrl && lostPetData.imageUrl.startsWith('data:')) {
        // Convert base64 to file and upload
        await handleLostPetPhotoUpload(response.data.id.toString(), lostPetData.imageUrl);
      }
    } catch (error) {
      console.error('Error adding lost pet listing:', error);
      setError('Kayıp hayvan ilanı eklenirken bir hata oluştu.');
    }
  };

  // Handle pet photo upload
  const handlePetPhotoUpload = async (petId: string, base64Image: string) => {
    try {
      // Convert base64 to file
      const res = await fetch(base64Image);
      const blob = await res.blob();
      const file = new File([blob], 'pet-photo.jpg', { type: 'image/jpeg' });
      
      const formData = new FormData();
      formData.append('file', file);
      
      await axiosInstance.post(`/api/pets/${petId}/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the pet in the list with new photo URL
      setPets(prevPets => prevPets.map(pet => 
        pet.id.toString() === petId 
          ? { ...pet, imageUrl: URL.createObjectURL(file) } 
          : pet
      ));
    } catch (error) {
      console.error('Error uploading pet photo:', error);
    }
  };

  // Handle adoption photo upload
  const handleAdoptionPhotoUpload = async (adoptionId: string, base64Image: string) => {
    try {
      // Convert base64 to file
      const res = await fetch(base64Image);
      const blob = await res.blob();
      const file = new File([blob], 'adoption-photo.jpg', { type: 'image/jpeg' });
      
      const formData = new FormData();
      formData.append('file', file);
      
      await axiosInstance.post(`/api/v1/adoption/${adoptionId}/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the adoption listing in the list with new photo URL
      setAdoptionAds(prevAds => prevAds.map(ad => 
        ad.id.toString() === adoptionId 
          ? { ...ad, imageUrl: URL.createObjectURL(file) } 
          : ad
      ));
    } catch (error) {
      console.error('Error uploading adoption photo:', error);
    }
  };

  // Handle lost pet photo upload
  const handleLostPetPhotoUpload = async (lostPetId: string, base64Image: string) => {
    try {
      // Convert base64 to file
      const res = await fetch(base64Image);
      const blob = await res.blob();
      const file = new File([blob], 'lost-pet-photo.jpg', { type: 'image/jpeg' });
      
      const formData = new FormData();
      formData.append('file', file);
      
      await axiosInstance.post(`/api/lostpets/${lostPetId}/upload-photo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update the lost pet listing in the list with new photo URL
      setLostPetAds(prevAds => prevAds.map(ad => 
        ad.id.toString() === lostPetId 
          ? { ...ad, imageUrl: URL.createObjectURL(file) } 
          : ad
      ));
    } catch (error) {
      console.error('Error uploading lost pet photo:', error);
    }
  };

  // Handle update profile
  const handleUpdateProfile = async (profileData: Partial<UserData>) => {
    if (!userData?.id) return;
    
    try {
      const response = await axiosInstance.put(`/api/v1/users/${userData.id}/profile`, profileData);
      
      // Update user data in state and localStorage
      const updatedUserData = { ...userData, ...response.data };
      setUserData(updatedUserData);
      localStorage.setItem('user', JSON.stringify(updatedUserData));
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Profil güncellenirken bir hata oluştu.');
    }
  };

  // Handle update pet
  const handleUpdatePet = async (petId: string | number, petData: Partial<Pet>) => {
    try {
      const response = await axiosInstance.put<Pet>(`/api/pets/${petId}`, petData);
      
      // Update the pet in the list
      setPets(prevPets => prevPets.map(pet => 
        pet.id === petId 
          ? { 
              ...pet, 
              ...response.data,
              type: response.data.animalType || pet.type 
            } 
          : pet
      ));
    } catch (error) {
      console.error('Error updating pet:', error);
      setError('Evcil hayvan güncellenirken bir hata oluştu.');
    }
  };

  // Handle delete pet
  const handleDeletePet = async (petId: string | number) => {
    try {
      await axiosInstance.delete(`/api/pets/${petId}`);
      
      // Remove the pet from the list
      setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
    } catch (error) {
      console.error('Error deleting pet:', error);
      setError('Evcil hayvan silinirken bir hata oluştu.');
    }
  };

  // Handle update adoption listing
  const handleUpdateAdoptionListing = async (adoptionId: string | number, adoptionData: Partial<Ad>) => {
    try {
      const response = await axiosInstance.put<Ad>(`/api/v1/adoption/${adoptionId}`, adoptionData);
      
      // Update the adoption listing in the list
      setAdoptionAds(prevAds => prevAds.map(ad => 
        ad.id === adoptionId 
          ? { ...ad, ...response.data } 
          : ad
      ));
    } catch (error) {
      console.error('Error updating adoption listing:', error);
      setError('Sahiplendirme ilanı güncellenirken bir hata oluştu.');
    }
  };

  // Handle delete adoption listing
  const handleDeleteAdoptionListing = async (adoptionId: string | number) => {
    try {
      await axiosInstance.delete(`/api/v1/adoption/${adoptionId}`);
      
      // Remove the adoption listing from the list
      setAdoptionAds(prevAds => prevAds.filter(ad => ad.id !== adoptionId));
    } catch (error) {
      console.error('Error deleting adoption listing:', error);
      setError('Sahiplendirme ilanı silinirken bir hata oluştu.');
    }
  };

  // Handle update lost pet listing
  const handleUpdateLostPetListing = async (lostPetId: string | number, lostPetData: Partial<Ad>) => {
    try {
      const response = await axiosInstance.put<Ad>(`/api/lostpets/${lostPetId}`, lostPetData);
      
      // Update the lost pet listing in the list
      setLostPetAds(prevAds => prevAds.map(ad => 
        ad.id === lostPetId 
          ? { ...ad, ...response.data } 
          : ad
      ));
    } catch (error) {
      console.error('Error updating lost pet listing:', error);
      setError('Kayıp hayvan ilanı güncellenirken bir hata oluştu.');
    }
  };

  // Handle delete lost pet listing
  const handleDeleteLostPetListing = async (lostPetId: string | number) => {
    if (!userData?.id) return;
    
    try {
      await axiosInstance.delete(`/api/lostpets/${lostPetId}?userId=${userData.id}`);
      
      // Remove the lost pet listing from the list
      setLostPetAds(prevAds => prevAds.filter(ad => ad.id !== lostPetId));
    } catch (error) {
      console.error('Error deleting lost pet listing:', error);
      setError('Kayıp hayvan ilanı silinirken bir hata oluştu.');
    }
  };

  // Handle navigation to add pet page in health tracking module
  const navigateToAddPet = () => {
    navigate('/add-pet');
  };

  // Handle navigation to add adoption listing
  const navigateToAddAdoption = () => {
    navigate('/adoption/create');
  };

  // Handle navigation to add lost pet listing
  const navigateToAddLostPet = () => {
    navigate('/lost-pets/create');
  };

  // Generic function to add a new ad (will show options or go to a selection page)
  const navigateToAddAd = () => {
    navigate('/ad-selection');
  };

  return (
    <div className={`p-5 max-w-7xl mx-auto font-sans text-gray-700 bg-gray-50 ${isDarkMode ? 'bg-gray-800 text-gray-100' : ''}`}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
          <strong className="font-bold">Hata! </strong>
          <span className="block sm:inline">{error}</span>
          <span 
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
            onClick={() => setError(null)}
          >
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Kapat</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
            </svg>
          </span>
        </div>
      )}
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        {isLoading.user ? (
          <div className="p-6 flex justify-center items-center">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-3"></div>
              <p className="text-gray-500">Profil bilgileri yükleniyor...</p>
            </div>
          </div>
        ) : (
          <div className="p-6 flex items-start gap-6 relative">
            <div className="relative">
              <div className="w-30 h-30 rounded-full overflow-hidden relative border-3 border-purple-600 shadow-sm">
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  <div className="text-white text-2xl">
                    <FiEdit2 size={24} />
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-semibold text-gray-700 mb-2">{userInfo.name}</h1>
              <p className="text-base text-gray-500 mb-4 leading-relaxed">{userData?.bio}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><FiCalendar /> Üyelik: {userStats.membershipDate}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                <FiEdit2 /> Profil Düzenle
              </button>
              <button 
                className="flex items-center gap-2 py-2 px-4 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-400 hover:text-white transition-colors"
                onClick={handleLogout}
              >
                <FiLogOut /> Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl">
            <FaPaw />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-500 mb-1">Toplam İlan</h3>
            <span className="text-2xl font-semibold text-gray-700">{userStats.totalAds}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl">
            <FiHeart />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-500 mb-1">Aktif İlanlar</h3>
            <span className="text-2xl font-semibold text-gray-700">{userStats.activeAds}</span>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 flex items-center gap-4 shadow-sm hover:translate-y-[-2px] hover:shadow-md transition-all">
          <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-2xl">
            <FiEye />
          </div>
          <div className="flex-1">
            <h3 className="text-sm text-gray-500 mb-1">Görüntülenme</h3>
            <span className="text-2xl font-semibold text-gray-700">{userStats.views}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 relative mt-6">
        {/* Sidebar */}
        <div className="w-60 bg-white rounded-xl p-5 shadow-sm sticky top-5 h-fit flex flex-col self-start">
          <h3 className="text-base text-gray-700 mb-5 pb-2 border-b border-gray-200 relative">
            Menü
            <span className="absolute bottom-[-1px] left-0 w-10 h-[3px] bg-purple-600 rounded-sm"></span>
          </h3>
          <ul className="list-none p-0 m-0 mb-5">
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'pets' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('pets')}
            >
              <FaPaw /> Evcil Hayvanlarım
            </li>
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'ads' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('ads')}
            >
              <FiFileText /> İlanlarım
            </li>
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'messages' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('messages')}
            >
              <FiMessageCircle /> Mesajlarım
            </li>
            <li 
              className={`flex items-center gap-2 py-3 px-4 mb-2 rounded-lg cursor-pointer transition-all font-medium ${activeTab === 'notifications' ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'}`}
              onClick={() => setActiveTab('notifications')}
            >
              <FiBell /> Bildirimlerim
            </li>
          </ul>
          
          <div className="mt-auto pt-5 border-t border-gray-200">
            <button 
              className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
              onClick={navigateToAddAd}
            >
              <FiPlus /> Yeni İlan Ekle
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-xl p-6 shadow-sm min-h-[600px]">
          {activeTab === 'pets' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-gray-700 m-0">Evcil Hayvanlarım</h2>
                <button 
                  className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  onClick={navigateToAddPet}
                >
                  <FiPlus /> Yeni Evcil Hayvan Ekle
                </button>
              </div>
              
              {isLoading.pets ? (
                <div className="flex justify-center items-center py-12">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-3"></div>
                    <p className="text-gray-500">Evcil hayvanlar yükleniyor...</p>
                  </div>
                </div>
              ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {pets.map(pet => (
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm transition-all hover:translate-y-[-2px] hover:shadow-md border border-gray-200" key={pet.id}>
                    <div className="h-40 overflow-hidden">
                      <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg text-gray-700 m-0 mb-2">{pet.name}</h3>
                      <p className="text-sm text-gray-500 m-0 mb-1">{pet.type} • {pet.breed}</p>
                      <p className="text-sm text-gray-500 m-0">{pet.age} yaşında</p>
                    </div>
                    <div className="px-4 pb-4 flex justify-end">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 border-none cursor-pointer transition-all hover:bg-purple-500 hover:text-white">
                        <FiEdit2 />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div 
                  className="border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer bg-gray-50 min-h-[240px] rounded-xl hover:border-purple-600"
                  onClick={navigateToAddPet}
                >
                  <div className="flex flex-col items-center gap-3 text-gray-500">
                    <div>
                      <FiPlus size={32} />
                    </div>
                    <p>Yeni Evcil Hayvan Ekle</p>
                  </div>
                </div>
              </div>
              )}
            </div>
          )}

          {activeTab === 'ads' && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl text-gray-700 m-0">İlanlarım</h2>
                <button 
                  className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                  onClick={navigateToAddAd}
                >
                  <FiPlus size={18} /> Yeni İlan Ekle
                </button>
              </div>
              
              <div className="mb-6">
                <div className="mb-4">
                  <h4 className="text-sm text-gray-500 m-0 mb-2 font-medium">Kategori</h4>
                  <div className="flex gap-3 flex-wrap">
                    <button 
                      className={`py-2 px-4 rounded-full text-sm ${adsFilter.category === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'all' })}
                    >
                      Tüm Kategoriler
                    </button>
                    <button 
                      className={`py-2 px-4 rounded-full text-sm ${adsFilter.category === 'sahiplendirme' ? 'bg-purple-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'sahiplendirme' })}
                    >
                      Sahiplendirme
                    </button>
                    <button 
                      className={`py-2 px-4 rounded-full text-sm ${adsFilter.category === 'kayıp' ? 'bg-purple-600 text-white' : 'bg-gray-100 border border-gray-200 text-gray-600 hover:bg-gray-200'}`}
                      onClick={() => setAdsFilter({ ...adsFilter, category: 'kayıp' })}
                    >
                      Kayıp İlanları
                    </button>
                  </div>
                </div>
              </div>
              
              {(isLoading.adoptionAds || isLoading.lostPetAds) ? (
                <div className="flex justify-center items-center py-12">
                  <div className="flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-3"></div>
                    <p className="text-gray-500">İlanlar yükleniyor...</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredAds.length > 0 ? (
                    <>
                      {filteredAds.map(ad => (
                        <div key={ad.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                          <img src={ad.imageUrl} alt={ad.title} className="w-full h-40 object-cover" />
                          <div className="p-4">
                            <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${ad.category === 'sahiplendirme' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {ad.category === 'sahiplendirme' ? 'Sahiplendirme' : 'Kayıp İlanı'}
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">{ad.title}</h3>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                              <div className="flex items-center gap-1">
                                <FiMapPin size={16} />
                                {ad.location}
                              </div>
                              <div className="flex items-center gap-1">
                                <FiTag size={16} />
                                {ad.petType}
                              </div>
                              <div className="flex items-center gap-1">
                                <FiCalendar size={16} />
                                {ad.date}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ad.description}</p>
                            <div className="flex justify-end">
                              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-purple-500 hover:text-white transition-colors">
                                <FiEdit2 size={18} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <FiPlus size={24} />
                        </div>
                        <span className="text-gray-600 font-medium">Yeni İlan Ekle</span>
                        <div className="flex flex-col gap-2 w-full mt-2">
                          <button 
                            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                            onClick={navigateToAddAdoption}
                          >
                            <span>Sahiplendirme İlanı</span>
                          </button>
                          <button 
                            className="w-full py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                            onClick={navigateToAddLostPet}
                          >
                            <span>Kayıp İlanı</span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                        <FiFileText size={32} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Henüz İlanınız Bulunmuyor</h3>
                      <p className="text-gray-500 mb-4">İlk ilanınızı eklemek için "Yeni İlan Ekle" butonuna tıklayın.</p>
                      <button 
                        className="flex items-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                        onClick={navigateToAddAd}
                      >
                        <FiPlus size={18} /> Yeni İlan Ekle
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h2 className="text-xl text-gray-700 m-0 mb-6">Mesajlarım</h2>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <FiMessageCircle size={48} />
                </div>
                <p className="text-gray-500">Henüz mesajınız bulunmamaktadır.</p>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-xl text-gray-700 m-0 mb-6">Bildirimlerim</h2>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4">
                  <FiBell size={48} />
                </div>
                <p className="text-gray-500">Henüz bildiriminiz bulunmamaktadır.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center mb-3">
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Hakkımızda</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Gizlilik Politikası</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Kullanım Koşulları</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">Yardım</a>
          <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors">İletişim</a>
        </div>
        <div className="text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} SocialPet. Tüm hakları saklıdır.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
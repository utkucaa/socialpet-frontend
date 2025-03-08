import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  Users,
  Stethoscope,
  Brain,
  Store,
  Heart,
  Settings,
  LogOut,
  PawPrint,
  ChevronDown,
  Plus,
  List,
  FileEdit,
  Trash2,
  UserPlus,
  Ban,
  Bell,
  Syringe,
  Building,
  BadgeHelp
} from 'lucide-react';

const Sidebar = () => {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const menuItems = [
    {
      icon: <LayoutDashboard size={20} />,
      title: 'Dashboard',
      path: '/admin/',
    },
    {
      icon: <Newspaper size={20} />,
      title: 'İlan Yönetimi',
      path: '/admin/ads',
      subItems: [
        { icon: <Plus size={16} />, title: 'Yeni İlan', path: '/admin/ads/new' },
        { icon: <List size={16} />, title: 'İlan Listesi', path: '/admin/ads/list' },
        { icon: <FileEdit size={16} />, title: 'Onay Bekleyenler', path: '/admin/ads/pending' },
      ]
    },
    {
      icon: <MessageSquare size={20} />,
      title: 'Soru-Cevap',
      path: '/admin/qna',
      subItems: [
        { icon: <BadgeHelp size={16} />, title: 'Yeni Sorular', path: '/admin/qna/new' },
        { icon: <List size={16} />, title: 'Tüm Sorular', path: '/admin/qna/list' },
      ]
    },
    {
      icon: <Users size={20} />,
      title: 'Kullanıcı Yönetimi',
      path: '/admin/users',
      subItems: [
        { icon: <UserPlus size={16} />, title: 'Yeni Kullanıcı', path: '/admin/users/new' },
        { icon: <List size={16} />, title: 'Kullanıcı Listesi', path: '/admin/users/list' },
        { icon: <Ban size={16} />, title: 'Yasaklı Kullanıcılar', path: '/admin/users/banned' },
      ]
    },
    {
      icon: <Stethoscope size={20} />,
      title: 'Evcil Hayvan Sağlığı',
      path: '/admin/pet-health',
      subItems: [
        { icon: <Plus size={16} />, title: 'Yeni Kayıt', path: '/admin/pet-health/new' },
        { icon: <Syringe size={16} />, title: 'Aşı Takibi', path: '/admin/pet-health/vaccines' },
      ]
    },
    {
      icon: <Brain size={20} />,
      title: 'Yapay Zeka Logları',
      path: '/admin/ai-logs',
      subItems: [
        { icon: <List size={16} />, title: 'Tüm Loglar', path: '/admin/ai-logs/list' },
        { icon: <Bell size={16} />, title: 'Hata Bildirimleri', path: '/admin/ai-logs/errors' },
      ]
    },
    {
      icon: <Store size={20} />,
      title: 'Veteriner & Petshop',
      path: '/admin/businesses',
      subItems: [
        { icon: <Building size={16} />, title: 'İşletme Ekle', path: '/admin/businesses/new' },
        { icon: <List size={16} />, title: 'İşletme Listesi', path: '/admin/businesses/list' },
      ]
    },
    {
      icon: <Heart size={20} />,
      title: 'Bağış Kurumları',
      path: '/admin/donations',
      subItems: [
        { icon: <Plus size={16} />, title: 'Kurum Ekle', path: '/admin/donations/new' },
        { icon: <List size={16} />, title: 'Kurum Listesi', path: '/admin/donations/list' },
      ]
    },
    {
      icon: <Settings size={20} />,
      title: 'Sistem Ayarları',
      path: '/admin/settings',
    },
  ];

  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <PawPrint className="text-indigo-600" size={32} />
          <h1 className="text-xl font-bold text-gray-800">SocialPet</h1>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <div className="relative">
                <button
                  onClick={() => setExpandedItem(expandedItem === item.path ? null : item.path)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${location.pathname.startsWith(item.path)
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3 text-sm">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  {item.subItems && (
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        expandedItem === item.path ? 'transform rotate-180' : ''
                      }`}
                    />
                  )}
                </button>
                {item.subItems && expandedItem === item.path && (
                  <ul className="mt-1 ml-9 space-y-1">
                    {item.subItems.map((subItem) => (
                      <li key={subItem.path}>
                        <NavLink
                          to={subItem.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors ${
                              isActive
                                ? 'bg-indigo-50 text-indigo-600'
                                : 'text-gray-500 hover:bg-gray-50'
                            }`
                          }
                        >
                          {subItem.icon}
                          <span>{subItem.title}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button className="flex items-center gap-3 px-4 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg">
          <LogOut size={20} />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
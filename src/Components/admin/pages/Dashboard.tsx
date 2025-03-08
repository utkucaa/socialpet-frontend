import React from 'react';
import { 
  Users, 
  Newspaper, 
  MessageSquare, 
  PawPrint,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Toplam Kullanıcı', value: '12,345', icon: Users, change: '+12%', color: 'blue' },
    { title: 'Aktif İlanlar', value: '789', icon: Newspaper, change: '+5%', color: 'green' },
    { title: 'Yanıt Bekleyen Sorular', value: '56', icon: MessageSquare, change: '-8%', color: 'yellow' },
    { title: 'Kayıtlı Evcil Hayvanlar', value: '2,456', icon: PawPrint, change: '+15%', color: 'purple' },
  ];

  const recentActivities = [
    { id: 1, type: 'user', message: 'Yeni kullanıcı kaydı: Ahmet Yılmaz', time: '5 dakika önce' },
    { id: 2, type: 'ad', message: 'Yeni sahiplendirme ilanı eklendi', time: '15 dakika önce' },
    { id: 3, type: 'question', message: 'Veteriner önerisi hakkında yeni soru', time: '30 dakika önce' },
    { id: 4, type: 'pet', message: 'Yeni evcil hayvan kaydı: Luna (Kedi)', time: '1 saat önce' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <p className="text-2xl font-semibold mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-500`} />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-2">vs geçen ay</span>
            </div>
          </div>
        ))}
      </div>

      {/* Son Aktiviteler */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Son Aktiviteler</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4 p-3 hover:bg-gray-50 rounded-lg">
              <div className="p-2 rounded-lg bg-indigo-50">
                <PawPrint className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
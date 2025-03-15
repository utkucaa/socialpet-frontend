import React from 'react';
import { Tab } from '@headlessui/react';
import {
  Syringe,
  Stethoscope,
  Calendar,
  Pill,
  AlertTriangle,
  Scale,
} from 'lucide-react';

interface TabNavigationProps {
  children: React.ReactNode;
}

const tabs = [
  { name: 'Aşılar', icon: Syringe },
  { name: 'Tedaviler', icon: Stethoscope },
  { name: 'Randevular', icon: Calendar },
  { name: 'İlaçlar', icon: Pill },
  { name: 'Alerjiler', icon: AlertTriangle },
  { name: 'Kilo Kayıtları', icon: Scale },
];

export const TabNavigation: React.FC<TabNavigationProps> = ({ children }) => {
  return (
    <Tab.Group>
      <Tab.List className="flex space-x-1 rounded-xl bg-gray-200 p-1">
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            className={({ selected }) =>
              `w-full rounded-lg py-2.5 text-sm font-medium leading-5
              ${
                selected
                  ? 'bg-white text-purple-600 shadow'
                  : 'text-gray-600 hover:bg-white/[0.12] hover:text-purple-500'
              }
              flex items-center justify-center space-x-2`
            }
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.name}</span>
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels className="mt-4">{children}</Tab.Panels>
    </Tab.Group>
  );
};
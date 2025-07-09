'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Users, Settings, Shield, Activity, Menu } from 'lucide-react';
import {
  Newspaper,      
  BarChartBig,    
  Lightbulb,      
  CloudFog, 
  CloudLightning,      
  Trash2,         
  LogOut          
} from 'lucide-react';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
  { href: '/dashboard', icon: Newspaper, label: 'Newshub' },
  { href: '/dashboard/ESG Report', icon: BarChartBig, label: 'ESG Report' },
  { href: '/dashboard/Analysis', icon: Lightbulb, label: 'Analysis' },
  { href: '/dashboard/Carbon Footprint', icon: CloudFog, label: 'Carbon Footprint' },
  { href: '/dashboard/Climate Risks', icon: CloudLightning, label: 'Climate Risks' },
  { href: '/dashboard/Food Waste', icon: Trash2, label: 'Food Waste' },
];

  return (
    <div className="flex flex-col min-h-[calc(100dvh-68px)] max-w-7xl mx-auto w-full">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 p-4">
        <div className="flex items-center">
          <span className="font-medium">Settings</span>
        </div>
        <Button
          className="-mr-3"
          variant="ghost"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden h-full">
        {/* Sidebar */}
        <aside
          className={`w-64 bg-white lg:bg-gray-50 border-r border-gray-200 lg:block ${
            isSidebarOpen ? 'block' : 'hidden'
          } lg:relative absolute inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <nav className="h-full overflow-y-auto p-4">
            {navItems.map((item) => {
              const isActive =
                item.href === '/dashboard'
                  ? pathname === item.href
                  : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} passHref>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`shadow-none my-1 w-full justify-start ${
                      isActive
                        ? 'bg-accent-green text-white hover:bg-accent-green/90'
                        : ''
                    }`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-0 lg:p-4">{children}</main>
      </div>
    </div>
  );
}

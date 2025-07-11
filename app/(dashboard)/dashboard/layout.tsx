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
  { href: '/dashboard/esg-report', icon: BarChartBig, label: 'ESG Report' },
  { href: '/dashboard/analysis', icon: Lightbulb, label: 'Analysis' },
  { href: '/dashboard/carbon-footprint', icon: CloudFog, label: 'Carbon Footprint' },
  { href: '/dashboard/climate-risks', icon: CloudLightning, label: 'Climate Risks' },
  { href: '/dashboard/food-waste', icon: Trash2, label: 'Food Waste' },
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
            <h2 className="mb-4 px-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Modules
            </h2>
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
                    <item.icon className="mr-2 h-4 w-4" />
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

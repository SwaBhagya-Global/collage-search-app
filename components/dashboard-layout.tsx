'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  GraduationCap,
  LogOut,
  Users,
  Activity,
  FileText,
  Mail,
  ChevronRight,
  Menu,
  X,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<{ name?: string; email?: string; role?: string } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        setUserProfile(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/admin/login';
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard, description: 'Manage colleges & courses' },
    { name: 'Blog Manager', href: '/admin/blog-manager', icon: FileText, description: 'Articles & news posts' },
    { name: 'Contacts & Leads', href: '/admin/contact-manager', icon: Mail, description: 'Inquiries & applications' },
    { name: 'Users Manager', href: '/admin/users-managers', icon: Users, description: 'User accounts & roles' },
    { name: 'Tracking Manager', href: '/admin/tracking-manager', icon: Activity, description: 'Analytics & event tracking' },
  ];

  // Show loader on route change
  useEffect(() => {
    setLoading(true);
    setIsMobileMenuOpen(false);
    const timer = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(timer);
  }, [pathname]);

  const isNavActive = (href: string) => {
    if (pathname === href) return true;
    if (href === '/admin/users-managers' && pathname === '/admin/users-manager') return true;
    return false;
  };

  const getCurrentPageTitle = () => {
    const current = navigation.find((item) => isNavActive(item.href));
    return current ? current.name : 'Admin Panel';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      {/* Top Mobile Bar */}
      <header className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40 shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-base text-slate-900 tracking-tight block leading-tight">Campus Admin</span>
            <span className="text-[11px] text-blue-600 font-medium">{getCurrentPageTitle()}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile Backdrop */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-0 left-0 bottom-0 w-72 bg-white border-r border-slate-200/80 z-50 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 h-screen ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Brand Header */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg text-slate-900 tracking-tight leading-none">AdMBA Platform</span>
                  {/* <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 tracking-wider">
                    
                  </span> */}
                </div>
                <span className="text-xs text-slate-500 font-medium mt-0.5 block">Administration Portal</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Section */}
          <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            <div className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Management Modules
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const active = isNavActive(item.href);
                const IconComponent = item.icon;

                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      active
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-semibold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <IconComponent
                        className={`h-5 w-5 flex-shrink-0 transition-colors ${
                          active ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>

                    <ChevronRight
                      className={`h-4 w-4 transition-transform duration-200 ${
                        active ? 'text-blue-200 translate-x-0.5' : 'text-slate-300 group-hover:text-slate-500'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          {/* User Profile & Logout Bottom Card */}
          <div className="p-3 border-t border-slate-100 bg-slate-50/50">
            <div className="p-3 bg-white rounded-xl border border-slate-200/70 shadow-sm flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2.5 overflow-hidden">
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0 shadow-sm">
                  {userProfile?.name ? userProfile.name[0].toUpperCase() : 'A'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {userProfile?.name || 'Administrator'}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {userProfile?.email || 'admin@platform.com'}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                Online
              </span>
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200 text-xs font-semibold py-2 h-9 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Log Out</span>
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8 relative bg-slate-50/70">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-[1px] z-50 transition-opacity">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
                <span className="text-xs font-medium text-slate-500">Loading module...</span>
              </div>
            </div>
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Ticket, User } from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={24} /> },
    { name: 'Search', path: '/search', icon: <Search size={24} /> },
    { name: 'Tickets', path: '/tickets', icon: <Ticket size={24} /> },
    { name: 'Profile', path: '/profile', icon: <User size={24} /> },
  ];

  return (
    <div className="min-h-screen font-sans flex flex-col text-gray-800">
      
      {/* Header Desktop */}
      <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-[#0b3296] tracking-tight">
          <Ticket size={28} />
          <span>UniTick</span>
        </Link>
        <nav className="flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                currentPath === item.path ? 'text-[#0b3296]' : 'text-gray-500 hover:text-[#0b3296]'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      {/* Header Mobile */}
      <header className="md:hidden flex items-center justify-center p-4 bg-white border-b border-gray-100 sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-[#0b3296] tracking-tight">
          <Ticket size={24} />
          <span>UniTick</span>
        </Link>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
        {children}
      </main>

      {/* Navigation Mobile */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-100 flex justify-around items-center p-3 z-50 pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.02)]">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex flex-col items-center gap-1 p-2 transition-all ${
              currentPath === item.path 
                ? 'text-[#0b3296]' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {item.icon}
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
      
    </div>
  );
};
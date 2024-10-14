import React from 'react';
import { Bell, Search } from 'lucide-react'; 
import Image from 'next/image';


interface HeaderProps {
  pageName: string; 
}

const Header: React.FC<HeaderProps> = ({ pageName }) => {
  return (
    <header className="flex justify-between items-center bg-white p-4 py-6 shadow-md ml-52 "> 

      
      {/* Left side: Home | Page name */}
      <div className=" text-pinkCustom ml-9 font-semibold " style={{ fontFamily:'Argentum Sans', fontSize: '24px' }}>
        Home | {pageName}
      </div>
      
      {/* Right side: Search, Bell, and Profile */}
      <div className="flex items-center space-x-5 mr-10">
        {/* Search Icon */}
        <Search className="text-gray-500 cursor-pointer" />
        
        {/* Notification Bell with Badge */}
        <div className="relative">
          <Bell className="text-gray-500 cursor-pointer" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
            14
          </span>
        </div>
        
        {/* Profile Picture */}
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <Image
            src="/profile.png" 
            alt="Profile Picture"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

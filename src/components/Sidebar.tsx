'use client'; 

import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Settings, Users,  LucideLogOut, LogOut, DoorOpen, Bath, Book, CalendarCheckIcon, ListCheck, BookCheck } from 'lucide-react'; 
import Link from 'next/link';

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();   

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="fixed top-0 left-0 h-full w-48 bg-white flex flex-col items-center py-6 shadow-md">
      {/* Logo */}
      <div className="mb-6">
        <img src="/wishahLogo.png" alt="Logo" className="w-28 h-24" />
      </div>

      {/* Gray border line */}
      <hr className="border-gray-300 w-40  mt-2 mb-6 " />

      {/* Navigation Items */}
      <nav className="flex flex-col space-y-10 flex-grow w-full ml-14 ">
        {/* Dashboard */}
        <Link href="/dashboard" className="relative flex flex-col items-start w-full px-2">
          <div className="flex items-center space-x-2">
            <LayoutDashboard
              className={`w-6 h-6 text-green-500 ${isActive('/dashboard') ? 'text-green-500' : 'text-green-500'}`}
            />
            <span className={`text-lg font-bold ${isActive('/dashboard') ? 'text-pink-500' : 'text-black'}`}>
              Dashboard
            </span>
          </div>
          {isActive('/dashboard') && (
            <span className="absolute w-5 ml-8 h-0.5 bottom-0 bg-green-500 rounded-t-md mt-2"></span>
          )}
        </Link>

        {/* Services */}
        <Link href="/ourServices" className="relative flex flex-col items-start w-full px-2">
          <div className="flex items-center space-x-2">
            <Settings
              className={`w-6 h-6 'text-green-500 ${isActive('/ourServices') ? 'text-green-500' : 'text-green-500'}`}
            />
            <span className={`text-lg font-bold ${isActive('/ourServices') ? 'text-pink-500' : 'text-black'}`}>
              Services
            </span>
          </div>
          {isActive('/ourServices') && (
            <span className="absolute w-5 ml-8 h-0.5 bottom-0 bg-green-500 rounded-t-md mt-2"></span>
          )}
        </Link>

        {/* Staff */}
        <Link href="/staff" className="relative flex flex-col items-start w-full px-2">
          <div className="flex items-center space-x-2 ">
            <Users
              className={`w-6 h-6 ${isActive('/staff') ? 'text-green-500' : 'text-green-500'}`}
            />
            <span className={`text-lg font-bold ${isActive('/staff') ? 'text-pink-500' : 'text-black'}`}>
              Staff
            </span>
          </div>
          {isActive('/staff') && (
            <span className="absolute w-5 ml-8 h-0.5 bottom-0 bg-green-500 rounded-t-md mt-2"></span>
          )}
        </Link>

        <Link href="/rooms" className="relative flex flex-col items-start w-full px-2">
          <div className="flex items-center space-x-2 ">
            <DoorOpen
              className={`w-6 h-6 ${isActive('/rooms') ? 'text-green-500' : 'text-green-500'}`}
            />
            <span className={`text-lg font-bold ${isActive('/rooms') ? 'text-pink-500' : 'text-black'}`}>
            Rooms
            </span>
          </div>
          {isActive('/rooms') && (
            <span className="absolute w-5 ml-8 h-0.5 bottom-0 bg-green-500 rounded-t-md mt-2"></span>
          )}
        </Link>

        
        <Link href="/amenities" className="relative flex flex-col items-start w-full px-2">
          <div className="flex items-center space-x-2 ">
            <Bath
              className={`w-6 h-6 ${isActive('/amenities') ? 'text-green-500' : 'text-green-500'}`}
            />
            <span className={`text-lg font-bold ${isActive('/amenities') ? 'text-pink-500' : 'text-black'}`}>
            Amenities
            </span>
          </div>
          {isActive('/amenities') && (
            <span className="absolute w-5 ml-8 h-0.5 bottom-0 bg-green-500 rounded-t-md mt-2"></span>
          )}
        </Link>

        <Link href="/bookings" className="relative flex flex-col items-start w-full px-2">
          <div className="flex items-center space-x-2 ">
            <BookCheck
              className={`w-6 h-6 ${isActive('/bookings') ? 'text-green-500' : 'text-green-500'}`}
            />
            <span className={`text-lg font-bold ${isActive('/bookings') ? 'text-pink-500' : 'text-black'}`}>
            Bookings
            </span>
          </div>
          {isActive('/bookings') && (
            <span className="absolute w-5 ml-8 h-0.5 bottom-0 bg-green-500 rounded-t-md mt-2"></span>
          )}
        </Link>
      </nav>

      {/* Logout Button */}
      <Link href="/login" className="relative flex flex-col items-start w-full px-2 ml-14">
          <div className="flex items-center space-x-2">
            <LogOut
              className={`w-6 h-6 ${isActive('/login') ? 'text-green-500' : 'text-pink-500'}`}
            />
            <span className={`text-lg font-bold ${isActive('/login') ? 'text-pink-500' : 'text-black'}`}>
             Logout
            </span>
          </div>
        
        </Link>
    </aside>
  );
};

export default Sidebar;

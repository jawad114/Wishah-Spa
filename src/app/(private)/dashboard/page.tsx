'use client'
import Sidebar from '../../../components/Sidebar';
import Header from '../../../components/header';
import Card from '../../../components/card';
import Circle from '../../../components/circle';
import { useState } from 'react';


const Dashboard = () => {
  const [filter, setFilter] = useState('Active');

  // Dummy data
  const data = [
    { name: 'John Doe', service: 'Facial Treatment', timeSlot: '10:00 AM', status: 'Active' },
    { name: 'Jane Smith', service: 'Massage Therapy', timeSlot: '11:00 AM', status: 'Pending' },
    { name: 'Mike Johnson', service: 'Hair Cut', timeSlot: '12:00 PM', status: 'Canceled' },
    { name: 'John Doe', service: 'Facial Treatment', timeSlot: '10:00 AM', status: 'Active' },
    // Add more dummy data as needed
  ];
  const topServicesData = [
    { name: "Alice", service: "Hair Cut", count: 108 },
    { name: "Bob", service: "Nail Art", count: 200 },
    { name: "Charlie", service: "Massage", count: 50 },
    { name: "Charlie", service: "Massage", count: 50 },
 
  
    // Add more services as needed
  ];
  

  return (
    <div className="relative overflow-x-hidden   h-[1100px]" style={{ backgroundColor: '#EFF0F5' }}>
      <Header pageName="Dashboard" />
      <Sidebar />

      {/* Pink Div Container with Gradient for Opacity Effect */}
      <div
        className="absolute bg-gradient-to-b from-pink-500 to-pink-500/70 text-white flex justify-between items-center z-0 w-full"
        style={{
          height: '141px',
          top: '80px',
          left: '207px',
          gap: '0px',
        }}
      >
        <h1 className="ml-16 font-bold mb-6 text-4xl">Welcome To Wishah SPA</h1>
        
        {/* Button Container */}
        <div className="flex items-center space-x-4 mr-[270px] mb-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Add New Booking
          </button> 
        </div>
      </div>

      {/* Cards Overlaying the Pink Div */}
      <div className="flex justify-center gap-7 mt-[100px] z-10 absolute ml-60">
        <Card title="Total Services" price="90" lastMonth="Last Month" change="90" />
        <Card title="Total Services" price="30" lastMonth="Last Month" change="30" />
        <Card title="Total Services" price="-50" lastMonth="Last Month" change="-50" />
        <Card title="Total Services" price="50" lastMonth="Last Month" change="50" />
      </div>

      {/* New Card for Today’s Services Statistics */}
      <div
        className="absolute bg-white shadow-md w-1/2 h-60 top-[355px] ml-60 rounded-2xl mb-32 p-4"
        style={{
          opacity: 1,
          boxShadow: '3px 8px 8px rgba(0, 0, 0, 0.4)',
        }}
      >
        <h2 className="text-black text-xl font-bold mb-4">Today’s Services Statistics</h2>
        <p className="text-gray-500 mb-6">Show all services based on user branch permission.</p>

        <div className="flex justify-around items-center">
          {/* Circles with different colors */}
          <div className="flex flex-col items-center">
            <Circle value="-50" />
            <p className="text-sm mt-2">Total Services</p>
          </div>
          <div className="flex flex-col items-center">
            <Circle value="50" />
            <p className="text-sm mt-2">Inactive Services</p>
          </div>
          <div className="flex flex-col items-center">
            <Circle value="20" />
            <p className="text-sm mt-2">Pending Services</p>
          </div>
          <div className="flex flex-col items-center">
            <Circle value="50" />
            <p className="text-sm mt-2">Completed Services</p>
          </div>
          <div className="flex flex-col items-center">
            <Circle value="30" />
            <p className="text-sm mt-2">Completed Services</p>
          </div>
        </div>
      </div>

      {/* New Card for Total’s Income & Other Statistics in the same row */}
      <div
  className="absolute bg-white shadow-md p-4 w-1/3 rounded-2xl h-60 top-[355px] right-3 mr-8 "
  style={{
    boxShadow: '3px 8px 8px rgba(0, 0, 0, 0.4)',
  }}
>
  <h2 className="text-black text-xl font-bold mb-4 ml-6">Total’s Income & Other Statistics</h2>
  {/* Statistics Rows */}
  <div className="grid grid-cols-2 mt-8 gap-10">
    <div className="flex flex-col ml-7">
      <p className="text-green-500 font-bold">Total Income</p>
      <p className="text-black mr-4 ml-1  font-bold">$100,000</p>
    </div>
    <div className="flex flex-col  font-bold">
      <p className="text-green-500 mr-16">Total Cash Payment</p>
      <p className="text-black text-left ml-1 w-full">$70,000</p>
    </div>
    <div className="flex flex-col ml-7 font-bold">
      <p className="text-pink-500 mr-4 ">Total Due</p>
      <p className="text-black mr-4 ml-1">$20,000</p>
    </div>
    <div className="flex flex-col  font-bold">
      <p className="text-pink-500 mr-7">Total Payment</p>
      <p className="text-black text-left ml-1 w-full">$30,000</p>
    </div>
  </div>
</div>


      <div
    className="absolute bg-white shadow-md rounded-2xl w-1/2 h-[410px] mb-12 top-[630px] ml-60" 
    style={{
 
      boxShadow: '3px 8px 8px rgba(0, 0, 0, 0.4)',
    }}
  >
    {/* Card Header with border line */}
    <div className="flex justify-between items-center mb-4 mt-5 rounded-lg">
      <h2 className="text-black text-xl font-bold ml-5">Booking Info</h2>
      {/* Right Section for Filter Dropdown and Action Buttons */}
      <div className="flex items-center gap-3 mr-32">
        {/* Filter Dropdown */}
        <select 
          className="border border-gray-300 rounded px-2 py-2" 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Canceled">Canceled</option>
        </select>
        {/* Action Buttons */}
        <button className="bg-green-500 text-white px-4 py-2 rounded">Today</button>
        <button className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded">Month</button>
      </div>
    </div>

    {/* Border line below the header */}
    <div className="border-b border-gray-300 mb-4" />

    {/* Table Header */}
    <div className="grid grid-cols-4 font-bold text-gray-700 mb-2 gap-20">
      <span className="mr-4 ml-6">Name</span>
      <span className="mr-4 ml-3">Service</span>
      <span className="mr-10">Time Slot</span>
      <span>Status</span>
    </div>

    {/* Dynamic Data */}
    {data.map((item, index) => (
      <div key={index} className="grid grid-cols-4 items-center mb-2 border-b border-gray-300 pb-2 gap-16 ml-5 mr-5">
        <span className="mr-3">{item.name}</span>
        <span className="mr-3">{item.service}</span>
        <span className="mr-3">{item.timeSlot}</span>
        <button 
          className={`px-2 py-1 w-20 rounded ${
            item.status === 'Active' ? 'bg-white border border-green-500 text-green-500' :
            item.status === 'Pending' ? 'bg-white border border-orange-500 text-orange-500' :
            item.status === 'Canceled' ? 'bg-white border border-red-500 text-red-500' : ''
          }`}
        >
          {item.status}
        </button>
      </div>
    ))}
  </div>

  <div
    className="absolute bg-white shadow-md p-4 rounded-2xl mb-12 w-1/3 right-3 mr-8 h-[410px] top-[630px] "
    style={{
    
      boxShadow: '3px 8px 8px rgba(0, 0, 0, 0.4)',
      opacity: 1,
    }}
  >
    <h2 className="text-black text-xl font-bold mb-4 ml-5">Top Booking Services</h2>

    {/* Dynamic Data */}
    {topServicesData.map((item, index) => (
      <div key={index} className="flex items-center mb-2 border-b ml-6  border-gray-300 pb-2">
        {/* Profile Circle */}
        <div
          className="flex items-center justify-center bg-pink-400 rounded-full w-10 h-10 text-white font-bold"
          style={{ opacity: 0.8 }}
        >
          {item.service.charAt(0).toUpperCase()} {/* First capital letter */}
        </div>
        
        <div className="ml-4 flex flex-col">
          <span className="text-black">{item.service}</span> {/* Service Name */}
          <span className="text-gray-500 text-sm">Our Top Service</span>
        </div>

        <span className="ml-auto mr-4 text-black font-bold">{item.count}</span> {/* Count */}
      </div>
    ))}
  </div>



    </div>
  );
};

export default Dashboard;



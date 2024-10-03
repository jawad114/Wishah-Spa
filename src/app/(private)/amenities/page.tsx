'use client'

import Sidebar from './../../../components/Sidebar'
import Header from './../../../components/Header'
import React from 'react'

function Amenities() {
  return (
    <div>
      <Header pageName='Amenities' />
      <Sidebar />

      <div className="flex justify-between items-center p-4 ml-64">
        <h1 className="text-2xl font-bold ">Amenities Information</h1>
        <button className="flex items-center bg-green-500 text-white py-2 px-4 mr-20 mt-3  rounded">
          Amenity <span className="ml-2">🛠️</span> {/* Replace with your icon */}
        </button>
      </div>

      <div className="flex space-x-0 ml-72">
        <button className="bg-white border border-black hover:text-pink-600 text-sm py-1 px-2 rounded-l-sm">PDF</button>
        <button className="bg-white border border-black hover:text-pink-600 text-sm py-1 px-2 ">Print</button>
        <button className="bg-white border border-black hover:text-pink-600  text-sm py-1 px-2 rounded-r-md">Excel</button>
      </div>
    </div>
  )
}

export default Amenities;

import React, { useState } from 'react';

interface ServiceFormModalProps {
  onClose: () => void;
  onSave: (service: any) => void;
  
}

const ServiceFormModal: React.FC<ServiceFormModalProps> = ({ onClose, onSave }) => {
  const [name, setServiceName] = useState('');
  const [therapists, setTherapists] = useState('');
  const [amenity, setAmenities] = useState('');
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');
  const [warning, setWarning] = useState('');
  

  const handleSave = () => {
    if (!name || !therapists || !amenity || !duration || !price) {
      setWarning('All fields are required');
    } else {
      onSave({ name, therapists, amenity, duration, price });
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div
        style={{
          width: '730px',
          height: '455px',
          top: '50px',
          left: '128px',
          gap: '0px',
          borderRadius: '15px 15px 15px 15px',
          opacity: 1,
        }}
        className="bg-white p-6 rounded-lg shadow-lg relative"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-pink-600 text-lg font-bold">Add New Services</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">
            ✕
          </button>
        </div>

        <hr className="border-t-2 mb-4" />

        {/* Service Name and Required Therapists */}
        <div className="flex justify-between mb-4">
          <div className="w-1/2 mr-4">
            <label className="block font-bold mb-2">Service Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setServiceName(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2"
              placeholder="Enter service name"
            />
          </div>
          <div className="w-1/2">
            <label className="block font-bold mb-2">Required Therapists:</label>
            <input
              type="number"
              value={therapists}
              onChange={(e) => setTherapists(e.target.value)}
              className="w-full border border-gray-400 rounded px-3 py-2"
              placeholder="Enter number of therapists"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="flex mb-4">
          <div className="w-full">
            <label className="block font-bold mb-2">Amenities:</label>
            <select
              value={amenity}
              onChange={(e) => setAmenities(e.target.value)}
              className="w-1/2 border border-gray-400 rounded px-3 py-2"
            >
              <option value="">Select Amenities</option>
              <option value="Amenity1">Amenity 1</option>
              <option value="Amenity2">Amenity 2</option>
            </select>
          </div>
        </div>

        {/* Service Duration and Price */}
        <div className="flex flex-col mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Service Duration(s):</h3>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              + Add Service Duration
            </button>
          </div>
          <div className="flex justify-between">
            <div className="w-1/2 mr-4">
              <label className="block font-bold mb-2">Duration (in minutes)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2"
                placeholder="Enter duration"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-bold mb-2">Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border border-gray-400 rounded px-3 py-2"
                placeholder="Enter price"
              />
            </div>
          </div>
        </div>

        {/* Warning */}
        {warning && <p className="text-red-600 mb-4">{warning}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white py-2 px-4 mr-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Save Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceFormModal;

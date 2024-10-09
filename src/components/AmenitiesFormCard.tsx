import React, { useState } from 'react';

type AmenitiesFormCardProps = {
    onClose: () => void;
    onSave: (amenityName: string) => void;
}
const AmenitiesFormCard = ({ onClose, onSave } : AmenitiesFormCardProps) => {
  const [amenityName, setAmenityName] = useState('');
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!amenityName) {
      setError('Required Amenity name.');
    } else {
      onSave(amenityName);
    }
  };

  return (
    <div
      style={{
        width: '730px',
        height: '220px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px 15px 15px 15px',
        border: '1px solid gray',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '20px',
        opacity: 1,
      }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-pink-500 font-bold">Amenity Form</h2>
        <button className="text-black" onClick={onClose}>✖️</button>
      </div>

      <hr className="border-gray-300 mb-4" />

      <label className="block mb-2 text-gray-700">Amenity</label>
      <input
        className="w-full border border-gray-300 p-2 rounded mb-2"
        value={amenityName}
        onChange={(e) => {
          setAmenityName(e.target.value);
          setError(''); // Clear error when typing
        }}
      />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end gap-4 mt-4">
        <button className="bg-gray-400 text-white py-1 px-4 rounded" onClick={onClose}>
          Close
        </button>
        <button className="bg-green-500 text-white py-1 px-4 rounded" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default AmenitiesFormCard;

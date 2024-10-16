import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Amenity {
  id: number;
  name: string;
}

interface Room {
  _id: string; // Include _id for MongoDB documents
  id: string;
  name: string;
  isThirdParty: number; // Change type to match the Rooms component
  amenities: { name: string }[]; // Include amenities array
}

type AddRoomModalProps = {
  onClose: () => void;
  onSave: (room: Room) => Promise<void>; // Update to use the unified Room type
  currentRoom: Room | null; // Use the same Room type
};

const AddRoomModal: React.FC<AddRoomModalProps> = ({ onClose, onSave, currentRoom }) => {
  const [name, setRoomName] = useState<string>('');
  const [amenities, setAmenities] = useState<Amenity[]>([]); // Type amenities as Amenity[]
  const [selectedAmenity, setSelectedAmenity] = useState<number | null>(null);
  const [thirdPartyRoom, setThirdPartyRoom] = useState<boolean>(false); // Explicitly typing as boolean
  const [warning, setWarning] = useState<string>('');

  // Fetch amenities from the API
  useEffect(() => {
  const fetchAmenities = async () => {
  try {
    const response = await fetch('https://wishah-spa-server.onrender.com/amenities/');
    const data = await response.json();
    console.log(data); // Log the data to check its structure
    setAmenities(data);
  } catch (error) {
    console.error('Error fetching amenities:', error);
  }
};


    fetchAmenities();
  }, []);

  // Populate form if current amenity is provided
  useEffect(() => {
    if (currentRoom) {
      setRoomName(currentRoom.name);
      // setSelectedAmenity(currentRoom.id);
      // setThirdPartyRoom(currentAmenity.thirdPartyRoom === 'Yes');
    } else {
      setRoomName('');
      setSelectedAmenity(null);
      setThirdPartyRoom(false);
    }
  }, [currentRoom]);

  const handleSave = async () => { // Make this function async
    if (!name || selectedAmenity === null) {
      setWarning('All fields are required');
      return;
    }

    // const newRoom: Room = { // Explicitly type newRoom
    //   _id: '', // Include _id for MongoDB documents
    //   id: '',
    //   name,
    //   amenityId: selectedAmenity,
    //   thirdPartyRoom: thirdPartyRoom ? 'Yes' : 'No',
    // };

    // await onSave(newRoom); // Await the onSave function
    // onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative" style={{ width: '730px', height: '255px' }}>
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Room</h2>
          <X className="cursor-pointer text-gray-600 hover:text-gray-800" onClick={onClose} />
        </div>

        <hr className="mb-4" />

        {/* Room and Amenity Inputs */}
        <div className="flex gap-4 mb-4">
          {/* Room Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Room:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
              placeholder="Enter room name"
            />
          </div>

          {/* Amenity Input */}
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">Amenity:</label>
            <select
              value={selectedAmenity || ''}
              onChange={(e) => setSelectedAmenity(Number(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none"
            >
              <option value="" disabled>Select an amenity</option>
              {amenities.map((amenity) => (
                <option key={amenity.id} value={amenity.id}>
                  {amenity.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3rd Party Room Checkbox */}
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={thirdPartyRoom}
            onChange={() => setThirdPartyRoom((prev) => !prev)}
            className="mr-2"
          />
          <label className="text-sm font-medium">Third Party Room</label>
        </div>

        {/* Warning */}
        {warning && <p className="text-red-600 mb-4">{warning}</p>}

        {/* Action Buttons */}
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="bg-gray-400 text-white py-2 px-4 mr-2 rounded">Cancel</button>
          <button onClick={handleSave} className="bg-green-500 text-white py-2 px-4 rounded">Save Room</button>
        </div>
      </div>
    </div>
  );
};

export default AddRoomModal;

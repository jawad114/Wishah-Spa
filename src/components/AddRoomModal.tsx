import { useState } from 'react';
import { X } from 'lucide-react';
type AddRoomModalProps = {
    onClose: () => void;
    onSave: (room: any) => void;
}
const AddRoomModal = ({ onClose, onSave }: AddRoomModalProps) => {
  const [name, setRoomName] = useState('');
  const [amenity, setAmenity] = useState('');
  const [thirdPartyRoom, setThirdPartyRoom] = useState(false);

  const handleSave = () => {
    // Send the data back to the parent component
    const newRoom = {
        name,
      amenity,
      thirdPartyRoom,
    };
    onSave(newRoom);
    onClose(); // Close the modal after saving
  };

  return (
    <div
      style={{
        width: '730px',
        height: '255px',
        top: '425px',
        left: '620px',
        gap: '0px',
        borderRadius: '15px 15px 15px 15px',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        position: 'absolute',
        backgroundColor: '#fff',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      className="modal-container"
    >
      {/* Modal Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Room</h2>
        <X
          className="cursor-pointer text-gray-600 hover:text-gray-800"
          onClick={onClose}
        />
      </div>

      <hr className="mb-4" />

      {/* Room and Amenity Inputs in a row */}
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
          <div className="relative">
            <select
              value={amenity}
              onChange={(e) => setAmenity(e.target.value)}
              className="w-full p-2 border py-[10px] border-gray-300 rounded focus:outline-none"
            >
              <option value="" disabled>
                Select an amenity
              </option>
              <option value="amenity1">Amenity 1</option>
              <option value="amenity2">Amenity 2</option>
            </select>
        
          </div>
        </div>
      </div>

      {/* 3rd Party Room Checkbox */}
      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={thirdPartyRoom}
            onChange={() => setThirdPartyRoom(!thirdPartyRoom)}
            className="form-checkbox"
          />
          <span className="ml-2">3rd Party Room</span>
        </label>
      </div>

      {/* Footer with buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
        >
          Close
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-pink-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AddRoomModal;

'use client';
import { useState } from 'react';
import { ClipboardPenLine, DoorOpen, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import ServiceFormModal from './../../../components/AddRoomModal';
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Rooms() {
  const [amenities, setAmenities] = useState([
    { name: 'Thai Massage', amenity: 'amenity1', thirdPartyRoom: 'Yes' },
    { name: 'Four Hand Massage', amenity: 'amenity2', },
    { name: 'Body Massage', amenity: 'amenity3', thirdPartyRoom: 'Yes'},
    { name: 'Hot Oil Massage', amenity: 'amenity4', },
    { name: 'Hot Stone Massage', amenity: 'amenity5', thirdPartyRoom: 'Yes' },
    { name: 'Relaxation Massage', amenity: 'amenity6', },
    { name: 'Russian Massage', amenity: 'amenity7', thirdPartyRoom: 'Yes' },
    { name: 'Arabic Massage', amenity: 'amenity8', },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [amenityToDelete, setAmenityToDelete] = useState(null);

  // Handlers
  const handleEdit = (index: number) => {
    setCurrentAmenity(amenities[index]);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setShowForm(true); // Show modal when creating a new room
  };

  const handleSave = (newRoom: any) => {
    setIsSaving(true); // Show the saving card
    
    setTimeout(() => {
      setAmenities([...amenities, newRoom]); // Add new room to the list
      setIsSaving(false); // Hide the saving card
      toast.success('Room created successfully!'); // Show success message
    }, 1500); // Simulate a 1.5-second delay (can be replaced with actual API call)
  };
  

  const handleDelete = (index: any) => {
    setAmenityToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (amenityToDelete !== null) {
      const updatedAmenities = amenities.filter((_, i) => i !== amenityToDelete);
      setAmenities(updatedAmenities);
      toast.success('Room deleted successfully!');
    }
    setShowDeleteConfirm(false);
    setAmenityToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setAmenityToDelete(null);
  };

  return (
    <div>
      <Header pageName='Rooms' />
      <Sidebar />

      <div className="flex justify-between items-center p-4 ml-64">
        <h1 className="text-2xl font-bold ml-8">Rooms Information</h1>
        <button
          onClick={handleCreate}
          className="flex items-center bg-green-500 text-white py-2 px-4 mr-16 mt-3 rounded"
        >
          <span className="mr-2"><DoorOpen /> </span>Rooms
        </button>
      </div>

      <div className="flex space-x-0 ml-[304px]">
        <button className="bg-white border border-black hover:text-pink-600 text-sm py-1 px-2 rounded-l-sm">PDF</button>
        <button className="bg-white border border-black hover:text-pink-600 text-sm py-1 px-2">Print</button>
        <button className="bg-white border border-black hover:text-pink-600 text-sm py-1 px-2 rounded-r-md">Excel</button>
      </div>

      <SearchComponent />

      <div
        style={{
          width: '1527px',
          height: '550px',
          top: '50px',
          left: '305px',
          boxShadow: '1px 1px 7px rgba(0, 0, 0, 0.6)',
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}
        className="relative flex flex-col justify-start mb-40 rounded-lg"
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center py-2 border-b mb-2 ml-20">
            <span className="text-lg font-bold text-black w-1/4">Room Name</span>
            <span className="text-lg font-bold text-black w-1/4 ml-20">Amenities</span>
            <span className="text-lg font-bold text-black w-1/5 ml-8">3rd Party Room</span>
            <span className="text-lg font-bold text-black ml-96 w-1/5">Options</span>
          </div>

          {/* Amenities Rows */}
          {amenities.map((amenity, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b mb-4">
              <span className="ml-20 text-sm text-black w-1/4">{amenity.name}</span>
              <span className="text-sm text-black w-1/4">{amenity.amenity}</span>
              <span className="text-sm text-black w-1/4">{amenity.thirdPartyRoom ? 'Yes' : 'No'}</span>
              <div className="flex gap-3 w-1/5 justify-end mr-28">
                <FilePenLine
                  onClick={() => handleEdit(index)}
                  className="cursor-pointer text-green-500 hover:text-pink-400"
                />
                <Trash2
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <ServiceFormModal
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}

      {isSaving && <SavingCard />}

      {showDeleteConfirm && (
        <DeleteConfirmationCard
          onDelete={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default Rooms;

'use client';
import { useState } from 'react';
import { ArrowsUpFromLine, Edit2, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import AmenitiesFormCard from './../../../components/AmenitiesFormCard';
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Amenities() {
  const [amenities, setAmenities] = useState(['Amenity 1', 'Amenity 2', 'Amenity 3']);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [amenityToDelete, setAmenityToDelete] = useState<number | null>(null);

  // Handlers
  const handleEdit = (index: number) => {
    setCurrentAmenity(amenities[index]);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setIsEditing(false);
    setCurrentAmenity(null);
    setShowForm(true);
  };

  const handleSave = (newAmenity: string) => {
    setIsSaving(true);
    setShowForm(false);
    setTimeout(() => {
      if (isEditing && currentAmenity !== null) {
        
        const updatedAmenities = amenities.map((amenity) =>
          amenity === currentAmenity ? newAmenity : amenity
        );
        setAmenities(updatedAmenities);
        toast.success('Amenity updated successfully!'); 
      } else {
        setAmenities([...amenities, newAmenity]);
        toast.success('Amenity created successfully!'); // Toast for creation
      }
      setIsSaving(false);
      setShowForm(false);
    }, 1500);
  };
  const handleDelete = (index: number) => {
    setAmenityToDelete(index);
    setShowDeleteConfirm(true);
    
  };

  const confirmDelete = () => {
    if (amenityToDelete !== null) {
      const updatedAmenities = amenities.filter((_, i) => i !== amenityToDelete);
      setAmenities(updatedAmenities);
      toast.success('Amenity deleted successfully!'); 
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
      <Header pageName='Amenities' />
      <Sidebar />

      <div className="flex justify-between items-center p-4 ml-64">
        <h1 className="text-2xl font-bold ml-8">Amenities Information</h1>
        <button
          onClick={handleCreate}
          className="flex items-center bg-green-500 text-white py-2 px-4 mr-16 mt-3 rounded"
        >
          Amenity <span className="ml-2">🛠️</span>
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold ml-20 text-black">Amenities </h2>
          <span className="text-lg font-bold text-black mr-20">Options</span>
        </div>

        <div className="flex flex-col">
          {amenities.map((amenity, index) => (
            <div key={index} className="relative flex justify-between items-center py-2">
              <span className="ml-20 text-sm font-bold text-black">{amenity}</span>
              <div className="flex gap-3 mr-20">
                <FilePenLine
                  onClick={() => handleEdit(index)}
                  className="cursor-pointer text-green-500 hover:text-pink-400"
                />
                <Trash2
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer text-red-500 hover:text-red-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <AmenitiesFormCard
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

export default Amenities;

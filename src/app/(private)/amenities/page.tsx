'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import AmenitiesFormCard from './../../../components/AmenitiesFormCard';
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import privateRoute from '../../../components/PrivateRoute';

type Amenity = {
  id: number; // Use the correct type based on your API response
  name: string;
};

function Amenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAmenity, setCurrentAmenity] = useState<Amenity | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [amenityToDelete, setAmenityToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/amenities');
        setAmenities(response.data);
      } catch (error) {
        toast.error('Error fetching amenities');
        console.log(error);
      }
    };
    fetchAmenities();
  }, []);

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

  const handleSave = async (newAmenity: string) => {
    setIsSaving(true);
    setShowForm(false);
    try {
      if (isEditing && currentAmenity) {
        // Update existing amenity
        await axios.put(`http://localhost:4000/amenities/${currentAmenity.id}`, { name: newAmenity });
        const updatedAmenities = amenities.map((amenity) =>
          amenity && amenity.id === currentAmenity.id ? { ...amenity, name: newAmenity } : amenity
        );
        setAmenities(updatedAmenities);
        toast.success('Amenity updated successfully!');
      } else {
        // Create new amenity
        const response = await axios.post('http://localhost:4000/amenities/create', { name: newAmenity });
        setAmenities([...amenities, response.data]);
        toast.success('Amenity created successfully!');
      }
    } catch (error) {
      toast.error('Error saving amenity');
      console.log(error);
    } finally {
      setIsSaving(false);
      setShowForm(false);
    }
  };

  const handleDelete = (index: number) => {
    setAmenityToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (amenityToDelete !== null) {
      const amenityToRemove = amenities[amenityToDelete];
      try {
        await axios.delete(`http://localhost:4000/amenities/${amenityToRemove.id}`);
        const updatedAmenities = amenities.filter((_, i) => i !== amenityToDelete);
        setAmenities(updatedAmenities);
        toast.success('Amenity deleted successfully!');
      } catch (error) {
        console.log(error);
        toast.error('Error deleting amenity');
      }
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
          <h2 className="text-xl font-bold ml-20 text-black">Amenities</h2>
          <span className="mr-20 text-black font-bold">Options</span>
        </div>
        <div className="relative flex flex-col">
          {amenities.map((amenity: Amenity, index: number) => (
            <div key={index} className="relative flex justify-between items-center py-2">
              <span className="ml-20 text-sm font-bold text-black">{amenity.name}</span>
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

        {showForm && (
          <AmenitiesFormCard
            onClose={() => setShowForm(false)}
            onSave={handleSave}
            currentAmenity={currentAmenity}
          />
        )}

        {isSaving && <SavingCard />}

        {showDeleteConfirm && (
          <DeleteConfirmationCard
            onDelete={confirmDelete}
            onCancel={cancelDelete}
          />
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default privateRoute(Amenities);

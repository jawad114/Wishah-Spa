'use client';
import { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { ClipboardPenLine, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import ServiceFormModal from './../../../components/ServiceFormModal';
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import privateRoute from '../../../components/PrivateRoute';

// Define the structure for an amenity/service
interface Amenity {
  _id: string;
  serviceName: string;
  servicePrice: number; // Adjust type if service price can be a string
  requiredTherapist: number; // Adjust type if needed
  amenities: Array<{ name: string }>;
  duration?: string; // Optional property
}

function OurServices() {
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentAmenity, setCurrentAmenity] = useState<Amenity | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [amenityToDelete, setAmenityToDelete] = useState<number | null>(null);

  // Fetch amenities on component mount
  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await axios.get<Amenity[]>('http://localhost:4000/services/');
        console.log(response.data);
        setAmenities(response.data);
      } catch (error) {
        console.error('Error fetching amenities:', error);
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
    setCurrentAmenity(null); // Reset current amenity for creating a new service
    setIsEditing(false); // Not editing, so set this to false
    setShowForm(true); // Show modal when creating a new service
  };

  const handleSave = async (newService: Omit<Amenity, '_id'>) => {
    setIsSaving(true); // Show the saving card
    try {
      const serviceData: Omit<Amenity, '_id'> = {
        serviceName: newService.serviceName,
        servicePrice: newService.servicePrice,
        requiredTherapist: newService.requiredTherapist,
        amenities: newService.amenities,
        duration: newService.duration,
      };

      if (isEditing && currentAmenity) {
        // Update existing service
        const response = await axios.put<Amenity>(`http://localhost:4000/services/${currentAmenity._id}`, serviceData);
        const updatedAmenities = amenities.map((amenity) =>
          amenity._id === currentAmenity._id ? response.data : amenity
        );
        setAmenities(updatedAmenities);
        toast.success('Service updated successfully!');
      } else {
        // Create new service
        const response = await axios.post<Amenity>('http://localhost:4000/services/create', serviceData);
        setAmenities([...amenities, response.data]); // Add new service to the list
        toast.success('Service saved successfully!');
      }
    } catch (error) {
      toast.error('Error saving service!');
      console.error('Error saving service:', error);
    } finally {
      setIsSaving(false); // Hide the saving card after saving is done
      setShowForm(false); // Close the form modal after saving
    }
  };

  const handleDelete = (index: number) => {
    setAmenityToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (amenityToDelete !== null) {
      try {
        const response = await axios.delete(`http://localhost:4000/services/${amenities[amenityToDelete]._id}`);
        if (response.status === 200) {
          const updatedAmenities = amenities.filter((_, i) => i !== amenityToDelete);
          setAmenities(updatedAmenities);
          toast.success('Service deleted successfully!');
        } else {
          toast.error('Failed to delete the service. Please try again.');
        }
      } catch (error: any) {
        // Improved error handling
        const errorMessage = error.response?.data?.message || 'Error deleting service!'; // Adjust based on your API's response
        toast.error(errorMessage);
        console.error('Error deleting service:', error);
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
      <Header pageName='Services' />
      <Sidebar />

      <div className="flex justify-between items-center p-4 ml-64">
        <h1 className="text-2xl font-bold ml-8">Services Information</h1>
        <button
          onClick={handleCreate}
          className="flex items-center bg-green-500 text-white py-2 px-4 mr-16 mt-3 rounded"
        >
          <span className="mr-2"><ClipboardPenLine /> </span>Services
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
            <span className="text-lg font-bold text-black w-1/4">Service Name</span>
            <span className="text-lg font-bold text-black w-1/4 ml-16">Amenities</span>
            <span className="text-lg font-bold text-black w-1/4 ml-28">Service Price</span>
            <span className="text-lg font-bold text-black w-1/4">Required Therapists</span>
            <span className="text-lg font-bold text-black ml-80 w-1/7 mr-24">Options</span>
          </div>

          {/* Amenities Rows */}
          {amenities.map((amenity, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b mb-4">
              <span className="ml-20 text-sm text-black w-1/4">{amenity.serviceName}</span>
              <span className="text-sm text-black w-1/4 mr-20">
                {amenity.amenities.map((item) => item.name).join(', ')}
              </span>
              <span className="text-sm text-black w-1/4">{amenity.servicePrice}</span>
              <span className="text-sm text-black w-1/4">{amenity.requiredTherapist}</span>
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
          // currentAmenity={currentAmenity} 
        />
      )}

      {isSaving && <SavingCard />}

      {showDeleteConfirm && (
        <DeleteConfirmationCard
          onDelete={confirmDelete}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}

export default privateRoute(OurServices);

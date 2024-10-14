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
        const response = await axios.get<Amenity[]>('https://wishah-spa-server.onrender.com/services/');
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
        const response = await axios.put<Amenity>(`https://wishah-spa-server.onrender.com/services/${currentAmenity._id}`, serviceData);
        const updatedAmenities = amenities.map((amenity) =>
          amenity._id === currentAmenity._id ? response.data : amenity
        );
        setAmenities(updatedAmenities);
        toast.success('Service updated successfully!');
      } else {
        // Create new service
        const response = await axios.post<Amenity>('https://wishah-spa-server.onrender.com/services/create', serviceData);
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
        const response = await axios.delete(`https://wishah-spa-server.onrender.com/services/${amenities[amenityToDelete]._id}`);
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
    <div className="min-h-screen bg-[#EFF0F5] flex flex-col">
    <div>
      <Header pageName='Services' />
      <Sidebar />

      <div className="flex justify-between items-center p-4 ml-52">
  <h1 className="text-2xl font-bold ml-8">Services Information</h1>
  <button
    onClick={handleCreate}
    className="flex items-center bg-green-500 text-white py-2 px-4 mr-7 mt-3 rounded"
  >
    <span className="mr-2"><ClipboardPenLine /> </span>Services
  </button>
</div>

<SearchComponent />



      <div
  style={{
    boxShadow: '1px 1px 7px rgba(0, 0, 0, 0.6)',
    padding: '20px',
    backgroundColor: '#f9f9f9',
  }}
  className="relative flex flex-col justify-start mb-40 rounded-lg ml-[250px] mr-11 w-auto max-w-full h-[560px] top-14"
>
  <div className="flex flex-col">
    {/* Header */}
    <div className="flex justify-between items-center py-2 border-b mb-2 px-10">
      <span className="text-2xl  font-bold text-black w-[15%]">Service Name</span>
      <span className="text-2xl font-bold text-black w-[15%]">Amenities</span>
      <span className="text-2xl font-bold text-black w-[15%]">Service Price</span>
      <span className="text-2xl font-bold text-black w-[20%]">Required Therapists</span>
      <span className="text-2xl font-bold text-black w-[10%] text-right">Options</span>
    </div>

    {/* Amenities Rows */}
    {amenities.map((amenity, index) => (
      <div key={index} className="flex justify-between items-center py-2 border-b mb-4 px-10">
        <span className="text-xl text-black w-[15%]">{amenity.serviceName}</span>
        <span className="text-xl text-black w-[15%]">
          {amenity.amenities.map((item) => item.name).join(', ')}
        </span>
        <span className="text-xl text-black w-[15%] ml-1">{amenity.servicePrice}</span>
        <span className="text-xl text-black ml-1 w-[20%]">{amenity.requiredTherapist}</span>
        <div className="flex gap-3 w-[10%] justify-end">
          <FilePenLine
            onClick={() => handleEdit(index)}
            className="cursor-pointer text-green-500 mr- hover:text-pink-400"
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
    </div>
  );
}

export default OurServices;

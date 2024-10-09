'use client';
import { useState } from 'react';
import { ClipboardPenLine, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import ServiceFormModal from './../../../components/ServiceFormModal';
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OurServices() {
  const [amenities, setAmenities] = useState([
    { name: 'Thai Massage', amenity: 'amenity1', price: 300.00, therapists: 1 },
    { name: 'Four Hand Massage', amenity: 'amenity2', price: 200.00, therapists: 2 },
    { name: 'Body Massage', amenity: 'amenity3', price: 800.00, therapists: 1 },
    { name: 'Hot Oil Massage', amenity: 'amenity4', price: 300.00, therapists: 3 },
    { name: 'Hot Stone Massage', amenity: 'amenity5', price: 200.00, therapists: 2 },
    { name: 'Relaxation Massage', amenity: 'amenity6', price: 800.00, therapists: 1 },
    { name: 'Russian Massage', amenity: 'amenity7', price: 300.00, therapists: 2 },
    { name: 'Arabic Massage', amenity: 'amenity8', price: 200.00, therapists: 2 },
    // { name: 'Moroccan Bath', amenity: 'amenity', price: 800.00, therapists: 1 },
    // { name: 'Body Lotion Massage', amenity: 'amenity', price: 300.00, therapists: 1 },
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
    setShowForm(true); // Show modal when creating a new service
  };

  const handleSave = (newService: any) => {
    setIsSaving(true); // Show the saving card
    setTimeout(() => {
      setAmenities([...amenities, newService]); // Add new service to the list
      setIsSaving(false); // Hide the saving card after saving is done
      toast.success('Service saved successfully!');
    }, 2000); // Simulating a delay for the saving process (you can remove this in a real application)
  };
  

  const handleDelete = (index: any) => {
    setAmenityToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (amenityToDelete !== null) {
      const updatedAmenities = amenities.filter((_, i) => i !== amenityToDelete);
      setAmenities(updatedAmenities);
      toast.success('Service deleted successfully!');
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
           <span className="mr-2"><ClipboardPenLine/> </span>Services
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
    <span className=" text-lg font-bold text-black w-1/4 ">Service Name</span>
    <span className="text-lg font-bold text-black w-1/4 ml-10">Amenities</span>
    <span className="text-lg font-bold text-black w-1/4 ml-8">Service Price</span>
    <span className="text-lg font-bold text-black w-1/4 ">Required Therapists</span>
    <span className="text-lg font-bold text-black ml-80 w-1/5 ">Options</span>
  </div>

  {/* Amenities Rows */}
  {amenities.map((amenity, index) => (
    <div key={index} className="flex justify-between items-center py-2 border-b mb-4"> {/* Added mb-4 for spacing */}
      <span className="ml-20 text-sm  text-black w-1/4">{amenity.name}</span>
      <span className="text-sm  text-black w-1/4">{amenity.amenity}</span>
      <span className="text-sm  text-black w-1/4">{amenity.price}</span>
      <span className="text-sm  text-black  w-1/4">{amenity.therapists}</span>
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

export default OurServices;

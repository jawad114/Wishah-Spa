'use client';
import { useState, useEffect } from 'react';
import { ClipboardPenLine, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import StaffCardModal from './../../../components/ProductsForm'; // Update this line to match the correct import
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import Axios

// Define the Products interface
interface Products {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

function Staff() {
  const [Productss, setProductss] = useState<Products[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<Products | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);

  // Fetch staff members from the backend
  const fetchProductss = async () => {
    try {
      const response = await fetch('https://wishah-spa-server.onrender.com/products'); // Adjust endpoint if necessary
      const data: Products[] = await response.json();
      console.log(data);
      setProductss(data);
    } catch (error) {
      console.error('Failed to fetch staff members:', error);
      toast.error('Failed to fetch staff members. Please try again later.');
    }
  };
  

  useEffect(() => {
    fetchProductss();
  }, []);

  const handleEdit = (index: number) => {
    setCurrentStaff(Productss[index]);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setCurrentStaff(null); // Clear current staff for new creation
    setShowForm(true);
    setIsEditing(false); // Ensure form is in "create" mode
  };

  const handleSave = async (name: string, price: string, description: string, image: File | null) => {
    setIsSaving(true);
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    if (image) {
      formData.append('image', image); // Adjust the key if your backend requires it
    }
  
    try {
      if (isEditing && currentStaff) {
        // Update existing staff member
        const response = await fetch(`https://wishah-spa-server.onrender.com/products/${currentStaff.id}`, {
          method: 'PUT',
          body: formData,
        });
        if (response.ok) {
          const updatedStaff = await response.json();
          setProductss((prev) =>
            prev.map((staff) => (staff.id === currentStaff.id ? updatedStaff : staff))
          );
          toast.success('Staff member updated successfully!');
        } else {
          throw new Error('Failed to update staff member.');
        }
      } else {
        // Create new staff member
        const response = await fetch('https://wishah-spa-server.onrender.com/products/create', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          const newStaff = await response.json();
          setProductss((prev) => [...prev, newStaff]);
          toast.success('Staff member added successfully!');
        } else {
          throw new Error('Failed to add staff member.');
        }
      }
    } catch (error) {
      console.error('Error saving staff member:', error);
      toast.error('Failed to save staff member. Please try again.');
    } finally {
      setIsSaving(false);
      setShowForm(false);
    }
  };
  

  const handleDelete = (index: number) => {
    setStaffToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (staffToDelete !== null) {
      const staffToRemove = Productss[staffToDelete];
      try {
        await axios.delete(`https://wishah-spa-server.onrender.com/products/${staffToRemove.id}`);
        const updatedStaff = Productss.filter((_, i) => i !== staffToDelete);
        setProductss(updatedStaff);
        toast.success('Staff member deleted successfully!');
      } catch (error) {
        toast.error('Failed to delete staff member');
        console.error(error);
      }
    }
    setShowDeleteConfirm(false);
    setStaffToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setStaffToDelete(null);
  };

  return (
    <div>
      <Header pageName='Staff' />
      <Sidebar />

      <div className="flex justify-between items-center p-4 ml-64">
        <h1 className="text-2xl font-bold ml-8">Products Information</h1>
        <button
          onClick={handleCreate}
          className="flex items-center bg-green-500 text-white py-2 px-4 mr-16 mt-3 rounded"
        >
          <span className="mr-2"><ClipboardPenLine /></span>Add Staff
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
            <span className="text-lg font-bold text-black w-1/12">Image</span>
            <span className="text-lg font-bold text-black w-3/12">Name</span>
            <span className="text-lg font-bold text-black w-3/12">Description</span>
            <span className="text-lg font-bold text-black mr-8 w-2/12">Price</span>
            <span className="text-lg font-bold text-black w-1/12">Options</span>
          </div>

          {/* Staff Rows */}
          {Productss.map((staff, index) => (
            <div key={staff.id} className="flex justify-between items-center py-2 border-b mb-4 ml-20">
              <div className="w-1/12">
                <img src={staff.imageUrl} alt={staff.name} className="rounded-full w-12 h-12" />
              </div>
              <span className="text-sm text-black w-3/12">{staff.name}</span>
              <span className="text-sm text-black w-3/12">{staff.description}</span>
              <span className="text-sm text-black w-2/12">{staff.price}</span>
              <div className="flex gap-3 mr-8 w-1/12 justify-end">
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
        <StaffCardModal // Updated modal name
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          staffData={currentStaff} // Pre-fill form when editing
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

export default Staff;

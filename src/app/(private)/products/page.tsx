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

// Define the StaffMember interface
interface StaffMember {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

function Staff() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<StaffMember | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [staffToDelete, setStaffToDelete] = useState<number | null>(null);

  // Sample data - replace with API call in real implementation
  const fetchStaffMembers = () => {
    const data: StaffMember[] = [
      { id: 1, name: 'John Doe', description: 'Experienced Manager', price: '$5000', imageUrl: '/product.png' },
      { id: 2, name: 'Jane Smith', description: 'Certified Therapist', price: '$3000', imageUrl: '/product1.png' },
      // Add more staff members here
    ];
    setStaffMembers(data);
  };

  useEffect(() => {
    fetchStaffMembers();
  }, []);

  const handleEdit = (index: number) => {
    setCurrentStaff(staffMembers[index]);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setCurrentStaff(null); // Clear current staff for new creation
    setShowForm(true);
    setIsEditing(false); // Ensure form is in "create" mode
  };

  const handleSave = (name: string, price: string, description: string, image: File | null) => {
    setIsSaving(true);

    // Create a new staff member object
    const newStaff: StaffMember = {
      id: staffMembers.length + 1, // Increment ID based on existing staff
      name,
      price,
      description,
      imageUrl: image ? URL.createObjectURL(image) : '/default-image.png', // Handle image upload
    };

    setTimeout(() => {
      if (isEditing && currentStaff) {
        // Update the existing staff member
        setStaffMembers((prev) =>
          prev.map((staff) => (staff.id === currentStaff.id ? newStaff : staff))
        );
        toast.success('Staff member updated successfully!');
      } else {
        // Add new staff member
        setStaffMembers((prev) => [...prev, newStaff]);
        toast.success('Staff member added successfully!');
      }
      setIsSaving(false);
      setShowForm(false);
    }, 2000);
  };

  const handleDelete = (index: number) => {
    setStaffToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (staffToDelete !== null) {
      const updatedStaff = staffMembers.filter((_, i) => i !== staffToDelete);
      setStaffMembers(updatedStaff);
      toast.success('Staff member deleted successfully!');
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
          {staffMembers.map((staff, index) => (
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
        />
      )}
    </div>
  );
}

export default Staff;

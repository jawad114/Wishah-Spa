'use client';
import { useState, useEffect } from 'react';
import { ClipboardPenLine, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import ServiceFormModal from './../../../components/StaffInfoModal';
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import privateRoute from './../../../components/PrivateRoute';
import axios from 'axios';

// Define the StaffMember interface
interface StaffMember {
  id?: number; // Optional for new staff
  name: string;
  email: string;
  phone: string;
  designation: string;
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

  const fetchStaffMembers = async () => {
    try {
      const response = await axios.get('http://localhost:4000/staff');
      setStaffMembers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching staff members:', error);
      toast.error('Error fetching staff members.');
    }
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
    setCurrentStaff(null); 
    setShowForm(true);
    setIsEditing(false);
  };

  const handleSave = async (newStaff: StaffMember, file?: File) => {
    setIsSaving(true);
    const formData = new FormData();
    
    
    formData.append('name', newStaff.name);
    formData.append('email', newStaff.email);
    formData.append('phoneNumber', newStaff.phone); 
    formData.append('designation', newStaff.designation);
    
    if (file) {
      formData.append('image', file); 
    }
  
    try {
      if (isEditing && currentStaff?.id) {
        await axios.put(`http://localhost:4000/staff/${currentStaff.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', 
          },
        });
        setStaffMembers((prev) =>
          prev.map((staff) =>
            staff.id === currentStaff.id ? { ...newStaff, imageUrl: currentStaff.imageUrl } : staff
          )
        );
        toast.success('Staff member updated successfully!');
      } else {
       
        const response = await axios.post('http://localhost:4000/staff/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        setStaffMembers((prev) => [...prev, { ...newStaff, id: response.data.id, imageUrl: response.data.imageUrl }]);
        toast.success('Staff member added successfully!');
      }
    } catch (error) {
      console.error('Error saving staff member:', error);
      toast.error('Error saving staff member.');
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
      const staffId = staffMembers[staffToDelete]?.id;
      if (staffId) {
        try {
          await axios.delete(`http://localhost:4000/staff/${staffId}`);
          const updatedStaff = staffMembers.filter((_, i) => i !== staffToDelete);
          setStaffMembers(updatedStaff);
          toast.success('Staff member deleted successfully!');
        } catch (error) {
          console.error('Error deleting staff member:', error);
          toast.error('Error deleting staff member.');
        }
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
        <h1 className="text-2xl font-bold ml-8">Staff Information</h1>
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
            <span className="text-lg font-bold text-black w-3/12">Email</span>
            <span className="text-lg font-bold text-black w-2/12">phone Number</span>
            <span className="text-lg font-bold text-black w-2/12">Designation</span>
            <span className="text-lg font-bold text-black w-1/12">Options</span>
          </div>

          {/* Staff Rows */}
          {staffMembers.map((staff, index) => (
            <div key={staff.id} className="flex items-center py-2 border-b mb-4 ml-20">
              <div className="w-1/12">
                <img src={staff.imageUrl} alt={staff.name} className="rounded-full w-12 h-12" />
              </div>
              <span className="text-sm text-black w-3/12">{staff.name}</span>
              <span className="text-sm text-black w-3/12">{staff.email}</span>
              <span className="text-sm text-black w-2/12">{staff.phone}</span>
              <span className="text-sm text-black w-2/12">{staff.designation}</span>
              <div className="flex gap-3 w-1/9 justify-end">
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
          isOpen={showForm}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          staffData={currentStaff} 
        />
      )}

      {isSaving && <SavingCard />}

      {showDeleteConfirm && (
        <DeleteConfirmationCard
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}

export default privateRoute(Staff);

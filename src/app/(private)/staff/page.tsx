'use client';
import { useState, useEffect } from 'react';
import { ClipboardPenLine, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import StaffInfoModal from './../../../components/StaffInfoModal';
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// Define the StaffMember interface
interface StaffMember {
  id?: number; // Optional for new staff
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  imageUrl: string; // URL for staff member's image
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
      const response = await axios.get('https://wishah-spa-server.onrender.com/staff');
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
    formData.append('phoneNumber', newStaff.phoneNumber); 
    formData.append('designation', newStaff.designation);
    if (file) {
      formData.append('image', file);
    }

    try {
      if (isEditing && currentStaff) {
        // Update existing staff member
        const response = await axios.put<StaffMember>(`https://wishah-spa-server.onrender.com/staff/${currentStaff.id}`, formData);
        const updatedStaffMembers = staffMembers.map((member) =>
          member.id === currentStaff.id ? response.data : member
        );
        setStaffMembers(updatedStaffMembers);
        toast.success('Staff member updated successfully!');
      } else {
        // Create new staff member
        const response = await axios.post<StaffMember>('https://wishah-spa-server.onrender.com/staff/create', formData);
        setStaffMembers([...staffMembers, response.data]);
        toast.success('Staff member created successfully!');
      }
    } catch (error) {
      toast.error('Error saving staff member!');
      console.error('Error saving staff member:', error);
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
      try {
        const response = await axios.delete(`https://wishah-spa-server.onrender.com/staff/${staffMembers[staffToDelete].id}`);
        if (response.status === 200) {
          const updatedStaffMembers = staffMembers.filter((_, i) => i !== staffToDelete);
          setStaffMembers(updatedStaffMembers);
          toast.success('Staff member deleted successfully!');
        } else {
          toast.error('Failed to delete the staff member. Please try again.');
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error deleting staff member!';
        toast.error(errorMessage);
        console.error('Error deleting staff member:', error);
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
    <div className="min-h-screen bg-[#EFF0F5] flex flex-col">
      <div>
        <Header pageName='Staff' />
        <Sidebar />

        <div className="flex justify-between items-center p-4 ml-52">
          <h1 className="text-2xl font-bold ml-8">Staff Information</h1>
          <button
            onClick={handleCreate}
            className="flex items-center bg-green-500 text-white py-2 px-4 mr-7 mt-3 rounded"
          >
            <span className="mr-2"><ClipboardPenLine /></span>Staff
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
              <span className="text-2xl font-bold text-black w-[15%]">Image</span>
              <span className="text-2xl font-bold text-black w-[20%]">Name</span>
              <span className="text-2xl font-bold text-black w-[25%]">Email</span>
              <span className="text-2xl font-bold text-black w-[20%]">Phone Number</span>
              <span className="text-2xl font-bold text-black w-[20%]">Designation</span>
              <span className="text-2xl font-bold text-black w-[10%] text-right">Options</span>
            </div>

            {/* Staff Rows */}
            {staffMembers.map((member, index) => (
              <div key={member.id} className="flex justify-between items-center py-2 border-b mb-4 px-10">
                <span className="text-xl text-black w-[15%]">
                  <img src={member.imageUrl} alt={member.name} className="h-12 w-12 object-cover rounded" />
                </span>
                <span className="text-xl text-black w-[20%]">{member.name}</span>
                <span className="text-xl text-black w-[25%]">{member.email}</span>
                <span className="text-xl text-black w-[20%]">{member.phoneNumber}</span>
                <span className="text-xl text-black w-[20%]">{member.designation}</span>
                <div className="flex gap-3 w-[10%] justify-end">
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
          <StaffInfoModal
            isOpen={showForm}
            onClose={() => setShowForm(false)}
            onSave={handleSave}
            staffData={currentStaff}
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

export default Staff;

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
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      if (image) {
        formData.append('image', image);
      }

      if (isEditing && currentStaff) {
        // Update existing product
        const response = await axios.put<Products>(`https://wishah-spa-server.onrender.com/products/${currentStaff.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        const updatedProducts = Productss.map((product) =>
          product.id === currentStaff.id ? response.data : product
        );
        setProductss(updatedProducts);
        toast.success('Product updated successfully!');
      } else {
        // Create new product
        const response = await axios.post<Products>('https://wishah-spa-server.onrender.com/products/create', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setProductss([...Productss, response.data]); // Add new product to the list
        toast.success('Product created successfully!');
      }
    } catch (error) {
      toast.error('Error saving product!');
      console.error('Error saving product:', error);
    } finally {
      setIsSaving(false); // Hide the saving card after saving is done
      setShowForm(false); // Close the form modal after saving
    }
  };

  const handleDelete = (index: number) => {
    setStaffToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (staffToDelete !== null) {
      try {
        const response = await axios.delete(`https://wishah-spa-server.onrender.com/products/${Productss[staffToDelete].id}`);
        if (response.status === 200) {
          const updatedProducts = Productss.filter((_, i) => i !== staffToDelete);
          setProductss(updatedProducts);
          toast.success('Product deleted successfully!');
        } else {
          toast.error('Failed to delete the product. Please try again.');
        }
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Error deleting product!'; // Adjust based on your API's response
        toast.error(errorMessage);
        console.error('Error deleting product:', error);
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
            <span className="mr-2"><ClipboardPenLine /> </span>Staff
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
              <span className="text-2xl font-bold text-black w-[20%]">Product Name</span>
              <span className="text-2xl font-bold text-black w-[30%]">Description</span>
              <span className="text-2xl font-bold text-black w-[15%]">Price</span>
             
              <span className="text-2xl font-bold text-black w-[10%] text-right">Options</span>
            </div>

            {/* Products Rows */}
            {Productss.map((product, index) => (
              <div key={product.id} className="flex justify-between items-center py-2 border-b mb-4 px-10">
                <span className="text-xl text-black w-[15%]">
                  <img src={product.imageUrl} alt={product.name} className="h-12 w-12 object-cover rounded" />
                </span>
                <span className="text-xl text-black w-[20%]">{product.name}</span>
                <span className="text-xl text-black w-[30%]">{product.description}</span>
                <span className="text-xl text-black w-[15%]">{product.price}</span>
                
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
          <StaffCardModal
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

import React, { useState } from 'react';

interface StaffCardModalProps {
  onSave: (name: string, price: string, description: string, image: File | null) => void;
  isOpen: boolean;
  onClose: () => void;
  staffData: any;
}

const StaffCardModal: React.FC<StaffCardModalProps> = ({ onSave, isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && price && description) {
      onSave(name, price, description, image);
      onClose(); // Close the modal after saving
    } else {
      alert('Please fill out all required fields.');
    }
  };

  if (!isOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[590px] h-[430px] border rounded-lg flex gap-0 relative">
       
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          X
        </button>

        {/* Left Column: Title, Image Preview & Picker */}
        <div className="w-1/2 p-4 flex flex-col">
          {/* Header with Title and Border */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add Products</h3> {/* Title */}
             {/* Border Line */}
          </div>
          <hr className="border-t border-gray-300 w-[540px] mb-6" />
          {/* Image Preview Section */}
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg mb-4" />
          ) : (
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-500">Image Preview</span>
            </div>
          )}
          <label htmlFor="image-picker" className="bg-pink-500 text-white py-2 px-4 rounded cursor-pointer">
            Pick an Image
          </label>
          <input
            id="image-picker"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>

        {/* Right Column: Name, Price, and Description */}
        <form className="w-1/2 p-4 flex flex-col gap-3 mt-16" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="font-bold text-sm">Name <span className="text-red-500">*</span></label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded"
              required
           
              
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="font-bold text-sm">Price <span className="text-red-500">*</span></label>
            <input
              id="price"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="font-bold text-sm">Description <span className="text-red-500">*</span></label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>

          <button type="submit" className="mt-auto bg-green-500 text-white py-2 px-4 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default StaffCardModal;

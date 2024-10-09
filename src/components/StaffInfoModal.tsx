import React, { useState, useRef,useEffect } from 'react';
import Image from 'next/image';

interface StaffInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: any) => void;
  staffData: any;
}

const StaffInfoModal: React.FC<StaffInfoModalProps> = ({ isOpen, onClose,onSave, staffData }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // State for form inputs
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [staffId, setStaffId] = useState('');
  const [staffName, setStaffName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [presentAddress, setPresentAddress] = useState('');
  const [designation, setDesignation] = useState('');


  useEffect(() => {
    if (staffData) {
      setEmail(staffData.email);
      setStaffName(staffData.name);
      setPhoneNumber(staffData.phone);
      setDesignation(staffData.designation);
      setImagePreview(staffData.imageUrl); // Pre-fill image preview
    }
  }, [staffData]);

  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef<HTMLInputElement | null>(null);
  
  // Programatically click the hidden file input element when the button is clicked
  const handleClick = () => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Creating new staff object with the form data
    const newStaff = {
      id: staffData ? staffData.id : Date.now(), // Use existing ID or assign a new one
      name: staffName,
      email,
      phone: phoneNumber,
      designation,
      imageUrl: imagePreview || '/default-avatar.png', // Use uploaded image preview or default image
    };

    onSave(newStaff); // Pass the new staff data to the parent
    resetForm(); // Clear the form
    onClose(); // Close the modal
};


  const resetForm = () => {
    setEmail('');
    setGender('');
    setPermanentAddress('');
    setStaffId('');
    setStaffName('');
    setPhoneNumber('');
    setDob('');
    setPresentAddress('');
    setDesignation('');
    setImage(null);
    setImagePreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-[730px] h-[495px] rounded-[15px] border border-gray-300 relative p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-center font-bold text-xl">Add Staff Info</h2>
          <button onClick={onClose} className="text-gray-600 font-bold hover:text-gray-800">
            X
          </button>
        </div>
        <hr className="border-t border-gray-300 mb-4" />
        <form onSubmit={handleSubmit} className="flex gap-4">
          {/* First Column */}
          <div className="flex flex-col w-1/2">
            <div className="flex flex-col mb-4">
              <div className="flex items-end mb-2 w-full">
                <div className="w-[160px] h-[160px] border border-gray-300 flex items-center justify-center overflow-hidden">
                  {imagePreview && (
                    <Image src={imagePreview} alt="Preview" width={250} height={250} className="object-cover" />
                  )}
                </div>
                <button 
                  type="button" 
                  className="ml-16 p-2 py-1 px-3 bg-pink-500 text-white rounded border border-green-500 hover:bg-pink-600"
                  onClick={handleClick}
                >
                 Choose file
                </button>
                <input
                  type="file"
                  className="border border-gray-300 p-2 mb-2 rounded ml-4"
                  onChange={handleImageChange}
                  ref={hiddenFileInput}
                  style={{ display: 'none' }} // Make the file input element invisible
                />
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 mb-2 rounded"
                required
              />
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="border border-gray-300 p-2 mb-2 rounded"
                required
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                placeholder="Permanent Address"
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                className="border border-gray-300 p-2 mb-2 rounded"
                required
              />
            </div>
          </div>

          {/* Second Column */}
          <div className="flex flex-col w-1/2 mt-2">
            <input
              type="text"
              placeholder="Staff ID"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
              className="border border-gray-300 p-2 mb-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Staff Name"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="border border-gray-300 p-2 mb-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 p-2 mb-2 rounded"
              required
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border border-gray-300 p-2 mb-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Present Address"
              value={presentAddress}
              onChange={(e) => setPresentAddress(e.target.value)}
              className="border border-gray-300 p-2 mb-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="border border-gray-300 p-2 mb-4 rounded"
              required
            />
          </div>
        </form>

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded">Close</button>
          <button type="submit" onClick={handleSubmit} className="bg-green-500 hover:bg-pink-500 text-white px-4 py-2 rounded">Save</button>
        </div>
      </div>
    </div>
  );
};

export default StaffInfoModal;

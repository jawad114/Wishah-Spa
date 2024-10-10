'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ClipboardPenLine, DoorOpen, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import RoomFormModal from './../../../components/AddRoomModal'; 
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import privateRoute from './../../../components/PrivateRoute';

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState(null);


  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:4000/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast.error('Failed to fetch rooms.');
      }
    };
    fetchRooms();
  }, []);


  const handleEdit = (index) => {
    setCurrentRoom(rooms[index]);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setCurrentRoom(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleSave = async (newRoom) => {
    setIsSaving(true);
    try {
      // Construct the roomData object
      const roomData = {
        name: newRoom.name,
        isThirdParty: newRoom.isThirdParty ? 1 : 0,
        amenities: Array.isArray(newRoom.amenityId) ? newRoom.amenityId : [newRoom.amenityId]
    };
    
  
      if (isEditing) {
        // Update existing room
        const response = await axios.put(`http://localhost:4000/rooms/${currentRoom.id}`, roomData);
        const updatedRooms = rooms.map((room) =>
          room._id === currentRoom._id ? response.data : room
        );
        setRooms(updatedRooms);
        toast.success('Room updated successfully!');
      } else {
        // Create new room
        const response = await axios.post('http://localhost:4000/rooms/create', roomData);
        setRooms([...rooms, response.data]);
        toast.success('Room created successfully!');
      }
    } catch (error) {
      toast.error('Error saving room!');
      console.error('Error saving room:', error);
    } finally {
      setIsSaving(false);
      setShowForm(false);
    }
  };
  

  const handleDelete = (index) => {
    setRoomToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (roomToDelete !== null) {
      try {
        const response = await axios.delete(`http://localhost:4000/rooms/${rooms[roomToDelete].id}`);
        if (response.status === 200) {
          const updatedRooms = rooms.filter((_, i) => i !== roomToDelete);
          setRooms(updatedRooms);
          toast.success('Room deleted successfully!');
        } else {
          toast.error('Failed to delete the room. Please try again.');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error deleting room!';
        toast.error(errorMessage);
        console.error('Error deleting room:', error);
      }
    }
    setShowDeleteConfirm(false);
    setRoomToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setRoomToDelete(null);
  };

  return (
    <div>
      <Header pageName='Rooms' />
      <Sidebar />

      <div className="flex justify-between items-center p-4 ml-64">
        <h1 className="text-2xl font-bold ml-8">Rooms Information</h1>
        <button
          onClick={handleCreate}
          className="flex items-center bg-green-500 text-white py-2 px-4 mr-16 mt-3 rounded"
        >
          <span className="mr-2"><ClipboardPenLine /></span>Rooms
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
            <span className="text-lg font-bold text-black w-1/4">Room Name</span>
            <span className="text-lg font-bold text-black w-1/4 ml-10">Amenities</span>
      
            <span className="text-lg font-bold text-black w-1/6 mr-6">isThirdParty</span>
            <span className="text-lg font-bold text-black ml-80 w-1/6">Options</span>
          </div>

          {/* Rooms Rows */}
          {rooms.map((room, index) => (
  <div key={index} className="flex justify-between items-center py-2 border-b mb-4">
    <span className="ml-20 text-sm text-black w-1/4">{room.name}</span>
    <span className="text-sm text-black w-1/4">
      {room.amenities.map((item) => item.name).join(', ')}
    </span>
    <span className="text-sm text-black w-1/4">{room.isThirdParty == 1 ? 'Yes' : 'No'}</span>
    <div className="flex gap-3 w-1/5 justify-end mr-36">
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
        <RoomFormModal
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          currentRoom={currentRoom} 
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

export default privateRoute(Rooms);

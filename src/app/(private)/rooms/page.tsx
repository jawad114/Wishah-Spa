'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ClipboardPenLine, FilePenLine, Trash2 } from 'lucide-react';
import Sidebar from './../../../components/Sidebar';
import Header from './../../../components/header';
import SearchComponent from './../../../components/searchComponent';
import RoomFormModal from './../../../components/AddRoomModal'; 
import SavingCard from './../../../components/SavingCard';
import DeleteConfirmationCard from './../../../components/DeleteConfirmationCard';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define types for Room and component state
interface Room {
  _id: string; // Include _id for MongoDB documents
  id: string; // This could be the same as _id
  name: string;
  isThirdParty: number; // Change type as per your requirements
  amenities: { name: string }[]; // Assuming amenities are still needed
}

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
  const [roomToDelete, setRoomToDelete] = useState<number | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get<Room[]>('https://wishah-spa-server.onrender.com/rooms');
        setRooms(response.data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        toast.error('Failed to fetch rooms.');
      }
    };
    fetchRooms();
  }, []);

  const handleEdit = (index: number) => {
    setCurrentRoom(rooms[index]);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleCreate = () => {
    setCurrentRoom(null);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleSave = async (newRoom: Room) => {
    setIsSaving(true);
    try {
      const roomData = {
        name: newRoom.name,
        isThirdParty: newRoom.isThirdParty,
        amenities: newRoom.amenities,
      };

      if (isEditing && currentRoom) {
        // Update existing room
        const response = await axios.put<Room>(`https://wishah-spa-server.onrender.com/rooms/${currentRoom._id}`, roomData);
        const updatedRooms = rooms.map((room) =>
          room._id === currentRoom._id ? response.data : room
        );
        setRooms(updatedRooms);
        toast.success('Room updated successfully!');
      } else {
        // Create new room
        const response = await axios.post<Room>('https://wishah-spa-server.onrender.com/rooms/create', roomData);
        setRooms([...rooms, response.data]); // Add new room to the list
        toast.success('Room saved successfully!');
      }
    } catch (error) {
      toast.error('Error saving room!');
      console.error('Error saving room:', error);
    } finally {
      setIsSaving(false); // Hide the saving card after saving is done
      setShowForm(false); // Close the form modal after saving
    }
  };

  const handleDelete = (index: number) => {
    setRoomToDelete(index);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (roomToDelete !== null) {
      try {
        const response = await axios.delete(`https://wishah-spa-server.onrender.com/rooms/${rooms[roomToDelete]._id}`);
        if (response.status === 200) {
          const updatedRooms = rooms.filter((_, i) => i !== roomToDelete);
          setRooms(updatedRooms);
          toast.success('Room deleted successfully!');
        } else {
          toast.error('Failed to delete the room. Please try again.');
        }
      } catch (error: any) {
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
    <div className="min-h-screen bg-[#EFF0F5] flex flex-col">
      <div>
        <Header pageName='Rooms' />
        <Sidebar />

        <div className="flex justify-between items-center p-4 ml-52">
          <h1 className="text-2xl font-bold ml-8">Rooms Information</h1>
          <button
            onClick={handleCreate}
            className="flex items-center bg-green-500 text-white py-2 px-4 mr-7 mt-3 rounded"
          >
            <span className="mr-2"><ClipboardPenLine /> </span>Rooms
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
              <span className="text-2xl font-bold text-black w-[15%]">Room Name</span>
              <span className="text-2xl font-bold text-black w-[15%]">Amenities</span>
              <span className="text-2xl font-bold text-black w-[15%]">Third Party</span>
              <span className="text-2xl font-bold text-black w-[10%] text-right">Options</span>
            </div>

            {/* Rooms Rows */}
            {rooms.map((room, index) => (
              console.log(room),
              <div key={index} className="flex justify-between items-center py-2 border-b mb-4 px-10">
                <span className="text-xl text-black w-[15%]">{room.name}</span>
                <span className="text-xl text-black w-[15%]">
                  {room.amenities.map((item) => item.name).join(', ')}
                </span>
                <span className="text-xl text-black w-[15%] ml-2">{room.isThirdParty? 'Yes' : 'No'}</span>
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

        {/* {showForm && (
          <RoomFormModal
            onClose={() => setShowForm(false)}
            onSave={handleSave}
            // currentRoom={currentRoom} 
          />
        )} */}

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
};

export default Rooms;

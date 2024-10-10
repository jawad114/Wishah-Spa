import { promises } from 'dns';
import React from 'react';

type DeleteConfirmationCardProps = {
  
    onCancel: () => void;
    onDelete?: () =>  void; 
    onConfirm: () => Promise<void>

  
}
const DeleteConfirmationCard = ({ onDelete, onCancel }: DeleteConfirmationCardProps) => {
  return (
    <div
      style={{
        width: '357px',
        height: '146px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '6px 6px 6px 6px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        opacity: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <p className="text-center font-bold text-lg mb-4">Are you sure you want to delete?</p>
      <div className="flex gap-4">
        <button
          className="bg-gray-400 text-white py-1 px-4 rounded"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white py-1 px-4 rounded"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationCard;

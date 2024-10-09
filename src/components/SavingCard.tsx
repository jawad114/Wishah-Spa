import React from 'react';

const SavingCard = () => {
  return (
    <div
      style={{
        width: '150px',
        height: '70px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 1,
      }}
    >
      <div className="flex items-center">
        <div className="relative">
          <div className="w-10 h-10 border border-gray-300 rounded-full"></div>
          <div
            className="absolute top-0 left-0 w-10 h-10 border-t-2 border-green-500 rounded-full animate-spin"
            style={{ borderTopColor: 'green' }}
          ></div>
        </div>
        <p className="ml-4 text-sm font-bold">Saving...</p>
      </div>
    </div>
  );
};

export default SavingCard;

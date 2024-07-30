import React from 'react';

export default function AppButton({ icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="p-6 m-4 rounded-full bg-slate-800 text-white rounded"
    >
      <img src={icon} alt="icon" className='h-10'/>
    </button>
  );
}
import React from 'react';

export default function Header() {
  return (
    <div className='grid grid-cols-2 mb-2 items-center border-b-4 border-indigo-700 p-2'>
      <h1 className='text-center text-4xl text-indigo-700 font-black'>MyList</h1>
      <button
        type='button'
        onClick={handleVaciarLocal}
        disabled={lista.length <= 0}
        className={`bg-red-700 text-white m-2 rounded-lg w-fit p-2 ${lista.length < 1 ? 'opacity-10 cursor-not-allowed' : ''}`}>
        Reiniciar 
      </button>
    </div>
  );
}

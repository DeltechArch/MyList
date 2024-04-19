import React, { useState } from 'react';
import FormArticulo from './FormArticulo';

export default function BotonAdd({setLista,setVisible,visible}) {
  

  const handleClick = () => {
    setVisible(true);
  };

  

  return (
    <div className="grid grid-cols-1 justify-items-center ">
      <button className="bg-indigo-300 w-72 h-11 text-white font-black mb-3" onClick={handleClick}>
        Add Articulo
      </button>

      {visible && (<FormArticulo
      setLista={setLista}
      setVisible={setVisible}
      />)}
    </div>
  );
}


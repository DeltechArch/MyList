import React, { useState } from 'react';
import FormArticulo from './FormArticulo';

export default function BotonAdd({lista,setLista,setVisible,visible}) {
  

  const handleClick = () => {
    setVisible(true);
  };

  

  return (
    <div className="grid grid-cols-1 justify-items-center ">
      <button className="bg-indigo-300 w-72 h-11 text-white font-black mb-3" onClick={handleClick}>
        {lista.length > 0 ? "Segruir Agregando": "Agregar a Lista"}
      </button>

      {visible && (<FormArticulo
      setLista={setLista}
      setVisible={setVisible}
      />)}
    </div>
  );
}


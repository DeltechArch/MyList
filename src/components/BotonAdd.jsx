import React, { useState } from 'react';
import FormArticulo from './FormArticulo';

export default function BotonAdd({ lista, setLista, setVisible, visible }) {


  const handleMostrarFormulario = () => {
    setVisible(true);
  };



  return (
    <div className="grid grid-cols-1 justify-items-center ">
      <button
        className="bg-gradient-to-r from-indigo-500 to-indigo-700 w-72 h-11 text-white font-semibold mb-3 shadow-md rounded-lg hover:bg-indigo-600 hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        onClick={handleMostrarFormulario}>
        {lista.length > 0 ? "Seguir Agregando" : "Agregar a Lista"}
      </button>


      {visible && (
        <FormArticulo
          setLista={setLista}
          setVisible={setVisible}
        />
      )}
    </div>
  );
}


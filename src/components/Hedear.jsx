import React from 'react'

export default function Hedear({ lista, setLista }) {

  const handleVaciarLocal = () => {
    confirm('la lista se borrara')
    // Eliminar la clave 'lista' del localStorage
    localStorage.removeItem('lista');
    // Actualizar el estado de la lista para que esté vacía
    setLista([]);
  };


  return (
    <div className=' grid grid-cols-2 mb-2 items-center border-b-4 border-indigo-500'>
      <h1 className=' text-center text-4xl   text-indigo-500 font-black'>MyList</h1>
      <button
        type='button'
        onClick={handleVaciarLocal}
        className=' bg-red-500 text-white m-2 rounded-lg w-fit p-2'>Reiniciar Lista</button>
    </div >
  )
}

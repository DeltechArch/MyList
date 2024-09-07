import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function FormArticulo({lista,setLista, setVisible,editItemId,setEditItemId }) {
  const [articulo, setArticulo] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    
    if (editItemId !== null && lista) {
      const itemToEdit = lista.find(item => item.id === editItemId);
     
      if (itemToEdit) {
        setArticulo(itemToEdit.articulo);
        setPrecio(itemToEdit.precio.toString());
      }
    }
  }, [editItemId, lista]); // Ejecuta el efecto cuando editItemId o lista cambian


  const handleChange = (e) => {
    setArticulo(e.target.value.slice(0, 20));
  };
  const handleChangePrecio = (e) => {
    setPrecio(e.target.value.slice(0, 5))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const nuevoArticulo = {
      id: editItemId || uuidv4(), // Usa el ID de edición o genera uno nuevo
      articulo: articulo,
      precio: Number(precio),
      checkbox: false
    };

    // Si hay un ID de edición, actualiza el elemento en la lista
    if (editItemId) {
      // Encuentra el índice del elemento en la lista
      const index = lista.findIndex(item => item.id === editItemId);
      // Crea una copia de la lista
      const updatedList = [...lista];
      // Reemplaza el elemento editado en la copia de la lista
      updatedList[index] = nuevoArticulo;
      // Actualiza el estado con la nueva lista
      setLista(updatedList);
    } else {
      // Si no hay ID de edición, agrega el nuevo artículo a la lista usando setLista
      setLista(prevLista => [...prevLista, nuevoArticulo]);
    }

    // Reiniciar los estados del formulario después de enviar
    setArticulo('');
    setPrecio('');
    setVisible(false);
    setEditItemId(null)
  };

  const handleCancel = () => {
    // Reiniciar los estados del formulario y ocultarlo al cancelar
    setArticulo('');
    setPrecio('');
    setVisible(false);
    setEditItemId(null)
  };


  return (
    <>
<form
  className="block absolute top-0 left-0 w-full h-full bg-indigo-700 p-5 rounded-none md:top-40 md:left-1/2 md:-translate-x-1/2 md:w-1/2  md:rounded-lg shadow-2xl md:h-auto"
  onSubmit={(e) => handleSubmit(e)}
  style={{ zIndex: 999 }}
>

  <div className="grid grid-cols-1 w-full gap-4">

    <label htmlFor="articulo" className="text-white text-lg font-bold">¿Qué Artículos comprarás?</label>
    <input
      id="articulo"
      type="text"
      placeholder="ej. Barra de pan, Atún, etc."
      value={articulo}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />

    <label htmlFor="precio" className="text-white text-lg font-bold">¿Cuál es su Precio?</label>
    <input
      id="precio"
      type="number"
      placeholder="Ingresa el precio"
      value={precio}
      onChange={handleChangePrecio}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      required
    />
  </div>

  <div className="grid grid-cols-1 justify-items-center mt-4">
    <button
      type="submit"
      className="bg-indigo-600 hover:bg-indigo-500 border border-white w-full h-12 text-white font-semibold rounded-md transition duration-300"
    >
      {editItemId ? "Editar" : "Agregar a Lista"}
    </button>
  </div>

  <div className="grid grid-cols-1 justify-items-center mt-2">
    <button
      type="button"
      onClick={handleCancel}
      className="bg-red-600 hover:bg-red-500 border border-white w-full h-12 text-white font-semibold rounded-md transition duration-300"
    >
      Cancelar
    </button>
  </div>
</form>

    </>
  )
}

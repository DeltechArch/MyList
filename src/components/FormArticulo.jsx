import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

export default function FormArticulo({lista,setLista, setVisible,editItemId }) {
  const [articulo, setArticulo] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    // Verificar si hay un ID de elemento para editar
    if (editItemId !== null && lista) {
      // Encuentra el elemento en la lista basado en el ID
      const itemToEdit = lista.find(item => item.id === editItemId);
      // Si se encuentra el elemento, actualiza los estados del formulario con sus valores
      if (itemToEdit) {
        setArticulo(itemToEdit.articulo);
        setPrecio(itemToEdit.precio.toString());
      }
    }
  }, [editItemId, lista]); // Ejecuta el efecto cuando editItemId o lista cambian


  const handleChange = (e) => {
    setArticulo(e.target.value.slice(0, 8));
  };
  const handleChangePrecio = (e) => {
    setPrecio(e.target.value.slice(0, 5))
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Crear el objeto del artículo con los valores del formulario
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
  };

  const handleCancel = () => {
    // Reiniciar los estados del formulario y ocultarlo al cancelar
    setArticulo('');
    setPrecio('');
    setVisible(false);
  };


  return (
    <>
      <form
        className='block absolute top-40 left-0  w-full bg-indigo-400 py-10'
        onSubmit={(e) => handleSubmit(e)}
        style={{ zIndex: 999 }}
      >
        <div className='grid grid-cols-1 w-72  justify-items-center mx-auto pb-4 '>

          <label htmlFor="articulo" className='text-white text-lg font-black'>¿Qué Artículos comprarás?</label>
          <input id='articulo'
            type="text"
            placeholder='ej. Barra de pan, Atún, etc.'
            value={articulo}
            onChange={handleChange}
            required

          />

        </div>

        <div className='grid grid-cols-1 w-72  justify-items-center  mx-auto pb-4  '>

          <label htmlFor="precio" className='text-white text-lg font-black'>¿Cual es su Precio?</label>
          <input id='precio'
            type="number"
            placeholder='ingresa el precio'
            value={precio}
            onChange={handleChangePrecio}
            required

          />

        </div>



        <div className="grid grid-cols-1 justify-items-center mt-2">
          <button type="submit" className="bg-indigo-600 w-72 h-11 text-white">Add To List</button>
        </div>
        <div className="grid grid-cols-1 justify-items-center mt-2">
          <button type="button" onClick={handleCancel} className="bg-red-400 w-72 h-11 text-white">Cancelar</button>
        </div>
      </form>
    </>
  )
}

import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatCurency } from '../helpers';
import FormArticulo from './FormArticulo';
import { useState, useEffect } from 'react';





export default function ShowLista({ lista, setLista, setVisible, visible }) {

  const [editItemId, setEditItemId] = useState(null); // Estado para almacenar el ID del elemento a editar

  const handleEditItem = (itemId) => {
    setEditItemId(itemId); // Almacena el ID del elemento a editar
    setVisible(true); // Muestra el formulario de edición
  };


  const handleDeleteItem = (itemId) => {
    // Filtra la lista para eliminar el elemento correspondiente al itemId
    const updatedList = lista.filter(item => item.id !== itemId);
    // Actualiza el estado con la nueva lista
    setLista(updatedList);
  };


  const leadingActions = (itemId) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEditItem(itemId)}>
        Editar
      </SwipeAction> {/* Cambiado para invocar handleEditItem con el itemId */}
    </LeadingActions>
  );

  const trailingActions = (itemId) => (
    <TrailingActions>
      <SwipeAction
        destructive={true}
        onClick={() => handleDeleteItem(itemId)}
      >
        Delete
      </SwipeAction>
    </TrailingActions>
  );

  const handleCheckboxChange = (itemId) => {
    // Busca el elemento en la lista basado en su ID
    const updatedList = lista.map(item => {
      if (item.id === itemId) {
        // Si es el elemento correcto, actualiza su estado de checkbox
        return {
          ...item,
          checkbox: !item.checkbox // Cambia el estado del checkbox a su valor opuesto
        };
      }
      return item;
    });
  
    // Actualiza el estado de la lista con la nueva lista modificada
    setLista(updatedList);
  };
  


  const [casillas, setCasillas] = useState(false);

  useEffect(() => {
    const todosChequeados = lista.every(item => item.checkbox);
    setCasillas(todosChequeados);
  }, [lista]);


  return (
    <>
      {visible && ( // Muestra el formulario de edición solo si visible es true
        <FormArticulo
          lista={lista}
          setLista={setLista}
          setVisible={setVisible}
          editItemId={editItemId} // Pasa el ID del elemento a editar al formulario
        />
      )}

      {lista.length > 0 ? (
        <>
          <p className='text-center font-black text-2xl justify-items-center'>Lista De Compras</p>
          { }




          <div className=' overflow-y-auto  bg-indigo-500'
            style={{ height: "500px" }}
          >
            <SwipeableList>
              {lista.map((item) => (
                <SwipeableListItem
                  key={item.id}
                  leadingActions={leadingActions(item.id)}
                  trailingActions={trailingActions(item.id)}
                >
                  <div className='grid grid-cols-3  text-xl font-black text-white mb-2 w-80 items-center  justify-items-center mx-auto   bg-indigo-400 '>
                    <p className='text-center py-3'>{item.articulo}</p>
                    <p className='text-center'>{formatCurency(item.precio)}</p>
                    <input
                      type="checkbox"
                      style={{ width: "20px", height: "20px" }}
                      checked={item.checkbox}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                  </div>
                </SwipeableListItem>
              ))}
            </SwipeableList>
          </div>

        </>
      ) : (
        <p className=' text-center font-black'>No hay elementos en la lista.</p>
      )}
      {casillas && (
        <>
          <div className=' grid grid-cols-1 text-white place-items-center text-3xl font-black bg-green-500 h-28'>
            <p>¡¡Lista Completa!!</p>
          </div>
        </>
      )}
    </>
  )
}

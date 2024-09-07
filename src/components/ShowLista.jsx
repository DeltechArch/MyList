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

//cambios

export default function ShowLista({ lista, setLista, setVisible, visible, }) {

  const [editItemId, setEditItemId] = useState(null); // Estado para almacenar el ID del elemento a editar

  const handleEditItem = (itemId) => {
    setEditItemId(itemId); // Almacena el ID del elemento a editar
    setVisible(true); // Muestra el formulario de edición
  };

  const handleDeleteItem = (itemId) => {
    const updatedList = lista.filter(item => item.id !== itemId);
    setLista(updatedList);
  };

  const leadingActions = (itemId) => (
    <LeadingActions>
      <SwipeAction onClick={() => handleEditItem(itemId)}>
        Editar
      </SwipeAction>
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
    if (lista.length === 0) {
      return;
    }

    const updatedList = lista.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          checkbox: !item.checkbox
        };
      }
      return item;
    });

    setLista(updatedList);
  };

  const [casillas, setCasillas] = useState(false);

  useEffect(() => {
    const todosChequeados = lista.every(item => item.checkbox);
    setCasillas(todosChequeados);
  }, [lista]);

  return (
    <>
      {visible && (
        <FormArticulo
          lista={lista}
          setLista={setLista}
          setVisible={setVisible}
          editItemId={editItemId}
          setEditItemId={setEditItemId}
        />
      )}

      {lista.length > 0 ? (
        <>
          <p className='text-center font-black text-2xl justify-items-center'>Lista De Compras</p>
          <div className="overflow-y-auto border-y-8 w-11/12 mx-auto  border-black bg-indigo-700 p-4 rounded-md shadow-lg" style={{ maxHeight: "280px" }}>
            <SwipeableList>
              {lista.map((item, index) => (
                <SwipeableListItem
                  key={item.id}
                  leadingActions={leadingActions(item.id)}
                  trailingActions={trailingActions(item.id)}
                >
                  <div className="grid grid-cols-[3fr_2fr_1fr] items-center text-base font-semibold text-black mb-4 w-full max-w-lg  mx-auto bg-gray-100 border border-gray-300 rounded-lg shadow-md ">
                    <p className="text-center py-1">{item.articulo}</p>
                    <p className="text-right border-l-2 border-gray-600 py-1">{formatCurency(item.precio)}</p>
                    <div className="grid grid-cols-1 justify-items-end items-end pr-2 py-1 ">
                      <label htmlFor={`checkbox-${item.id}`} className="mb-2 ">{index + 1}</label>
                      <input
                        id={`checkbox-${item.id}`}
                        type="checkbox"
                        className="w-6 h-5 "
                        checked={item.checkbox}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </div>
                  </div>
                </SwipeableListItem>
              ))}
            </SwipeableList>
          </div>

          {casillas && (
            <div className="text-center text-black place-items-center text-3xl mb-20 font-black bg-green-500 h-20  w-11/12 mx-auto mt-4 p-4 rounded-md shadow-md">
              <p className="text-shadow">¡¡Lista Completa!!</p>
            </div>
          )}
        </>
      ) : (
        <p className="text-center font-black text-xl mt-4">No hay elementos en la lista.</p>
      )}
    </>
  );
}

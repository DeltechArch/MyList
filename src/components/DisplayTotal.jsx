import { formatCurency } from '../helpers';

export default function DisplayTotal({lista}) {

 const total = lista.reduce((art, item) => art + item.precio, 0);


 return (
  <div
   className='fixed bottom-0 left-0 w-full bg-black text-white text-2xl h-20 grid grid-cols-2 items-center justify-items-center p-2 font-black'>
   <h3>Total a Pagar</h3>
   <p>{ formatCurency(total)}</p>

  </div>
 )
}

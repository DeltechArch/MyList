import { formatCurency } from '../helpers';

export default function DisplayTotal({lista}) {

 const total = lista.reduce((art, item) => art + item.precio, 0);


 return (
  <div
  className="fixed bottom-0 left-1/2 -translate-x-1/2 w-11/12 bg-black text-white text-xl md:text-2xl h-20 grid grid-cols-2 items-center justify-items-center p-2 font-semibold rounded-t tracking-wide leading-tight"
>
  <p className="text-gray-300">Total a Pagar</p>
  <p className="text-cyan-400">{formatCurency(total)}</p>
</div>

 )
}

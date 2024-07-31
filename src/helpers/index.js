export function formatCurency(quantity){
//Codigo para formatear los numeros  a dinero.
 return new Intl.NumberFormat('en-US',{
     style:'currency', currency: 'USD'
 }).format(quantity)


}
export function formatCurency(quantity){

 return new Intl.NumberFormat('en-US',{
     style:'currency', currency: 'USD'
 }).format(quantity)


}
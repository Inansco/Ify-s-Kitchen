// Replace with the restaurant's VERIFIED Nigerian WhatsApp number, e.g. 2348012345678.
const RESTAURANT_WHATSAPP = '2348116038228';
const menu = {
  jollof: {name:'Jollof Rice & Meat',price:3500},
  egusi: {name:'Swallow & Egusi Soup',price:4000},
  assorted: {name:'Swallow & Assorted Stew',price:4500}
};
const cart = {};
const naira = amount => '₦' + amount.toLocaleString('en-NG');
function renderCart(){
  const holder=document.getElementById('cart-items');
  holder.replaceChildren();
  let total=0,count=0;
  for(const [id,qty] of Object.entries(cart)){
    const item=menu[id],sum=item.price*qty;
    total+=sum;count+=qty;
    const line=document.createElement('div');line.className='cart-line';
    const label=document.createElement('span');label.textContent=`${item.name} × ${qty} — ${naira(sum)}`;
    const remove=document.createElement('button');remove.type='button';remove.textContent='Remove';remove.addEventListener('click',()=>{delete cart[id];renderCart()});
    line.append(label,remove);holder.append(line);
  }
  if(!count)holder.textContent='Your cart is empty. Add a delicious meal above!';
  document.getElementById('cart-count').textContent=count;
  document.getElementById('cart-total').textContent=naira(total);
}
document.querySelectorAll('[data-add]').forEach(button=>button.addEventListener('click',()=>{
  const id=button.dataset.add,field=document.getElementById('qty-'+id),qty=Number(field.value);
  if(!Number.isInteger(qty)||qty<1||qty>50){alert('Enter a quantity from 1 to 50.');return;}
  if((cart[id]||0)+qty>50){alert('Maximum 50 portions per dish.');return;}
  cart[id]=(cart[id]||0)+qty;renderCart();
  document.getElementById('cart').scrollIntoView({behavior:'smooth'});
}));
document.getElementById('checkout').addEventListener('click',()=>{
  const entries=Object.entries(cart);
  const status=document.getElementById('checkout-message');
  if(!entries.length){status.textContent='Add a meal before checkout.';return;}
  if(!/^234\d{10}$/.test(RESTAURANT_WHATSAPP)){
    status.textContent='Demo only: configure the restaurant WhatsApp number in js/script.js before accepting orders.';return;
  }
  const name=document.getElementById('customer-name').value.trim();
  const total=entries.reduce((sum,[id,qty])=>sum+menu[id].price*qty,0);
  const lines=['Hello TastyBite Kitchen, I would like to order:',...entries.map(([id,qty])=>`- ${menu[id].name} x${qty}: ${naira(menu[id].price*qty)}`),`Total: ${naira(total)}`];
  if(name)lines.push(`Customer: ${name}`);
  lines.push('Please confirm availability, delivery/pickup and final charges.');
  window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer');
});
document.getElementById('year').textContent=new Date().getFullYear();
renderCart();

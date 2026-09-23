'use client';

import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FoodItem, useCart } from './CartContext';

export default function FoodCard({ item }: { item: FoodItem }) {
  const { addItem } = useCart();
  const router = useRouter();
  const handleAdd = () => { addItem(item); router.push('/cart'); };
  return <article className="group overflow-hidden rounded-[24px] border border-[#eadfd7] bg-white shadow-[0_10px_30px_rgba(77,54,39,.04)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(77,54,39,.12)]">
    <div className="relative h-56 overflow-hidden bg-[#f7eee7]"><Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#5d534c]">{item.badge}</span><button aria-label={`Add ${item.name} to cart`} onClick={handleAdd} className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-[#f4512a] text-2xl font-light text-white shadow-lg transition hover:scale-110 hover:bg-[#df421f]">+</button></div>
    <div className="p-5"><div className="mb-2 flex items-start justify-between gap-3"><h3 className="text-lg font-extrabold tracking-[-0.03em] text-[#292724]">{item.name}</h3><span className="flex shrink-0 items-center gap-1 text-sm font-bold text-[#9b6d27]"><Star size={14} fill="currentColor" /> {item.rating}</span></div><p className="min-h-[42px] text-sm leading-6 text-[#827870]">{item.description}</p><div className="mt-4 flex items-center justify-between"><span className="text-lg font-extrabold text-[#f4512a]">${item.price.toFixed(2)}</span><span className="text-[#c9bdb5] transition group-hover:text-[#f4512a]"><ArrowUpRight size={19} /></span></div></div>
  </article>;
}

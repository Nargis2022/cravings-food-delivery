'use client';

import Link from 'next/link';
import { ChefHat, Menu, ShoppingBag, UserRound, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from './CartContext';

export default function Header() {
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);
  const links = [['Home', '/'], ['Menu', '/#popular'], ['Cart', '/cart'], ['Account', '/#account']];
  return (
    <header className="sticky top-0 z-30 border-b border-[#eadfd7]/80 bg-[#fffaf5]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold tracking-[-0.04em] text-[#22211e]">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#f4512a] text-white shadow-[0_7px_16px_rgba(244,81,42,.2)]"><ChefHat size={19} /></span>
          Cravings<span className="text-[#f4512a]">.</span>
        </Link>
        <nav className="hidden items-center gap-2 md:flex">
          {links.map(([label, href]) => <Link key={label} href={href} className={`rounded-full px-4 py-2 text-sm font-semibold transition hover:bg-[#fff0e7] ${label === 'Home' ? 'bg-[#f4512a] text-white hover:bg-[#df421f]' : 'text-[#716b66]'}`}>{label}{label === 'Cart' && itemCount > 0 && <span className="ml-1.5 rounded-full bg-white/25 px-1.5 text-xs">{itemCount}</span>}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/cart" aria-label="Cart" className="relative rounded-full p-2 text-[#292724] transition hover:bg-[#fff0e7] md:hidden"><ShoppingBag size={21} />{itemCount > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#f4512a] px-1 text-[10px] font-bold text-white">{itemCount}</span>}</Link>
          <button aria-label="Toggle navigation" className="rounded-xl p-2 text-[#292724] md:hidden" onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <Menu size={22} />}</button>
          <div className="hidden items-center gap-2 border-l border-[#eadfd7] pl-4 text-sm font-semibold text-[#716b66] md:flex"><UserRound size={18} /> Sign in</div>
        </div>
      </div>
      {open && <nav className="border-t border-[#eadfd7] bg-[#fffaf5] px-5 pb-4 md:hidden">{links.map(([label, href]) => <Link key={label} onClick={() => setOpen(false)} href={href} className="block border-b border-[#f0e6df] py-3 text-sm font-semibold text-[#4e4843]">{label}{label === 'Cart' && itemCount > 0 ? ` (${itemCount})` : ''}</Link>)}</nav>}
    </header>
  );
}

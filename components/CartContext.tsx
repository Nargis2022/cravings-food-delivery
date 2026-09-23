'use client';

import { createContext, useContext, useMemo, useState } from 'react';

export type FoodItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  badge: string;
  image: string;
};

export type CartLine = FoodItem & { quantity: number };

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  addItem: (item: FoodItem) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  remove: (id: string) => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    addItem: (item) => setItems((current) => {
      const existing = current.find((line) => line.id === item.id);
      if (existing) return current.map((line) => line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line);
      return [...current, { ...item, quantity: 1 }];
    }),
    increase: (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item)),
    decrease: (id) => setItems((current) => current.flatMap((item) => item.id !== id ? [item] : item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [])),
    remove: (id) => setItems((current) => current.filter((item) => item.id !== id)),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}

'use client';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
  const { items } = useCart();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mon panier 🛒</h1>

      {items.length === 0 && <p>Votre panier est vide.</p>}

      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <span>{item.name}</span>
              <span>{item.price} FCFA</span>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

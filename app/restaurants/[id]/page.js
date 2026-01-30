'use client';
import { use } from 'react';
import { useCart } from '../../../context/CartContext';


async function getRestaurant(id) {
  const res = await fetch(`http://localhost:3001/restaurants/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Restaurant non trouvé');
  }

  return res.json();
}

export default async function RestaurantPage({ params }) {
  const { id } = await params;
  const restaurant = await getRestaurant(id);
  const { addToCart } = useCart;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-2">
        {restaurant.name}
      </h1>

      <p className="text-gray-600 mb-6">
        {restaurant.description}
      </p>

      <h2 className="text-xl font-semibold mb-4">Menus 🍽️</h2>

      {(!restaurant.menuItems || restaurant.menuItems.length === 0 ) && (
        <p>Aucun menu disponible.</p>
      )}

      <ul className="space-y-4">
        {restaurant.menuItems?.map((menu) => (
          <li
            key={menu.id}
            className="border p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{menu.name}</h3>
              <p className="text-sm text-gray-500">
                {menu.description}
              </p>
            </div>

            <div className="flex flex-col items-end gap-2">
                <span className="font-bold text-orange-600">
                    {menu.price} FCFA
                </span>
                <button 
                   onClick={() => addToCart(menu)}
                   className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
                    Ajouter
                </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

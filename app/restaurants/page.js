import Link from "next/link";

async function getRestaurants() {
  const res = await fetch('http://localhost:3001/restaurants', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Impossible de trouver les restaurants');
  }

  return res.json();
}

export default async function RestaurantsPage() {
  const restaurants = await getRestaurants();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Restaurants NAYA 🍽️</h1>

      {restaurants.length === 0 && (
        <p>Aucun restaurant disponible pour le moment.</p>
      )}

      <ul className="space-y-3">
        {restaurants.map((restaurant) => (
            <li
                key={restaurant.id}
                className="p-4 border rounded-xl shadow-sm hover:bg-gray-50"
            >
                <Link href={`/restaurants/${restaurant.id}`}>
                    <h2 className="text-lg font-semibold">
                        {restaurant.name}
                    </h2>
                    <p className="text-gray-500 text-sm">
                        {restaurant.description || 'Pas de description'}
                    </p>
                </Link>
            </li>
        ))}
    </ul>
    </main>
  );
}

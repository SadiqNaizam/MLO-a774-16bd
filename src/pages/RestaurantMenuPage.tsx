import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Custom Components
import MenuItemCard, { MenuItemData } from '@/components/MenuItemCard';

// Shadcn/ui Components
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

// Lucide Icons
import { Star, Clock, MapPin, ShoppingCart, Salad, Pizza, Utensils, GlassWater, Info } from 'lucide-react';

// Placeholder for AppHeader - In a real app, this would be a shared layout component
const AppHeader: React.FC<{ cartItemCount: number }> = ({ cartItemCount }) => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary">FoodFleet</Link>
      <Link to="/checkout">
        <Button variant="outline">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Cart ({cartItemCount})
        </Button>
      </Link>
    </div>
  </header>
);

// Placeholder for AppFooter - In a real app, this would be a shared layout component
const AppFooter: React.FC = () => (
  <footer className="bg-gray-100 border-t mt-auto">
    <div className="container mx-auto px-4 py-6 text-center text-gray-600 text-sm">
      &copy; {new Date().getFullYear()} FoodFleet. All rights reserved.
    </div>
  </footer>
);

interface Restaurant {
  id: string;
  name: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  cuisineTypes: string[];
  address: string;
  openingHours: string;
  deliveryTime: string;
  deliveryFee: number;
  menu: {
    categories: string[]; // e.g., ['Appetizers', 'Pizzas', 'Pastas', 'Desserts', 'Drinks']
    items: MenuItemData[]; // MenuItemData is imported from MenuItemCard
  };
}

// Sample Restaurant Data (simulating API response)
const sampleRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Pizza Heaven',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    rating: 4.5,
    reviewsCount: 150,
    cuisineTypes: ['Italian', 'Pizza', 'Fast Food'],
    address: '123 Main St, Anytown, USA',
    openingHours: '11:00 AM - 10:00 PM',
    deliveryTime: '30-45 min',
    deliveryFee: 2.99,
    menu: {
      categories: ['Appetizers', 'Pizzas', 'Pastas', 'Drinks'],
      items: [
        { id: 'm1', name: 'Garlic Knots', description: 'Warm, buttery garlic knots served with marinara sauce.', price: 6.99, category: 'Appetizers', imageUrl: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', hasCustomizations: false },
        { id: 'm2', name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza with a rich tomato sauce and mozzarella cheese.', price: 14.99, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1593504049358-74330755d0a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', hasCustomizations: true },
        { id: 'm3', name: 'Margherita Pizza', description: 'Simple yet delicious pizza with fresh mozzarella, basil, and tomato.', price: 12.99, category: 'Pizzas', imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', hasCustomizations: true },
        { id: 'm4', name: 'Spaghetti Carbonara', description: 'Creamy pasta with pancetta, egg, and Parmesan cheese.', price: 13.50, category: 'Pastas', imageUrl: 'https://images.unsplash.com/photo-1588013273468-315088ea3bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2FyYm9uYXJhfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60', hasCustomizations: false },
        { id: 'm5', name: 'Coca-Cola', description: 'Classic Coca-Cola.', price: 2.50, category: 'Drinks', hasCustomizations: false },
      ],
    },
  },
   {
    id: '2',
    name: 'Sushi World',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    rating: 4.8,
    reviewsCount: 210,
    cuisineTypes: ['Japanese', 'Sushi', 'Seafood'],
    address: '456 Oak Ave, Anytown, USA',
    openingHours: '12:00 PM - 9:00 PM',
    deliveryTime: '40-55 min',
    deliveryFee: 3.49,
    menu: {
      categories: ['Rolls', 'Sashimi', 'Appetizers', 'Drinks'],
      items: [
        { id: 's1', name: 'California Roll', description: 'Crab, avocado, cucumber.', price: 8.00, category: 'Rolls', hasCustomizations: false },
        { id: 's2', name: 'Spicy Tuna Roll', description: 'Tuna, spicy mayo, cucumber.', price: 9.50, category: 'Rolls', hasCustomizations: true },
        { id: 's3', name: 'Salmon Sashimi', description: '5 pieces of fresh salmon sashimi.', price: 12.00, category: 'Sashimi', hasCustomizations: false },
        { id: 's4', name: 'Edamame', description: 'Steamed soybeans with salt.', price: 5.00, category: 'Appetizers', hasCustomizations: false },
        { id: 's5', name: 'Green Tea', description: 'Hot or Iced.', price: 3.00, category: 'Drinks', hasCustomizations: true },
      ],
    },
  },
];

interface CartItem {
  itemId: string | number;
  name: string;
  price: number;
  quantity: number;
  customizations?: Record<string, any>;
}

const RestaurantMenuPage = () => {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log('RestaurantMenuPage loaded');
    const restaurantId = searchParams.get('restaurantId');
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const foundRestaurant = sampleRestaurants.find(r => r.id === restaurantId);
      setRestaurant(foundRestaurant || null);
      setIsLoading(false);
      if (!foundRestaurant) {
        console.error(`Restaurant with ID ${restaurantId} not found.`);
        // Potentially redirect to a 404 page or show an error message
      }
    }, 500);
  }, [searchParams]);

  const handleAddToCart = (details: {
    itemId: string | number;
    name: string;
    price: number;
    quantity: number;
    customizations?: Record<string, any>;
  }) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.itemId === details.itemId && JSON.stringify(item.customizations) === JSON.stringify(details.customizations));
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += details.quantity;
        return updatedCart;
      } else {
        return [...prevCart, details];
      }
    });
    // MenuItemCard handles its own toast notification.
    // If a page-level notification is desired, it can be added here:
    // toast({ title: "Item added to cart", description: `${details.quantity} x ${details.name} added.` });
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader cartItemCount={totalCartItems} />
        <div className="flex-grow container mx-auto px-4 py-8 flex justify-center items-center">
          <p className="text-xl text-gray-500">Loading restaurant details...</p>
        </div>
        <AppFooter />
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="flex flex-col min-h-screen">
        <AppHeader cartItemCount={totalCartItems} />
        <div className="flex-grow container mx-auto px-4 py-8 text-center">
           <Info className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h1 className="text-2xl font-semibold mb-2">Restaurant Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find the restaurant you're looking for.</p>
          <Button asChild>
            <Link to="/restaurant-listing">Back to Restaurants</Link>
          </Button>
        </div>
        <AppFooter />
      </div>
    );
  }

  // Helper to get category icon
  const getCategoryIcon = (categoryName: string) => {
    const lowerCategory = categoryName.toLowerCase();
    if (lowerCategory.includes('pizza')) return <Pizza className="mr-2 h-5 w-5" />;
    if (lowerCategory.includes('appetizer') || lowerCategory.includes('salad')) return <Salad className="mr-2 h-5 w-5" />;
    if (lowerCategory.includes('pasta') || lowerCategory.includes('sashimi') || lowerCategory.includes('roll')) return <Utensils className="mr-2 h-5 w-5" />;
    if (lowerCategory.includes('drink')) return <GlassWater className="mr-2 h-5 w-5" />;
    return <Utensils className="mr-2 h-5 w-5" />;
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader cartItemCount={totalCartItems} />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild><Link to="/restaurant-listing">Restaurants</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{restaurant.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Restaurant Info Section */}
        <Card className="mb-8 shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img 
                src={restaurant.imageUrl || 'https://via.placeholder.com/400x300?text=Restaurant+Image'} 
                alt={restaurant.name} 
                className="object-cover h-48 w-full md:h-full"
              />
            </div>
            <div className="md:w-2/3">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold">{restaurant.name}</CardTitle>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                  <span>{restaurant.rating.toFixed(1)} ({restaurant.reviewsCount} reviews)</span>
                </div>
                <div className="mt-2">
                  {restaurant.cuisineTypes.map(cuisine => (
                    <Badge key={cuisine} variant="secondary" className="mr-2 mb-1">{cuisine}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700 pt-0">
                <p className="flex items-center"><MapPin className="h-4 w-4 mr-2 text-primary" /> {restaurant.address}</p>
                <p className="flex items-center"><Clock className="h-4 w-4 mr-2 text-primary" /> Opening Hours: {restaurant.openingHours}</p>
                <p className="flex items-center"><ShoppingCart className="h-4 w-4 mr-2 text-primary" /> Delivery: {restaurant.deliveryTime}, ${restaurant.deliveryFee.toFixed(2)}</p>
              </CardContent>
            </div>
          </div>
        </Card>
        
        {/* Menu Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <Tabs defaultValue={restaurant.menu.categories[0]} className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex lg:flex-wrap gap-2 mb-6 bg-transparent p-0">
              {restaurant.menu.categories.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category} 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md flex-grow justify-center items-center px-4 py-2.5 text-sm"
                >
                  {getCategoryIcon(category)}
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {restaurant.menu.categories.map(category => (
              <TabsContent key={category} value={category}>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {restaurant.menu.items
                    .filter(item => item.category === category)
                    .map(item => (
                      <MenuItemCard
                        key={item.id}
                        item={{...item, category: undefined }} // Pass item data, category is for filtering here not for the card itself.
                        onAddToCart={handleAddToCart}
                      />
                  ))}
                </div>
                {restaurant.menu.items.filter(item => item.category === category).length === 0 && (
                    <p className="text-gray-500 text-center py-4">No items in this category yet.</p>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Cart Summary / Checkout Button (Floating or fixed) */}
        {cart.length > 0 && (
          <div className="fixed bottom-4 right-4 z-50">
            <Button size="lg" asChild className="shadow-xl">
              <Link to="/checkout">
                <ShoppingCart className="mr-2 h-5 w-5" />
                View Cart ({totalCartItems} items) &amp; Checkout
              </Link>
            </Button>
          </div>
        )}

      </main>
      <AppFooter />
    </div>
  );
};

export default RestaurantMenuPage;
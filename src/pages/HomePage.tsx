import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Custom Components
import RestaurantCard from '@/components/RestaurantCard';
import CuisineCategoryChip from '@/components/CuisineCategoryChip';

// Shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

// Lucide Icons
import { ShoppingCart, UserCircle, Search, MapPin } from 'lucide-react';

// Placeholder AppHeader (as it's not in custom_component_code)
const AppHeader: React.FC = () => (
  <header className="bg-white shadow-md p-4 sticky top-0 z-50">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
        FoodFleet
      </Link>
      <nav className="flex items-center space-x-2 sm:space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/checkout" aria-label="View Cart"> {/* Path from App.tsx */}
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">Cart</span>
          </Link>
        </Button>
        {/* Placeholder for user profile/login - actual routing would depend on auth setup */}
        <Button variant="ghost" size="icon" aria-label="User Profile">
          <UserCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          <span className="sr-only">Profile</span>
        </Button>
      </nav>
    </div>
  </header>
);

// Placeholder AppFooter (as it's not in custom_component_code)
const AppFooter: React.FC = () => (
  <footer className="bg-gray-800 text-gray-300 py-10 mt-16">
    <div className="container mx-auto px-4 text-center">
      <p className="text-lg font-semibold mb-2">FoodFleet</p>
      <p className="text-sm mb-4">&copy; {new Date().getFullYear()} FoodFleet Inc. All rights reserved.</p>
      <div className="flex justify-center space-x-4 text-sm">
        <a href="#" className="hover:text-white hover:underline">About Us</a>
        <a href="#" className="hover:text-white hover:underline">Contact</a>
        <a href="#" className="hover:text-white hover:underline">Privacy Policy</a>
        <a href="#" className="hover:text-white hover:underline">Terms of Service</a>
      </div>
    </div>
  </footer>
);

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // For visual feedback on chip

  const cuisineCategories = ["Italian", "Chinese", "Mexican", "Indian", "Japanese", "American", "Thai", "Vegan"];
  
  const promotions = [
    { id: 'promo1', title: '50% Off Your First Order!', description: 'Use code NEW50 at checkout.', imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
    { id: 'promo2', title: 'Free Delivery Weekend', description: 'On all orders above $20 this weekend.', imageUrl: 'https://images.unsplash.com/photo-1579751586428-8570ddf81574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
    { id: 'promo3', title: 'Special Combo Deals', description: 'Amazing combos starting from $9.99.', imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=60' },
  ];

  const restaurantList = [
    { id: 'r1', name: 'Nonna\'s Kitchen', imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Italian', 'Pasta', 'Pizza'], rating: 4.8, deliveryTime: '30-45 min', deliveryFee: 3.00, promotion: '15% Off Family Meals' },
    { id: 'r2', name: 'Dragon Wok', imageUrl: 'https://images.unsplash.com/photo-1585851372067-135a3193089a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Chinese', 'Noodles'], rating: 4.5, deliveryTime: '25-35 min', deliveryFee: 2.50 },
    { id: 'r3', name: 'El Sombrero Taqueria', imageUrl: 'https://images.unsplash.com/photo-1565000089548-075761bcf209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Mexican', 'Tacos'], rating: 4.7, deliveryTime: '20-30 min', deliveryFee: 0, promotion: 'Taco Tuesday Special' },
    { id: 'r4', 'name': 'The Curry Leaf', imageUrl: 'https://images.unsplash.com/photo-1567529854338-fc097b9625b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Indian', 'Biryani'], rating: 4.6, deliveryTime: '35-50 min', deliveryFee: 1.99 },
    { id: 'r5', 'name': 'Burger Bliss', imageUrl: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['American', 'Burgers', 'Fries'], rating: 4.3, deliveryTime: '20-30 min', deliveryFee: 2.00 },
    { id: 'r6', 'name': 'Sakura Sushi House', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Japanese', 'Sushi'], rating: 4.9, deliveryTime: '30-40 min', deliveryFee: 4.00, promotion: 'Free Edamame' },
    { id: 'r7', name: 'Green Garden Cafe', imageUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17021?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Healthy', 'Salads', 'Vegan'], rating: 4.7, deliveryTime: '15-25 min', deliveryFee: 0 },
    { id: 'r8', name: 'Thai Spice Express', imageUrl: 'https://images.unsplash.com/photo-1552611052-33e04de081de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=60', cuisineTypes: ['Thai', 'Noodles', 'Curry'], rating: 4.4, deliveryTime: '25-40 min' /* deliveryFee undefined */ },
  ];

  const featuredRestaurants = restaurantList.slice(0, 4); // First 4 for featured
  const popularRestaurants = restaurantList.slice(4, 8); // Next 4 for popular

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <AppHeader />

      <main className="flex-grow">
        {/* Hero Section with Search */}
        <section className="py-12 md:py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white text-center relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{backgroundImage: "url('https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80')"}}
          ></div>
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Your Next Meal, Delivered.</h1>
            <p className="text-md sm:text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-sm">
              Discover local favorites and get food delivered to your doorstep quickly and easily.
            </p>
            <form className="max-w-xl mx-auto relative" onSubmit={(e) => { e.preventDefault(); alert(`Searching for: ${searchTerm}`); }}>
              <Input
                type="search"
                placeholder="Search restaurants, cuisines, dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pr-12 text-base sm:text-lg rounded-full shadow-xl border-transparent focus:ring-2 focus:ring-orange-300 text-gray-800"
                aria-label="Search for food"
              />
              <Button type="submit" size="icon" className="absolute right-2.5 top-1/2 transform -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90" aria-label="Submit search">
                <Search className="h-5 w-5 text-primary-foreground" />
              </Button>
            </form>
            <div className="mt-6 flex items-center justify-center space-x-2 text-sm opacity-90">
              <MapPin className="h-4 w-4" />
              <span>Delivering to: <strong>Your Current Location</strong> (mock)</span>
            </div>
          </div>
        </section>

        {/* Promotions Carousel */}
        {promotions.length > 0 && (
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center sm:text-left">Today's Special Offers</h2>
              <Carousel
                opts={{ align: "start", loop: true }}
                className="w-full max-w-6xl mx-auto"
              >
                <CarouselContent className="-ml-4">
                  {promotions.map((promo) => (
                    <CarouselItem key={promo.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-gray-800 rounded-lg">
                        <div className="aspect-[16/9] overflow-hidden">
                           <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"/>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{promo.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{promo.description}</p>
                          <Button variant="link" className="p-0 mt-2 h-auto text-primary">View Offer</Button>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-[-10px] sm:left-[-20px] disabled:opacity-50" />
                <CarouselNext className="right-[-10px] sm:right-[-20px] disabled:opacity-50" />
              </Carousel>
            </div>
          </section>
        )}

        {/* Cuisine Categories */}
        <section className="py-8 md:py-12 bg-white dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center sm:text-left">Explore Cuisines</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {cuisineCategories.map((category) => (
                  <CuisineCategoryChip
                    key={category}
                    categoryName={category}
                    isSelected={selectedCategory === category}
                    onClick={() => {
                      setSelectedCategory(category);
                      // In a real app, clicking this might also trigger a navigation or filter update
                      // For now, it updates visual state and relies on Link for actual navigation if wrapped.
                      // Here, we'll simulate navigation with Link, but we could also use useNavigate hook.
                      // For demo, let's assume direct navigation to restaurant listing page with cuisine filter
                      // This assumes CuisineCategoryChip itself is not a Link. If it is, onClick here may be redundant.
                      // The spec provided has <Link><CuisineCategoryChip ...></Link>
                      // For this implementation, let's assume the link wrapping is desired.
                      // The onClick for setSelectedCategory provides visual feedback.
                    }}
                    // The component <CuisineCategoryChip> is wrapped with <Link> below for navigation
                  />
              ))}
            </div>
             <div className="text-center mt-8">
                <Button asChild variant="outline">
                    <Link to="/restaurant-listing">View All Cuisines</Link>
                </Button>
            </div>
          </div>
        </section>
        
        {/* Note: Wrapping CuisineCategoryChip with Link for navigation as per typical usage pattern */}
        {/* This requires adjusting the above section or assuming the link is implicit if the chip handles it */}
        {/* For clarity and consistency with user journey, let's explicitly use Link for navigation here */}
        {/* Corrected Cuisine Categories Section (with explicit Links) */}
        <section className="py-8 md:py-12 bg-white dark:bg-gray-800/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-100 text-center sm:text-left">Explore Cuisines</h2>
            <div className="flex flex-wrap justify-center gap-x-3 gap-y-4">
              {cuisineCategories.map((category) => (
                <Link key={category} to={`/restaurant-listing?cuisine=${encodeURIComponent(category.toLowerCase())}`}>
                  <CuisineCategoryChip
                    categoryName={category}
                    isSelected={selectedCategory === category} // Visual state only
                    onClick={() => setSelectedCategory(category)} // Updates visual state
                  />
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
                <Button asChild variant="outline">
                    <Link to="/restaurant-listing">View All Cuisines</Link>
                </Button>
            </div>
          </div>
        </section>


        {/* Featured Restaurants */}
        {featuredRestaurants.length > 0 && (
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Featured Restaurants</h2>
                <Button variant="link" asChild className="text-primary">
                  <Link to="/restaurant-listing?filter=featured">View All Featured</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </div>
          </section>
        )}

         {/* Popular Near You Restaurants */}
        {popularRestaurants.length > 0 && (
          <section className="py-8 md:py-12 bg-white dark:bg-gray-800/50">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-between items-center mb-6 gap-2">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-100">Popular Near You</h2>
                <Button variant="link" asChild className="text-primary">
                  <Link to="/restaurant-listing?filter=popular">View All Popular</Link>
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {popularRestaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            </div>
          </section>
        )}

      </main>

      <AppFooter />
    </div>
  );
};

export default HomePage;